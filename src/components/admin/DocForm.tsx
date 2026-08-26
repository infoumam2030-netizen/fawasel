"use client";

import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useActionState, useState } from "react";

import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";
import type { Field } from "@/lib/cms/collections";
import { saveDocAction, type ActionState } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

export type ReferenceOptions = Record<string, { id: string; label: string }[]>;

type KeyMetric = { label: { en: string; ar: string }; value: string };

function localizedPair(field: Field, value: unknown, area: boolean) {
  const localized = (value ?? { en: "", ar: "" }) as { en: string; ar: string };
  const Tag = area ? "textarea" : "input";
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(["en", "ar"] as const).map((lang) => (
        <div key={lang}>
          <label className="admin-label" htmlFor={`${field.name}-${lang}`}>
            {field.label} · {lang.toUpperCase()}
          </label>
          <Tag
            id={`${field.name}-${lang}`}
            name={`${field.name}.${lang}`}
            defaultValue={localized[lang] ?? ""}
            dir={lang === "ar" ? "rtl" : "ltr"}
            rows={area ? 4 : undefined}
            className="admin-input"
          />
        </div>
      ))}
    </div>
  );
}

function KeyMetricsEditor({ initial }: { initial: KeyMetric[] }) {
  const [rows, setRows] = useState<KeyMetric[]>(
    initial.length > 0 ? initial : [{ label: { en: "", ar: "" }, value: "" }],
  );

  return (
    <div>
      <span className="admin-label">Key metrics</span>
      <ul className="space-y-2">
        {rows.map((row, index) => (
          <li key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
            <input
              name="keyMetric.label.en"
              defaultValue={row.label.en}
              placeholder="Label (EN)"
              className="admin-input"
            />
            <input
              name="keyMetric.label.ar"
              defaultValue={row.label.ar}
              dir="rtl"
              placeholder="Label (AR)"
              className="admin-input"
            />
            <input
              name="keyMetric.value"
              defaultValue={row.value}
              placeholder="e.g. +240%"
              className="admin-input"
            />
            <button
              type="button"
              onClick={() => setRows((current) => current.filter((_, i) => i !== index))}
              className="rounded border border-[var(--color-line)] px-3 text-dim hover:text-accent"
              aria-label={`Remove metric ${index + 1}`}
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setRows((current) => [...current, { label: { en: "", ar: "" }, value: "" }])}
        className="mt-2 inline-flex items-center gap-1.5 rounded border border-[var(--color-line)] px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-muted hover:text-offwhite"
      >
        <Plus className="h-3 w-3" aria-hidden />
        Add metric
      </button>
    </div>
  );
}

function FieldControl({
  field,
  value,
  references,
  media,
}: {
  field: Field;
  value: unknown;
  references: ReferenceOptions;
  media: MediaOption[];
}) {
  switch (field.type) {
    case "localized":
      return localizedPair(field, value, false);
    case "localizedArea":
      return localizedPair(field, value, true);
    case "boolean":
      return (
        <label className="flex items-center gap-3 pt-5 text-sm">
          <input
            type="checkbox"
            name={field.name}
            defaultChecked={Boolean(value)}
            className="h-4 w-4 accent-[var(--accent-to)]"
          />
          {field.label}
        </label>
      );
    case "image":
      return <MediaPicker name={field.name} defaultValue={String(value ?? "")} library={media} label={field.label} />;
    case "images":
      return (
        <div>
          <label className="admin-label" htmlFor={field.name}>
            {field.label}
          </label>
          <textarea
            id={field.name}
            name={field.name}
            rows={4}
            defaultValue={Array.isArray(value) ? value.join("\n") : ""}
            placeholder="One image URL per line"
            className="admin-input"
          />
        </div>
      );
    case "tags":
      return (
        <div>
          <label className="admin-label" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            defaultValue={Array.isArray(value) ? value.join(", ") : ""}
            className="admin-input"
          />
        </div>
      );
    case "reference":
      return (
        <div>
          <label className="admin-label" htmlFor={field.name}>
            {field.label}
          </label>
          <select
            id={field.name}
            name={field.name}
            defaultValue={String(value ?? "")}
            className="admin-input"
          >
            <option value="">—</option>
            {(references[field.reference ?? ""] ?? []).map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "references": {
      const selected = new Set((Array.isArray(value) ? value : []) as string[]);
      return (
        <fieldset>
          <legend className="admin-label">{field.label}</legend>
          <div className="flex flex-wrap gap-2">
            {(references[field.reference ?? ""] ?? []).map((option) => (
              <label
                key={option.id}
                className="inline-flex items-center gap-2 rounded border border-[var(--color-line)] px-3 py-1.5 text-xs"
              >
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.id}
                  defaultChecked={selected.has(option.id)}
                  className="h-3.5 w-3.5 accent-[var(--accent-to)]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
    case "keyMetrics":
      return <KeyMetricsEditor initial={(Array.isArray(value) ? value : []) as KeyMetric[]} />;
    case "textarea":
      return (
        <div>
          <label className="admin-label" htmlFor={field.name}>
            {field.label}
          </label>
          <textarea
            id={field.name}
            name={field.name}
            rows={5}
            defaultValue={String(value ?? "")}
            className="admin-input"
          />
        </div>
      );
    case "number":
      return (
        <div>
          <label className="admin-label" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type="number"
            defaultValue={Number(value ?? 0)}
            className="admin-input"
          />
        </div>
      );
    default:
      return (
        <div>
          <label className="admin-label" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            defaultValue={String(value ?? "")}
            className="admin-input"
          />
        </div>
      );
  }
}

export function DocForm({
  collection,
  id,
  fields,
  values,
  references,
  media,
  previewHref,
}: {
  collection: string;
  id: string | null;
  fields: Field[];
  values: Record<string, unknown>;
  references: ReferenceOptions;
  media: MediaOption[];
  previewHref?: string;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    saveDocAction.bind(null, collection, id),
    {},
  );

  return (
    <form action={formAction} className="pb-24">
      <div className="grid gap-6 lg:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={cn(field.wide && "lg:col-span-2")}>
            <FieldControl field={field} value={values[field.name]} references={references} media={media} />
            {field.help ? <p className="mt-1.5 text-[0.6875rem] text-dim">{field.help}</p> : null}
          </div>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-line)] bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <p className="text-xs" role="status">
            {state.error ? (
              <span className="text-accent">{state.error}</span>
            ) : state.ok ? (
              <span className="text-emerald-400">Saved.</span>
            ) : (
              <span className="text-dim">Unsaved changes are not published.</span>
            )}
          </p>
          <div className="flex items-center gap-3">
            {previewHref ? (
              <a
                href={previewHref}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-[var(--color-line)] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.12em] text-muted hover:text-offwhite"
              >
                Preview
              </a>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded bg-[linear-gradient(96deg,var(--accent-from),var(--accent-to))] px-5 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#0a0a0b] disabled:opacity-60"
            >
              {pending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              ) : (
                <Save className="h-3.5 w-3.5" aria-hidden />
              )}
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
