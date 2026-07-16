"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { LinkButton } from "@/components/ui/Button";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ParticleField } from "@/components/ui/ParticleField";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function FinalCta() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-navy-deep py-28 text-center sm:py-36">
      <AuroraBackground />
      <ParticleField density={50} className="opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-center gap-7"
        >
          <span className="rounded-full border border-gold/30 bg-gold/10 px-5 py-1.5 text-sm font-semibold text-gold">
            {siteConfig.tagline}
          </span>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {siteConfig.finalCta.title}
          </h2>
          <p className="text-lg text-white/70">{siteConfig.finalCta.description}</p>

          <Magnetic>
            <LinkButton href={`mailto:${siteConfig.email}`} variant="gold" size="lg" className="mt-2">
              {siteConfig.finalCta.ctaLabel}
            </LinkButton>
          </Magnetic>
        </motion.div>
      </Container>
    </section>
  );
}
