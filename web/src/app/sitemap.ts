import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  const posts=await getBlogPosts();
  return ['', '/menu', '/gallery', '/events', '/contact', '/reserve', '/blog', ...posts.map(p=>`/blog/${p.slug}`)].map(path=>({url:`${SITE.url}${path}`}));
}
