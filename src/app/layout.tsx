import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";

import { getSettings } from "@/lib/cms/queries";
import { dirFor, getLocale, pick } from "@/lib/i18n";

import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, locale] = await Promise.all([getSettings(), getLocale()]);
  const title = pick(settings.siteTitle, locale);
  const description = pick(settings.siteDescription, locale);
  const base = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    metadataBase: base ? new URL(base) : undefined,
    title: { default: title, template: `%s — NEDAL ELABID` },
    description,
    keywords: settings.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    icons: { icon: settings.favicon || "/favicon.ico" },
    openGraph: {
      type: "profile",
      title,
      description,
      images: settings.ogImage ? [{ url: settings.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: settings.ogImage ? [settings.ogImage] : undefined,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, locale] = await Promise.all([getSettings(), getLocale()]);

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      className={`${jetbrains.variable} ${arabic.variable}`}
      style={
        {
          "--accent-from": settings.accentFrom,
          "--accent-to": settings.accentTo,
          "--accent": settings.accentTo,
          "--visual-intensity": String((settings.visualIntensity ?? 70) / 100),
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
