# Media upload source

These files are the **upload source** for the Supabase Storage `media` bucket.
They are deliberately **not** under `public/`: the app serves campaign imagery
from Storage so that adding new work needs no deployment, per the CMS rule.

Produced by `npm run media:prepare -- <source-dir>` from the supplied campaign
artwork — 33.1 MB of Instagram-format PNG/JPEG reduced to 2.8 MB of WebP at a
1600px long edge.

Upload with:

```bash
npm run media:upload -- --dry-run   # list what would go
npm run media:upload                # needs the service-role key
```

Folder structure mirrors the storage paths the bucket policy allows
(`projects/`, `brand/`, `clients/`, …), so a file here lands at the same path
in the bucket, and matches the URLs written by `npm run db:seed`.
