"use client";

import { motion } from "framer-motion";
import { Target, Eye as EyeIcon } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/IconMap";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-soft-gray py-24 sm:py-32">
      <div
        className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_2px_2px,rgba(10,15,61,0.08)_1px,transparent_0)] [background-size:26px_26px]"
        aria-hidden="true"
      />

      <Container className="relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={siteConfig.story.eyebrow}
          title={siteConfig.story.title}
          description={siteConfig.story.description}
          dark
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-navy/10 bg-white p-8 shadow-xl shadow-navy/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-gold">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-navy">رسالتنا</h3>
              <p className="mt-3 leading-relaxed text-navy/70">{siteConfig.story.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-navy/10 bg-navy p-8 shadow-xl shadow-navy/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-navy">
                <EyeIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-white">رؤيتنا</h3>
              <p className="mt-3 leading-relaxed text-white/70">{siteConfig.story.vision}</p>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <div
            className="absolute top-6 hidden h-[2px] w-full bg-gradient-to-l from-navy/10 via-gold/40 to-navy/10 md:block"
            aria-hidden="true"
          />
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-10 md:grid-cols-4"
          >
            {siteConfig.story.timeline.map((item) => (
              <motion.div key={item.id} variants={fadeUp} className="relative flex flex-col gap-3">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-navy font-en text-sm font-extrabold text-gold ring-4 ring-soft-gray">
                  {item.year}
                </div>
                <h4 className="font-heading text-lg font-bold text-navy">{item.title}</h4>
                <p className="text-sm leading-relaxed text-navy/65">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {siteConfig.story.values.map((value) => (
            <motion.div
              key={value.id}
              variants={fadeUp}
              className="group flex flex-col gap-4 rounded-3xl border border-navy/10 bg-white p-6 transition-colors hover:border-gold/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-gold/15 group-hover:text-gold">
                <Icon name={value.icon} className="h-5 w-5" />
              </div>
              <h4 className="font-heading text-lg font-bold text-navy">{value.title}</h4>
              <p className="text-sm leading-relaxed text-navy/60">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
