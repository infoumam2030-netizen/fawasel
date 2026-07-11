import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { InstagramIcon, XIcon, SnapchatIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { buildTelLink } from "@/lib/utils";

const SOCIAL_ICON_MAP = {
  instagram: InstagramIcon,
  twitter: XIcon,
  snapchat: SnapchatIcon,
  tiktok: TikTokIcon,
} as const;

const NAV_LINKS = [
  { href: "#about", label: "عن المشروع" },
  { href: "#gallery", label: "معرض الصور" },
  { href: "#units", label: "الوحدات" },
  { href: "#floor-plans", label: "المخططات" },
  { href: "#warranty", label: "الضمانات" },
  { href: "#location", label: "الموقع" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark pt-20 text-white/70">
      <Container>
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <span className="font-heading text-2xl font-extrabold text-white">{siteConfig.projectName}</span>
            <p className="text-sm leading-relaxed">{siteConfig.projectTagline}</p>
            <div className="relative mt-2 h-12 w-40">
              <Image
                src="/images/logos/marketer-logo.svg"
                alt={siteConfig.exclusiveMarketerName}
                fill
                sizes="160px"
                className="object-contain object-right"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-lg font-bold text-white">روابط سريعة</h4>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm transition-colors hover:text-gold">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-lg font-bold text-white">تواصل معنا</h4>
            <a href={buildTelLink(siteConfig.phoneNumber)} className="flex items-center gap-2 text-sm transition-colors hover:text-gold">
              <Phone className="h-4 w-4" />
              {siteConfig.phoneNumber}
            </a>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-colors hover:text-gold"
            >
              <MapPin className="h-4 w-4" />
              {siteConfig.address}
            </a>
            <WhatsAppButton size="sm" className="mt-2 w-fit" />
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-lg font-bold text-white">تابعنا</h4>
            <div className="flex items-center gap-3">
              {siteConfig.socialLinks.map((social) => {
                const Icon = SOCIAL_ICON_MAP[social.icon as keyof typeof SOCIAL_ICON_MAP];
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-white/55 sm:flex-row">
          <p>© {year} {siteConfig.developerName}. جميع الحقوق محفوظة.</p>
          <p>التسويق الحصري: {siteConfig.exclusiveMarketerName}</p>
        </div>
      </Container>
    </footer>
  );
}
