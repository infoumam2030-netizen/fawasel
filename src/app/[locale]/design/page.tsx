import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Search } from "lucide-react";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { NavLink } from "@/components/ui/NavLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { FormLab } from "@/components/design/FormLab";
import { MotionLab } from "@/components/design/MotionLab";
import { SpecGrid, SpecSection, Specimen, StateRow } from "@/components/design/Spec";
import { Swatch } from "@/components/design/Swatch";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Internal review surface — never indexed. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const SECTION_IDS = [
  "color",
  "typography",
  "spacing",
  "border",
  "elevation",
  "glow",
  "buttons",
  "badges",
  "cards",
  "forms",
  "headings",
  "navigation",
  "loading",
  "motion",
  "hover",
  "responsive",
] as const;

const COLORS = [
  { token: "--color-ink", value: "#08080A", usage: "usage.ground" },
  { token: "--color-surface", value: "#101014", usage: "usage.panels" },
  { token: "--color-surface-raised", value: "#16161C", usage: "usage.raised" },
  { token: "--color-foreground", value: "#EDEDF2", contrast: "17.15:1", usage: "usage.body" },
  { token: "--color-muted", value: "#8E8E9C", contrast: "6.19:1", usage: "usage.secondary" },
  { token: "--color-faint", value: "#5E5E6C", contrast: "3.14:1", usage: "usage.decorative" },
  { token: "--color-border", value: "#26262F", usage: "usage.hairline" },
  { token: "--color-border-strong", value: "#3A3A47", usage: "usage.hover" },
  { token: "--color-lavender", value: "#7136C0", contrast: "2.85:1", usage: "usage.brandFill" },
  { token: "--color-lavender-soft", value: "#AC85F2", contrast: "7.04:1", usage: "usage.brandText" },
  { token: "--color-lavender-deep", value: "#4A1F85", usage: "usage.pressed" },
  { token: "--color-success", value: "#4FBF8B", usage: "usage.published" },
  { token: "--color-warning", value: "#E0A33E", usage: "usage.draft" },
  { token: "--color-danger", value: "#E4585B", usage: "usage.error" },
];

const USAGE: Record<string, { ar: string; en: string }> = {
  "usage.ground": { ar: "خلفية الصفحة", en: "Page ground" },
  "usage.panels": { ar: "الألواح والبطاقات", en: "Panels and cards" },
  "usage.raised": { ar: "سطح مرتفع", en: "Raised surface" },
  "usage.body": { ar: "النص الأساسي", en: "Body text" },
  "usage.secondary": { ar: "نص ثانوي", en: "Secondary text" },
  "usage.decorative": { ar: "زخرفي / نص كبير", en: "Decorative / large text" },
  "usage.hairline": { ar: "حدّ شعري", en: "Hairline border" },
  "usage.hover": { ar: "حدّ عند المرور", en: "Border on hover" },
  "usage.brandFill": { ar: "تعبئة وتوهّج وعناوين كبيرة", en: "Fills, glow, large display" },
  "usage.brandText": { ar: "نص بلون العلامة", en: "Accent text" },
  "usage.pressed": { ar: "حالة الضغط", en: "Pressed state" },
  "usage.published": { ar: "منشور", en: "Published" },
  "usage.draft": { ar: "مسودة", en: "Draft" },
  "usage.error": { ar: "خطأ", en: "Error" },
};

const TYPE_SCALE = [
  { token: "text-display", className: "text-display" },
  { token: "text-h1", className: "text-h1" },
  { token: "text-h2", className: "text-h2" },
  { token: "text-h3", className: "text-h3" },
  { token: "text-h4", className: "text-h4" },
  { token: "text-body-lg", className: "text-body-lg font-light" },
  { token: "text-body", className: "text-body font-light" },
  { token: "text-body-sm", className: "text-body-sm font-light" },
  { token: "text-caption", className: "text-caption font-light" },
  { token: "text-label", className: "text-label uppercase" },
];

const SPACING = [2, 3, 4, 6, 8, 12, 16, 20, 24];

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("design");
  const isArabic = locale === "ar";
  const usage = (key: string) => (isArabic ? USAGE[key].ar : USAGE[key].en);
  const sampleText = isArabic ? "نرصد بدقة. ونصنع الأثر." : "We observe. We create impact.";

  return (
    <Container className="py-14 sm:py-20">
      {/* ---------------------------------------------------------------- */}
      <header className="flex flex-col gap-4 pb-12">
        <p className="text-label uppercase text-lavender-soft">{t("phase")}</p>
        <h1 className="text-h1 text-balance text-foreground">{t("title")}</h1>
        <p className="max-w-2xl text-body-lg text-muted">{t("subtitle")}</p>
      </header>

      {/* Contents ------------------------------------------------------- */}
      <nav aria-label={t("toc")} className="border-y border-border-soft py-5">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="text-caption text-muted transition-colors duration-200 hover:text-lavender-soft"
              >
                {t(`sections.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-16 pt-12">
        {/* COLOUR ------------------------------------------------------- */}
        <SpecSection id="color" title={t("sections.color")} note={t("notes.color")}>
          <div className="grid gap-3 sm:grid-cols-2">
            {COLORS.map((c) => (
              <Swatch
                key={c.token}
                token={c.token}
                value={c.value}
                contrast={c.contrast}
                usage={usage(c.usage)}
              />
            ))}
          </div>
        </SpecSection>

        {/* TYPOGRAPHY --------------------------------------------------- */}
        <SpecSection id="typography" title={t("sections.typography")} note={t("notes.typography")}>
          <div className="flex flex-col divide-y divide-border-soft">
            {TYPE_SCALE.map((step) => (
              <div key={step.token} className="flex flex-col gap-2 py-6">
                <code className="latin text-caption text-lavender-soft">{step.token}</code>
                <p className={step.className}>{sampleText}</p>
              </div>
            ))}
            <div className="flex flex-col gap-2 py-6">
              <code className="latin text-caption text-lavender-soft">.latin</code>
              <p className="text-body-lg">
                {isArabic ? "العلامة " : "The brand "}
                <span className="latin font-semibold">PANTHER</span>
                {isArabic ? " تكتب دائمًا بالإنجليزية." : " is always set in Latin."}
              </p>
            </div>
          </div>
        </SpecSection>

        {/* SPACING ------------------------------------------------------ */}
        <SpecSection id="spacing" title={t("sections.spacing")} note={t("notes.spacing")}>
          <div className="flex flex-col gap-3">
            {SPACING.map((step) => (
              <div key={step} className="flex items-center gap-4">
                <code className="latin w-16 shrink-0 text-caption text-lavender-soft">{step}</code>
                <span className="latin w-16 shrink-0 text-caption text-faint">
                  {step * 4}px
                </span>
                <div className="h-3 bg-lavender/45" style={{ width: `${step * 4}px` }} />
              </div>
            ))}
          </div>
        </SpecSection>

        {/* BORDERS ------------------------------------------------------ */}
        <SpecSection id="border" title={t("sections.border")} note={t("notes.border")}>
          <SpecGrid>
            <Specimen token="border-border-soft">
              <div className="size-20 border border-border-soft" />
            </Specimen>
            <Specimen token="border-border">
              <div className="size-20 border border-border" />
            </Specimen>
            <Specimen token="border-border-strong">
              <div className="size-20 border border-border-strong" />
            </Specimen>
            <Specimen token="rounded-none" meta="0px — default">
              <div className="size-20 rounded-none border border-border bg-surface-raised" />
            </Specimen>
            <Specimen token="rounded-xs" meta="2px — small controls">
              <div className="size-20 rounded-xs border border-border bg-surface-raised" />
            </Specimen>
            <Specimen token=".rule-fade">
              <div className="w-full">
                <hr className="rule-fade" />
              </div>
            </Specimen>
          </SpecGrid>
        </SpecSection>

        {/* ELEVATION ---------------------------------------------------- */}
        <SpecSection id="elevation" title={t("sections.elevation")} note={t("notes.elevation")}>
          <SpecGrid>
            <Specimen token="shadow-elev-1">
              <div className="size-24 border border-border bg-surface shadow-elev-1" />
            </Specimen>
            <Specimen token="shadow-elev-2">
              <div className="size-24 border border-border bg-surface shadow-elev-2" />
            </Specimen>
            <Specimen token="shadow-elev-3">
              <div className="size-24 border border-border bg-surface shadow-elev-3" />
            </Specimen>
          </SpecGrid>
        </SpecSection>

        {/* GLOW --------------------------------------------------------- */}
        <SpecSection id="glow" title={t("sections.glow")} note={t("notes.glow")}>
          <SpecGrid>
            <Specimen token="shadow-glow-sm">
              <div className="size-24 border border-lavender/40 bg-surface shadow-glow-sm" />
            </Specimen>
            <Specimen token="shadow-glow-md">
              <div className="size-24 border border-lavender/40 bg-surface shadow-glow-md" />
            </Specimen>
            <Specimen token="shadow-glow-lg">
              <div className="size-24 border border-lavender/40 bg-surface shadow-glow-lg" />
            </Specimen>
          </SpecGrid>
          <div className="relative mt-6 overflow-hidden border border-border-soft bg-surface p-12">
            <div className="glow-field" aria-hidden="true" />
            <p className="relative text-center text-h3 text-foreground">.glow-field</p>
          </div>
        </SpecSection>

        {/* BUTTONS ------------------------------------------------------ */}
        <SpecSection id="buttons" title={t("sections.buttons")} note={t("notes.buttons")}>
          <div className="flex flex-col">
            <StateRow label="primary">
              <Button variant="primary" size="sm">{t("labels.rest")}</Button>
              <Button variant="primary">{t("labels.rest")}</Button>
              <Button variant="primary" size="lg">{t("labels.rest")}</Button>
              <Button variant="primary" disabled>{t("labels.disabled")}</Button>
              <Button variant="primary" isLoading loadingLabel={t("labels.loading")} />
            </StateRow>
            <StateRow label="secondary">
              <Button variant="secondary">{t("labels.rest")}</Button>
              <Button
                variant="secondary"
                iconEnd={<ArrowUpRight className="size-4" aria-hidden="true" />}
              >
                {t("labels.rest")}
              </Button>
              <Button variant="secondary" disabled>{t("labels.disabled")}</Button>
            </StateRow>
            <StateRow label="outline">
              <Button variant="outline">{t("labels.rest")}</Button>
              <Button
                variant="outline"
                iconStart={<Search className="size-4" aria-hidden="true" />}
              >
                {t("labels.rest")}
              </Button>
              <Button variant="outline" disabled>{t("labels.disabled")}</Button>
            </StateRow>
            <StateRow label="ghost">
              <Button variant="ghost">{t("labels.rest")}</Button>
              <Button variant="ghost" disabled>{t("labels.disabled")}</Button>
            </StateRow>
            <StateRow label="danger">
              <Button variant="danger">{t("labels.rest")}</Button>
            </StateRow>
          </div>
        </SpecSection>

        {/* BADGES ------------------------------------------------------- */}
        <SpecSection id="badges" title={t("sections.badges")}>
          <div className="flex flex-wrap gap-3">
            <Badge tone="neutral">neutral</Badge>
            <Badge tone="lavender">lavender</Badge>
            <Badge tone="outline">outline</Badge>
            <Badge tone="success" dot>success</Badge>
            <Badge tone="warning" dot>warning</Badge>
            <Badge tone="danger" dot>danger</Badge>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <StatusBadge status="draft" label={isArabic ? "مسودة" : "Draft"} />
            <StatusBadge status="published" label={isArabic ? "منشور" : "Published"} />
            <StatusBadge status="archived" label={isArabic ? "مؤرشف" : "Archived"} />
          </div>
        </SpecSection>

        {/* CARDS -------------------------------------------------------- */}
        <SpecSection id="cards" title={t("sections.cards")}>
          <div className="grid gap-4 md:grid-cols-3">
            {(["default", "raised", "featured"] as const).map((variant) => (
              <Card key={variant} variant={variant} interactive className="flex flex-col gap-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <code className="latin text-caption text-lavender-soft">{variant}</code>
                  {variant === "featured" && <Badge tone="lavender">{t("demo.featured")}</Badge>}
                </div>
                <h3 className="text-h4 text-foreground">{t("demo.cardTitle")}</h3>
                <p className="text-body-sm text-muted">{t("demo.cardBody")}</p>
              </Card>
            ))}
          </div>
        </SpecSection>

        {/* FORMS -------------------------------------------------------- */}
        <SpecSection id="forms" title={t("sections.forms")}>
          <FormLab
            labels={{
              name: t("form.name"),
              namePlaceholder: t("form.namePlaceholder"),
              email: t("form.email"),
              emailError: t("form.emailError"),
              service: t("form.service"),
              serviceHint: t("form.serviceHint"),
              details: t("form.details"),
              detailsPlaceholder: t("form.detailsPlaceholder"),
              disabled: t("form.disabled"),
              choose: t("form.choose"),
            }}
            submitLabel={isArabic ? "إرسال" : "Submit"}
            loadingLabel={t("labels.loading")}
          />
        </SpecSection>

        {/* SECTION HEADINGS --------------------------------------------- */}
        <SpecSection id="headings" title={t("sections.headings")}>
          <div className="flex flex-col gap-14">
            <SectionHeading
              eyebrow={t("demo.headingEyebrow")}
              label="WHAT WE DO"
              title={t("demo.headingTitle")}
              description={t("demo.headingDescription")}
            />
            <SectionHeading
              align="center"
              eyebrow={t("demo.headingEyebrow")}
              title={t("demo.headingTitle")}
              description={t("demo.headingDescription")}
            />
          </div>
        </SpecSection>

        {/* NAVIGATION --------------------------------------------------- */}
        <SpecSection id="navigation" title={t("sections.navigation")}>
          <div className="flex flex-wrap items-center gap-8 border border-border-soft bg-surface px-6 py-5">
            <NavLink href="/design" isActive>
              {t("labels.active")}
            </NavLink>
            <NavLink href="/design">{t("labels.rest")}</NavLink>
            <NavLink href="/design">{t("labels.hover")}</NavLink>
          </div>
        </SpecSection>

        {/* LOADING ------------------------------------------------------ */}
        <SpecSection id="loading" title={t("sections.loading")} note={t("notes.loading")}>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <code className="latin text-caption text-lavender-soft">Skeleton</code>
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex flex-col gap-4">
              <code className="latin text-caption text-lavender-soft">Spinner</code>
              <div className="flex items-center gap-5 text-muted">
                <Spinner className="size-4" />
                <Spinner className="size-6" />
                <Spinner className="size-8 text-lavender-soft" />
              </div>
            </div>
          </div>
        </SpecSection>

        {/* MOTION ------------------------------------------------------- */}
        <SpecSection id="motion" title={t("sections.motion")} note={t("notes.motion")}>
          <MotionLab
            replayLabel={t("labels.replay")}
            items={[
              { key: "observe", name: "observe", text: t("demo.observe") },
              { key: "focus", name: "focus", text: t("demo.focusStep") },
              { key: "move", name: "move", text: t("demo.move") },
              { key: "impact", name: "impact · textReveal", text: t("demo.impact") },
            ]}
          />
          <p className="mt-6 border-s-2 border-lavender ps-4 text-body-sm text-muted">
            {t("notes.reducedMotion")}
          </p>
        </SpecSection>

        {/* HOVER -------------------------------------------------------- */}
        <SpecSection id="hover" title={t("sections.hover")} note={t("notes.hover")}>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card interactive className="p-6">
              <p className="text-body-sm text-muted">border + lift</p>
            </Card>
            <Card variant="raised" interactive className="group p-6">
              <p className="text-body-sm text-muted transition-colors duration-200 group-hover:text-lavender-soft">
                text shift
              </p>
            </Card>
            <div className="group overflow-hidden border border-border bg-surface">
              <div className="flex h-full items-center justify-center p-6">
                <span className="inline-flex items-center gap-2 text-body-sm text-muted transition-colors duration-200 group-hover:text-foreground">
                  icon travel
                  <ArrowUpRight
                    className="size-4 transition-transform duration-200 ease-panther group-hover:-translate-y-0.5 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </div>
        </SpecSection>

        {/* RESPONSIVE --------------------------------------------------- */}
        <SpecSection id="responsive" title={t("sections.responsive")} note={t("notes.responsive")}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["sm 640", "md 768", "lg 1024", "xl 1280"].map((bp) => (
              <div key={bp} className="border border-border-soft bg-surface p-5">
                <code className="latin text-caption text-lavender-soft">{bp}</code>
              </div>
            ))}
          </div>
        </SpecSection>
      </div>
    </Container>
  );
}
