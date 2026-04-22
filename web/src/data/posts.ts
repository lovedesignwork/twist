import { IMG } from "@/lib/images";
import type { BlogPost } from "@/lib/types";

export const STATIC_POSTS: BlogPost[] = [
  {
    id: "post-wedding-clouds",
    slug: "say-i-do-above-the-clouds",
    title: "Say \"I Do\" Above the Clouds — TWIST as a Wedding Venue",
    excerpt:
      "Your dream wedding deserves a setting as extraordinary as your love story. A look at what it means to hold a ceremony at 78 metres up — first toast to last song.",
    category: "DISPATCH",
    read_minutes: 8,
    published_at: "2026-04-14",
    cover_url: IMG.weddingFeature,
    body_md: null,
    is_featured: true,
  },
  {
    id: "post-old-town-nightlife",
    slug: "elevate-your-senses",
    title:
      "Elevate Your Senses: TWIST — The Heartbeat of Phuket Old Town Nightlife",
    excerpt:
      "Phuket Old Town is a vibrant tapestry of history, culture, and modern flair, but nothing captures its essence quite like sipping a signature cocktail 19 floors up.",
    category: "DISPATCH",
    read_minutes: 6,
    published_at: "2026-08-22",
    cover_url: IMG.cityNight,
    body_md: null,
    is_featured: false,
  },
  {
    id: "post-sunset-to-stars",
    slug: "sunset-to-stars",
    title: "Sunset to Stars — My Unforgettable Evening at TWIST",
    excerpt:
      "As the elevator ascended to the 19th floor of Royal Phuket City Hotel, my anticipation grew with each passing level. Nothing could have prepared me for the view.",
    category: "REVIEW",
    read_minutes: 5,
    published_at: "2026-07-20",
    cover_url: IMG.reviewSunset,
    body_md: null,
    is_featured: false,
  },
  {
    id: "post-golden-hour-doc",
    slug: "golden-hour-documented",
    title: "The Ultimate Golden-Hour Ambiance, Documented",
    excerpt:
      "Eight nights, one camera, one cocktail per dusk. A study of TWIST in its most flattering hour.",
    category: "FEATURE",
    read_minutes: 4,
    published_at: "2026-07-08",
    cover_url: IMG.goldenHour,
    body_md: null,
    is_featured: false,
  },
  {
    id: "post-pride-month",
    slug: "celebrate-pride-month-on-the-rooftop",
    title: "Celebrate Pride Month on the Rooftop",
    excerpt:
      "June in Phuket hits differently. The sun's out, the streets get louder, and the rainbow flags start flying high. Locals, travellers, and TWIST.",
    category: "CULTURE",
    read_minutes: 3,
    published_at: "2026-06-11",
    cover_url: IMG.pridePartyArticle,
    body_md: null,
    is_featured: false,
  },
  {
    id: "post-behind-the-pass",
    slug: "behind-the-pass-chef-nat",
    title: "Behind the Pass — A Day with Chef Nat",
    excerpt:
      "From the morning market in Old Town to plating black cod at 22:30, a quiet study of the rhythm that powers our kitchen.",
    category: "KITCHEN",
    read_minutes: 9,
    published_at: "2026-05-28",
    cover_url: IMG.chefAtPass,
    body_md: null,
    is_featured: false,
  },
  {
    id: "post-spring-cocktails",
    slug: "what-the-botanicals-told-us",
    title: "What the Botanicals Told Us — Spring Cocktail Notes",
    excerpt:
      "Galangal, makrut, butterfly pea — what we learned tasting our way through April's island botanicals, and how it shaped the new menu.",
    category: "BAR",
    read_minutes: 7,
    published_at: "2026-05-12",
    cover_url: IMG.botanicals,
    body_md: null,
    is_featured: false,
  },
];
