import type { MetadataRoute } from "next";
import { appConfig } from "@/config/app";
import { LOCALE_HREFLANG, routing, type Locale } from "@/i18n/routing";

/** Arabic is unprefixed; every other locale is served from `/<locale>`. */
function localizedPath(locale: Locale, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const suffix = path === "/" ? "" : path;
  // Guarantees the origin-only case still ends in a slash.
  return new URL(`${prefix}${suffix}` || "/", appConfig.siteUrl).toString();
}

/**
 * Static routes only, for now. Published projects and services are appended
 * from the database in Phase 07, once that content exists.
 */
const STATIC_PATHS = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return STATIC_PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedPath(locale, path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [LOCALE_HREFLANG[l], localizedPath(l, path)])
        ),
      },
    }))
  );
}
