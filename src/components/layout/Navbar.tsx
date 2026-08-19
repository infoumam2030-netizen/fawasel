"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 32);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        isScrolled
          ? "border-white/10 bg-navy/95 py-4 backdrop-blur-md"
          : "border-transparent bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <Link href="#hero" className="text-lg font-semibold tracking-tight text-white">
          {siteConfig.projectName}
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/75 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton variant="gold" size="sm" label="احجز وحدتك" />
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-deep-navy lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="text-lg font-semibold text-white">{siteConfig.projectName}</span>
              <button onClick={() => setIsMenuOpen(false)} aria-label="إغلاق القائمة" className="text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 pt-16">
              {siteConfig.nav.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-medium text-white transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * siteConfig.nav.length, duration: 0.5 }}
                className="pt-4"
              >
                <WhatsAppButton variant="gold" size="lg" label="احجز وحدتك" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
