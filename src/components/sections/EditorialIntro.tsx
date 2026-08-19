"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { fadeUpSlow, viewportOnce } from "@/lib/animations";

export function EditorialIntro() {
  const { number, title, description } = siteConfig.editorialIntro;

  return (
    <section id="editorial" className="bg-navy py-28 sm:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[280px_1px_1fr] lg:gap-16">
          <motion.span
            variants={fadeUpSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="font-light leading-none text-gold"
            style={{ fontSize: "clamp(5rem, 12vw, 11rem)" }}
          >
            {number}
          </motion.span>

          <div className="gold-rule-vertical hidden h-full lg:block" />

          <motion.div
            variants={fadeUpSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.12 }}
            className="flex max-w-2xl flex-col gap-8 self-center"
          >
            <h2 className="text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-5xl">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-lg leading-relaxed text-white/70">{description}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
