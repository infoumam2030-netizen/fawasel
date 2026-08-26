import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import {
  AboutSection,
  CapabilitiesSection,
  ExperienceSection,
  IntelligenceSection,
} from "@/components/public/Sections";
import { getStrings } from "@/i18n/strings";
import {
  getContentMap,
  getExperience,
  getMetrics,
  getSettings,
  getSkills,
  getTools,
} from "@/lib/cms/queries";
import { getLocale, makeCopy } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContentMap(), getLocale()]);
  const copy = makeCopy(content, locale);
  return { title: copy("about.heading"), description: copy("about.lead") };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const [settings, content, skills, tools, metrics, experience] = await Promise.all([
    getSettings(),
    getContentMap(),
    getSkills(),
    getTools(),
    getMetrics(),
    getExperience(),
  ]);
  const copy = makeCopy(content, locale);
  const strings = getStrings(locale);

  return (
    <>
      <PageHeader
        eyebrow={copy("about.eyebrow")}
        title={copy("about.heading")}
        intro={copy("about.lead")}
      />
      <AboutSection copy={copy} strings={strings} image={settings.aboutImage} />
      <CapabilitiesSection skills={skills} tools={tools} locale={locale} copy={copy} strings={strings} />
      <IntelligenceSection metrics={metrics} locale={locale} copy={copy} />
      <ExperienceSection entries={experience} locale={locale} copy={copy} />
    </>
  );
}
