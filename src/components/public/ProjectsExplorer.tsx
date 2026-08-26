"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/public/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { UiStrings } from "@/i18n/strings";
import type { Locale, Project } from "@/lib/cms/types";
import { pick } from "@/lib/locale";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

/** Client-side search / category filter / "load more" over published projects. */
export function ProjectsExplorer({
  projects,
  locale,
  strings,
  emptyMessage,
}: {
  projects: Project[];
  locale: Locale;
  strings: UiStrings;
  emptyMessage: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const project of projects) {
      const value = pick(project.category, locale);
      if (value) set.add(value);
    }
    return [...set];
  }, [projects, locale]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const projectCategory = pick(project.category, locale);
      if (category && projectCategory !== category) return false;
      if (!needle) return true;
      const haystack = [
        pick(project.name, locale),
        pick(project.summary, locale),
        projectCategory,
        project.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [projects, locale, query, category]);

  if (projects.length === 0) return <EmptyState message={emptyMessage} />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[var(--color-line)] py-4">
        <ul className="flex flex-wrap gap-2">
          <li>
            <button
              type="button"
              onClick={() => setCategory("")}
              aria-pressed={category === ""}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.6875rem] uppercase tracking-[0.16em] transition-colors",
                category === ""
                  ? "border-accent text-offwhite"
                  : "border-[var(--color-line)] text-muted hover:text-offwhite",
              )}
            >
              {strings.allCategories}
            </button>
          </li>
          {categories.map((value) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => setCategory(value)}
                aria-pressed={category === value}
                className={cn(
                  "rounded-full border px-4 py-2 text-[0.6875rem] uppercase tracking-[0.16em] transition-colors",
                  category === value
                    ? "border-accent text-offwhite"
                    : "border-[var(--color-line)] text-muted hover:text-offwhite",
                )}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>

        <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-dim ltr:left-3 rtl:right-3"
            aria-hidden
          />
          <label className="sr-only" htmlFor="project-search">
            {strings.search}
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder={strings.search}
            className="admin-input ps-10"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState className="mt-12" message={strings.noResults} />
      ) : (
        <>
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
            {filtered.slice(0, visible).map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                index={i}
                eager={i < 3}
                ctaLabel={strings.viewCaseStudy}
              />
            ))}
          </div>
          {filtered.length > visible ? (
            <div className="mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full border border-[var(--color-line-strong)] px-7 py-3 text-[0.6875rem] uppercase tracking-[0.18em] transition-colors hover:border-accent"
              >
                + {filtered.length - visible}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
