import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const bodyFont = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.colors.navy,
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
  "@type": "ResidentialComplex",
  name: siteConfig.projectName,
  description: siteConfig.seo.description,
  url: siteConfig.seo.siteUrl,
  image: siteConfig.seo.ogImage,
  address: {
    "@type": "PostalAddress",
    addressLocality: "الرياض",
    addressCountry: "SA",
  },
  ...(siteConfig.location.coordinates.lat && siteConfig.location.coordinates.lng
    ? {
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.location.coordinates.lat,
          longitude: siteConfig.location.coordinates.lng,
        },
      }
    : {}),
  numberOfUnits: siteConfig.unitsCount,
  ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${bodyFont.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
