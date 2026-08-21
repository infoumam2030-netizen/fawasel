/**
 * Build-time technical constants only.
 *
 * Editable content — brand copy, contact details, SEO defaults, social links
 * — deliberately does NOT live here. It belongs to the CMS (`site_settings`),
 * so it can change without a deployment. Keep this file boring.
 */
export const appConfig = {
  /** Absolute origin, required by `metadataBase`, sitemap and OG tags. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000",
} as const;
