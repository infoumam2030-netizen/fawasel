"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUpSlow, viewportOnce } from "@/lib/animations";

export function StreetWidths() {
  return (
    <section className="bg-white py-28 sm:py-36">
      <Container>
        <SectionHeading eyebrow="المخطط العمراني" title="مخطط مصمم لحركة أفضل" className="mb-16" />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-10 sm:grid-cols-3"
        >
          {siteConfig.streetWidths.map((street) => (
            <motion.div key={street.id} variants={fadeUpSlow} className="flex flex-col gap-4 border-t border-navy pt-6">
              <span className="text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{street.value}</span>
              <span className="text-sm leading-relaxed text-muted">{street.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
