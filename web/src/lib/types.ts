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

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;      // DISPATCH | KITCHEN | BAR | CULTURE | FEATURE | REVIEW
  read_minutes: number;
  published_at: string;  // ISO
  cover_url: string | null;
  body_md: string | null;
  is_featured: boolean;
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
