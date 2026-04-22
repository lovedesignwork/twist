import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { FROM, TO_INBOX, getResend } from "@/lib/resend";
import {
  reservationGuestEmail,
  reservationStaffEmail,
} from "@/lib/email-templates";

const ReservationSchema = z.object({
  first_name: z.string().min(1).max(80),
  last_name: z.string().min(1).max(80),
  email: z.string().email().max(160),
  phone: z.string().min(0).max(40).default(""),
  party_size: z.coerce.number().int().min(1).max(40),
  date: z.string().min(4).max(40),
  time: z.string().min(3).max(20),
  occasion: z.string().max(60).nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
  // honeypot
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ReservationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const r = parsed.data;
  if (r.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Best-effort persist to Supabase
  let savedId: string | undefined;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const sb = createAdminClient();
      const { data, error } = await sb
        .from("reservations")
        .insert({
          first_name: r.first_name,
          last_name: r.last_name,
          email: r.email,
          phone: r.phone,
          party_size: r.party_size,
          date: r.date,
          time: r.time,
          occasion: r.occasion ?? null,
          notes: r.notes ?? null,
        })
        .select("id")
        .single();
      if (!error && data) savedId = data.id as string;
    } catch (err) {
      console.error("[reservations] supabase insert failed", err);
    }
  }

  // Send the two emails (guest + staff)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = getResend();
      const reservation = {
        ...r,
        occasion: r.occasion ?? null,
        notes: r.notes ?? null,
      };
      const guest = reservationGuestEmail(reservation);
      const staff = reservationStaffEmail(reservation);

      await Promise.all([
        resend.emails.send({
          from: FROM,
          to: r.email,
          subject: guest.subject,
          html: guest.html,
        }),
        resend.emails.send({
          from: FROM,
          to: TO_INBOX,
          subject: staff.subject,
          html: staff.html,
          replyTo: r.email,
        }),
      ]);
    } catch (err) {
      console.error("[reservations] resend send failed", err);
    }
  }

  return NextResponse.json({ ok: true, id: savedId }, { status: 201 });
}
