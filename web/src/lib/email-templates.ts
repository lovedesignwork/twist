import { SITE } from "./site";
import type { Reservation } from "./types";

const wrap = (title: string, body: string) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#06020F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#06020F;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:linear-gradient(180deg,#0A0318,#06020F);border:1px solid rgba(255,255,255,0.1);border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:40px 40px 24px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08);">
                <div style="font-family:Georgia,serif;font-size:28px;letter-spacing:0.3em;color:#FDE047;">TWIST</div>
                <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-top:8px;">Rooftop Restaurant &amp; Bar · Phuket Old Town</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px 40px 40px;color:#ffffff;font-size:15px;line-height:1.7;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:rgba(255,255,255,0.45);text-align:center;letter-spacing:0.1em;">
                © ${new Date().getFullYear()} TWIST · Royal Phuket City Hotel · 19F
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export function reservationGuestEmail(r: Reservation) {
  const body = `
    <h2 style="font-family:Georgia,serif;font-size:28px;font-weight:500;margin:0 0 16px;color:#fff;">
      Your seat is saved, ${r.first_name}.
    </h2>
    <p style="margin:0 0 24px;color:rgba(255,255,255,0.8);">
      Thank you for choosing TWIST. Below is the reservation our team has on file.
      We&apos;ll send a final confirmation shortly — usually within an hour, sooner if the bar is quiet.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(253,224,71,0.3);margin:8px 0 24px;">
      ${[
        ["Date", r.date],
        ["Time", r.time],
        ["Party", `${r.party_size} guest${r.party_size === 1 ? "" : "s"}`],
        ["Occasion", r.occasion || "—"],
      ]
        .map(
          ([k, v]) => `
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);width:140px;font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.55);text-transform:uppercase;">${k}</td>
            <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-family:Georgia,serif;font-size:18px;color:#fff;">${v}</td>
          </tr>`,
        )
        .join("")}
    </table>

    ${
      r.notes
        ? `<p style="font-size:13px;color:rgba(255,255,255,0.65);background:rgba(255,255,255,0.04);border-left:2px solid #FDE047;padding:12px 16px;margin:0 0 24px;">
        <strong style="color:#FDE047;letter-spacing:0.15em;font-size:11px;text-transform:uppercase;">Notes</strong><br/>${r.notes}
      </p>`
        : ""
    }

    <p style="font-size:13px;color:rgba(255,255,255,0.6);">
      You can cancel free of charge up to 24 hours before your reservation by replying to this email or calling
      <strong>${SITE.phone}</strong>.
    </p>

    <p style="font-size:13px;color:rgba(255,255,255,0.7);margin-top:24px;">
      See you soon, 19 floors up.<br/>
      <em style="color:#FDE047;">— The TWIST team</em>
    </p>
  `;
  return {
    subject: `TWIST · Your reservation for ${r.date}`,
    html: wrap("Your reservation at TWIST", body),
  };
}

export function reservationStaffEmail(r: Reservation) {
  const body = `
    <h2 style="font-family:Georgia,serif;font-size:24px;margin:0 0 8px;color:#fff;">New reservation</h2>
    <p style="margin:0 0 20px;color:#FDE047;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;">Action required</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;">
      ${[
        ["Name", `${r.first_name} ${r.last_name}`],
        ["Email", r.email],
        ["Phone", r.phone || "—"],
        ["Date", r.date],
        ["Time", r.time],
        ["Party", String(r.party_size)],
        ["Occasion", r.occasion || "—"],
        ["Notes", r.notes || "—"],
      ]
        .map(
          ([k, v]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);width:120px;font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.55);text-transform:uppercase;">${k}</td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#fff;">${v}</td>
          </tr>`,
        )
        .join("")}
    </table>
  `;
  return {
    subject: `[TWIST] Reservation · ${r.first_name} ${r.last_name} · ${r.date} ${r.time} · ${r.party_size} pax`,
    html: wrap("New reservation", body),
  };
}

export function contactStaffEmail(payload: {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  subject: string;
  message: string;
}) {
  const safe = (s: string) => s.replace(/</g, "&lt;");
  const body = `
    <p style="margin:0 0 4px;color:#FDE047;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;">${safe(payload.topic)}</p>
    <h2 style="font-family:Georgia,serif;font-size:26px;margin:0 0 16px;color:#fff;">${safe(payload.subject)}</h2>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;">
      ${[
        ["From", safe(payload.name)],
        ["Email", `<a href="mailto:${safe(payload.email)}" style="color:#FDE047;text-decoration:none;">${safe(payload.email)}</a>`],
        ["Phone", payload.phone ? safe(payload.phone) : "—"],
        ["Topic", safe(payload.topic)],
      ]
        .map(
          ([k, v]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);width:120px;font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.55);text-transform:uppercase;">${k}</td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#fff;">${v}</td>
          </tr>`,
        )
        .join("")}
    </table>

    <div style="font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.55);text-transform:uppercase;margin-bottom:8px;">Message</div>
    <div style="font-size:14px;color:rgba(255,255,255,0.9);background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:18px;white-space:pre-wrap;line-height:1.6;">${safe(payload.message)}</div>
  `;
  return {
    subject: `[TWIST · ${payload.topic}] ${payload.subject}`,
    html: wrap(`Enquiry · ${payload.topic}`, body),
  };
}

export function newsletterWelcome(email: string) {
  const body = `
    <h2 style="font-family:Georgia,serif;font-size:28px;margin:0 0 16px;color:#fff;">You&apos;re on the list.</h2>
    <p style="color:rgba(255,255,255,0.8);">
      One dispatch from TWIST, every full moon — new menus, guest nights, and our writer&apos;s quiet favourites.
      No spam, ever. Unsubscribe anytime.
    </p>
    <p style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:24px;">Subscribed: <strong>${email}</strong></p>
  `;
  return {
    subject: `TWIST · One dispatch, every full moon`,
    html: wrap("Welcome to TWIST dispatches", body),
  };
}
