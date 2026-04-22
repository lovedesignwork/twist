import { AuroraBackdrop } from "@/components/aurora-backdrop";
import { AuroraNav } from "@/components/aurora-nav";
import { AuroraFooter } from "@/components/aurora-footer";
import { ReservationForm } from "@/components/reservation-form";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Reserve a Table — Save Us a Seat",
  description:
    "Book your evening at TWIST — rooftop dining 19 floors above Phuket Old Town. Confirmation by email, cancel free of charge up to 24 hours ahead.",
};

export default function ReservePage() {
  return (
    <div className="relative bg-twist-ink min-h-screen overflow-hidden">
      <AuroraBackdrop intensity={0.6} variant="warm" />
      <AuroraNav />

      {/* HERO */}
      <section className="relative z-[2] pt-32 lg:pt-44 pb-12 px-6 lg:px-16 text-center">
        <div className="tw-mono text-[11px] tracking-[0.45em] opacity-70 mb-5">
          ( RESERVATIONS · DAILY 5 PM — LATE )
        </div>
        <h1 className="tw-serif text-[60px] sm:text-[96px] lg:text-[148px] leading-[0.92] font-normal tracking-[-0.02em]">
          Save us a <span className="italic tw-gradient-text">seat.</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mt-9 text-white/75 font-light leading-relaxed">
          Pick a date, a time, and the number of glasses you&apos;ll need.
          We&apos;ll confirm by email — usually within an hour, sooner if the bar is quiet.
        </p>
      </section>

      {/* MAIN GRID — form + info */}
      <section className="relative z-[2] py-10 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <ReservationForm />

          <aside className="flex flex-col gap-4">
            {/* Address */}
            <div
              className="border border-white/10 rounded-2xl p-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(253,224,71,0.06), rgba(255,255,255,0))",
              }}
            >
              <div className="tw-mono text-[10px] tracking-[0.3em] text-twist-yellow mb-4">
                ◉ FIND US
              </div>
              <div className="tw-serif text-xl lg:text-2xl font-medium leading-tight mb-3">
                {SITE.address.line1}
              </div>
              <div className="text-[13px] opacity-75 leading-relaxed">
                {SITE.address.line2}
                <br />
                {SITE.address.city} {SITE.address.postcode}
                <br />
                {SITE.address.country}
              </div>
              <div className="tw-mono text-[11px] tracking-[0.15em] mt-4 text-twist-cyan">
                {SITE.address.geo.lat}° N · {SITE.address.geo.lng}° E
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

            {/* Hours */}
            <div className="border border-white/10 rounded-2xl p-7">
              <div className="tw-mono text-[10px] tracking-[0.3em] text-twist-pink mb-4">
                ◷ HOURS
              </div>
              {SITE.hours.map((h, i) => (
                <div
                  key={h.label}
                  className={`flex justify-between text-sm py-2 ${
                    i < SITE.hours.length - 1 ? "border-b border-white/[0.08]" : ""
                  }`}
                >
                  <span>{h.label}</span>
                  <span className="tw-mono opacity-70 text-[12px]">{h.value}</span>
                </div>
              ))}
            </div>

            {/* Direct */}
            <div className="border border-white/10 rounded-2xl p-7">
              <div className="tw-mono text-[10px] tracking-[0.3em] text-twist-cyan mb-4">
                ☏ PREFER TO CALL OR WRITE?
              </div>
              <div className="tw-serif text-2xl font-medium mb-1">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="hover:text-twist-yellow transition"
                >
                  {SITE.phone}
                </a>
              </div>
              <div className="text-[12px] opacity-55 mb-4">Our hosts answer from 5 PM</div>
              <div className="text-[13px] opacity-80 leading-relaxed">
                For events &amp; private hire, write to{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-twist-yellow hover:underline break-all"
                >
                  {SITE.email}
                </a>
                .
              </div>
            </div>

            {/* Good to know */}
            <div className="border border-white/10 rounded-2xl p-7 bg-white/[0.02]">
              <div className="tw-mono text-[10px] tracking-[0.3em] text-twist-purple mb-4">
                ✦ GOOD TO KNOW
              </div>
              <ul className="text-[13px] opacity-80 leading-relaxed space-y-2">
                <li>— Smart casual dress code (no beachwear)</li>
                <li>— Live music daily 19:00 — 21:00</li>
                <li>— Sunset window seats fill fastest</li>
                <li>— Cancel free of charge up to 24h ahead</li>
                <li>— Parties of 8+? Email us first for the best seat</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
