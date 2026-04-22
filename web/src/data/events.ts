import { IMG } from "@/lib/images";
import type { EventItem } from "@/lib/types";

/**
 * Default seed events. These ship with the site and are also used as a
 * fallback if Supabase is not configured.
 */
export const STATIC_EVENTS: EventItem[] = [
  {
    id: "evt-jazz-9",
    slug: "jazz-night-vol-9",
    title: "Jazz Night is Back — Vol. 9",
    subtitle: "Live jazz band · Elvis tribute · Buffet dinner",
    category: "music",
    tag: "SIGNATURE",
    date: "2026-03-27T19:00:00+07:00",
    doors: "19:00",
    time_label: "19:00 — 23:00",
    price_thb: 1890,
    is_featured: true,
    image_url: IMG.jazzNight,
    description:
      "Phuket's most soulful comeback — 19 floors up. Live jazz band, a full Elvis tribute, dinner buffet, and a skyline that holds its breath.",
  },
  {
    id: "evt-sunset-numa",
    slug: "sunset-sessions-dj-numa",
    title: "Sunset Sessions — DJ Numa",
    subtitle: "Deep house · Rooftop set · Tapas menu",
    category: "music",
    tag: "MUSIC",
    date: "2026-04-12T18:00:00+07:00",
    doors: "18:00",
    time_label: "18:00 — 01:00",
    price_thb: 800,
    is_featured: false,
    image_url: IMG.djSet,
    description: null,
  },
  {
    id: "evt-chefs-table-spring",
    slug: "chefs-table-spring-tasting",
    title: "Chef's Table — Spring Tasting",
    subtitle: "Six courses, paired · Chef Nat at the pass",
    category: "dining",
    tag: "DINING",
    date: "2026-04-24T19:30:00+07:00",
    doors: "19:30",
    time_label: "19:30 seating",
    price_thb: 2400,
    is_featured: false,
    image_url: IMG.privateDining,
    description: null,
  },
  {
    id: "evt-full-moon-may",
    slug: "full-moon-rooftop-may",
    title: "Full Moon Rooftop",
    subtitle: "Live acoustic · Signature lunar menu",
    category: "lunar",
    tag: "LUNAR",
    date: "2026-05-08T19:00:00+07:00",
    doors: "19:00",
    time_label: "19:00 — LATE",
    price_thb: 950,
    is_featured: false,
    image_url: IMG.fullMoon,
    description: null,
  },
];
