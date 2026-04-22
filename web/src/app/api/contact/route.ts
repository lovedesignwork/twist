import { NextResponse } from "next/server";
import { z } from "zod";
import { FROM, TO_INBOX, getResend } from "@/lib/resend";
import { contactStaffEmail } from "@/lib/email-templates";

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().default(""),
  topic: z.string().min(1).max(80),
  subject: z.string().min(1).max(140),
  message: z.string().min(1).max(4000),
  website: z.string().max(0).optional(), // honeypot
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const c = parsed.data;
  if (c.website) return NextResponse.json({ ok: true });

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = getResend();
      const tpl = contactStaffEmail({
        name: c.name,
        email: c.email,
        phone: c.phone,
        topic: c.topic,
        subject: c.subject,
        message: c.message,
      });
      await resend.emails.send({
        from: FROM,
        to: TO_INBOX,
        subject: tpl.subject,
        html: tpl.html,
        replyTo: c.email,
      });
    } catch (err) {
      console.error("[contact] resend send failed", err);
    }
  }
  return NextResponse.json({ ok: true });
}
