"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "glass-navy py-3 shadow-lg shadow-navy-deep/30" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="#hero" aria-label={siteConfig.companyNameEn}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href="#final-cta" variant="gold" size="sm">
            كن شريكاً
          </LinkButton>
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="فتح القائمة"
          className="text-white lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-deep/98 backdrop-blur-lg lg:hidden"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setIsMenuOpen(false)} aria-label="إغلاق القائمة" className="text-white">
                <X className="h-7 w-7" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 pt-10">
              {siteConfig.nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-heading text-2xl font-bold text-white transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <LinkButton href="#final-cta" variant="gold" size="lg" className="mt-4" onClick={() => setIsMenuOpen(false)}>
                كن شريكاً
              </LinkButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
