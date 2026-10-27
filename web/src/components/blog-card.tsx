import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';

export function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const cover = post.images.find(i => i.src === post.cover_url);
  return <article className="blog-card">
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
        <Image src={post.cover_url} alt={cover?.alt ?? post.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
      </div>
      <div className="pt-6">
        <p className="blog-eyebrow">{post.category}</p>
        <h3 className="tw-serif text-2xl lg:text-[28px] leading-tight mt-3 group-hover:text-twist-yellow transition-colors">{post.title}</h3>
        <p className="text-sm text-white/65 leading-7 mt-4">{post.excerpt}</p>
        <span className="inline-block mt-5 text-sm text-twist-yellow">Explore the story <span aria-hidden="true">↗</span></span>
      </div>
    </Link>
  </article>;
}
