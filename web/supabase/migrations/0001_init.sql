-- TWIST Phuket — initial schema
-- Run with the Supabase SQL editor or `supabase db push`.

create extension if not exists "pgcrypto";

-- ============ EVENTS ============
create table if not exists public.events (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  subtitle     text default '',
  category      text not null check (category in ('music', 'dining', 'private', 'lunar')),
  tag           text not null,
  date          timestamptz not null,
  doors         text not null,
  time_label   text not null,
  price_thb     integer not null check (price_thb >= 0),
  is_featured   boolean not null default false,
  image_url     text,
  description   text,
  created_at    timestamptz default now()
);
create index if not exists events_date_idx on public.events (date);
alter table public.events enable row level security;
drop policy if exists "events_public_read" on public.events;
create policy "events_public_read"
  on public.events for select
  using (true);

-- ============ POSTS ============
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text not null,
  category      text not null,
  read_minutes  integer not null check (read_minutes > 0),
  published_at  date not null,
  cover_url     text,
  body_md       text,
  is_featured   boolean not null default false,
  created_at    timestamptz default now()
);
create index if not exists posts_pub_idx on public.posts (published_at desc);
alter table public.posts enable row level security;
drop policy if exists "posts_public_read" on public.posts;
create policy "posts_public_read"
  on public.posts for select
  using (true);

-- ============ RESERVATIONS ============
create table if not exists public.reservations (
  id            uuid primary key default gen_random_uuid(),
  first_name    text not null,
  last_name     text not null,
  email         text not null,
  phone         text default '',
  party_size    integer not null check (party_size between 1 and 40),
  date          text not null,
  time          text not null,
  occasion      text,
  notes         text,
  status        text not null default 'pending'
                check (status in ('pending','confirmed','seated','cancelled','no_show')),
  created_at    timestamptz default now()
);
create index if not exists reservations_date_idx on public.reservations (date);
alter table public.reservations enable row level security;
-- Inserts/reads happen with the service-role key only (server-side route).
-- No public select policy.

-- ============ NEWSLETTER ============
create table if not exists public.newsletter_subscribers (
  email         text primary key,
  subscribed_at timestamptz default now(),
  status        text not null default 'active'
                check (status in ('active','unsubscribed'))
);
alter table public.newsletter_subscribers enable row level security;
