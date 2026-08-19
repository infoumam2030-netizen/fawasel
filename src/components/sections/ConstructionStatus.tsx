"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { fadeUpSlow, viewportOnce } from "@/lib/animations";

export function ConstructionStatus() {
  const progress = siteConfig.constructionProgress;

  return (
    <section className="bg-deep-navy py-28 sm:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
          <motion.h2
            variants={fadeUpSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-3xl font-semibold leading-[1.25] text-white sm:text-4xl lg:text-5xl"
          >
            نبني اليوم...
            <br />
            لحياة تبدأ غدًا.
          </motion.h2>

          <motion.div
            variants={fadeUpSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-6 border-s border-white/10 ps-8"
          >
            <div>
              <span className="section-label mb-2">
                <span className="gold-rule" />
                الحالة الحالية
              </span>
              <p className="mt-3 text-2xl font-medium text-white">{siteConfig.projectStatus}</p>
            </div>

            {progress !== null && (
              <div className="flex flex-col gap-2">
                <div className="h-1 w-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gold"
                  />
                </div>
                <span className="text-sm text-white/60">نسبة الإنجاز: {progress}%</span>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
