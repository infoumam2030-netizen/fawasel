import { ContactSection } from "@/components/public/ContactSection";
import { Hero } from "@/components/public/Hero";
import {
  AboutSection,
  CapabilitiesSection,
  ClientsSection,
  ExperienceSection,
  IntelligenceSection,
  ServicesSection,
  TestimonialsSection,
  WorkSection,
} from "@/components/public/Sections";
import { getStrings } from "@/i18n/strings";
import {
  getClients,
  getContentMap,
  getExperience,
  getFeaturedProjects,
  getMetrics,
  getServices,
  getSettings,
  getSkills,
  getSocialLinks,
  getTestimonials,
  getTools,
} from "@/lib/cms/queries";
import { getLocale, makeCopy, pick } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getLocale();
  const [
    settings,
    content,
    metrics,
    services,
    skills,
    tools,
    projects,
    clients,
    experience,
    testimonials,
    socials,
  ] = await Promise.all([
    getSettings(),
    getContentMap(),
    getMetrics(),
    getServices(),
    getSkills(),
    getTools(),
    getFeaturedProjects(),
    getClients(),
    getExperience(),
    getTestimonials(),
    getSocialLinks(),
  ]);

  const strings = getStrings(locale);
  const copy = makeCopy(content, locale);
  const sections = settings.sections ?? {};
  const enabled = (key: string) => sections[key] !== false;

  return (
    <>
      <Hero
        image={settings.heroImage}
        revealImage={settings.heroRevealImage}
        imageAlt={copy("hero.name")}
        copy={{
          eyebrow: copy("hero.eyebrow"),
          name: copy("hero.name"),
          title: copy("hero.title"),
          descriptor: copy("hero.descriptor"),
          philosophy: copy("hero.philosophy"),
          cta: copy("hero.cta"),
          ctaSecondary: copy("hero.ctaSecondary"),
          scroll: copy("hero.scroll"),
        }}
        metrics={metrics
          .filter((metric) => metric.showInHero)
          .slice(0, 4)
          .map((metric) => ({
            id: metric.id,
            label: pick(metric.label, locale),
            value: metric.value,
            prefix: metric.prefix,
            suffix: metric.suffix,
          }))}
      />

      {enabled("about") ? (
        <AboutSection copy={copy} strings={strings} image={settings.aboutImage} />
      ) : null}
      {enabled("services") ? (
        <ServicesSection services={services} locale={locale} copy={copy} limit={9} />
      ) : null}
      {enabled("skills") ? (
        <CapabilitiesSection
          skills={skills}
          tools={tools}
          locale={locale}
          copy={copy}
          strings={strings}
        />
      ) : null}
      {enabled("intelligence") ? (
        <IntelligenceSection metrics={metrics} locale={locale} copy={copy} />
      ) : null}
      {enabled("work") ? (
        <WorkSection projects={projects} locale={locale} copy={copy} strings={strings} />
      ) : null}
      {enabled("clients") ? (
        <ClientsSection clients={clients} locale={locale} copy={copy} />
      ) : null}
      {enabled("experience") ? (
        <ExperienceSection entries={experience} locale={locale} copy={copy} />
      ) : null}
      {enabled("testimonials") ? (
        <TestimonialsSection testimonials={testimonials} locale={locale} copy={copy} />
      ) : null}
      {enabled("contact") ? (
        <ContactSection
          settings={settings}
          services={services}
          socials={socials}
          locale={locale}
          copy={copy}
          strings={strings}
        />
      ) : null}
    </>
  );
}
