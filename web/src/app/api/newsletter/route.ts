import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { FROM, getResend } from "@/lib/resend";
import { newsletterWelcome } from "@/lib/email-templates";

const Schema = z.object({
  email: z.string().email().max(160),
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }
  const { email, website } = parsed.data;
  if (website) return NextResponse.json({ ok: true });

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const sb = createAdminClient();
      await sb
        .from("newsletter_subscribers")
        .upsert({ email }, { onConflict: "email" });
    } catch (err) {
      console.error("[newsletter] supabase upsert failed", err);
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = getResend();
      const tpl = newsletterWelcome(email);
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: tpl.subject,
        html: tpl.html,
      });
    } catch (err) {
      console.error("[newsletter] resend send failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
