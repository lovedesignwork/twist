import Image from "next/image";
import Link from "next/link";
import { AuroraBackdrop } from "@/components/aurora-backdrop";
import { AuroraNav } from "@/components/aurora-nav";
import { AuroraFooter } from "@/components/aurora-footer";
import { NewsletterForm } from "@/components/newsletter-form";
import { getBlogPosts, getFeaturedPost } from "@/lib/queries";

export const metadata = {
  title: "Journal — Dispatches from Above",
  description:
    "Notes from the pass, the bar, and the 19th floor. Stories, recipes, and the occasional quiet evening we had to tell you about.",
};

const FILTERS = ["All", "Dispatch", "Kitchen", "Bar", "Culture", "Feature"];

export default async function BlogPage() {
  const featured = await getFeaturedPost();
  const all = await getBlogPosts();
  const list = all.filter((p) => p.id !== featured?.id);

  return (
    <div className="relative bg-twist-ink min-h-screen overflow-hidden">
      <AuroraBackdrop intensity={0.5} variant="warm" />
      <AuroraNav />

      {/* HERO */}
      <section className="relative z-[2] pt-32 lg:pt-44 pb-12 px-6 lg:px-16 text-center">
        <div className="tw-mono text-[11px] tracking-[0.45em] opacity-70 mb-5">
          ( THE JOURNAL )
        </div>
        <h1 className="tw-serif text-[60px] sm:text-[96px] lg:text-[148px] leading-[0.92] font-normal tracking-[-0.02em]">
          Dispatches from <span className="italic tw-gradient-text">above.</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mt-9 text-white/75 font-light leading-relaxed">
          Notes from the pass, the bar, and the 19th floor. Stories, recipes,
          guest writers, and the occasional quiet evening we had to tell you about.
        </p>

        <div className="flex gap-2 justify-center mt-10 flex-wrap">
          {FILTERS.map((c, i) => (
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

      {/* FEATURED */}
      {featured && (
        <section className="relative z-[2] py-10 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Link href={`/blog/${featured.slug}`} className="block group">
              <article
                className="grid lg:grid-cols-[1.3fr_1fr] border border-white/10 rounded-3xl overflow-hidden transition hover:border-white/20"
                style={{
                  background:
                    "linear-gradient(92deg, rgba(255,255,255,0), rgba(253,224,71,0.04))",
                }}
              >
                <div className="relative min-h-[420px] lg:min-h-[560px] overflow-hidden">
                  {featured.cover_url && (
                    <Image
                      src={featured.cover_url}
                      alt={featured.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-pink mb-5">
                    ◉ FEATURED · {featured.category} ·{" "}
                    {new Date(featured.published_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                  <h2 className="tw-serif text-4xl lg:text-5xl leading-tight font-medium">
                    {featured.title}
                  </h2>
                  <p className="text-base mt-5 text-white/75 leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="tw-mono text-[11px] tracking-[0.2em] opacity-60 mt-7">
                    {featured.read_minutes} MIN READ
                  </div>
                  <span className="mt-7 tw-btn-pill tw-btn-ghost self-start">
                    Continue reading →
                  </span>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* ARTICLE GRID */}
      <section className="relative z-[2] py-12 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="tw-card group hover:-translate-y-1 transition block"
              >
                <article>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {p.cover_url && (
                      <Image
                        src={p.cover_url}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <span className="tw-mono text-[10px] tracking-[0.25em] text-twist-yellow">
                        ◆ {p.category}
                      </span>
                      <span className="tw-mono text-[10px] opacity-55">
                        {new Date(p.published_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <h3 className="tw-serif text-xl lg:text-2xl font-medium leading-snug mb-4 text-balance">
                      {p.title}
                    </h3>
                    <div className="flex justify-between items-center text-[11px] opacity-55 tracking-[0.1em] tw-mono">
                      <span>{p.read_minutes} MIN READ</span>
                      <span>READ →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14">
            <button className="tw-btn-pill tw-btn-ghost">Older entries ↓</button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative z-[2] py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-3xl p-10 lg:p-14 border border-white/10 text-center"
            style={{
              background: `
                radial-gradient(700px 400px at 20% 20%, rgba(139,92,246,0.3), transparent 60%),
                radial-gradient(600px 400px at 80% 80%, rgba(253,224,71,0.2), transparent 60%)`,
            }}
          >
            <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-cyan mb-4">
              ( THE NEWSLETTER )
            </div>
            <h2 className="tw-serif text-4xl lg:text-5xl leading-[1.05] font-normal">
              One <span className="italic tw-gradient-text">dispatch</span>, every full moon.
            </h2>
            <p className="text-base text-white/75 max-w-md mx-auto mt-5 leading-relaxed">
              New menus, guest nights, and our writer&apos;s quiet favourites.
              Fifteen-hundred subscribers, no spam, unsubscribe anytime.
            </p>
            <div className="mt-9 relative">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
