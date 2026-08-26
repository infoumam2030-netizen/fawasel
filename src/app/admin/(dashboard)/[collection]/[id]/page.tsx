import { Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteDocAction } from "@/app/admin/actions";
import { DocForm } from "@/components/admin/DocForm";
import { getAdminStrings } from "@/i18n/admin";
import { getAdminLocale } from "@/lib/admin-locale";
import { docLabel, mediaOptions, referenceOptions } from "@/lib/cms/admin";
import { collectionLabel, getCollectionConfig } from "@/lib/cms/collections";
import { getStore } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function EditDocPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { collection, id } = await params;
  const { created } = await searchParams;
  const config = getCollectionConfig(collection);
  if (!config) notFound();

  const store = await getStore();
  const doc = (await store.get(config.name, id)) as unknown as Record<string, unknown> | null;
  if (!doc) notFound();

  const [references, media, locale] = await Promise.all([
    referenceOptions(),
    mediaOptions(),
    getAdminLocale(),
  ]);
  const t = getAdminStrings(locale);
  const title = docLabel(doc, config.titleField) || t.untitled;
  const previewHref =
    config.name === "projects" && typeof doc.slug === "string" && doc.slug
      ? `/projects/${doc.slug}`
      : undefined;

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href={`/admin/${config.name}`} className="label hover:text-offwhite">
            ← {collectionLabel(config, locale)}
          </Link>
          <h1 className="display mt-3 text-3xl">{title.toUpperCase()}</h1>
          <p className="mt-2 text-xs text-dim">
            {t.updatedAt} {new Date(String(doc.updatedAt)).toLocaleString(locale === "ar" ? "ar-EG" : "en-GB")}
          </p>
          {created ? <p className="mt-2 text-xs text-emerald-400">{t.recordCreated}</p> : null}
        </div>

        <form
          action={deleteDocAction.bind(null, config.name, id)}
          className="shrink-0"
        >
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded border border-[var(--color-line)] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.12em] text-dim hover:border-accent hover:text-accent"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
            {t.delete}
          </button>
        </form>
      </header>

      <DocForm
        collection={config.name}
        id={id}
        fields={config.fields}
        values={doc}
        references={references}
        media={media}
        previewHref={previewHref}
        locale={locale}
        t={t}
      />
    </div>
  );
}
