import type { Viewport } from "next";
import Link from "next/link";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import { PantherMark } from "@/components/site/PantherMark";
import { LOCALE_DIRECTION, routing, type Locale } from "@/i18n/routing";
import "./globals.css";

/**
 * Branded 404, localised.
 *
 * Next renders `not-found.tsx` outside the `[locale]` segment and under the
 * pass-through root layout, so this file owns its own document. That is also
 * what keeps the page server-rendered: a `not-found.tsx` nested inside
 * `[locale]` is streamed in as a client-rendered fallback with a bare
 * `<html id="__next_error__">` shell and an empty body.
 *
 * The locale still resolves correctly — `getLocale()` reads it from the
 * request headers set by the next-intl middleware, so /en/... 404s render in
 * English and left-to-right.
 */
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080a",
};

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const dir = LOCALE_DIRECTION[locale] ?? LOCALE_DIRECTION[routing.defaultLocale];
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <html lang={locale} dir={dir} className={`${plexArabic.variable} h-full`}>
      <body className="min-h-full bg-ink text-foreground">
        <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-start justify-center gap-6 px-5 py-20 sm:px-8">
          <PantherMark className="h-16 w-16 text-lavender-deep" />
          <p className="text-6xl font-semibold tracking-tight text-lavender-soft sm:text-8xl">
            {t("code")}
          </p>
          <h1 className="text-2xl font-semibold sm:text-3xl">{t("title")}</h1>
          <p className="max-w-md leading-relaxed text-muted">{t("description")}</p>
          <Link
            href={locale === routing.defaultLocale ? "/" : `/${locale}`}
            className="border border-border px-7 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-lavender hover:text-lavender-soft"
          >
            {t("action")}
          </Link>
        </main>
      </body>
    </html>
  );
}
