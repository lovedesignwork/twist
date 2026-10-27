import type { Metadata } from 'next';
import { AuroraNav } from '@/components/aurora-nav';
import { AuroraFooter } from '@/components/aurora-footer';
import { BlogCard } from '@/components/blog-card';
import { getBlogPosts } from '@/lib/blog';

export const dynamic='force-dynamic';
export const metadata:Metadata={
  title:'Phuket Old Town Blog — Evenings, Dining & Rooftop Guides',
  description:'Plan your Phuket evening with TWIST: sunset tips, Old Town walks, cocktails, romantic dinners and celebrations above the city.',
  alternates:{canonical:'https://twistphuket.com/blog'},
  openGraph:{title:'The TWIST Blog — Good Evenings Start Here',description:'Practical guides to Phuket Old Town, rooftop dining and drinks.',url:'https://twistphuket.com/blog',type:'website'},
};
export default async function BlogPage() {
  const posts=await getBlogPosts();
  return <div className="blog-shell min-h-screen">
    <AuroraNav />
    <main id="main-content" className="px-5 sm:px-8 lg:px-16 pt-36 lg:pt-44 pb-24">
      <header className="max-w-7xl mx-auto mb-14 lg:mb-20">
        <p className="blog-eyebrow">THE TWIST BLOG · PHUKET OLD TOWN</p>
        <h1 className="tw-serif text-5xl sm:text-6xl lg:text-8xl leading-[1.04] mt-6 max-w-4xl">Good evenings<br/><span className="italic tw-gradient-text">start here.</span></h1>
        <p className="text-white/70 text-lg leading-8 max-w-xl mt-7">A little local context. A better dinner plan. Stories to help you find your own kind of night in Phuket.</p>
      </header>
      <section aria-label="All published articles" className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-14">
        {posts.map((post,i)=><BlogCard key={post.slug} post={post} priority={i<2} />)}
      </section>
      {posts.length===0 && <p className="max-w-7xl mx-auto text-white/70">New stories are on their way. Explore the menu while we prepare them.</p>}
    </main>
    <AuroraFooter hideYear />
  </div>;
}
