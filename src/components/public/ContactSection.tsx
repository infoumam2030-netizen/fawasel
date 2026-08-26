import { Mail, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/public/ContactForm";
import { Container } from "@/components/ui/Container";
import { DataTicks, TechLabel } from "@/components/ui/Decor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { UiStrings } from "@/i18n/strings";
import type { Locale, Service, SiteSettings, SocialLink } from "@/lib/cms/types";
import { pick } from "@/lib/locale";
import { whatsappLink } from "@/lib/utils";

export function ContactSection({
  settings,
  services,
  socials,
  locale,
  copy,
  strings,
}: {
  settings: SiteSettings;
  services: Service[];
  socials: SocialLink[];
  locale: Locale;
  copy: (key: string) => string;
  strings: UiStrings;
}) {
  return (
    <Container as="section" id="contact" className="border-t border-[var(--color-line)] py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            index="09"
            eyebrow={copy("contact.eyebrow")}
            title={copy("contact.heading")}
            intro={copy("contact.intro")}
          />
          <Reveal delay={80} className="mt-10 space-y-px border border-[var(--color-line)] bg-[var(--color-line)]">
            <a
              href={`mailto:${settings.email}`}
              className="group flex items-center gap-4 bg-void p-5 transition-colors hover:bg-graphite"
            >
              <Mail className="h-4 w-4 text-accent" aria-hidden />
              <span>
                <TechLabel>{strings.email}</TechLabel>
                <span className="block text-sm text-offwhite">{settings.email}</span>
              </span>
            </a>
            <a
              href={whatsappLink(settings.whatsapp)}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-4 bg-void p-5 transition-colors hover:bg-graphite"
            >
              <MessageCircle className="h-4 w-4 text-accent" aria-hidden />
              <span>
                <TechLabel>{strings.whatsapp}</TechLabel>
                <span className="block text-sm text-offwhite" dir="ltr">
                  {settings.whatsapp}
                </span>
              </span>
            </a>
          </Reveal>

          {socials.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="glass inline-block rounded-full px-4 py-2 text-[0.6875rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-offwhite"
                  >
                    {pick(social.label, locale)}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <DataTicks className="mt-10 h-4" />
        </div>

        <Reveal delay={120} className="lg:col-span-7">
          <ContactForm
            strings={strings}
            successMessage={copy("contact.success")}
            services={services.map((service) => pick(service.title, locale))}
          />
        </Reveal>
      </div>
    </Container>
  );
}
