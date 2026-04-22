# TWIST · Phuket Old Town

A redesign of [twistphuket.com](https://twistphuket.com) — the rooftop restaurant & bar on the 19th floor of Royal Phuket City Hotel.

## Repository layout

```
TWIST/
├── web/        Next.js 15 application (the production site)
├── source/     Original Aurora design exploration (JSX mockups + HTML canvas)
└── README.md
```

## The web app

See [`web/README.md`](./web/README.md) for the full developer guide — stack, setup, env vars, Supabase + Resend configuration, and deployment.

### Quick start

```bash
cd web
npm install
cp .env.example .env.local   # optional — site works without env vars
npm run dev                   # → http://localhost:3000
```

## Stack

- **Next.js 15** (App Router, Server Components)
- **Tailwind CSS v4**
- **Supabase** (Postgres + RLS) for events, blog posts, reservations, newsletter
- **Resend** for transactional email
- **TypeScript** strict mode
- **Zod** for validation

## Design

Aurora — cinematic editorial direction with a purple / pink / yellow / light-blue gradient palette over deep ink backgrounds. Typography: **Playfair Display** (display), **Manrope** (body), **Italiana** (logotype), **JetBrains Mono** (micro-type).

## License

© Royal Phuket City Hotel · TWIST · 19F. All rights reserved.
