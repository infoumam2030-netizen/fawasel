import type { Metadata, Viewport } from "next";
import { Cairo, IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import { Preloader } from "@/components/sections/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const headingFont = Cairo({
  variable: "--font-heading-ar",
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const bodyFont = IBM_Plex_Sans_Arabic({
  variable: "--font-body-ar",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const enFont = Plus_Jakarta_Sans({
  variable: "--font-en",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.colors.primary,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.projectName}`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteConfig.seo.siteUrl,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.projectName,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.projectName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: siteConfig.projectName,
  description: siteConfig.seo.description,
  url: siteConfig.seo.siteUrl,
  image: siteConfig.seo.ogImage,
  address: {
    "@type": "PostalAddress",
    addressLocality: "الرياض",
    addressCountry: "SA",
    streetAddress: siteConfig.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.coordinates.lat,
    longitude: siteConfig.coordinates.lng,
  },
  developer: { "@type": "Organization", name: siteConfig.developerName },
  seller: { "@type": "Organization", name: siteConfig.exclusiveMarketerName },
  telephone: siteConfig.phoneNumber,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${headingFont.variable} ${bodyFont.variable} ${enFont.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <Preloader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
