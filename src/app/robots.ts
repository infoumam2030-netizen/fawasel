import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: BASE ? `${BASE}/sitemap.xml` : undefined,
  };
}
