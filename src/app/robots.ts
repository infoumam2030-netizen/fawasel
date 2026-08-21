import type { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private surfaces — never indexed. Added ahead of the routes themselves
      // so they are covered from the moment they ship.
      disallow: ["/dashboard", "/dashboard/", "/login", "/api/"],
    },
    sitemap: `${appConfig.siteUrl}/sitemap.xml`,
  };
}
