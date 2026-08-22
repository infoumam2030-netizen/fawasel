import { publicQuery, TAGS, unwrap, type Row } from "./cache";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";
// Service is owned by ./services — re-declaring it here would make the
// barrel export ambiguous.
import type { Service } from "./services";

export type Project = Row<"projects">;
export type ProjectImage = Row<"project_images">;
export type ProjectResult = Row<"project_results">;
export type PortfolioCategory = Row<"portfolio_categories">;

export type CaseStudy = Project & {
  project_images: ProjectImage[];
  project_results: ProjectResult[];
  services: Service[];
  category: PortfolioCategory | null;
};

export const getPortfolioCategories = publicQuery<PortfolioCategory[]>(
  "portfolio-categories",
  [TAGS.categories],
  [],
  async (supabase) =>
    unwrap(
      await supabase
        .from("portfolio_categories")
        .select("*")
        .eq("is_visible", true)
        .order("order_index"),
      "portfolio-categories",
      []
    )
);

/**
 * Published projects with their category, for the grid and its filters.
 * Filtering happens client-side over this one payload: the whole set is small
 * and it keeps category switching instant rather than a round trip.
 */
export const getPublishedProjects = publicQuery<(Project & { category: PortfolioCategory | null })[]>(
  "projects",
  [TAGS.projects, TAGS.categories],
  [],
  async (supabase) =>
    unwrap(
      await supabase
        .from("projects")
        .select("*, category:portfolio_categories(*)")
        .eq("status", "published")
        .order("order_index"),
      "projects",
      []
    )
);

export const getFeaturedProjects = publicQuery<(Project & { category: PortfolioCategory | null })[]>(
  "featured-projects",
  [TAGS.projects, TAGS.categories],
  [],
  async (supabase) =>
    unwrap(
      await supabase
        .from("projects")
        .select("*, category:portfolio_categories(*)")
        .eq("status", "published")
        .eq("featured", true)
        .order("order_index"),
      "featured-projects",
      []
    )
);

/** Full case study: gallery, metrics, services and category in one round trip. */
export async function getProjectBySlug(slug: string): Promise<CaseStudy | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "*, project_images(*), project_results(*), category:portfolio_categories(*), project_services(services(*))"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(`[data] project ${slug}:`, error);
    return null;
  }
  if (!data) return null;

  const { project_services, ...project } = data;

  return {
    ...project,
    project_images: [...(data.project_images ?? [])].sort((a, b) => a.order_index - b.order_index),
    project_results: [...(data.project_results ?? [])]
      .filter((r) => r.is_visible)
      .sort((a, b) => a.order_index - b.order_index),
    services: (project_services ?? [])
      .map((ps) => ps.services)
      .filter((s): s is Service => Boolean(s)),
  };
}

/**
 * Resolves a slug that has been renamed, so an old URL can 301 rather than
 * 404. Returns the project's current slug, or null when it never existed.
 */
export async function resolveHistoricalSlug(slug: string): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("project_slug_history")
    .select("projects(slug, status)")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data?.projects) return null;
  const project = data.projects as unknown as { slug: string; status: string };
  return project.status === "published" ? project.slug : null;
}

/**
 * Related work: manual curation first, falling back to the same category.
 * Returns an empty array when there is nothing to show, and the section is
 * then hidden entirely rather than rendered empty.
 */
export async function getRelatedProjects(projectId: string, categoryId: string | null, limit = 3) {
  if (!isSupabaseConfigured()) return [];

  const supabase = createPublicClient();

  const { data: curated } = await supabase
    .from("project_related")
    .select("order_index, related:projects!project_related_related_project_id_fkey(*)")
    .eq("project_id", projectId)
    .order("order_index");

  const manual = (curated ?? [])
    .map((r) => r.related as unknown as Project | null)
    .filter((p): p is Project => Boolean(p) && p!.status === "published");

  if (manual.length > 0) return manual.slice(0, limit);
  if (!categoryId) return [];

  const { data: sameCategory } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .eq("category_id", categoryId)
    .neq("id", projectId)
    .order("order_index")
    .limit(limit);

  return sameCategory ?? [];
}

export const getPublishedProjectSlugs = publicQuery<{ slug: string; updated_at: string }[]>(
  "project-slugs",
  [TAGS.projects],
  [],
  async (supabase) =>
    unwrap(
      await supabase.from("projects").select("slug, updated_at").eq("status", "published"),
      "project-slugs",
      []
    )
);
