# TWIST · Phuket Old Town · Rooftop Restaurant & Bar

A redesign of [twistphuket.com](https://twistphuket.com) — built on Next.js 15 (App Router), Tailwind v4, Supabase, and Resend, around the **Aurora** design direction (cinematic editorial, purple / pink / yellow / light blue gradient palette).

## Stack

| Layer        | Tech                                          |
| ------------ | --------------------------------------------- |
| Framework    | Next.js 15 (App Router, Server Components, RSC) |
| Styling      | Tailwind CSS v4 (with custom `@theme` tokens) |
| Fonts        | Playfair Display, Manrope, Italiana, JetBrains Mono (via `next/font`) |
| Data         | Supabase (Postgres + RLS)                     |
| Email        | Resend                                         |
| Validation   | Zod                                            |
| Images       | Unsplash placeholders → swap to client photos in `src/lib/images.ts` |
| Type-safety  | TypeScript strict mode                         |

## Pages

- `/` — Home (hero, featured event, bar/kitchen, journal teaser, FAQ, CTA)
- `/menu` — Cocktails + Kitchen menu, six-course tasting CTA
- `/gallery` — Masonry archive with category filters
- `/events` — Featured event + upcoming list + private/wedding CTA
- `/blog` — Featured article + grid + newsletter
- `/contact` — Reservation form + info cards + general enquiry + FAQ

## API Routes

| Route                  | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `POST /api/reservations` | Validates with Zod, persists to Supabase, sends 2 Resend emails (guest + staff) |
| `POST /api/contact`      | Validates and forwards general enquiries via Resend     |
| `POST /api/newsletter`   | Upserts subscriber, sends welcome dispatch via Resend   |

All endpoints include a hidden `website` honeypot field for basic bot protection.

## Getting Started

```bash
# 1. Install deps
npm install

# 2. Configure env
cp .env.example .env.local
# Fill in Supabase + Resend credentials. Both are optional for local dev —
# pages fall back to the static seed data in /src/data when Supabase is missing.

# 3. Run dev server
npm run dev
# → http://localhost:3000
```

The site **works fully out of the box** without any environment variables — every page renders against shipped static seed data. Add Supabase + Resend credentials to enable persistence and emails.

## Supabase Setup

```bash
# 1. Create a project at https://supabase.com
# 2. Run the migration (Supabase SQL Editor):
#    Copy/paste the contents of supabase/migrations/0001_init.sql
# 3. Copy your Project URL + anon + service_role keys into .env.local
# 4. Seed the events + posts tables:
npm run db:seed
```

Schema: `events`, `posts`, `reservations`, `newsletter_subscribers`. Public reads on events/posts via RLS. Reservations + newsletter writes happen server-side using the service-role key (never exposed to the client).

## Resend Setup

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. Add and verify your sending domain (e.g. `twistphuket.com`).
3. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL` in `.env.local`.

Email templates live in `src/lib/email-templates.ts` — all dark-themed, on-brand, and ready to ship.

## Replacing Placeholder Photos

All Unsplash placeholder URLs are centralised in `src/lib/images.ts`. Once the client provides real photos:

1. Drop the photos into `public/photos/...`
2. Replace the URLs in `src/lib/images.ts` (the `IMG` object) — components import by key, so no other file needs editing.

## Design System

The Aurora design system lives in `src/app/globals.css` (`@theme` block) plus a handful of utility classes mirroring the original `source/styles.css`. Key tokens:

```
--color-twist-yellow  #FDE047    Hero accent, headlines (italic)
--color-twist-pink    #EC4899    Secondary accent
--color-twist-purple  #8B5CF6    Primary glow + body accent
--color-twist-cyan    #67E8F9    Tertiary accent
--color-twist-ink     #08030F    Base background
```

Headlines use **Playfair Display** with italic gradient spans. Microcopy uses **JetBrains Mono** with `0.25em` letter-spacing, all uppercase. Body uses **Manrope** light (300/400). Logotype uses **Italiana** with `0.3em` tracking.

## Deployment (Vercel)

```bash
npm i -g vercel
vercel link
vercel env pull .env.local      # pull production env to local
vercel deploy --prod
```

Set the env vars in the Vercel project dashboard, then push to main.

---

Built for the night. © TWIST · Royal Phuket City Hotel · 19F
