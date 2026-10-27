# Blog launch verification

## Content and assets

Eight selected articles (topics 1, 2, 3, 5, 6, 9, 13, 20), 1,012–1,132 words each. Each owns three images: two supplied photos and one labeled generated editorial illustration. All 24 optimized WebP files have distinct source and output hashes, a longest edge no greater than 1600px, and a size of approximately 100–228 KB. Retired Journal photos are also reserved in the ownership registry.

Higgsfield accepted Nano Banana Pro requests but reported Nano Banana 2 in completion records. The requested and reported model names are both retained; the images are not represented as verified Pro outputs.

## Checks completed before deployment

- Content/ownership validation, TypeScript and production build passed.
- Production-server browser checks at 1440px and 390px passed for homepage, archive, all eight articles, reservation, menu, contact, events and gallery pages.
- All article images loaded; no horizontal overflow, duplicate H1s or header overlap. Mobile Blog navigation and expandable contents anchors worked.
- Article canonicals, private-date exclusion, visible word counts, three images per article, homepage latest three, archive eight and sitemap inclusion passed.
- Supabase draft and future-schedule checks returned article 404s and removed entries from homepage/archive/sitemap. Restoring publication restored the article. Changing the private sort value reordered homepage articles without a deployment; original values were restored after testing.
- Anonymous REST access to both TWIST editorial tables was denied. Invalid word count, missing image dimensions and duplicate-image publication were rejected by the database trigger.
- Reservation, contact and newsletter endpoints rejected empty submissions with 422. No real bookings or emails were sent.
- Repository credential scan and whitespace checks passed.

## Operational limits

Production requires the two dedicated blog environment variables documented in PUBLISHING.md. The existing reservation/contact/email setup uses separate credentials; they were absent from Vercel when reviewed. Form rendering and invalid-input handling were tested, but delivery and reservation persistence are not configured or verified by this blog work.

Compatible dependency updates resolved the Next.js and transitive dependency audit findings (resolved Next.js 16.4.3). One existing Zod advisory remains for oversized constrained collections; this application uses scalar form fields rather than collection schemas. A major Zod migration was left outside the editorial change.

Public launch photos are deployed with the application; future photos can be uploaded to the dedicated Supabase bucket. Editors must continue visual duplicate and factual checks: hashes cannot recognize every edited version of an old photograph.

The old Journal entries were preserved privately for review because of unsupported narratives and reused photography; their old URLs are no longer published. Supabase is the production source of truth, while repository Markdown and JSON retain the reviewed launch snapshot.
