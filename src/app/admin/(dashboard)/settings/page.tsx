import { SettingsForm } from "@/components/admin/SettingsForm";
import { getAdminStrings } from "@/i18n/admin";
import { getAdminLocale } from "@/lib/admin-locale";
import { mediaOptions } from "@/lib/cms/admin";
import { getSettings } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [settings, media, locale] = await Promise.all([
    getSettings(),
    mediaOptions(),
    getAdminLocale(),
  ]);
  const t = getAdminStrings(locale);

  return (
    <div>
      <header className="mb-8">
        <p className="label">{t.groupSite}</p>
        <h1 className="display mt-2 text-3xl">{t.settingsTitle}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">{t.settingsIntro}</p>
      </header>
      <SettingsForm settings={settings} media={media} t={t} />
    </div>
  );
}
