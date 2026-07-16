"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/IconMap";
import { LogoMark } from "@/components/ui/Logo";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Technology() {
  const [activeId, setActiveId] = useState(siteConfig.technology.features[0]?.id);
  const activeFeature = siteConfig.technology.features.find((f) => f.id === activeId) ?? siteConfig.technology.features[0];

  return (
    <section id="technology" className="relative overflow-hidden bg-navy-deep py-24 sm:py-32">
      <div className="grid-lines absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />

      <Container className="relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={siteConfig.technology.eyebrow}
          title={siteConfig.technology.title}
          description={siteConfig.technology.description}
        />

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border border-gold/10 animate-spin-slower"
              style={{ borderStyle: "dashed" }}
              aria-hidden="true"
            />
            <div className="absolute inset-8 rounded-full border border-gold/15 animate-spin-slow" aria-hidden="true" />
            <div className="absolute inset-16 rounded-full border border-white/10" aria-hidden="true" />

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-40 w-40 items-center justify-center rounded-full sm:h-48 sm:w-48"
              style={{
                background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.18), rgba(245,183,49,0.08) 45%, rgba(10,15,61,0.85) 75%)",
                boxShadow: "0 0 80px rgba(245,183,49,0.15), inset 0 0 40px rgba(255,255,255,0.06)",
                border: "1px solid rgba(245,183,49,0.25)",
              }}
            >
              <LogoMark className="h-16 w-16 sm:h-20 sm:w-20" />
            </motion.div>

            {siteConfig.technology.features.map((feature, i) => {
              const angle = (i / siteConfig.technology.features.length) * 2 * Math.PI;
              const radius = 46;
              const x = Number((50 + radius * Math.cos(angle)).toFixed(2));
              const y = Number((50 + radius * Math.sin(angle)).toFixed(2));
              const isActive = feature.id === activeFeature?.id;
              return (
                <motion.button
                  key={feature.id}
                  onMouseEnter={() => setActiveId(feature.id)}
                  onFocus={() => setActiveId(feature.id)}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={cn(
                    "absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300",
                    isActive ? "bg-gold text-navy scale-110 shadow-lg shadow-gold/30" : "glass-navy text-gold"
                  )}
                  aria-label={feature.title}
                >
                  <Icon name={feature.icon} className="h-4 w-4" />
                </motion.button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            {siteConfig.technology.features.map((feature) => {
              const isActive = feature.id === activeFeature?.id;
              return (
                <motion.div
                  key={feature.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  onMouseEnter={() => setActiveId(feature.id)}
                  className={cn(
                    "cursor-default rounded-2xl border p-5 transition-all duration-300",
                    isActive ? "border-gold/40 bg-gold/[0.06]" : "border-white/8 bg-white/[0.02] hover:border-white/15"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                        isActive ? "bg-gold text-navy" : "bg-white/5 text-gold"
                      )}
                    >
                      <Icon name={feature.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/55">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
