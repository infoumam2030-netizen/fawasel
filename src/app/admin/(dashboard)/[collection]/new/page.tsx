import Link from "next/link";
import { notFound } from "next/navigation";

import { DocForm } from "@/components/admin/DocForm";
import { getAdminStrings } from "@/i18n/admin";
import { getAdminLocale } from "@/lib/admin-locale";
import { mediaOptions, referenceOptions } from "@/lib/cms/admin";
import {
  collectionLabel,
  collectionSingular,
  emptyValues,
  getCollectionConfig,
} from "@/lib/cms/collections";

export const dynamic = "force-dynamic";

export default async function NewDocPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const config = getCollectionConfig(collection);
  if (!config || config.readOnly) notFound();

  const [references, media, locale] = await Promise.all([
    referenceOptions(),
    mediaOptions(),
    getAdminLocale(),
  ]);
  const t = getAdminStrings(locale);

  return (
    <div>
      <header className="mb-8">
        <Link href={`/admin/${config.name}`} className="label hover:text-offwhite">
          ← {collectionLabel(config, locale)}
        </Link>
        <h1 className="display mt-3 text-3xl">
          {t.newRecord} {collectionSingular(config, locale)}
        </h1>
      </header>
      <DocForm
        collection={config.name}
        id={null}
        fields={config.fields}
        values={emptyValues(config)}
        references={references}
        media={media}
        locale={locale}
        t={t}
      />
    </div>
  );
}
