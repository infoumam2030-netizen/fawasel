import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildTelLink } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();
  const { phone } = siteConfig.contact;
  const { googleMapsUrl } = siteConfig.location;

  return (
    <footer className="border-t border-white/10 bg-navy pt-20 text-white/70">
      <Container>
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <span className="text-xl font-semibold text-white">{siteConfig.projectName}</span>
            <p className="text-sm leading-relaxed">{siteConfig.projectType} {siteConfig.projectStatus}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="mb-1 text-sm font-semibold tracking-wide text-gold">التنقل</h4>
            {siteConfig.nav.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm transition-colors hover:text-gold">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="mb-1 text-sm font-semibold tracking-wide text-gold">تواصل معنا</h4>
            {phone ? (
              <a href={buildTelLink(phone)} className="flex items-center gap-2 text-sm transition-colors hover:text-gold">
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            ) : (
              <span className="flex items-center gap-2 text-sm text-white/40">
                <Phone className="h-4 w-4" />
                يُضاف قريبًا
              </span>
            )}
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-gold"
              >
                <MapPin className="h-4 w-4" />
                الموقع على خرائط جوجل
              </a>
            )}
            <WhatsAppButton size="sm" className="mt-2 w-fit" />
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="mb-1 text-sm font-semibold tracking-wide text-gold">عن المشروع</h4>
            <p className="text-sm leading-relaxed text-white/60">{siteConfig.projectDescription}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-white/45 sm:flex-row">
          <p>© {year} {siteConfig.projectName}. جميع الحقوق محفوظة.</p>
          <p>{siteConfig.projectStatus}</p>
        </div>
      </Container>
    </footer>
  );
}
