"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "عن المشروع" },
  { href: "#units", label: "الوحدات" },
  { href: "#floor-plans", label: "المخططات" },
  { href: "#warranty", label: "الضمانات" },
  { href: "#location", label: "الموقع" },
];

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
        isScrolled ? "glass py-3 shadow-lg shadow-primary/5" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="#hero"
          className={cn(
            "font-heading text-lg font-extrabold transition-colors sm:text-xl",
            isScrolled ? "text-dark" : "text-white"
          )}
        >
          {siteConfig.projectName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-gold",
                isScrolled ? "text-dark/80" : "text-white/90"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton size="sm" />
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="فتح القائمة"
          className={cn("lg:hidden", isScrolled ? "text-dark" : "text-white")}
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
            className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setIsMenuOpen(false)} aria-label="إغلاق القائمة" className="text-white">
                <X className="h-7 w-7" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 pt-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-heading text-2xl font-bold text-white transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <WhatsAppButton size="lg" className="mt-4" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
