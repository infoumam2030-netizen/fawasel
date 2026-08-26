import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/public/ProjectCard";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Crosshair, DataTicks, TechLabel } from "@/components/ui/Decor";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { UiStrings } from "@/i18n/strings";
import type {
  Client,
  ExperienceEntry,
  Locale,
  Metric,
  Project,
  Service,
  Skill,
  Testimonial,
  Tool,
} from "@/lib/cms/types";
import { pick } from "@/lib/locale";

type Copy = (key: string) => string;

/* ---------------------------------------------------------------- About -- */

export function AboutSection({
  copy,
  image,
  strings,
}: {
  copy: Copy;
  image: string;
  strings: UiStrings;
}) {
  return (
    <Container as="section" id="about" className="relative border-t border-[var(--color-line)] py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border border-[var(--color-line)] bg-graphite">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={copy("hero.name")}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="grid-field h-full w-full opacity-60" aria-hidden />
            )}
            <Crosshair className="-left-1.5 -top-1.5" />
            <Crosshair className="-bottom-1.5 -right-1.5" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <TechLabel>FIG. 01 — PROFILE</TechLabel>
            <DataTicks count={16} className="h-3" />
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionHeading
            index="01"
            eyebrow={copy("about.eyebrow")}
            title={copy("about.heading")}
          />
          <Reveal delay={80}>
            <p className="mt-8 text-lg leading-relaxed text-offwhite/90">{copy("about.lead")}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted">{copy("about.body")}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{copy("about.body2")}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full border border-[var(--color-line-strong)] px-6 py-3 text-[0.6875rem] uppercase tracking-[0.18em] transition-colors hover:border-accent"
              >
                {strings.viewAllWork}
              </Link>
              <Link
                href="/contact"
                className="btn-shine rounded-full bg-[linear-gradient(96deg,var(--accent-from),var(--accent-to))] px-6 py-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[#0a0a0b]"
              >
                {strings.startProject}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Container>
  );
}

/* ------------------------------------------------------------- Services -- */

export function ServicesSection({
  services,
  locale,
  copy,
  limit,
}: {
  services: Service[];
  locale: Locale;
  copy: Copy;
  limit?: number;
}) {
  const shown = limit ? services.slice(0, limit) : services;
  return (
    <Container as="section" id="services" className="border-t border-[var(--color-line)] py-24 lg:py-36">
      <SectionHeading
        index="02"
        eyebrow={copy("services.eyebrow")}
        title={copy("services.heading")}
        intro={copy("services.intro")}
      />
      <ul className="mt-14 grid grid-cols-1 gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((service, i) => (
          <Reveal as="li" key={service.id} delay={(i % 3) * 70} className="group bg-void p-7">
            <div className="flex items-start justify-between">
              <TechLabel>{String(i + 1).padStart(2, "0")}</TechLabel>
              <ArrowUpRight
                className="h-4 w-4 text-dim transition-colors group-hover:text-accent"
                aria-hidden
              />
            </div>
            <h3 className="mt-6 text-base font-semibold tracking-tight">
              {pick(service.title, locale)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {pick(service.shortDescription, locale)}
            </p>
            <span className="accent-rule mt-6 block h-px w-0 opacity-80 transition-all duration-500 group-hover:w-16" />
          </Reveal>
        ))}
      </ul>
    </Container>
  );
}

/* --------------------------------------------------------------- Skills -- */

export function CapabilitiesSection({
  skills,
  tools,
  locale,
  copy,
  strings,
}: {
  skills: Skill[];
  tools: Tool[];
  locale: Locale;
  copy: Copy;
  strings: UiStrings;
}) {
  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const key = pick(skill.category, locale) || "—";
    groups.set(key, [...(groups.get(key) ?? []), skill]);
  }

  return (
    <Container as="section" id="skills" className="border-t border-[var(--color-line)] py-24 lg:py-36">
      <SectionHeading
        index="03"
        eyebrow={copy("skills.eyebrow")}
        title={copy("skills.heading")}
        intro={copy("skills.intro")}
      />

      <div className="mt-14 space-y-px border border-[var(--color-line)] bg-[var(--color-line)]">
        {[...groups.entries()].map(([category, items], groupIndex) => (
          <Reveal key={category} className="grid gap-6 bg-void p-7 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <span className="label text-accent">{String(groupIndex + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{category}</h3>
            </div>
            <ul className="flex flex-wrap gap-2 lg:col-span-9">
              {items.map((skill) => (
                <li
                  key={skill.id}
                  className="rounded-full border border-[var(--color-line-strong)] px-4 py-2 text-xs text-offwhite/85 transition-colors hover:border-accent hover:text-offwhite"
                >
                  {pick(skill.name, locale)}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <TechLabel>{strings.tools}</TechLabel>
        {tools.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <li
                key={tool.id}
                className="glass rounded px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-muted"
              >
                {tool.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-dim">{strings.emptyTools}</p>
        )}
      </div>
    </Container>
  );
}

/* -------------------------------------------------------------- Metrics -- */

export function IntelligenceSection({
  metrics,
  locale,
  copy,
}: {
  metrics: Metric[];
  locale: Locale;
  copy: Copy;
}) {
  return (
    <Container
      as="section"
      id="intelligence"
      className="grain relative border-t border-[var(--color-line)] py-24 lg:py-36"
    >
      <SectionHeading
        index="04"
        eyebrow={copy("intelligence.eyebrow")}
        title={copy("intelligence.heading")}
        intro={copy("intelligence.intro")}
      />
      <dl className="mt-14 grid grid-cols-1 gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <Reveal key={metric.id} delay={(i % 4) * 60} className="relative bg-void p-7">
            <dt className="label text-[0.625rem]">{pick(metric.label, locale)}</dt>
            <dd className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
              <span className="accent-text">
                <CountUp value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
              </span>
            </dd>
            {pick(metric.description, locale) ? (
              <p className="mt-2 text-xs text-muted">{pick(metric.description, locale)}</p>
            ) : null}
            <DataTicks count={12} className="mt-5 h-3" />
          </Reveal>
        ))}
      </dl>
    </Container>
  );
}

/* ------------------------------------------------------------ Work grid -- */

export function WorkSection({
  projects,
  locale,
  copy,
  strings,
  showAllLink = true,
}: {
  projects: Project[];
  locale: Locale;
  copy: Copy;
  strings: UiStrings;
  showAllLink?: boolean;
}) {
  return (
    <Container as="section" id="work" className="border-t border-[var(--color-line)] py-24 lg:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          index="05"
          eyebrow={copy("work.eyebrow")}
          title={copy("work.heading")}
          intro={copy("work.intro")}
        />
        {showAllLink ? (
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-offwhite"
          >
            {strings.viewAllWork}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        ) : null}
      </div>

      {projects.length > 0 ? (
        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 80} className={i % 3 === 0 ? "md:col-span-2" : ""}>
              <ProjectCard
                project={project}
                locale={locale}
                index={i}
                eager={i === 0}
                ctaLabel={strings.viewCaseStudy}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <EmptyState className="mt-14" message={copy("work.empty")} />
      )}
    </Container>
  );
}

/* -------------------------------------------------------------- Clients -- */

export function ClientsSection({
  clients,
  locale,
  copy,
}: {
  clients: Client[];
  locale: Locale;
  copy: Copy;
}) {
  return (
    <Container as="section" id="clients" className="border-t border-[var(--color-line)] py-24 lg:py-36">
      <SectionHeading
        index="06"
        eyebrow={copy("clients.eyebrow")}
        title={copy("clients.heading")}
        intro={copy("clients.intro")}
      />
      {clients.length > 0 ? (
        <ul className="mt-14 grid grid-cols-1 gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => {
            const name = pick(client.name, locale);
            const body = (
              <>
                <div className="flex h-14 items-center">
                  {client.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={client.logo}
                      alt={name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-12 w-auto opacity-70 transition-opacity group-hover:opacity-100"
                    />
                  ) : (
                    <span className="text-base font-medium tracking-tight text-offwhite/85">
                      {name}
                    </span>
                  )}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <TechLabel>{pick(client.industry, locale)}</TechLabel>
                  <TechLabel>{String(i + 1).padStart(2, "0")}</TechLabel>
                </div>
              </>
            );
            return (
              <Reveal as="li" key={client.id} delay={(i % 3) * 60} className="group bg-void p-7">
                {client.website ? (
                  <a href={client.website} target="_blank" rel="noreferrer noopener" className="block">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </Reveal>
            );
          })}
        </ul>
      ) : (
        <EmptyState className="mt-14" message={copy("clients.empty")} />
      )}
    </Container>
  );
}

/* ----------------------------------------------------------- Experience -- */

export function ExperienceSection({
  entries,
  locale,
  copy,
}: {
  entries: ExperienceEntry[];
  locale: Locale;
  copy: Copy;
}) {
  return (
    <Container as="section" id="experience" className="border-t border-[var(--color-line)] py-24 lg:py-36">
      <SectionHeading
        index="07"
        eyebrow={copy("experience.eyebrow")}
        title={copy("experience.heading")}
        intro={copy("experience.intro")}
      />
      {entries.length > 0 ? (
        <ol className="mt-14">
          {entries.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.id}
              delay={(i % 3) * 60}
              className="grid gap-4 border-t border-[var(--color-line)] py-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-3">
                <TechLabel>
                  {entry.startDate} — {entry.endDate || "PRESENT"}
                </TechLabel>
                {pick(entry.location, locale) ? (
                  <p className="mt-1 text-xs text-dim">{pick(entry.location, locale)}</p>
                ) : null}
              </div>
              <div className="lg:col-span-9">
                <h3 className="text-lg font-semibold tracking-tight">{pick(entry.title, locale)}</h3>
                <p className="mt-1 text-sm text-accent">{pick(entry.company, locale)}</p>
                {pick(entry.description, locale) ? (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                    {pick(entry.description, locale)}
                  </p>
                ) : null}
                {pick(entry.achievements, locale) ? (
                  <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-offwhite/80">
                    {pick(entry.achievements, locale)}
                  </p>
                ) : null}
                {entry.skills.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {entry.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-[var(--color-line)] px-3 py-1 text-[0.6875rem] text-muted"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      ) : (
        <EmptyState className="mt-14" message={copy("experience.empty")} />
      )}
    </Container>
  );
}

/* --------------------------------------------------------- Testimonials -- */

export function TestimonialsSection({
  testimonials,
  locale,
  copy,
}: {
  testimonials: Testimonial[];
  locale: Locale;
  copy: Copy;
}) {
  return (
    <Container
      as="section"
      id="testimonials"
      className="border-t border-[var(--color-line)] py-24 lg:py-36"
    >
      <SectionHeading
        index="08"
        eyebrow={copy("testimonials.eyebrow")}
        title={copy("testimonials.heading")}
      />
      {testimonials.length > 0 ? (
        <ul className="mt-14 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <Reveal as="li" key={testimonial.id} delay={(i % 2) * 70} className="bg-void p-8">
              <blockquote className="text-base leading-relaxed text-offwhite/90">
                “{pick(testimonial.quote, locale)}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-line)] pt-5">
                {testimonial.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={testimonial.photo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="text-sm font-medium">{pick(testimonial.name, locale)}</p>
                  <TechLabel>
                    {[pick(testimonial.role, locale), pick(testimonial.company, locale)]
                      .filter(Boolean)
                      .join(" · ")}
                  </TechLabel>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      ) : (
        <EmptyState className="mt-14" message={copy("testimonials.empty")} />
      )}
    </Container>
  );
}
