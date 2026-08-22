import { unstable_cache } from "next/cache";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";
import type { Database } from "@/types/database.types";

type PublicClient = ReturnType<typeof createPublicClient>;

/**
 * Cache tags, one per content type. A dashboard mutation revalidates only the
 * tag it touched, so publishing a project does not evict the whole site.
 */
export const TAGS = {
  settings: "settings",
  socialLinks: "social-links",
  formOptions: "form-options",
  homepage: "homepage-sections",
  statistics: "statistics",
  services: "services",
  projects: "projects",
  categories: "portfolio-categories",
  clients: "clients",
  packages: "packages",
  testimonials: "testimonials",
  faq: "faq",
  production: "production-capabilities",
  seo: "seo-metadata",
} as const;

export type CacheTag = (typeof TAGS)[keyof typeof TAGS];

/** Public content changes rarely; the dashboard revalidates by tag on write. */
const REVALIDATE_SECONDS = 3600;

/**
 * Wraps a public read in Next's data cache.
 *
 * While Supabase is unconfigured the query is skipped entirely and `fallback`
 * is returned, so every page still renders. That is what lets the site be
 * built and reviewed before the database exists — and, once live, what keeps
 * an outage from turning into a 500 on the marketing site.
 */
export function publicQuery<T>(
  key: string,
  tags: CacheTag[],
  fallback: T,
  query: (supabase: PublicClient) => Promise<T>
): () => Promise<T> {
  const run = unstable_cache(
    async () => {
      if (!isSupabaseConfigured()) return fallback;
      try {
        return await query(createPublicClient());
      } catch (error) {
        // A public page must never surface a database error to a visitor.
        console.error(`[data] ${key} failed:`, error);
        return fallback;
      }
    },
    [key],
    { tags, revalidate: REVALIDATE_SECONDS }
  );

  return run;
}

/** Narrow helper for the common `{ data, error }` shape. */
export function unwrap<T>(result: { data: T | null; error: unknown }, key: string, fallback: T): T {
  if (result.error) {
    console.error(`[data] ${key}:`, result.error);
    return fallback;
  }
  return result.data ?? fallback;
}

export type Tables = Database["public"]["Tables"];
export type Row<T extends keyof Tables> = Tables[T]["Row"];
