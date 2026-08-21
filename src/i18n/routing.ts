import { defineRouting } from "next-intl/routing";

/**
 * PANTHER is Arabic-first. Arabic therefore owns the canonical, unprefixed
 * URLs (`/`, `/work/some-project`) and English lives under `/en/...`.
 */
export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "as-needed",
  /**
   * PANTHER is an Arabic-first brand, so `/` must always be Arabic rather
   * than whatever the visitor's browser happens to advertise — many users in
   * the Gulf browse with an en-US `Accept-Language`. Keeping `/` deterministic
   * also keeps canonical URLs and caching predictable. Visitors reach English
   * through the switcher (or `/en` directly).
   */
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/** Writing direction per locale — the single source of truth for `dir`. */
export const LOCALE_DIRECTION: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

/** `lang`/`hreflang` values and the BCP-47 tags used for date/number formatting. */
export const LOCALE_TAG: Record<Locale, string> = {
  // `-u-nu-latn` keeps Western digits in Arabic: the brand writes 450+, not ٤٥٠+.
  ar: "ar-SA-u-nu-latn",
  en: "en-US",
};

export const LOCALE_HREFLANG: Record<Locale, string> = {
  ar: "ar-SA",
  en: "en",
};

export const LOCALE_LABEL: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};
