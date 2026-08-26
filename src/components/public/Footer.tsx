import Link from "next/link";

import { DataTicks, TechLabel } from "@/components/ui/Decor";
import type { UiStrings } from "@/i18n/strings";
import type { Locale, NavigationItem, SiteSettings, SocialLink } from "@/lib/cms/types";
import { pick } from "@/lib/locale";
import { whatsappLink } from "@/lib/utils";

export function Footer({
  settings,
  navigation,
  socials,
  locale,
  copy,
  strings,
}: {
  settings: SiteSettings;
  navigation: NavigationItem[];
  socials: SocialLink[];
  locale: Locale;
  copy: (key: string) => string;
  strings: UiStrings;
}) {
  return (
    <footer className="grain relative border-t border-[var(--color-line)] bg-ink">
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <p className="display text-2xl">{copy("hero.name")}</p>
          <p className="label mt-2">{copy("hero.title")}</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{copy("footer.statement")}</p>
          <DataTicks className="mt-8 h-4" />
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <TechLabel>{strings.navigation}</TechLabel>
          <ul className="mt-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-offwhite"
                >
                  {pick(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <TechLabel>{strings.connect}</TechLabel>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${settings.email}`} className="text-muted transition-colors hover:text-offwhite">
                {settings.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(settings.whatsapp)}
                target="_blank"
                rel="noreferrer noopener"
                dir="ltr"
                className="text-muted transition-colors hover:text-offwhite"
              >
                {settings.whatsapp}
              </a>
            </li>
          </ul>
          {socials.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[0.6875rem] uppercase tracking-[0.16em] text-dim transition-colors hover:text-accent"
                  >
                    {pick(social.label, locale)}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8 lg:px-12">
          <TechLabel>
            © {new Date().getFullYear()} {copy("hero.name")} · {strings.rights}
          </TechLabel>
          <TechLabel className="flex items-center gap-2">
            <span className="animate-tick inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {strings.systemStatus}
          </TechLabel>
        </div>
      </div>
    </footer>
  );
}
