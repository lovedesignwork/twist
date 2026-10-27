/**
 * Seeds Supabase with the static events shipped in /src/data.
 * Blog publishing is managed in twist_blog_posts; see content/PUBLISHING.md.
 *
 * Usage:
 *   1. Set SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   2. Run: npm run db:seed
 */

import { createClient } from "@supabase/supabase-js";
import { STATIC_EVENTS } from "../src/data/events";

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

  console.log("Done. ✦");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
