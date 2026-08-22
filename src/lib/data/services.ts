import { publicQuery, TAGS, unwrap, type Row } from "./cache";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";

export type Service = Row<"services">;
export type SubService = Row<"service_subservices">;
export type ServiceWithSubServices = Service & { service_subservices: SubService[] };

export const getPublishedServices = publicQuery<Service[]>(
  "services",
  [TAGS.services],
  [],
  async (supabase) =>
    unwrap(
      await supabase
        .from("services")
        .select("*")
        .eq("status", "published")
        .order("order_index"),
      "services",
      []
    )
);

/**
 * One service with its sub-services. Not cached by tag alone because the key
 * varies by slug; Next caches per-argument via the key array below.
 */
export async function getServiceBySlug(slug: string): Promise<ServiceWithSubServices | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, service_subservices(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(`[data] service ${slug}:`, error);
    return null;
  }
  if (!data) return null;

  const subServices = [...(data.service_subservices ?? [])]
    .filter((s) => s.is_active)
    .sort((a, b) => a.order_index - b.order_index);

  return { ...data, service_subservices: subServices };
}

/** Slugs for generateStaticParams and the sitemap. */
export const getPublishedServiceSlugs = publicQuery<{ slug: string; updated_at: string }[]>(
  "service-slugs",
  [TAGS.services],
  [],
  async (supabase) =>
    unwrap(
      await supabase.from("services").select("slug, updated_at").eq("status", "published"),
      "service-slugs",
      []
    )
);
