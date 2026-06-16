import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AuroraBackdrop } from "@/components/aurora-backdrop";
import { AuroraNav } from "@/components/aurora-nav";
import { AuroraFooter } from "@/components/aurora-footer";
import { getPostBySlug, getAllPostSlugs, getBlogPosts } from "@/lib/queries";
import { SITE } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = `${SITE.url}/blog/${post.slug}`;
  const imageUrl = post.cover_url
    ? `${SITE.url}${post.cover_url}`
    : `${SITE.url}/og-image.jpg`;

  return {
    title: `${post.title} | TWIST Phuket Blog`,
    description: post.excerpt,
    keywords: [
      "TWIST Phuket",
      "rooftop bar Phuket",
      "Phuket Old Town",
      "rooftop restaurant",
      "Phuket nightlife",
      post.category.toLowerCase(),
      ...post.title.toLowerCase().split(" ").filter((w) => w.length > 3),
    ],
    authors: [{ name: "TWIST Phuket" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "TWIST Phuket",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.published_at,
      authors: ["TWIST Phuket"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function generateArticleSchema(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_url ? `${SITE.url}${post.cover_url}` : undefined,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      "@type": "Organization",
      name: "TWIST Phuket",
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: "TWIST Phuket",
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/TWIST-LOGO-White-PNG.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    wordCount: post.body_md ? post.body_md.split(/\s+/).length : post.read_minutes * 200,
  };
}

function generateBreadcrumbSchema(post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: `${SITE.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE.url}/blog/${post.slug}`,
      },
    ],
  };
}

function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="tw-serif text-3xl lg:text-4xl font-medium mt-12 mb-6"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="tw-serif text-2xl lg:text-3xl font-medium mt-10 mb-5"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("![")) {
      const match = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [, alt, src] = match;
        elements.push(
          <figure key={i} className="my-10">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            {alt && (
              <figcaption className="tw-mono text-[11px] text-center mt-4 opacity-60 tracking-[0.1em]">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      }
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-2 border-twist-yellow/50 pl-6 my-8 text-xl italic text-white/80"
        >
          {line.slice(2)}
        </blockquote>
      );
    } else if (line.startsWith("---")) {
      elements.push(
        <hr key={i} className="my-12 border-white/10" />
      );
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      i--;
      elements.push(
        <ul key={i} className="my-6 space-y-3">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-white/80">
              <span className="text-twist-yellow mt-1">◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    } else if (line.trim() === "") {
      // Skip empty lines
    } else {
      const formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
      elements.push(
        <p
          key={i}
          className="text-lg text-white/80 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    }
    i++;
  }

  return <>{elements}</>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const faqs = post.body_md?.includes("**Q:")
    ? post.body_md
        .split("**Q:")
        .slice(1)
        .map((section) => {
          const [question, ...rest] = section.split("**\n");
          const answer = rest.join("\n").split("\n\n")[0];
          return { question: question.trim(), answer: answer.trim() };
        })
    : [];

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema(post);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="relative bg-twist-ink min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <AuroraBackdrop intensity={0.4} variant="warm" />
      <AuroraNav />

      <article className="relative z-[2]">
        {/* Hero */}
        <header className="pt-32 lg:pt-40 pb-12 px-6 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="tw-mono text-[11px] tracking-[0.2em] opacity-60 mb-8">
              <Link href="/" className="hover:text-twist-yellow transition">
                Home
              </Link>
              <span className="mx-3">→</span>
              <Link href="/blog" className="hover:text-twist-yellow transition">
                Journal
              </Link>
              <span className="mx-3">→</span>
              <span className="text-twist-yellow">{post.category}</span>
            </nav>

            <div className="tw-mono text-[11px] tracking-[0.3em] text-twist-pink mb-6">
              ◉ {post.category} ·{" "}
              {new Date(post.published_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>

            <h1 className="tw-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-medium mb-8">
              {post.title}
            </h1>

            <p className="text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
              {post.excerpt}
            </p>

            <div className="tw-mono text-[11px] tracking-[0.2em] opacity-50 mt-8">
              {post.read_minutes} MIN READ
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_url && (
          <div className="px-6 lg:px-16 mb-16">
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src={post.cover_url}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 lg:px-16 pb-20">
          <div className="max-w-3xl mx-auto">
            {post.body_md ? (
              <MarkdownRenderer content={post.body_md} />
            ) : (
              <p className="text-lg text-white/60 italic text-center py-20">
                Full article coming soon...
              </p>
            )}

            {/* Author / Share */}
            <div className="mt-16 pt-10 border-t border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <div className="tw-mono text-[10px] tracking-[0.2em] opacity-50 mb-2">
                    WRITTEN BY
                  </div>
                  <div className="font-medium">TWIST Editorial</div>
                </div>
                <div className="flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      `${SITE.url}/blog/${post.slug}`
                    )}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-btn-pill tw-btn-ghost text-[11px] py-2 px-4"
                  >
                    Share on X →
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `${SITE.url}/blog/${post.slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-btn-pill tw-btn-ghost text-[11px] py-2 px-4"
                  >
                    Share on Facebook →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="relative z-[2] py-16 px-6 lg:px-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="tw-serif text-3xl lg:text-4xl font-medium mb-10 text-center">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
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
                      <div className="tw-mono text-[10px] tracking-[0.25em] text-twist-yellow mb-3">
                        ◆ {p.category}
                      </div>
                      <h3 className="tw-serif text-xl font-medium leading-snug">
                        {p.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <AuroraFooter />
    </div>
  );
}
