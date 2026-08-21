import type { Locale } from "@/i18n/routing";

/**
 * Bilingual field accessor — the TypeScript counterpart of the `public.i18n`
 * SQL function.
 *
 * Content rows store Arabic in the base column and English in a `_en`
 * sibling. Arabic is always populated; English is optional and falls back to
 * Arabic when missing or blank, so a partially translated CMS never renders
 * an empty heading.
 */
export function pick<T extends Record<string, unknown>, K extends string & keyof T>(
  row: T,
  field: K,
  locale: Locale
): string {
  const base = (row[field] ?? "") as string;
  if (locale !== "en") return base;

  const translated = row[`${field}_en` as keyof T];
  return typeof translated === "string" && translated.trim() !== "" ? translated : base;
}

/** True when a row has a usable English translation for the given field. */
export function hasTranslation<T extends Record<string, unknown>>(
  row: T,
  field: string & keyof T
): boolean {
  const translated = row[`${field}_en` as keyof T];
  return typeof translated === "string" && translated.trim() !== "";
}
