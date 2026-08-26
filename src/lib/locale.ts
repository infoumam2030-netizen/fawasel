import type { Locale, Localized } from "@/lib/cms/types";

/** Pure locale helpers — safe to import from client components. */

export const LOCALE_COOKIE = "nedal_locale";
export const LOCALES: Locale[] = ["en", "ar"];

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Picks a language off a localized field, falling back to the other one. */
export function pick(field: Localized | undefined, locale: Locale): string {
  if (!field) return "";
  const value = field[locale]?.trim();
  if (value) return value;
  const other = locale === "en" ? field.ar : field.en;
  return other?.trim() ?? "";
}

/** Builds the `copy("hero.name")` accessor used across the public site. */
export function makeCopy(
  blocks: Record<string, { value: Localized }>,
  locale: Locale,
): (key: string) => string {
  return (key: string) => pick(blocks[key]?.value, locale);
}
