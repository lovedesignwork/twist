import 'server-only';
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { STATIC_POSTS } from '@/data/posts';
import type { BlogPost } from '@/lib/types';

const columns = 'id,slug,title,seo_title,excerpt,meta_description,category,featured_image,content,images,related_slugs,primary_keyword,status';

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const url = process.env.BLOG_SUPABASE_URL;
  const key = process.env.BLOG_SUPABASE_SERVICE_ROLE_KEY;
  if (!url && !key && process.env.NODE_ENV !== 'production') {
    return STATIC_POSTS.filter(p => p.status === 'published' && Date.parse(p.published_at ?? '') <= Date.now())
      .sort((a,b) => (b.published_at ?? '').localeCompare(a.published_at ?? '') || a.slug.localeCompare(b.slug))
      .map(({ published_at: _private, ...p }) => p);
  }
  if (!url || !key) throw new Error('Blog CMS configuration is missing');
  const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) } });
  const now = new Date().toISOString();
  const { data, error } = await sb.from('twist_blog_posts').select(columns)
    .eq('status', 'published').lte('published_at', now)
    .or(`scheduled_for.is.null,scheduled_for.lte.${now}`)
    .order('published_at', { ascending: false }).order('slug');
  // Never fall back to seeded articles after a CMS unpublish or an outage.
  if (error) throw new Error('Blog CMS is temporarily unavailable');
  return (data ?? []).map(p => ({
    id:p.id, slug:p.slug, title:p.title, seo_title:p.seo_title || p.title,
    excerpt:p.excerpt || '', meta_description:p.meta_description || p.excerpt || '',
    category:p.category || 'OLD TOWN', cover_url:p.featured_image,
    body_md:p.content, images:p.images ?? [], related_slugs:p.related_slugs ?? [],
    target_keyword:p.primary_keyword || '', status:'published',
  }));
});
export const getPostBySlug = cache(async (slug:string) => (await getBlogPosts()).find(p=>p.slug===slug) ?? null);
export async function getAllPostSlugs() { return (await getBlogPosts()).map(p=>p.slug); }
export async function getFeaturedPost() { return (await getBlogPosts())[0] ?? null; }
export function absoluteImage(src:string) { return new URL(src, 'https://twistphuket.com').href; }
