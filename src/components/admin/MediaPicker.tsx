"use client";

import { ImagePlus, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

import type { AdminStrings } from "@/i18n/admin";

export type MediaOption = { id: string; url: string; fileName: string };

/**
 * Image field: type a URL, pick from the media library, or upload a new file
 * (which is added to the library through /api/admin/media).
 */
export function MediaPicker({
  name,
  defaultValue = "",
  library,
  label,
  t,
}: {
  name: string;
  defaultValue?: string;
  library: MediaOption[];
  label?: string;
  t: AdminStrings;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState(library);

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/media", { method: "POST", body });
      const json = (await response.json()) as { url?: string; id?: string; error?: string };
      const url = json.url;
      if (!response.ok || !url) throw new Error(json.error ?? t.uploadFailed);
      setAssets((current) => [{ id: json.id ?? url, url, fileName: file.name }, ...current]);
      setValue(url);
      setOpen(false);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : t.uploadFailed);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label ? <span className="admin-label">{label}</span> : null}
      <div className="flex items-start gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded border border-[var(--color-line)] bg-ink">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-dim">
              <ImagePlus className="h-4 w-4" aria-hidden />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <input
            name={name}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={t.imagePlaceholder}
            className="admin-input"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="rounded border border-[var(--color-line)] px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-muted hover:text-offwhite"
            >
              {open ? t.closeLibrary : t.library}
            </button>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded border border-[var(--color-line)] px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-muted hover:text-offwhite disabled:opacity-50"
            >
              <Upload className="h-3 w-3" aria-hidden />
              {uploading ? t.uploading : t.upload}
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => setValue("")}
                className="inline-flex items-center gap-1 text-[0.6875rem] uppercase tracking-[0.12em] text-dim hover:text-accent"
              >
                <X className="h-3 w-3" aria-hidden />
                {t.clear}
              </button>
            ) : null}
          </div>
          {error ? <p className="mt-2 text-xs text-accent">{error}</p> : null}
        </div>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
          event.target.value = "";
        }}
      />

      {open ? (
        <ul className="mt-3 grid max-h-64 grid-cols-3 gap-2 overflow-y-auto rounded border border-[var(--color-line)] p-2 sm:grid-cols-5">
          {assets.length === 0 ? (
            <li className="col-span-full p-4 text-center text-xs text-dim">
              {t.emptyLibrary}
            </li>
          ) : null}
          {assets.map((asset) => (
            <li key={asset.id}>
              <button
                type="button"
                onClick={() => {
                  setValue(asset.url);
                  setOpen(false);
                }}
                className="block aspect-square w-full overflow-hidden rounded border border-transparent hover:border-accent"
                title={asset.fileName}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.url} alt={asset.fileName} className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
