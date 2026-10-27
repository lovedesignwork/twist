import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AuroraNav } from '@/components/aurora-nav';
import { AuroraFooter } from '@/components/aurora-footer';
import { BlogCard } from '@/components/blog-card';
import { ArticleContent, getHeadings } from '@/components/article-content';
import { getBlogPosts, getPostBySlug, absoluteImage } from '@/lib/blog';
import { SITE } from '@/lib/site';

export const dynamic='force-dynamic';
interface Props { params:Promise<{slug:string}> }
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const post=await getPostBySlug((await params).slug);if(!post)return {title:'Article not found',robots:{index:false,follow:false}};
  const cover=post.images.find(i=>i.src===post.cover_url)!;
  const title=post.seo_title; const url=`${SITE.url}/blog/${post.slug}`;
  return {title,description:post.meta_description,alternates:{canonical:url},
    openGraph:{title,description:post.meta_description,url,type:'article',siteName:'TWIST Phuket',images:[{url:absoluteImage(cover.src),width:cover.width,height:cover.height,alt:cover.alt}]},
    twitter:{card:'summary_large_image',title,description:post.meta_description,images:[absoluteImage(cover.src)]},
  };
}
export default async function BlogPostPage({params}:Props) {
  const post=await getPostBySlug((await params).slug);if(!post)notFound();
  const posts=await getBlogPosts();const related=post.related_slugs.map(s=>posts.find(p=>p.slug===s)).filter((p):p is typeof post=>Boolean(p)).slice(0,3);
  const cover=post.images.find(i=>i.src===post.cover_url)!; const headings=getHeadings(post.body_md);
  const url=`${SITE.url}/blog/${post.slug}`;
  const schemas=[{'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.meta_description,image:post.images.map(i=>absoluteImage(i.src)),mainEntityOfPage:url,articleSection:post.category,inLanguage:'en',author:{'@type':'Organization',name:'TWIST Editorial',url:SITE.url},publisher:{'@type':'Organization',name:'TWIST Phuket',url:SITE.url}},
    {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Home',item:SITE.url},{name:'Blog',item:`${SITE.url}/blog`},{name:post.title,item:url}].map((p,i)=>({'@type':'ListItem',position:i+1,...p}))}];
  return <div className="blog-shell min-h-screen">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schemas).replace(/</g,'\\u003c')}} />
    <AuroraNav />
    <main id="main-content">
      <article>
        <header className="pt-32 lg:pt-40 px-5 sm:px-8 lg:px-16 max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60 mb-9 flex gap-3"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Blog</Link><span aria-hidden="true">/</span><span>{post.category}</span></nav>
          <p className="blog-eyebrow">{post.category} · TWIST EDITORIAL</p>
          <h1 className="tw-serif text-[38px] sm:text-5xl lg:text-[66px] leading-[1.12] max-w-5xl mt-5 text-balance">{post.title}</h1>
          <p className="text-lg sm:text-xl text-white/70 leading-8 max-w-3xl mt-7">{post.excerpt}</p>
          <figure className="mt-10 lg:mt-12">
            <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} priority sizes="(max-width: 1279px) 100vw, 1152px" className="w-full h-auto max-h-[680px] object-cover rounded-2xl" />
            <figcaption className="text-xs text-white/55 mt-3 leading-6">{cover.caption}</figcaption>
          </figure>
        </header>
        <div className="max-w-[800px] mx-auto px-5 sm:px-8 mt-10 pb-16">
          <details className="article-toc mb-10">
            <summary>In this article <span aria-hidden="true">＋</span></summary>
            <nav aria-label="Table of contents"><ol>{headings.map(h=><li key={h.id}><a href={`#${h.id}`}>{h.title}</a></li>)}</ol></nav>
          </details>
          <ArticleContent content={post.body_md} images={post.images}/>
          <div className="article-cta mt-12 p-7 sm:p-9 rounded-2xl">
            <p className="blog-eyebrow">MAKE AN EVENING OF IT</p>
            <h2 className="tw-serif text-3xl mt-4">Your table above Old Town.</h2>
            <p className="text-white/70 leading-7 mt-4">Bring your plans, your appetite and a little time to enjoy the view.</p>
            <Link href="/reserve" className="tw-btn-pill tw-btn-primary mt-6">Request a table ↗</Link>
          </div>
        </div>
      </article>
      {related.length>0 && <section className="border-t border-white/10 px-5 sm:px-8 lg:px-16 py-16 max-w-7xl mx-auto" aria-labelledby="related-heading">
        <p className="blog-eyebrow">A LITTLE MORE INSPIRATION</p><h2 id="related-heading" className="tw-serif text-4xl mt-4 mb-9">For the rest of your evening.</h2>
        <div className="grid md:grid-cols-3 gap-8">{related.map(p=><BlogCard key={p.slug} post={p}/>)}</div>
      </section>}
    </main>
    <AuroraFooter hideYear />
  </div>;
}
