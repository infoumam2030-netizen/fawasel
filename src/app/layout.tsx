import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Preloader } from "@/components/sections/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const arabicFont = IBM_Plex_Sans_Arabic({
  variable: "--font-body-ar",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const enFont = Plus_Jakarta_Sans({
  variable: "--font-en",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    template: `%s | ${siteConfig.companyNameEn}`,
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
    siteName: siteConfig.companyNameEn,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.companyNameEn }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.companyNameEn,
  alternateName: siteConfig.companyName,
  description: siteConfig.seo.description,
  url: siteConfig.seo.siteUrl,
  logo: siteConfig.seo.ogImage,
  image: siteConfig.seo.ogImage,
  address: {
    "@type": "PostalAddress",
    addressLocality: "الرياض",
    addressCountry: "SA",
  },
  email: siteConfig.email,
  telephone: siteConfig.phoneNumber,
  sameAs: siteConfig.socialLinks.filter((link) => link.url !== "#").map((link) => link.url),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${arabicFont.variable} ${enFont.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-navy text-white">
        <SmoothScrollProvider>
          <Preloader />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
