import { publicQuery, TAGS, unwrap, type Row } from "./cache";

export type HomepageSection = Row<"homepage_sections">;
export type Statistic = Row<"statistics">;
export type Faq = Row<"faq">;
export type ProductionCapability = Row<"production_capabilities">;

/**
 * Homepage section copy, keyed by section_key. The codebase owns which
 * sections exist and how they look; the CMS owns their words, order and
 * visibility.
 */
export const getHomepageSections = publicQuery<HomepageSection[]>(
  "homepage-sections",
  [TAGS.homepage],
  [],
  async (supabase) =>
    unwrap(
      await supabase
        .from("homepage_sections")
        .select("*")
        .eq("is_visible", true)
        .order("order_index"),
      "homepage-sections",
      []
    )
);

/** Convenience lookup — a hidden or missing section simply yields undefined. */
export function sectionByKey(sections: HomepageSection[], key: string) {
  return sections.find((s) => s.section_key === key);
}

export const getStatistics = publicQuery<Statistic[]>(
  "statistics",
  [TAGS.statistics],
  [],
  async (supabase) =>
    unwrap(
      await supabase.from("statistics").select("*").eq("is_visible", true).order("order_index"),
      "statistics",
      []
    )
);

export const getFaq = publicQuery<Faq[]>(
  "faq",
  [TAGS.faq],
  [],
  async (supabase) =>
    unwrap(
      await supabase.from("faq").select("*").eq("is_visible", true).order("order_index"),
      "faq",
      []
    )
);

export const getProductionCapabilities = publicQuery<ProductionCapability[]>(
  "production-capabilities",
  [TAGS.production],
  [],
  async (supabase) =>
    unwrap(
      await supabase
        .from("production_capabilities")
        .select("*")
        .eq("is_visible", true)
        .order("order_index"),
      "production-capabilities",
      []
    )
);
