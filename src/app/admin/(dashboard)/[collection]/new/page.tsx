import Link from "next/link";
import { notFound } from "next/navigation";

import { DocForm } from "@/components/admin/DocForm";
import { mediaOptions, referenceOptions } from "@/lib/cms/admin";
import { emptyValues, getCollectionConfig } from "@/lib/cms/collections";

export const dynamic = "force-dynamic";

export default async function NewDocPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const config = getCollectionConfig(collection);
  if (!config || config.readOnly) notFound();

  const [references, media] = await Promise.all([referenceOptions(), mediaOptions()]);

  return (
    <div>
      <header className="mb-8">
        <Link href={`/admin/${config.name}`} className="label hover:text-offwhite">
          ← {config.label}
        </Link>
        <h1 className="display mt-3 text-3xl">NEW {config.singular.toUpperCase()}</h1>
      </header>
      <DocForm
        collection={config.name}
        id={null}
        fields={config.fields}
        values={emptyValues(config)}
        references={references}
        media={media}
      />
    </div>
  );
}
