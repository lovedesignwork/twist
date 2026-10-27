-- Extends only the existing, empty TWIST editorial table in the shared project.
begin;
alter table public.twist_blog_posts add column if not exists seo_title text;
alter table public.twist_blog_posts add column if not exists images jsonb not null default '[]'::jsonb;
alter table public.twist_blog_posts add column if not exists related_slugs text[] not null default '{}';
alter table public.twist_blog_posts add column if not exists content_format text not null default 'markdown';
comment on column public.twist_blog_posts.published_at is 'PRIVATE: sorting/scheduling only; never render in public metadata or HTML.';
comment on column public.twist_blog_posts.content is 'Markdown article: H2/H3, paragraphs, links, lists and tables. Register 3–5 distinct WebP/AVIF images before publishing.';
comment on column public.twist_blog_posts.images is 'Image manifest: src, alt, caption, width, height, generated. Include featured image once; place the others in Markdown.';
alter table public.twist_blog_posts enable row level security;
drop policy if exists "Anyone can read twist_blog_posts" on public.twist_blog_posts;
drop policy if exists "Service role full access twist_blog_posts" on public.twist_blog_posts;
revoke all on public.twist_blog_posts from anon, authenticated;
grant all on public.twist_blog_posts to service_role;
-- The website uses a server-only service client with explicit published filters.
-- Supabase Dashboard access remains available to authorized project members.
create table if not exists public.twist_blog_assets (
  src text primary key,
  article_slug text not null,
  source_sha256 text not null unique,
  output_sha256 text unique,
  source text not null,
  bytes integer,
  requested_model text,
  reported_model text,
  job_id text,
  role text not null default 'supporting',
  created_at timestamptz not null default now()
);
alter table public.twist_blog_assets enable row level security;
revoke all on public.twist_blog_assets from anon, authenticated;
grant all on public.twist_blog_assets to service_role;
create index if not exists twist_blog_publish_order on public.twist_blog_posts(status,published_at desc,slug);
create or replace function public.validate_twist_blog_publication()
returns trigger language plpgsql security invoker set search_path='' as $$
declare image jsonb; count_images integer; plain text; words integer; body_images text[];
begin
  if new.status <> 'published' or new.status is null then return new; end if;
  if new.slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$' then raise exception 'Use a lowercase hyphenated slug'; end if;
  if coalesce(new.seo_title,'')='' or coalesce(new.meta_description,'')='' or new.published_at is null then raise exception 'SEO title, description and private publication order are required'; end if;
  if new.content ~ E'(^|\n)# ' then raise exception 'Use H2/H3 in content; the page supplies the only H1'; end if;
  plain:=regexp_replace(new.content, '!\[[^\]]*\]\([^)]*\)', '', 'g');
  plain:=regexp_replace(plain, '\[([^\]]+)\]\([^)]*\)', '\1', 'g');
  plain:=regexp_replace(plain, '[#*|]+|---+', ' ', 'g');
  words:=cardinality(regexp_split_to_array(trim(plain), '\s+'));
  if words < 800 or words > 1600 then raise exception 'Published articles require 800–1600 words (found %)',words; end if;
  count_images:=jsonb_array_length(new.images);
  if count_images < 3 or count_images > 5 then raise exception 'Register 3–5 distinct images'; end if;
  if (select count(distinct value->>'src') from jsonb_array_elements(new.images)) <> count_images then raise exception 'Duplicate image within article'; end if;
  if not exists(select 1 from jsonb_array_elements(new.images) where value->>'src'=new.featured_image) then raise exception 'Featured image must appear in manifest'; end if;
  for image in select value from jsonb_array_elements(new.images) loop
    if coalesce(image->>'alt','')='' or coalesce(image->>'caption','')='' or coalesce((image->>'width')::int,0) <= 0 or coalesce((image->>'height')::int,0) <= 0 or greatest((image->>'width')::int,(image->>'height')::int)>1600 then raise exception 'Every image needs alt, caption and dimensions up to 1600px'; end if;
    if (image->>'src') !~ '^(/blog/|https://crhzxvbubvyachauomlx\.supabase\.co/storage/v1/object/public/twist-blog-images/).+\.(webp|avif)$' then raise exception 'Use optimized WebP/AVIF in the TWIST image paths'; end if;
    if coalesce((image->>'generated')::boolean,false) and (image->>'caption') !~* 'editorial illustration' then raise exception 'Label generated images as editorial illustrations'; end if;
    if not exists(select 1 from public.twist_blog_assets a where a.src=image->>'src' and a.article_slug=new.slug) then raise exception 'Image is unregistered or belongs to another article: %',image->>'src'; end if;
    if image->>'src' <> new.featured_image and position(image->>'src' in new.content)=0 then raise exception 'Place all supporting images in content'; end if;
  end loop;
  select array_agg(m[1]) into body_images from regexp_matches(new.content, '!\[[^\]]*\]\(([^)]+)\)', 'g') m;
  if coalesce(cardinality(body_images),0) <> count_images-1 or (select count(distinct u) from unnest(body_images) u) <> count_images-1 then raise exception 'Use every supporting image once, without repeating the cover'; end if;
  if exists(select 1 from unnest(body_images) u where u=new.featured_image or not exists(select 1 from jsonb_array_elements(new.images) j where j->>'src'=u)) then raise exception 'Content contains a repeated cover or unregistered image'; end if;
  return new;
end; $$;
revoke all on function public.validate_twist_blog_publication() from public,anon,authenticated;
grant execute on function public.validate_twist_blog_publication() to service_role;
drop trigger if exists validate_twist_publication on public.twist_blog_posts;
create trigger validate_twist_publication before insert or update on public.twist_blog_posts for each row execute function public.validate_twist_blog_publication();
-- Close the pre-existing unauthenticated upload/update/delete paths in this bucket only.
drop policy if exists "twist-blog-images upload" on storage.objects;
drop policy if exists "twist-blog-images update" on storage.objects;
drop policy if exists "twist-blog-images delete" on storage.objects;
commit;
