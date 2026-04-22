import Image from "next/image";
import Link from "next/link";
import { AuroraBackdrop } from "@/components/aurora-backdrop";
import { AuroraNav } from "@/components/aurora-nav";
import { AuroraFooter } from "@/components/aurora-footer";
import { IMG } from "@/lib/images";
import { getUpcomingEvents, getFeaturedEvent } from "@/lib/queries";

export const metadata = {
  title: "Events — Nights to Remember",
  description:
    "Live music, chef's tables, full-moon rooftops, and weddings held above the city.",
};

const ACCENTS: Record<string, string> = {
  music: "var(--color-twist-pink)",
  dining: "var(--color-twist-purple)",
  private: "var(--color-twist-cyan)",
  lunar: "var(--color-twist-cyan)",
};

const FILTERS = ["All", "Music", "Dining", "Private"] as const;

export default async function EventsPage() {
  const featured = await getFeaturedEvent();
  const upcoming = await getUpcomingEvents();
  const list = upcoming.filter((e) => e.id !== featured?.id);

  return (
    <div className="relative bg-twist-ink min-h-screen overflow-hidden">
      <AuroraBackdrop intensity={0.6} variant="default" />
      <AuroraNav />

      {/* HERO */}
      <section className="relative z-[2] pt-32 lg:pt-44 pb-12 px-6 lg:px-16 text-center">
        <div className="tw-mono text-[11px] tracking-[0.45em] opacity-70 mb-5">
          ( THE CALENDAR · 2026 )
        </div>
        <h1 className="tw-serif text-[60px] sm:text-[96px] lg:text-[148px] leading-[0.92] font-normal tracking-[-0.02em]">
          Nights to <span className="italic tw-gradient-text">remember.</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mt-9 text-white/75 font-light leading-relaxed">
          A rolling season of live music, chef&apos;s tables, full-moon rooftops, and
          weddings held above the city. Seats are limited; the view isn&apos;t.
        </p>
      </section>

      {/* FEATURED EVENT */}
      {featured && (
        <section className="relative z-[2] py-10 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 border border-white/10 rounded-3xl overflow-hidden">
              <div className="relative min-h-[420px] lg:min-h-[560px]">
                {featured.image_url && (
                  <Image
                    src={featured.image_url}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div
                className="p-10 lg:p-14"
                style={{
                  background: `
                    radial-gradient(500px 400px at 90% 20%, rgba(253,224,71,0.2), transparent 60%),
                    radial-gradient(600px 500px at 10% 90%, rgba(139,92,246,0.4), transparent 60%)`,
                }}
              >
                <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-yellow mb-5">
                  ◉ HEADLINE · {featured.tag}
                </div>
                <h2 className="tw-serif text-5xl lg:text-7xl leading-[0.9] font-normal">
                  {featured.title.split(" — ")[0]}
                  <br />
                  <span className="italic tw-gradient-text">
                    {featured.title.split(" — ")[1] ?? "is back."}
                  </span>
                </h2>
                {featured.description && (
                  <p className="text-base mt-5 text-white/80 max-w-md leading-relaxed">
                    {featured.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 mt-7">
                  {[
                    [
                      "Date",
                      new Date(featured.date).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                      }),
                    ],
                    ["Doors", featured.doors],
                    ["Ticket", `฿${featured.price_thb.toLocaleString()} pp`],
                    ["Floor", "19ᵗʰ"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-twist-yellow/30 pt-2">
                      <div className="tw-mono text-[10px] tracking-[0.25em] opacity-55 uppercase">
                        {k}
                      </div>
                      <div className="tw-serif text-xl mt-1 font-medium">{v}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/reserve"
                  className="mt-8 tw-btn-pill tw-btn-primary inline-flex"
                >
                  Reserve your seat →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* UPCOMING LIST */}
      <section className="relative z-[2] py-12 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-10">
            <div>
              <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-cyan mb-5">
                ( UPCOMING )
              </div>
              <h2 className="tw-serif text-5xl lg:text-6xl leading-[0.95] font-normal">
                The <span className="italic tw-gradient-text">season</span> ahead.
              </h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  className={`px-5 py-[10px] rounded-full text-[11px] tracking-[0.2em] uppercase font-medium border transition ${
                    i === 0
                      ? "bg-twist-yellow/12 border-twist-yellow/60 text-twist-yellow"
                      : "bg-white/[0.03] border-white/15 text-white/85 hover:border-white/30"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {list.map((e) => {
              const d = new Date(e.date);
              const day = d.getDate().toString().padStart(2, "0");
              const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
              const weekday = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
              const accent = ACCENTS[e.category] ?? "var(--color-twist-yellow)";
              return (
                <div
                  key={e.id}
                  className="grid grid-cols-1 lg:grid-cols-[110px_2fr_1.2fr_120px_auto] gap-6 items-center p-6 lg:px-8 lg:py-7 border border-white/[0.08] rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent"
                >
                  <div className="text-center">
                    <div
                      className="tw-serif text-5xl font-medium leading-none"
                      style={{ color: accent }}
                    >
                      {day}
                    </div>
                    <div className="tw-mono text-[11px] tracking-[0.3em] mt-2 opacity-70">
                      {month} · {weekday}
                    </div>
                  </div>
                  <div>
                    <div
                      className="tw-mono text-[10px] tracking-[0.25em] mb-2"
                      style={{ color: accent }}
                    >
                      ◉ {e.tag}
                    </div>
                    <h3 className="tw-serif text-2xl lg:text-3xl font-medium leading-tight">
                      {e.title}
                    </h3>
                  </div>
                  <div className="tw-mono text-[12px] opacity-70 tracking-[0.05em] leading-relaxed">
                    {e.subtitle}
                    <br />
                    <span className="opacity-55">{e.time_label}</span>
                  </div>
                  <div className="tw-serif text-2xl italic" style={{ color: accent }}>
                    ฿{e.price_thb.toLocaleString()}
                  </div>
                  <Link
                    href="/reserve"
                    className="tw-btn-pill tw-btn-ghost text-[11px] py-3 px-5 lg:justify-self-end"
                  >
                    Reserve →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRIVATE / WEDDING CTA */}
      <section className="relative z-[2] py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 border border-white/10 rounded-3xl overflow-hidden min-h-[440px]">
            <div
              className="p-10 lg:p-14 flex flex-col justify-center"
              style={{
                background:
                  "radial-gradient(700px 500px at 10% 90%, rgba(236,72,153,0.3), transparent)",
              }}
            >
              <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-pink mb-5">
                ( PRIVATE ) — WEDDINGS &amp; HIRE
              </div>
              <h2 className="tw-serif text-5xl lg:text-6xl leading-[0.95] font-normal">
                Say <span className="italic tw-gradient-text">I do,</span>
                <br />
                above the clouds.
              </h2>
              <p className="text-base mt-5 text-white/80 max-w-md leading-relaxed">
                Cloud-height ceremonies, anniversary dinners, and full-venue
                takeovers. Our events team designs every detail — from the first
                toast to the last song.
              </p>
              <div className="flex gap-3 mt-8 flex-wrap">
                <Link href="/contact" className="tw-btn-pill tw-btn-light">
                  Plan with us →
                </Link>
                <button className="tw-btn-pill tw-btn-ghost">Download brochure</button>
              </div>
            </div>
            <div className="relative min-h-[300px]">
              <Image
                src={IMG.weddingRooftop}
                alt="Rooftop wedding"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
