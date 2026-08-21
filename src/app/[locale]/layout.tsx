import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { appConfig } from "@/config/app";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LOCALE_DIRECTION, LOCALE_HREFLANG, routing, type Locale } from "@/i18n/routing";
import "../globals.css";

/**
 * IBM Plex Sans Arabic is the supplied brand face and covers Arabic, Latin
 * and numerals in one family — so the site loads exactly one font. Weights
 * are limited to those the design system actually uses.
 */
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08080a",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "meta" });
  const typedLocale = locale as Locale;

  /**
   * Arabic is the default locale and therefore owns the unprefixed URLs;
   * English is served from `/en`. Both are advertised to search engines.
   */
  const languages = Object.fromEntries(
    routing.locales.map((l) => [LOCALE_HREFLANG[l], l === routing.defaultLocale ? "/" : `/${l}`])
  );

  return {
    metadataBase: new URL(appConfig.siteUrl),
    title: { default: t("title"), template: t("titleTemplate") },
    description: t("description"),
    alternates: {
      canonical: typedLocale === routing.defaultLocale ? "/" : `/${typedLocale}`,
      languages: { ...languages, "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "PANTHER",
      locale: LOCALE_HREFLANG[typedLocale].replace("-", "_"),
      title: t("title"),
      description: t("description"),
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Opts this segment into static rendering for the generated locales.
  setRequestLocale(locale);

  const t = await getTranslations("nav");

  return (
    <html
      lang={locale}
      dir={LOCALE_DIRECTION[locale as Locale]}
      className={`${plexArabic.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ink text-foreground">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:inset-inline-start-4 focus:top-4 focus:z-50 focus:bg-lavender focus:px-4 focus:py-2 focus:text-white"
          >
            {t("skipToContent")}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
