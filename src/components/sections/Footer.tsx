"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpLeft } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, XIcon, LinkedinIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { buildTelLink } from "@/lib/utils";

const SOCIAL_ICON_MAP = {
  instagram: InstagramIcon,
  twitter: XIcon,
  linkedin: LinkedinIcon,
  tiktok: TikTokIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("اشتراك في النشرة البريدية")}&body=${encodeURIComponent(email)}`;
  }

  return (
    <footer className="relative overflow-hidden bg-navy-deep pt-20 text-white/70">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <Container>
        <div className="grid gap-12 border-b border-white/8 pb-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-2">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed">{siteConfig.tagline}</p>
            <form onSubmit={handleSubscribe} className="mt-3 flex max-w-sm items-center gap-2">
              <label htmlFor="footer-email" className="sr-only">البريد الإلكتروني</label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus-visible:border-gold/50 focus-visible:outline-none"
              />
              <button
                type="submit"
                aria-label="اشترك"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-navy transition-transform hover:scale-105"
              >
                <ArrowUpLeft className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-lg font-bold text-white">روابط سريعة</h4>
            {siteConfig.nav.map((link) => (
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
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm transition-colors hover:text-gold">
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
            <span className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              {siteConfig.address}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-lg font-bold text-white">تابعنا</h4>
            <div className="flex items-center gap-3">
              {siteConfig.socialLinks.map((social) => {
                const IconComponent = SOCIAL_ICON_MAP[social.icon as keyof typeof SOCIAL_ICON_MAP];
                if (!IconComponent) return null;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-white/45 sm:flex-row">
          <p>© {year} {siteConfig.companyNameEn}. جميع الحقوق محفوظة.</p>
          <p>منصة سعودية تدعم رؤية المملكة 2030</p>
        </div>
      </Container>
    </footer>
  );
}
