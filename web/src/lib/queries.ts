import "server-only";
import { createClient } from "@/lib/supabase/server";
import { STATIC_EVENTS } from "@/data/events";
import { STATIC_POSTS } from "@/data/posts";
import type { BlogPost, EventItem } from "@/lib/types";

const supabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/** Get all upcoming events, ordered by date ascending. */
export async function getUpcomingEvents(): Promise<EventItem[]> {
  if (!supabaseConfigured()) return STATIC_EVENTS;
  try {
    const sb = await createClient();
    const { data, error } = await sb
      .from("events")
      .select("*")
      .gte("date", new Date().toISOString())
      .order("date", { ascending: true });
    if (error || !data || data.length === 0) return STATIC_EVENTS;
    return data as EventItem[];
  } catch {
    return STATIC_EVENTS;
  }
}

export async function getFeaturedEvent(): Promise<EventItem | null> {
  const all = await getUpcomingEvents();
  return all.find((e) => e.is_featured) ?? all[0] ?? null;
}

/** Get all published blog posts, newest first. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!supabaseConfigured()) return STATIC_POSTS;
  try {
    const sb = await createClient();
    const { data, error } = await sb
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false });
    if (error || !data || data.length === 0) return STATIC_POSTS;
    return data as BlogPost[];
  } catch {
    return STATIC_POSTS;
  }
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const all = await getBlogPosts();
  return all.find((p) => p.is_featured) ?? all[0] ?? null;
}
