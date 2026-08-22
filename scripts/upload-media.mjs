/**
 * Uploads assets/media/ to the Supabase Storage `media` bucket.
 *
 *   npm run media:upload           # needs NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *   npm run media:upload -- --dry-run
 *
 * Uses the service-role key because uploads are restricted to owner/editor/
 * designer and this runs outside a signed-in session. Run it from a machine
 * where that key stays local — never from a shared environment.
 *
 * Paths mirror the folder structure the storage policy allows, so
 * assets/media/projects/foo/cover.webp lands at projects/foo/cover.webp.
 */
import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = "assets/media";
const DRY_RUN = process.argv.includes("--dry-run");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!DRY_RUN && (!url || !key)) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const CONTENT_TYPE = {
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (CONTENT_TYPE[path.extname(entry.name).toLowerCase()]) out.push(full);
  }
  return out;
}

const files = await walk(ROOT);
console.log(`${files.length} file(s) to upload from ${ROOT}/`);

if (DRY_RUN) {
  for (const f of files) console.log(`  ${path.relative(ROOT, f)}`);
  console.log("\nDry run — nothing uploaded.");
  process.exit(0);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
let uploaded = 0;
let failed = 0;

for (const file of files) {
  const storagePath = path.relative(ROOT, file).split(path.sep).join("/");
  const { error } = await supabase.storage
    .from("media")
    .upload(storagePath, await readFile(file), {
      contentType: CONTENT_TYPE[path.extname(file).toLowerCase()],
      upsert: true,
    });

  if (error) {
    console.error(`  ✗ ${storagePath}: ${error.message}`);
    failed++;
  } else {
    console.log(`  ✓ ${storagePath}`);
    uploaded++;
  }
}

console.log(`\n${uploaded} uploaded, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
