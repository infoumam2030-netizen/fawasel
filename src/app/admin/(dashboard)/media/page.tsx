import { Trash2 } from "lucide-react";

import { deleteMediaAction } from "@/app/admin/actions";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { listAdmin } from "@/lib/cms/admin";
import type { MediaAsset } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function MediaPage() {
  const assets = ((await listAdmin("media_assets")) as MediaAsset[]).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">Site</p>
          <h1 className="display mt-2 text-3xl">MEDIA LIBRARY</h1>
          <p className="mt-2 text-sm text-dim">{assets.length} files</p>
        </div>
        <MediaUploader />
      </header>

      {assets.length === 0 ? (
        <p className="mt-8 rounded border border-[var(--color-line)] p-8 text-center text-sm text-dim">
          No media yet. Upload the portrait, client logos and project imagery here — they become
          selectable in every image field.
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {assets.map((asset) => (
            <li key={asset.id} className="rounded border border-[var(--color-line)] p-2">
              <div className="aspect-square overflow-hidden rounded bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.url}
                  alt={asset.alt.en || asset.fileName}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 truncate text-xs" title={asset.fileName}>
                {asset.fileName}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[0.625rem] text-dim">{formatSize(asset.size)}</span>
                <form action={deleteMediaAction.bind(null, asset.id)}>
                  <button
                    type="submit"
                    className="text-dim hover:text-accent"
                    aria-label={`Delete ${asset.fileName}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
