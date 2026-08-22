/**
 * Public data access layer.
 *
 * Every public page reads through these functions and nothing else — no
 * component contains a Supabase query, and no component contains content.
 * Each function returns a safe empty value when the database is unreachable
 * or unconfigured, so a page always renders.
 */
export * from "./cache";
export * from "./settings";
export * from "./content";
export * from "./services";
export * from "./portfolio";
export * from "./marketing";
export * from "./seo";
