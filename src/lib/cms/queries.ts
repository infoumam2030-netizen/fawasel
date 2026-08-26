import "server-only";

import { cache } from "react";

import { seedData } from "./defaults";
import { getStore } from "./store";
import type {
  Client,
  CollectionMap,
  CollectionName,
  ExperienceEntry,
  Metric,
  NavigationItem,
  Project,
  Service,
  SiteContentBlock,
  SiteSettings,
  Skill,
  SocialLink,
  Testimonial,
  Tool,
} from "./types";

type Ordered = { order?: number; createdAt: string };

function byOrder<T extends Ordered>(rows: T[]): T[] {
  return [...rows].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.createdAt.localeCompare(b.createdAt),
  );
}

const listAll = cache(async <K extends CollectionName>(collection: K) => {
  const store = await getStore();
  return store.list(collection);
});

/** Every read used by public pages funnels through here. */
export const listCollection = async <K extends CollectionName>(
  collection: K,
): Promise<CollectionMap[K][]> => listAll(collection);

function publishedOnly<T extends { published?: boolean }>(rows: T[]): T[] {
  return rows.filter((row) => row.published !== false);
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const rows = await listAll("site_settings");
  return rows[0] ?? (seedData().site_settings[0] as SiteSettings);
});

export const getContentMap = cache(async (): Promise<Record<string, SiteContentBlock>> => {
  const rows = await listAll("site_content");
  const map: Record<string, SiteContentBlock> = {};
  for (const row of rows) map[row.key] = row;
  return map;
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const rows = publishedOnly(await listAll("projects"));
  return byOrder(rows).sort((a, b) => Number(b.pinned) - Number(a.pinned));
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  return (featured.length > 0 ? featured : projects).slice(0, 6);
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const rows = await listAll("projects");
  return rows.find((p) => p.slug === slug && p.published) ?? null;
});

export const getServices = cache(async (): Promise<Service[]> =>
  byOrder(publishedOnly(await listAll("services"))),
);

export const getSkills = cache(async (): Promise<Skill[]> =>
  byOrder(publishedOnly(await listAll("skills"))),
);

export const getTools = cache(async (): Promise<Tool[]> =>
  byOrder(publishedOnly(await listAll("tools"))),
);

export const getClients = cache(async (): Promise<Client[]> =>
  byOrder(publishedOnly(await listAll("clients"))),
);

export const getExperience = cache(async (): Promise<ExperienceEntry[]> =>
  byOrder(publishedOnly(await listAll("experience"))),
);

export const getTestimonials = cache(async (): Promise<Testimonial[]> =>
  byOrder(publishedOnly(await listAll("testimonials"))),
);

export const getMetrics = cache(async (): Promise<Metric[]> =>
  byOrder(publishedOnly(await listAll("metrics"))),
);

export const getSocialLinks = cache(async (): Promise<SocialLink[]> =>
  byOrder(publishedOnly(await listAll("social_links"))),
);

export const getNavigation = cache(async (): Promise<NavigationItem[]> =>
  byOrder(publishedOnly(await listAll("navigation_items"))),
);
