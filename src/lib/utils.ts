import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LOCALE_TAG, type Locale } from "@/i18n/routing";

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
