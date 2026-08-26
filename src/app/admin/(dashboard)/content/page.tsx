import { ContentForm } from "@/components/admin/ContentForm";
import { listAdmin } from "@/lib/cms/admin";
import type { SiteContentBlock } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const blocks = (await listAdmin("site_content")) as SiteContentBlock[];

  const grouped = new Map<string, SiteContentBlock[]>();
  for (const block of blocks) {
    const key = block.group || "General";
    grouped.set(key, [...(grouped.get(key) ?? []), block]);
  }

  return (
    <div>
      <header className="mb-8">
        <p className="label">Site</p>
        <h1 className="display mt-2 text-3xl">HERO & COPY</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Every headline, paragraph and label on the public site, in English and Arabic. Leave a
          language empty to fall back to the other one.
        </p>
      </header>
      <ContentForm groups={[...grouped.entries()]} />
    </div>
  );
}
