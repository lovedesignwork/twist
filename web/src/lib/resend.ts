import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export const FROM = process.env.RESEND_FROM_EMAIL ?? "TWIST Phuket <onboarding@resend.dev>";

/** All staff inboxes that receive reservation, contact, and inquiry notifications */
export const TO_INBOX = [
  "reservation@royalphuketcity.com",
  "sales@royalphuketcity.com",
  "marketing@royalphuketcity.com",
  "puttipop.l@royalphuketcity.com",
  "gm@royalphuketcity.com",
];
