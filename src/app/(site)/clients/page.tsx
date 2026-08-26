import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { ClientsSection, TestimonialsSection } from "@/components/public/Sections";
import { getClients, getContentMap, getTestimonials } from "@/lib/cms/queries";
import { getLocale, makeCopy } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContentMap(), getLocale()]);
  const copy = makeCopy(content, locale);
  return { title: copy("clients.heading"), description: copy("clients.intro") };
}

export default async function ClientsPage() {
  const locale = await getLocale();
  const [content, clients, testimonials] = await Promise.all([
    getContentMap(),
    getClients(),
    getTestimonials(),
  ]);
  const copy = makeCopy(content, locale);

  return (
    <>
      <PageHeader
        eyebrow={copy("clients.eyebrow")}
        title={copy("clients.heading")}
        intro={copy("clients.intro")}
      />
      <ClientsSection clients={clients} locale={locale} copy={copy} />
      <TestimonialsSection testimonials={testimonials} locale={locale} copy={copy} />
    </>
  );
}
