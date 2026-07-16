"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/IconMap";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Container className="relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={siteConfig.industries.eyebrow}
          title={siteConfig.industries.title}
          description={siteConfig.industries.description}
          dark
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {siteConfig.industries.items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group flex flex-col gap-4 rounded-3xl border border-navy/8 bg-soft-gray p-6 transition-colors hover:border-gold/40 hover:bg-navy"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-navy transition-colors group-hover:text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-navy/55 transition-colors group-hover:text-white/60 sm:text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
