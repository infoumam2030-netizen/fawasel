import { publicQuery, TAGS, unwrap, type Row } from "./cache";

export type SeoMetadata = Row<"seo_metadata">;

/**
 * Per-entity SEO overrides. Pages fall back to the entity's own seo_title /
 * seo_description, then to the site defaults, so a missing row is normal.
 */
export const getSeoMetadata = publicQuery<SeoMetadata[]>(
  "seo-metadata",
  [TAGS.seo],
  [],
  async (supabase) => unwrap(await supabase.from("seo_metadata").select("*"), "seo-metadata", [])
);

export function seoForPage(rows: SeoMetadata[], key: string) {
  return rows.find((r) => r.entity_type === "page" && r.entity_key === key) ?? null;
}

export function seoForEntity(rows: SeoMetadata[], type: string, id: string) {
  return rows.find((r) => r.entity_type === type && r.entity_id === id) ?? null;
}
