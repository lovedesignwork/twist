import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AuroraBackdrop } from "@/components/aurora-backdrop";
import { AuroraNav } from "@/components/aurora-nav";
import { AuroraFooter } from "@/components/aurora-footer";
import {
  COCKTAILS,
  KITCHEN,
  MENU_FOOTNOTES,
  PERANAKAN_SIGNATURES,
} from "@/data/menu";

export const metadata = {
  title: "Menu — Cocktails, Kitchen & Wine",
  description:
    "Twisted Peranakan signatures, an international kitchen, signature cocktails, and a wine list chosen for altitude. Every plate paired with a view.",
};

export default function MenuPage() {
  return (
    <div className="relative bg-twist-ink min-h-screen overflow-hidden">
      <AuroraBackdrop intensity={0.6} variant="warm" />
      <AuroraNav />

      {/* HERO */}
      <section className="relative z-[2] pt-32 lg:pt-44 pb-16 px-6 lg:px-16 text-center">
        <div className="tw-mono text-[11px] tracking-[0.45em] opacity-70 mb-5">
          ( THE CARTE )
        </div>
        <h1 className="tw-serif text-[60px] sm:text-[96px] lg:text-[152px] leading-[0.92] font-normal tracking-[-0.02em]">
          The <span className="italic tw-gradient-text">menu,</span>
          <br />
          as you like it.
        </h1>
        <p className="text-lg max-w-xl mx-auto mt-9 text-white/75 font-light leading-relaxed">
          Twelve signature cocktails, a Thai-rooted kitchen, and a wine list chosen
          for altitude. Every plate is paired with a view.
        </p>
        <div className="flex gap-3 justify-center mt-10 flex-wrap">
          {[
            { label: "Cocktails", href: "#cocktails", active: true },
            { label: "Kitchen", href: "#kitchen", active: false },
            { label: "Wine", href: "#wine", active: false },
            { label: "Sweets", href: "#sweets", active: false },
          ].map((t) => (
            <a
              key={t.label}
              href={t.href}
              className={`px-5 py-[10px] rounded-full text-[12px] tracking-[0.2em] uppercase font-medium border transition ${
                t.active
                  ? "bg-twist-yellow/10 border-twist-yellow/60 text-twist-yellow"
                  : "bg-white/[0.03] border-white/15 text-white/85 hover:border-white/30"
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>
      </section>

      {/* COCKTAILS */}
      <section id="cocktails" className="relative z-[2] py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-12">
            <div>
              <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-pink mb-5">
                ( 01 ) — COCKTAILS
              </div>
              <h2 className="tw-serif text-5xl lg:text-7xl leading-[0.95] font-normal">
                Signature <span className="italic tw-gradient-text">pours.</span>
              </h2>
            </div>
            <p className="text-white/75 max-w-md lg:justify-self-end">
              Our mixologists work in seasons — each list evolves with the
              island&apos;s botanicals. What follows is spring 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COCKTAILS.map((c) => (
              <article
                key={c.n}
                className="tw-card group hover:-translate-y-1 transition"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between mb-3">
                    <span className="tw-mono text-[10px] tracking-[0.25em] text-twist-yellow">
                      {c.n} · {c.tag}
                    </span>
                    <span className="tw-mono text-[11px] opacity-70">
                      ฿{c.price}
                    </span>
                  </div>
                  <h3 className="tw-serif text-2xl font-medium leading-tight mb-2">
                    {c.name}
                  </h3>
                  <p className="tw-mono text-[11px] opacity-55 tracking-wider">
                    {c.notes}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TWISTED PERANAKAN — SIGNATURES */}
      <section id="kitchen" className="relative z-[2] py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="border border-white/10 rounded-3xl overflow-hidden"
            style={{
              background: `
                radial-gradient(700px 500px at 90% 10%, rgba(253,224,71,0.18), transparent 60%),
                radial-gradient(800px 600px at 10% 95%, rgba(236,72,153,0.30), transparent 60%),
                radial-gradient(600px 500px at 50% 60%, rgba(139,92,246,0.18), transparent 65%),
                linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))`,
            }}
          >
            <div className="grid lg:grid-cols-[1fr_1.4fr]">
              {/* Header column */}
              <div className="p-8 lg:p-12 lg:border-r border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-pink mb-5">
                    ( 02 ) — THE KITCHEN
                  </div>
                  <h2 className="tw-serif text-5xl lg:text-7xl leading-[0.92] font-normal">
                    Twisted <span className="italic tw-gradient-text">Peranakan.</span>
                  </h2>
                  <p className="text-base mt-6 text-white/80 leading-relaxed max-w-md">
                    Our must-try signature dishes, inspired by the renowned flavours
                    of Phuket&apos;s cuisine — wok, curry, smoke, and spice, plated
                    with the rest of the world looking on.
                  </p>
                </div>
                <div className="mt-10 lg:mt-12 flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-twist-yellow" aria-hidden />
                  <div className="tw-mono text-[10px] tracking-[0.25em] uppercase text-white/55">
                    Chef&apos;s Picks marked below
                  </div>
                </div>
              </div>

              {/* Items column */}
              <div className="p-6 lg:p-10">
                {PERANAKAN_SIGNATURES.items.map((it) => (
                  <div
                    key={it.name}
                    className="grid grid-cols-[1fr_auto] gap-5 py-4 border-b border-white/[0.08] last:border-b-0"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="tw-serif text-lg lg:text-xl font-medium leading-snug">
                          {it.name}
                        </div>
                        {it.recommended && (
                          <span
                            className="tw-mono text-[9px] tracking-[0.2em] uppercase font-semibold px-2 py-[3px] rounded-full bg-twist-yellow/15 text-twist-yellow border border-twist-yellow/40 flex items-center gap-1"
                            title="Chef's pick"
                          >
                            <Sparkles className="h-[10px] w-[10px]" aria-hidden />
                            Pick
                          </span>
                        )}
                      </div>
                      <div className="tw-mono text-[11px] opacity-55 tracking-[0.05em]">
                        {it.notes}
                      </div>
                    </div>
                    <div className="tw-serif text-lg lg:text-xl text-twist-yellow self-center italic">
                      ฿ {it.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE FULL CARTE */}
      <section className="relative z-[2] py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-12">
            <div>
              <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-cyan mb-5">
                ( 03 ) — À LA CARTE
              </div>
              <h2 className="tw-serif text-5xl lg:text-7xl leading-[0.95] font-normal">
                The full <span className="italic tw-gradient-text">carte.</span>
              </h2>
            </div>
            <p className="text-white/75 max-w-md lg:justify-self-end">
              Appetizers, soups, mains, pasta, sandwiches, desserts, and the snacks
              that quietly steal the show. Vegetarian and dietary requests welcomed.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-14">
            {KITCHEN.map((g) => (
              <div key={g.section}>
                <div className="flex items-baseline gap-5 mb-5 border-b border-twist-yellow/25 pb-4">
                  <div className="tw-serif text-3xl lg:text-4xl italic font-normal">
                    {g.section}
                  </div>
                  <div className="tw-mono text-[10px] tracking-[0.3em] opacity-50">
                    — ({g.items.length} {g.items.length === 1 ? "DISH" : "DISHES"})
                  </div>
                </div>
                {g.items.map((it) => (
                  <div
                    key={it.name}
                    className="grid grid-cols-[1fr_auto] gap-5 py-4 border-b border-white/[0.06]"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <div className="tw-serif text-lg lg:text-xl font-medium leading-snug">
                          {it.name}
                        </div>
                        {it.recommended && (
                          <span
                            className="tw-mono text-[9px] tracking-[0.2em] uppercase font-semibold px-2 py-[3px] rounded-full bg-twist-yellow/15 text-twist-yellow border border-twist-yellow/40 flex items-center gap-1"
                            title="Chef's pick"
                          >
                            <Sparkles className="h-[10px] w-[10px]" aria-hidden />
                            Pick
                          </span>
                        )}
                      </div>
                      <div className="tw-mono text-[11px] opacity-55 tracking-[0.05em]">
                        {it.notes}
                      </div>
                    </div>
                    <div className="tw-serif text-lg lg:text-xl text-twist-yellow self-center italic whitespace-nowrap">
                      ฿ {it.price}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Steamed rice + legal footnote */}
          <div className="mt-14 grid lg:grid-cols-[1fr_auto] gap-6 items-center border border-white/10 rounded-2xl p-6 lg:p-8 bg-white/[0.02]">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
              <div className="tw-serif text-2xl font-medium">
                {MENU_FOOTNOTES.rice.name}
              </div>
              <div className="tw-mono text-[11px] opacity-55 tracking-[0.05em]">
                {MENU_FOOTNOTES.rice.note}
              </div>
            </div>
            <div className="tw-serif text-2xl text-twist-yellow italic whitespace-nowrap">
              ฿ {MENU_FOOTNOTES.rice.priceLabel}
            </div>
          </div>

          <p className="tw-mono text-[10px] tracking-[0.18em] uppercase opacity-50 mt-6 text-center max-w-3xl mx-auto leading-relaxed">
            {MENU_FOOTNOTES.legal} · {MENU_FOOTNOTES.version}
          </p>
        </div>
      </section>

      {/* TASTING MENU CTA */}
      <section className="relative z-[2] py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="border border-white/10 rounded-3xl p-10 lg:p-14 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center"
            style={{
              background: `
                radial-gradient(600px 400px at 85% 20%, rgba(253,224,71,0.2), transparent 60%),
                radial-gradient(700px 500px at 15% 90%, rgba(139,92,246,0.35), transparent 60%)`,
            }}
          >
            <div>
              <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-yellow mb-5">
                ◉ SIX-COURSE TASTING
              </div>
              <h2 className="tw-serif text-5xl lg:text-7xl leading-[0.95] font-normal">
                Let the <span className="italic tw-gradient-text">kitchen</span> decide.
              </h2>
              <p className="text-base mt-5 text-white/80 max-w-lg leading-relaxed">
                A six-course chef&apos;s journey, paired optionally with wine or
                cocktails. Served nightly by reservation. Allow two hours, end the
                evening slowly.
              </p>
            </div>
            <div className="lg:text-right">
              <div className="tw-serif text-6xl lg:text-7xl font-medium text-twist-yellow leading-none">
                ฿2,400
              </div>
              <div className="tw-mono text-[11px] opacity-60 tracking-[0.15em] mt-2">
                PP · +฿1,200 WINE PAIRING
              </div>
              <Link
                href="/reserve"
                className="mt-6 tw-btn-pill tw-btn-primary inline-flex"
              >
                Reserve tasting →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
