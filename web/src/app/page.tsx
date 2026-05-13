import Image from "next/image";
import Link from "next/link";
import { AuroraBackdrop } from "@/components/aurora-backdrop";
import { AuroraNav } from "@/components/aurora-nav";
import { AuroraFooter } from "@/components/aurora-footer";
import { IMG } from "@/lib/images";
import { FAQS, SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="relative bg-twist-ink min-h-screen overflow-hidden">
      <AuroraBackdrop intensity={0.85} variant="default" />
      <AuroraNav />

      {/* HERO ----------------------------------------------------------- */}
      <section className="relative z-[2] pt-32 lg:pt-44 pb-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="tw-mono text-[11px] tracking-[0.45em] opacity-70 mb-5">
              ( 19TH FLOOR · ROYAL PHUKET CITY HOTEL )
            </div>
            <h1 className="tw-serif text-[60px] sm:text-[96px] lg:text-[148px] leading-[0.92] font-normal tracking-[-0.02em]">
              Sunsets,
              <br />
              <span className="italic tw-gradient-text">19 floors up.</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto mt-9 text-white/75 font-light leading-relaxed">
              Phuket Old Town&apos;s most iconic rooftop bar &amp; restaurant.
              International local-fusion cuisine, signature cocktails, and the best
              panoramic view in the city — every night, golden hour to last call.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-10">
              <Link href="/reserve" className="tw-btn-pill tw-btn-primary">
                Reserve a table →
              </Link>
              <Link
                href="/menu"
                className="tw-btn-pill tw-btn-ghost"
              >
                See the menu
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative mt-16 rounded-[28px] overflow-hidden border border-white/10">
            <div className="relative aspect-[16/8] lg:aspect-[16/7]">
              <Image
                src={IMG.heroSkyline}
                alt="Phuket sunset from the rooftop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-cover object-bottom"
              />
              {/* Black gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute left-6 lg:left-12 bottom-6 lg:bottom-10 right-6 text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.85),0_1px_4px_rgba(0,0,0,0.9)]">
                <div className="tw-mono text-[10px] tracking-[0.3em] text-twist-yellow mb-2">
                  ◉ TONIGHT · 18:42 SUNSET · 27.4°C · CLEAR
                </div>
                <div className="tw-serif text-2xl lg:text-4xl italic">
                  &ldquo;Come for golden sunsets. Stay for glittering city lights.&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              ["19F", "Floors above the city"],
              ["360°", "Panoramic skyline"],
              ["5 PM", "Doors open daily"],
              ["19—21", "Live music nightly"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="border border-white/10 rounded-2xl p-5 bg-white/[0.025]"
              >
                <div className="tw-serif text-3xl lg:text-4xl text-twist-yellow font-medium">
                  {k}
                </div>
                <div className="tw-mono text-[10px] tracking-[0.2em] uppercase opacity-60 mt-2">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WELCOME / INTRO ------------------------------------------------ */}
      <section className="relative z-[2] py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-pink mb-5">
              ( 01 ) — WELCOME
            </div>
            <h2 className="tw-serif text-5xl lg:text-7xl leading-[0.95] font-normal">
              The rooftop you&apos;ll
              <br />
              <span className="italic tw-gradient-text">remember.</span>
            </h2>
            <p className="text-base lg:text-lg mt-7 text-white/75 leading-relaxed font-light max-w-xl">
              TWIST sets the standard for rooftop dining in Phuket Old Town. Whether
              you&apos;re seeking a stylish sunset cocktail, a romantic rooftop dinner,
              or a place to unwind with live music — we built this floor for the
              evenings worth remembering.
            </p>
            <p className="text-base mt-5 text-white/65 leading-relaxed font-light max-w-xl">
              Savor a fusion of authentic Thai flavours and international classics,
              handcrafted cocktails by award-winning mixologists, and a sky-high
              atmosphere that turns ordinary plans into stories.
            </p>

            <div className="flex flex-wrap gap-6 mt-8">
              {[
                ["Spectacular view", "★"],
                ["Welcome lounge", "✦"],
                ["Private events", "◉"],
              ].map(([label, icon]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="tw-serif text-2xl text-twist-yellow italic">
                    {icon}
                  </span>
                  <span className="text-sm tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                <Image src={IMG.rooftopBar} alt="Rooftop bar" fill sizes="50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 mt-12">
                <Image src={IMG.cocktail1} alt="Signature cocktail" fill sizes="50vw" className="object-cover" />
              </div>
              <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 -mt-3">
                <Image src={IMG.diningRoom} alt="Dining room" fill sizes="100vw" className="object-cover" />
              </div>
            </div>
            {/* Glow accent */}
            <div className="absolute -top-12 -left-12 w-72 h-72 rounded-full bg-twist-yellow/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full bg-twist-purple/20 blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* TWO COLUMN: BAR + KITCHEN ------------------------------------- */}
      <section className="relative z-[2] py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* The Bar */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 group">
            <div className="relative aspect-[4/5] sm:aspect-[16/10]">
              <Image
                src={IMG.barCounter}
                alt="The bar at TWIST"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-twist-ink via-twist-ink/40 to-twist-ink/0" />
            </div>
            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
              <div className="tw-mono text-[10px] tracking-[0.3em] text-twist-pink mb-3">
                ( THE BAR ) — SIP, SAVOR
              </div>
              <h3 className="tw-serif text-4xl lg:text-5xl leading-[0.95]">
                Exclusive drinks, <span className="italic tw-gradient-text">crafted nightly.</span>
              </h3>
              <p className="text-sm mt-4 text-white/80 max-w-md">
                Our expert mixologists curate a unique menu of signature cocktails
                you won&apos;t find anywhere else in Phuket — inspired by local botanicals
                and classic blends, each drink is a work of art.
              </p>
              <a
                href="https://q.me-qr.com/0t2w52pz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 tw-btn-pill tw-btn-ghost inline-flex w-max"
              >
                Cocktail menu →
              </a>
            </div>
          </div>

          {/* The Kitchen */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 group">
            <div className="relative aspect-[4/5] sm:aspect-[16/10]">
              <Image
                src={IMG.blackCod}
                alt="A signature dish"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-twist-ink via-twist-ink/40 to-twist-ink/0" />
            </div>
            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
              <div className="tw-mono text-[10px] tracking-[0.3em] text-twist-cyan mb-3">
                ( THE KITCHEN ) — SAVOR LOCAL FLAVOURS
              </div>
              <h3 className="tw-serif text-4xl lg:text-5xl leading-[0.95]">
                A dining experience <span className="italic tw-gradient-text">above the city.</span>
              </h3>
              <p className="text-sm mt-4 text-white/80 max-w-md">
                A culinary journey blending authentic Thai flavours with international
                inspiration — crafted to impress, paired with a view that does the
                same.
              </p>
              <a
                href="https://q.me-qr.com/0t2w52pz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 tw-btn-pill tw-btn-ghost inline-flex w-max"
              >
                Drinks menu →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ------------------------------------------------------------ */}
      <section className="relative z-[2] py-24 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-cyan mb-5">
              ( FAQ ) — OFTEN ASKED
            </div>
            <h2 className="tw-serif text-5xl lg:text-6xl leading-[0.95]">
              Questions, <span className="italic tw-gradient-text">answered.</span>
            </h2>
            <p className="text-white/70 mt-5 max-w-sm">
              Everything from where to find us to whether the kids can come.
              Reach out for anything else — we usually reply within an hour.
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
                <p className="text-white/75 leading-relaxed mt-4 max-w-xl">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP ----------------------------------------------------- */}
      <section className="relative z-[2] py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-3xl p-10 lg:p-16 border border-white/10 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center"
            style={{
              background: `
                radial-gradient(700px 400px at 20% 20%, rgba(139,92,246,0.3), transparent 60%),
                radial-gradient(600px 400px at 80% 80%, rgba(253,224,71,0.2), transparent 60%)`,
            }}
          >
            <div>
              <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-yellow mb-5">
                ◉ TONIGHT, FROM 5 PM
              </div>
              <h2 className="tw-serif text-5xl lg:text-7xl leading-[0.92] font-normal">
                See you on the <span className="italic tw-gradient-text">19th floor.</span>
              </h2>
              <p className="text-white/75 mt-5 max-w-lg">
                {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}.
                Express elevator from the lobby — no need to dress for the wind.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href="/reserve"
                className="tw-btn-pill tw-btn-primary text-[13px] py-[18px] px-8"
              >
                Reserve your evening →
              </Link>
              <a href={`tel:${SITE.phoneTel}`} className="tw-btn-pill tw-btn-ghost">
                Or call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
