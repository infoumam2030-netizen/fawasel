import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Supabase Storage is added as a remote pattern in Phase 03, once the
    // project host is known. Until then only local assets are optimised.
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
