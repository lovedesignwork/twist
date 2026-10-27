export type EventCategory = "music" | "dining" | "private" | "lunar";

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  tag: string;
  date: string;          // ISO
  doors: string;         // "19:00"
  time_label: string;    // "19:00 — 23:00"
  price_thb: number;
  is_featured: boolean;
  image_url: string | null;
  description: string | null;
}

export interface BlogImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  generated: boolean;
}

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  seo_title: string;
  excerpt: string;
  meta_description: string;
  category: string;
  cover_url: string;
  body_md: string;
  images: BlogImage[];
  related_slugs: string[];
  target_keyword: string;
  status: 'draft' | 'published' | 'archived';
  // Only used by the local seed. Never rendered or serialized to a client.
  published_at?: string;
  scheduled_for?: string | null;
  is_featured?: boolean;
  read_minutes?: number;
}

export interface Reservation {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  party_size: number;
  date: string;
  time: string;
  occasion: string | null;
  notes: string | null;
  created_at?: string;
}
