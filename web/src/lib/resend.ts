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
export const TO_INBOX = process.env.RESEND_TO_EMAIL ?? "marketing@royalphuketcity.com";
