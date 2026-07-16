"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/IconMap";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function PartnerJourney() {
  return (
    <section id="partner-journey" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Container className="relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={siteConfig.partnerJourney.eyebrow}
          title={siteConfig.partnerJourney.title}
          description={siteConfig.partnerJourney.description}
          dark
        />

        <div className="relative">
          <div className="absolute top-6 hidden h-[3px] w-full overflow-hidden rounded-full bg-navy/8 md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "right" }}
              className="h-full w-full bg-gradient-to-l from-gold via-gold/70 to-navy/20"
            />
          </div>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-10 md:grid-cols-3 lg:grid-cols-6"
          >
            {siteConfig.partnerJourney.steps.map((step) => (
              <motion.div key={step.id} variants={fadeUp} className="relative flex flex-col items-center gap-4 text-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold ring-8 ring-white">
                  <Icon name={step.icon} className="h-5 w-5" />
                </div>
                <span className="font-en text-xs font-bold text-gold">{`0${step.step}`}</span>
                <h3 className="font-heading text-base font-bold text-navy">{step.title}</h3>
                <p className="text-xs leading-relaxed text-navy/55">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
