"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUpSlow, viewportOnce } from "@/lib/animations";

export function Warranties() {
  return (
    <section id="warranties" className="bg-bg py-28 sm:py-36">
      <Container>
        <SectionHeading eyebrow="الضمانات" title="طمأنينة تمتد معك" align="center" className="mb-16 items-center text-center" />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mx-auto flex max-w-4xl flex-col items-stretch sm:flex-row"
        >
          <div className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-border sm:block" />

          {siteConfig.warranties.map((warranty) => (
            <motion.div
              key={warranty.id}
              variants={fadeUpSlow}
              className="relative flex flex-1 flex-col items-center gap-3 bg-bg px-6 py-8 text-center"
            >
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span className="text-5xl font-semibold text-navy">{String(warranty.years).padStart(2, "0")}</span>
              <span className="text-sm text-dark-gold">سنوات</span>
              <span className="text-base text-muted">{warranty.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
