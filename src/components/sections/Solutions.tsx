"use client";

import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/IconMap";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Solutions() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-soft-gray py-24 sm:py-32">
      <Container className="relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={siteConfig.solutions.eyebrow}
          title={siteConfig.solutions.title}
          description={siteConfig.solutions.description}
          dark
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {siteConfig.solutions.items.map((item) => (
            <motion.div key={item.id} variants={fadeUp} className="group">
              <TiltCard className="h-full">
                <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-navy/8 bg-white p-7 shadow-lg shadow-navy/5 transition-colors group-hover:border-gold/40">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold transition-transform duration-300 group-hover:scale-110">
                      <Icon name={item.icon} className="h-6 w-6" />
                    </div>
                    <ArrowUpLeft className="h-4 w-4 text-navy/25 transition-colors group-hover:text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/60">{item.description}</p>
                  </div>
                  {item.metric && (
                    <div className="border-t border-navy/8 pt-4">
                      <span className="font-en text-lg font-extrabold text-navy">{item.metric}</span>
                      <span className="ms-2 text-xs text-navy/50">{item.metricLabel}</span>
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
