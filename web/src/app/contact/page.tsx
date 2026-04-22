import Link from "next/link";
import { AuroraBackdrop } from "@/components/aurora-backdrop";
import { AuroraNav } from "@/components/aurora-nav";
import { AuroraFooter } from "@/components/aurora-footer";
import { ContactForm } from "@/components/contact-form";
import { FAQS, SITE } from "@/lib/site";

export const metadata = {
  title: "Contact — Get in Touch",
  description:
    "Send us a message about events, weddings, press, partnerships, or anything else. We reply within 24 hours, often sooner.",
};

export default function ContactPage() {
  return (
    <div className="relative bg-twist-ink min-h-screen overflow-hidden">
      <AuroraBackdrop intensity={0.5} variant="cool" />
      <AuroraNav />

      {/* HERO */}
      <section className="relative z-[2] pt-32 lg:pt-44 pb-12 px-6 lg:px-16 text-center">
        <div className="tw-mono text-[11px] tracking-[0.45em] opacity-70 mb-5">
          ( ENQUIRIES · PRESS · PRIVATE EVENTS )
        </div>
        <h1 className="tw-serif text-[60px] sm:text-[96px] lg:text-[148px] leading-[0.92] font-normal tracking-[-0.02em]">
          Say <span className="italic tw-gradient-text">hello.</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mt-9 text-white/75 font-light leading-relaxed">
          For private events, weddings, press, partnerships — or just to ask a question.
          We reply within 24 hours, often sooner.
        </p>

        {/* Reservation deflection banner */}
        <div className="mt-10 inline-flex items-center gap-4 max-w-full px-5 py-3 rounded-full border border-twist-yellow/40 bg-twist-yellow/[0.06]">
          <span className="tw-mono text-[10px] tracking-[0.25em] text-twist-yellow whitespace-nowrap">
            ◉ BOOKING A TABLE?
          </span>
          <span className="text-[13px] text-white/85 hidden sm:inline">
            Use our reservations page — it&apos;s faster.
          </span>
          <Link
            href="/reserve"
            className="text-[12px] tracking-[0.15em] uppercase font-semibold text-twist-yellow hover:underline whitespace-nowrap"
          >
            Reserve →
          </Link>
        </div>
      </section>

      {/* MAIN GRID — form + info */}
      <section className="relative z-[2] py-10 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <ContactForm />

          <aside className="flex flex-col gap-4">
            {/* Direct emails */}
            <div
              className="border border-white/10 rounded-2xl p-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(236,72,153,0.06), rgba(255,255,255,0))",
              }}
            >
              <div className="tw-mono text-[10px] tracking-[0.3em] text-twist-pink mb-4">
                ✉ DIRECT
              </div>
              <div className="space-y-5 text-[13px]">
                <div>
                  <div className="opacity-60 mb-2 tw-mono text-[10px] tracking-[0.25em] uppercase">
                    Email — all enquiries
                  </div>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-white hover:text-twist-yellow transition break-all tw-serif text-lg font-medium"
                  >
                    {SITE.email}
                  </a>
                  <div className="opacity-55 text-[11px] mt-1.5 leading-relaxed">
                    Reservations, events, private hire, press &amp; partnerships
                  </div>
                </div>
                <div className="border-t border-white/[0.08] pt-5">
                  <div className="opacity-60 mb-2 tw-mono text-[10px] tracking-[0.25em] uppercase">
                    Phone
                  </div>
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="text-white hover:text-twist-yellow transition tw-serif text-2xl font-medium"
                  >
                    {SITE.phone}
                  </a>
                  <div className="opacity-55 text-[11px] mt-1.5 leading-relaxed">
                    Daily from 5 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="border border-white/10 rounded-2xl p-7">
              <div className="tw-mono text-[10px] tracking-[0.3em] text-twist-yellow mb-4">
                ◉ FIND US
              </div>
              <div className="tw-serif text-lg font-medium leading-tight mb-3">
                {SITE.address.line1}
              </div>
              <div className="text-[13px] opacity-75 leading-relaxed">
                {SITE.address.line2}
                <br />
                {SITE.address.city} {SITE.address.postcode}
                <br />
                {SITE.address.country}
              </div>
              <a
                href={SITE.address.google}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex tw-btn-pill tw-btn-ghost text-[11px] py-3 px-5"
              >
                Open in Maps →
              </a>
            </div>

          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-[2] py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          <div>
            <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-purple mb-5">
              ( FAQ ) — OFTEN ASKED
            </div>
            <h2 className="tw-serif text-5xl lg:text-6xl leading-[0.95] font-normal">
              Quick <span className="italic tw-gradient-text">answers.</span>
            </h2>
            <p className="text-white/70 mt-5 max-w-sm text-sm leading-relaxed">
              Skim before you write — most enquiries are answered below.
              For anything else, the form above is the fastest way.
            </p>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="border-t border-white/10 py-5 group"
              >
                <summary className="cursor-pointer flex justify-between items-center list-none">
                  <span className="tw-serif text-xl lg:text-2xl font-medium pr-6">
                    {f.q}
                  </span>
                  <span className="text-2xl opacity-50 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-white/75 leading-relaxed mt-4 max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
