import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PantherMark } from "@/components/site/PantherMark";
import { Reveal } from "@/components/ui/Reveal";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const CHECKLIST = ["routing", "direction", "switcher", "tokens", "assets", "cleanup"] as const;

/**
 * Phase 01 foundation page.
 *
 * This is scaffolding, not the PANTHER homepage. It exists so the bilingual
 * shell can be exercised end to end. The real homepage — all sixteen
 * sections, reading from Supabase — replaces this file in Phase 04.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <Container className="py-20 sm:py-28">
      <Reveal>
        <div className="flex flex-col items-start gap-8">
          <PantherMark className="h-24 w-24 text-foreground sm:h-32 sm:w-32" />
          <div className="flex flex-col gap-3">
            <h1 className="latin text-5xl font-semibold tracking-[0.06em] sm:text-7xl">
              {t("brand.name")}
            </h1>
            <p className="latin text-sm tracking-[0.3em] text-muted sm:text-base">
              {t("brand.business")}
            </p>
          </div>
          <p className="max-w-xl border-s-2 border-lavender ps-5 text-xl leading-relaxed text-foreground sm:text-2xl">
            {t("brand.statement")}
          </p>
          <p className="latin text-xs tracking-[0.32em] text-lavender-soft sm:text-sm">
            {t("brand.motto")}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <section
          aria-labelledby="phase-status"
          className="mt-16 border border-border bg-surface p-6 sm:mt-20 sm:p-8"
        >
          <p className="text-xs font-semibold tracking-[0.16em] text-lavender-soft">
            {t("foundation.phaseLabel")}
          </p>
          <h2 id="phase-status" className="mt-3 text-2xl font-semibold sm:text-3xl">
            {t("foundation.title")}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            {t("foundation.description")}
          </p>

          <h3 className="mt-8 text-xs font-semibold tracking-[0.16em] text-faint">
            {t("foundation.checklistTitle")}
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {CHECKLIST.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm text-muted">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 bg-lavender"
                  aria-hidden="true"
                />
                {t(`foundation.items.${key}`)}
              </li>
            ))}
          </ul>

          <p className="mt-8 border-t border-border-soft pt-5 text-sm text-faint">
            <span className="text-muted">{t("foundation.nextTitle")}: </span>
            {t("foundation.next")}
          </p>
        </section>
      </Reveal>
    </Container>
  );
}
