"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);

  function scrollToUnits() {
    document.getElementById("units")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-navy"
    >
      <motion.div style={{ y: parallaxY }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image src={siteConfig.hero.image} alt={siteConfig.projectName} fill priority className="object-cover" />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/55 to-deep-navy/20" />

      <div className="relative z-10 w-full px-6 pb-20 pt-32 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-label text-white/90"
          >
            <span className="gold-rule" />
            {siteConfig.hero.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {siteConfig.hero.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl"
          >
            {siteConfig.hero.supportingStatement.map((line) => (
              <p key={line} className="text-2xl font-light leading-snug text-white/90 sm:text-3xl">
                {line}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70"
          >
            <span>{siteConfig.hero.unitsLine}</span>
            <span className="hidden h-1 w-1 rounded-full bg-gold sm:block" />
            <span className="font-medium text-gold">{siteConfig.hero.pricingHighlight}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button variant="gold" size="lg" onClick={scrollToUnits}>
              {siteConfig.hero.ctaPrimary}
            </Button>
            <WhatsAppButton
              variant="outline-light"
              size="lg"
              label={siteConfig.hero.ctaSecondary}
              message={`مرحبًا، أرغب بالتواصل بخصوص ${siteConfig.projectName}`}
            />
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={scrollToUnits}
        aria-label="التمرير للأسفل"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: prefersReducedMotion ? 0 : [0, 8, 0] }}
        transition={{ opacity: { delay: 1.1, duration: 0.6 }, y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-gold"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
