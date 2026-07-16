"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/IconMap";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Challenges() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 sm:py-32">
      <div className="grid-lines absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <Container className="relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={siteConfig.challenges.eyebrow}
          title={siteConfig.challenges.title}
          description={siteConfig.challenges.description}
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {siteConfig.challenges.items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="group [perspective:1200px]"
            >
              <div className="relative h-56 w-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 [backface-visibility:hidden]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
                    <X className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">{item.problem}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{item.problemDescription}</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/15 to-navy p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gold">{item.solution}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{item.solutionDescription}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-white/35">
                <Icon name={item.icon} className="h-3.5 w-3.5" />
                <span>مرّر للتحويل إلى الحل</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
