"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, blurReveal, staggerContainer, viewportOnce } from "@/lib/animations";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          variants={blurReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative order-2 aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-primary/20 lg:order-1"
        >
          <Image
            src="/images/gallery/exterior-2.svg"
            alt="مدخل كومباوند تاون هاوس القادسية"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
        </motion.div>

        <div className="order-1 flex flex-col items-start gap-8 lg:order-2">
          <SectionHeading
            align="start"
            eyebrow={siteConfig.developerName}
            title={siteConfig.about.title}
            description={siteConfig.about.description}
          />

          <motion.ul
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {siteConfig.about.highlights.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-white/60 p-4 text-sm font-medium text-text shadow-sm backdrop-blur-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
