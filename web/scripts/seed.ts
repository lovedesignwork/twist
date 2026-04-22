/**
 * Seeds Supabase with the static events + posts shipped in /src/data.
 *
 * Usage:
 *   1. Set SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   2. Run: npm run db:seed
 */

import { createClient } from "@supabase/supabase-js";
import { STATIC_EVENTS } from "../src/data/events";
import { STATIC_POSTS } from "../src/data/posts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.",
  );
  process.exit(1);
}

const sb = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log("→ Seeding events...");
  const { error: evtErr } = await sb
    .from("events")
    .upsert(STATIC_EVENTS, { onConflict: "slug" });
  if (evtErr) throw evtErr;
  console.log(`  ✓ ${STATIC_EVENTS.length} events`);

  console.log("→ Seeding posts...");
  const { error: postErr } = await sb
    .from("posts")
    .upsert(STATIC_POSTS, { onConflict: "slug" });
  if (postErr) throw postErr;
  console.log(`  ✓ ${STATIC_POSTS.length} posts`);

  console.log("Done. ✦");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
