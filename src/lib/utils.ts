import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { LOCALE_TAG, type Locale } from "@/i18n/routing";

/**
 * tailwind-merge only knows Tailwind's stock scales. Our design tokens add
 * custom values in namespaces it already arbitrates, so they must be
 * registered — otherwise it misfiles them and drops the wrong class.
 *
 * The failure this prevents is silent and severe: `text-body-sm` looks like a
 * text COLOUR to an unextended merge, so `cn("text-ink", "text-body-sm")`
 * discards `text-ink` and the element inherits its parent colour — which on
 * a light button surface means white text on a white ground.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "body-lg",
            "body",
            "body-sm",
            "caption",
            "label",
          ],
        },
      ],
      shadow: [
        { shadow: ["elev-1", "elev-2", "elev-3", "glow-sm", "glow-md", "glow-lg"] },
      ],
      ease: [{ ease: ["panther", "impact"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number for the given locale.
 *
 * Arabic resolves to `ar-SA-u-nu-latn` (see LOCALE_TAG) so digits stay
 * Western — the brand writes "450+", never "٤٥٠+".
 */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale]).format(value);
}

export function formatPrice(value: number, locale: Locale, currency = "SAR"): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string | Date, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(typeof value === "string" ? new Date(value) : value);
}

/** Builds a wa.me link. The phone number itself always comes from settings. */
export function buildWhatsAppLink(phone: string, message: string): string {
  const sanitized = phone.replace(/[^\d+]/g, "").replace("+", "");
  return `https://wa.me/${sanitized}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}
