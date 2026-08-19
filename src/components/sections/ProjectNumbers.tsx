"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { staggerContainer, fadeUpSlow, viewportOnce } from "@/lib/animations";

export function ProjectNumbers() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-5 lg:gap-x-8"
        >
          {siteConfig.projectNumbers.map((stat, index) => (
            <motion.div
              key={stat.id}
              variants={fadeUpSlow}
              className={index !== 0 ? "border-t border-border pt-6 lg:border-t-0 lg:border-e lg:pe-8 lg:pt-0" : ""}
            >
              <span className="block text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                <CountUpNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-2 block text-sm text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
