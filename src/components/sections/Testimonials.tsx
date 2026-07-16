"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_70%_20%,rgba(245,183,49,0.08),transparent_55%)]" aria-hidden="true" />

      <Container className="relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={siteConfig.testimonials.eyebrow}
          title={siteConfig.testimonials.title}
          description={siteConfig.testimonials.description}
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 lg:grid-cols-3"
        >
          {siteConfig.testimonials.items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="flex flex-col justify-between gap-8 rounded-3xl border border-white/8 bg-white/[0.03] p-8 transition-colors hover:border-gold/30"
            >
              <Quote className="h-8 w-8 text-gold/40" />
              <p className="text-lg leading-relaxed text-white/85">{item.quote}</p>
              <div className="flex items-center gap-3 border-t border-white/8 pt-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 font-en text-lg font-bold text-gold">
                  {item.avatarInitial}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{item.name}</p>
                  <p className="text-xs text-white/50">
                    {item.role} — {item.business}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
