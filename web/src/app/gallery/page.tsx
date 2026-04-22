import Image from "next/image";
import Link from "next/link";
import { AuroraBackdrop } from "@/components/aurora-backdrop";
import { AuroraNav } from "@/components/aurora-nav";
import { AuroraFooter } from "@/components/aurora-footer";
import { IMG } from "@/lib/images";

export const metadata = {
  title: "Gallery — Evenings Collected",
  description:
    "Seven years of rooftop nights, plated moments, and a skyline that never shows the same face twice.",
};

const TILES = [
  { src: IMG.rooftopBar,    label: "ROOFTOP · SUNSET",   tall: true,  wide: false },
  { src: IMG.barCounter,    label: "BAR · COUNTER",      tall: false, wide: false },
  { src: IMG.blackCod,      label: "DISH · BLACK COD",   tall: false, wide: false },
  { src: IMG.cityNight,     label: "CITY LIGHTS",        tall: true,  wide: false },
  { src: IMG.candlelitTable,label: "GUEST · CANDLELIT",  tall: false, wide: false },
  { src: IMG.cocktail2,     label: "COCKTAIL · DETAIL",  tall: false, wide: false },
  { src: IMG.heroPanorama,  label: "SKYLINE · PANORAMA", tall: false, wide: true  },
  { src: IMG.jazzNight,     label: "JAZZ SET · STAGE",   tall: false, wide: false },
  { src: IMG.loungeInterior,label: "INTERIOR · LOUNGE",  tall: false, wide: false },
  { src: IMG.weddingFeature,label: "EVENT · CEREMONY",   tall: true,  wide: false },
  { src: IMG.platingDetail, label: "PLATING",            tall: false, wide: false },
  { src: IMG.bartenderPour, label: "BARTENDER · POUR",   tall: false, wide: false },
  { src: IMG.heroSkyline,   label: "SUNSET · OLD TOWN",  tall: false, wide: true  },
  { src: IMG.cocktail5,     label: "DETAIL · GARNISH",   tall: false, wide: false },
  { src: IMG.diningRoom,    label: "COUPLE · DINNER",    tall: false, wide: false },
  { src: IMG.fullMoon,      label: "FULL MOON",          tall: true,  wide: false },
] as const;

const CATEGORIES = ["All", "The Rooftop", "The Bar", "The Kitchen", "Events", "Skyline"];

export default function GalleryPage() {
  return (
    <div className="relative bg-twist-ink min-h-screen overflow-hidden">
      <AuroraBackdrop intensity={0.5} variant="cool" />
      <AuroraNav />

      {/* HERO */}
      <section className="relative z-[2] pt-32 lg:pt-44 pb-12 px-6 lg:px-16 text-center">
        <div className="tw-mono text-[11px] tracking-[0.45em] opacity-70 mb-5">
          ( THE ARCHIVE · 2019 → 2026 )
        </div>
        <h1 className="tw-serif text-[60px] sm:text-[96px] lg:text-[148px] leading-[0.92] font-normal tracking-[-0.02em]">
          Evenings, <span className="italic tw-gradient-text">collected.</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mt-8 text-white/75 font-light leading-relaxed">
          Seven years of rooftop nights, plated moments, and a skyline that never
          shows the same face twice. A rolling archive, updated monthly.
        </p>

        <div className="flex gap-3 justify-center mt-10 flex-wrap">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              className={`px-5 py-[10px] rounded-full text-[12px] tracking-[0.15em] uppercase font-medium border transition ${
                i === 0
                  ? "bg-twist-yellow/12 border-twist-yellow/60 text-twist-yellow"
                  : "bg-white/[0.03] border-white/15 text-white/85 hover:border-white/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED HERO TILE */}
      <section className="relative z-[2] py-6 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/10">
            <div className="relative aspect-[16/8]">
              <Image
                src={IMG.goldenHour}
                alt="Featured: golden hour"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-twist-ink via-twist-ink/30 to-transparent" />
            </div>
            <div className="absolute left-6 lg:left-12 bottom-6 lg:bottom-10 max-w-2xl">
              <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-yellow mb-3">
                ◉ THIS WEEK · FEATURED
              </div>
              <h2 className="tw-serif text-3xl lg:text-5xl leading-[0.95]">
                The <span className="italic">golden hour,</span> in April.
              </h2>
              <div className="tw-mono text-[11px] opacity-70 tracking-[0.15em] mt-3">
                18:42 · 22 APR 2026 · N. SAE-TANG
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="relative z-[2] py-12 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4 auto-rows-[180px] lg:auto-rows-[240px]">
            {TILES.map((t, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden border border-white/10 group ${
                  t.tall ? "row-span-2" : ""
                } ${t.wide ? "col-span-2" : ""}`}
              >
                <Image
                  src={t.src}
                  alt={t.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute left-3 bottom-3 tw-mono text-[10px] tracking-[0.2em] text-white/0 group-hover:text-white/85 transition">
                  {t.label}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <button className="tw-btn-pill tw-btn-ghost">
              Load more moments ↓
            </button>
          </div>
        </div>
      </section>

      {/* INSTAGRAM CTA */}
      <section className="relative z-[2] py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="border border-white/10 rounded-3xl p-10 lg:p-12 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center"
            style={{
              background:
                "linear-gradient(92deg, rgba(253,224,71,0.06), rgba(236,72,153,0.08) 50%, rgba(139,92,246,0.08))",
            }}
          >
            <div>
              <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-pink mb-3">
                #TWISTPHUKET
              </div>
              <h2 className="tw-serif text-4xl lg:text-5xl leading-[1.05] font-normal">
                Tag us. <span className="italic">Your</span> night belongs here too.
              </h2>
            </div>
            <Link
              href="https://instagram.com/twistphuket"
              target="_blank"
              rel="noreferrer"
              className="tw-btn-pill tw-btn-light"
            >
              Follow on Instagram →
            </Link>
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
