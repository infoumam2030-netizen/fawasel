"use client";

import { useLocale } from "next-intl";
import { LOCALE_DIRECTION, type Locale } from "@/i18n/routing";

/**
 * Returns +1 in LTR and -1 in RTL, for motion that travels along the inline
 * axis. Pass it to `move()` so a "slides in from the start" animation enters
 * from the left in English and from the right in Arabic, instead of fighting
 * the reading direction.
 */
export function useInlineDirection(): 1 | -1 {
  const locale = useLocale() as Locale;
  return LOCALE_DIRECTION[locale] === "rtl" ? -1 : 1;
}
