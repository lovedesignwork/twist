# TWIST publishing in Supabase

The live blog reads **Royal Phuket City Hotel** (`crhzxvbubvyachauomlx`) → **Table Editor → twist_blog_posts**. It uses the existing TWIST table and storage bucket, separately from the hotel, spa and Yan Long content.

- [Open the project Table Editor](https://supabase.com/dashboard/project/crhzxvbubvyachauomlx/editor)
- [Open image storage](https://supabase.com/dashboard/project/crhzxvbubvyachauomlx/storage/buckets/twist-blog-images)

Production reads the CMS on each request. Publishing or unpublishing updates the homepage, archive, related articles and sitemap without a Git commit or redeployment. An already-open browser page needs a refresh. Drafts and future-scheduled posts are excluded. A CMS outage never restores stale seed content.

## Edit an existing article

1. Open `twist_blog_posts` and find its `slug`.
2. Set `status` to `draft` if the revision should be private while you work. This removes it from the public site immediately on the next request.
3. Edit `title`, `excerpt`, `content`, `seo_title` and `meta_description`. Content uses Markdown: `##` for sections, `###` for questions, `**bold**`, `[link text](/menu)`, `-` lists and pipe tables. Do not add an H1; the title provides it.
4. Keep `featured_image` aligned with its entry in `images`. Keep all supporting image Markdown references intact unless you are replacing the assets.
5. Set `status` to `published`. Keep `published_at` as a private sorting value. For future publication, set it to the intended time and use `status=published`; the website excludes it until that time. If `scheduled_for` is set, that must also be in the past before the post appears.
6. Refresh `/blog`, the article, and `/sitemap.xml` to confirm the result. Only the latest three published entries appear on the homepage; the archive keeps every published entry.

`published_at`, `scheduled_for`, `created_at` and `updated_at` are private administrative data. The public query does not select these fields. They are never included in article structured data, sharing metadata, cards or page text.

## Add an article

Create a row in `twist_blog_posts` with `status=draft`. Fill these fields:

| Field | What to enter |
| --- | --- |
| `slug` | Unique lowercase words separated by hyphens |
| `title` | The article headline |
| `seo_title` | A concise unique search title; the site adds TWIST Phuket |
| `excerpt` | A short introduction for the article and cards |
| `meta_description` | A useful search description |
| `category` | For example OLD TOWN, DINING, BAR, SUNSET, CELEBRATIONS |
| `primary_keyword` | The article's distinct target question or phrase |
| `content` | 800–1,600 words of Markdown, excluding related cards |
| `featured_image` | URL of the first image, registered below |
| `featured_image_alt` | Accurate visual description of that image |
| `images` | JSON manifest of 3–5 unique images, including the cover |
| `related_slugs` | Array of two or three relevant, published article slugs |
| `published_at` | Private publication/sort time |
| `author_name` | TWIST Editorial |
| `content_format` | markdown |

The renderer intentionally does not accept raw HTML or arbitrary embedded scripts. It renders safe text, links, headings, lists, tables and registered images. Keep every image URL on its own Markdown line. Use every supporting image once; do not repeat the featured image in the body.

## Prepare and register images

Use original supplied photographs before generating additional images. Do not reuse an image from another article, including a renamed, recropped or edited version. Review `twist_blog_assets` before choosing an image. `content/image-ownership.json` records the launch assets and their provenance. `content/legacy-image-reservations.json` reserves photos already used by the retired Journal so they cannot accidentally become new article images.

For a new local photo, from the `web` directory:

```sh
node scripts/prepare-blog-image.mjs input.jpg public/blog/your-slug/descriptive-name.webp your-slug
```

This corrects EXIF orientation, preserves proportions, limits the longest edge to 1600px, compresses to WebP and reports dimensions, size and source/output SHA-256 hashes. Inspect the result; do not invent a description from the filename. Aim for 100–250 KB; a simpler image may legitimately be smaller.

Upload the optimized file through Supabase Storage → `twist-blog-images` → a folder named after the article slug. Use its public URL. Create a row in `twist_blog_assets` with that URL as `src`, the article's slug, source and output hashes, source filename, byte size and role. Original/source hashes and output hashes must be unique. Record the source of AI images, generation job ID and model when relevant.

Add the image to the post's `images` JSON, for example:

```json
{
  "src": "https://crhzxvbubvyachauomlx.supabase.co/storage/v1/object/public/twist-blog-images/your-slug/descriptive-name.webp",
  "alt": "Accurate description of what is visible",
  "caption": "Useful context about this photograph.",
  "width": 1600,
  "height": 1067,
  "generated": false
}
```

The field is an array of these objects. For AI images use `generated: true` and an explicit caption such as “AI-generated editorial illustration; a planning concept, not a photograph of an actual TWIST offering or event.” Use real venue photos for identifiable views. Generation should create a distinct supporting image, not manufacture documentary evidence of guests, staff, products or experiences.

The publication trigger checks word count, required metadata, image count, dimensions, asset ownership, illustration labels and body-image placement. It rejects accidental asset reuse across articles. Visual checks and fact-checking still belong to the editor: hashes cannot recognize every transformed duplicate and software cannot confirm that a caption is truthful.

## Access and security

Only authorized Supabase project members can edit these tables via the dashboard. Public API roles have no access to either table. The Next.js server uses `BLOG_SUPABASE_URL` and a secret `BLOG_SUPABASE_SERVICE_ROLE_KEY`, configured in Vercel production. Do not put that key in any `NEXT_PUBLIC_` variable, browser code, article or repository file.

The existing TWIST bucket is public for delivered image files. Keep sensitive or embargoed imagery out of public storage. Draft article bodies and private dates remain inaccessible publicly. The prior anonymous upload/update/delete policies for this bucket were removed; dashboard uploads by project members still work.

## Launch content and model provenance

The eight selected topics are 1, 2, 3, 5, 6, 9, 13 and 20. Each has two distinct supplied photos and one original generated illustration. Higgsfield accepted `nano_banana_pro` requests; its completion records returned `nano_banana_2`. Both values and all eight job IDs are recorded accurately in the ownership registry.

The old Journal material is preserved in `content/archive/legacy-posts.ts.txt` for internal review. It is not served publicly: it included unsupported first-person stories and reused photographs. Existing old Journal URLs return 404 rather than publishing unverified material or redirecting to unrelated topics.

## Developer checks

```sh
npm run check:blog
npm run typecheck
npm run build
```

The JSON/Markdown files in the repository are reviewed launch snapshots and local development material. Supabase is the production source of truth. Do not overwrite CMS edits by reseeding the snapshot. Booking and contact endpoints use their original configuration and were not switched to the shared blog database.
