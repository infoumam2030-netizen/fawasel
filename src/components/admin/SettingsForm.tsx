"use client";

import { Loader2, Save } from "lucide-react";
import { useActionState } from "react";

import { saveSettingsAction, type ActionState } from "@/app/admin/actions";
import { MediaPicker, type MediaOption } from "@/components/admin/MediaPicker";
import type { SiteSettings } from "@/lib/cms/types";

export function SettingsForm({
  settings,
  media,
}: {
  settings: SiteSettings;
  media: MediaOption[];
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    saveSettingsAction,
    {},
  );

  const sectionKeys = Object.keys(settings.sections ?? {});

  return (
    <form action={formAction} className="space-y-10 pb-24">
      <section>
        <h2 className="admin-label border-b border-[var(--color-line)] pb-2">SEO & sharing</h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          <div>
            <label className="admin-label" htmlFor="siteTitle-en">
              Site title · EN
            </label>
            <input
              id="siteTitle-en"
              name="siteTitle.en"
              defaultValue={settings.siteTitle.en}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="siteTitle-ar">
              Site title · AR
            </label>
            <input
              id="siteTitle-ar"
              name="siteTitle.ar"
              defaultValue={settings.siteTitle.ar}
              dir="rtl"
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="siteDescription-en">
              Description · EN
            </label>
            <textarea
              id="siteDescription-en"
              name="siteDescription.en"
              rows={3}
              defaultValue={settings.siteDescription.en}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="siteDescription-ar">
              Description · AR
            </label>
            <textarea
              id="siteDescription-ar"
              name="siteDescription.ar"
              rows={3}
              dir="rtl"
              defaultValue={settings.siteDescription.ar}
              className="admin-input"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="admin-label" htmlFor="keywords">
              Keywords
            </label>
            <input
              id="keywords"
              name="keywords"
              defaultValue={settings.keywords}
              className="admin-input"
            />
          </div>
          <MediaPicker name="ogImage" label="OG image" defaultValue={settings.ogImage} library={media} />
          <div>
            <label className="admin-label" htmlFor="favicon">
              Favicon path
            </label>
            <input
              id="favicon"
              name="favicon"
              defaultValue={settings.favicon}
              className="admin-input"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="admin-label border-b border-[var(--color-line)] pb-2">Contact & language</h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          <div>
            <label className="admin-label" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" defaultValue={settings.email} className="admin-input" />
          </div>
          <div>
            <label className="admin-label" htmlFor="whatsapp">
              WhatsApp
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              defaultValue={settings.whatsapp}
              dir="ltr"
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="defaultLocale">
              Default language
            </label>
            <select
              id="defaultLocale"
              name="defaultLocale"
              defaultValue={settings.defaultLocale}
              className="admin-input"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <h2 className="admin-label border-b border-[var(--color-line)] pb-2">Appearance</h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          <div>
            <label className="admin-label" htmlFor="accentFrom">
              Accent — from
            </label>
            <input
              id="accentFrom"
              name="accentFrom"
              type="color"
              defaultValue={settings.accentFrom}
              className="admin-input h-11 p-1"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="accentTo">
              Accent — to
            </label>
            <input
              id="accentTo"
              name="accentTo"
              type="color"
              defaultValue={settings.accentTo}
              className="admin-input h-11 p-1"
            />
          </div>
          <div>
            <label className="admin-label" htmlFor="visualIntensity">
              Visual intensity ({settings.visualIntensity}%)
            </label>
            <input
              id="visualIntensity"
              name="visualIntensity"
              type="range"
              min={0}
              max={100}
              defaultValue={settings.visualIntensity}
              className="w-full accent-[var(--accent-to)]"
            />
            <p className="mt-1 text-[0.6875rem] text-dim">
              Controls grain, glow and HUD density across the site.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="admin-label border-b border-[var(--color-line)] pb-2">Imagery</h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          <MediaPicker name="heroImage" label="Hero portrait" defaultValue={settings.heroImage} library={media} />
          <MediaPicker
            name="heroRevealImage"
            label="Hero spotlight reveal (optional)"
            defaultValue={settings.heroRevealImage}
            library={media}
          />
          <MediaPicker name="aboutImage" label="About portrait" defaultValue={settings.aboutImage} library={media} />
        </div>
      </section>

      <section>
        <h2 className="admin-label border-b border-[var(--color-line)] pb-2">Homepage sections</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {sectionKeys.map((key) => (
            <li key={key}>
              <label className="inline-flex items-center gap-2 rounded border border-[var(--color-line)] px-3 py-2 text-sm capitalize">
                <input
                  type="checkbox"
                  name={`section.${key}`}
                  defaultChecked={settings.sections[key]}
                  className="h-4 w-4 accent-[var(--accent-to)]"
                />
                {key}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--color-line)] bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <p className="text-xs" role="status">
            {state.error ? (
              <span className="text-accent">{state.error}</span>
            ) : state.ok ? (
              <span className="text-emerald-400">Saved.</span>
            ) : (
              <span className="text-dim">Settings apply site-wide.</span>
            )}
          </p>
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
            Save settings
          </button>
        </div>
      </div>
    </form>
  );
}
