import { SettingsForm } from "@/components/admin/SettingsForm";
import { mediaOptions } from "@/lib/cms/admin";
import { getSettings } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [settings, media] = await Promise.all([getSettings(), mediaOptions()]);

  return (
    <div>
      <header className="mb-8">
        <p className="label">Site</p>
        <h1 className="display mt-2 text-3xl">SETTINGS</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          SEO metadata, contact details, accent colour, hero imagery and which homepage sections are
          visible.
        </p>
      </header>
      <SettingsForm settings={settings} media={media} />
    </div>
  );
}
