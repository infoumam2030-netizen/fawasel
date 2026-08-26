import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { TechLabel } from "@/components/ui/Decor";
import type { Locale, Project } from "@/lib/cms/types";
import { pick } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  locale,
  ctaLabel,
  index,
  eager = false,
  className,
}: {
  project: Project;
  locale: Locale;
  ctaLabel: string;
  index: number;
  eager?: boolean;
  className?: string;
}) {
  const name = pick(project.name, locale);
  const category = pick(project.category, locale);
  const summary = pick(project.summary, locale);
  const results = pick(project.results, locale);

  return (
    <article className={cn("group relative", className)}>
      <Link href={`/projects/${project.slug}`} className="block focus-visible:outline-none">
        <div className="relative aspect-[16/11] overflow-hidden border border-[var(--color-line)] bg-graphite">
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt={name}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
          ) : (
            <div className="grid-field h-full w-full opacity-60" aria-hidden />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,9,11,0.92),transparent_58%)] opacity-90"
          />
          <span className="absolute start-4 top-4 flex items-center gap-2">
            <TechLabel>{String(index + 1).padStart(2, "0")}</TechLabel>
            {category ? (
              <span className="glass rounded-full px-3 py-1 text-[0.625rem] uppercase tracking-[0.16em]">
                {category}
              </span>
            ) : null}
          </span>
          <span className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line-strong)] bg-void/60 opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6 border-t border-[var(--color-line)] pt-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
              {name}
            </h3>
            {summary ? <p className="mt-2 line-clamp-2 text-sm text-muted">{summary}</p> : null}
            {results ? (
              <p className="mt-3 line-clamp-1 text-xs uppercase tracking-[0.14em] text-offwhite/70">
                {results}
              </p>
            ) : null}
          </div>
          <div className="shrink-0 text-end">
            {project.year ? <TechLabel>{project.year}</TechLabel> : null}
            <span className="mt-2 block text-[0.625rem] uppercase tracking-[0.18em] text-accent">
              {ctaLabel}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
