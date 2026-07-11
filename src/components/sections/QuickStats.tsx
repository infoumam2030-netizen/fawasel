"use client";

import { motion } from "framer-motion";
import { Building2, Layers, Car, Sun, Ruler, Clock } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  units: Building2,
  floors: Layers,
  parking: Car,
  roofs: Sun,
  area: Ruler,
  delivery: Clock,
};

export function QuickStats() {
  return (
    <section className="relative -mt-16 z-20 pb-4">
      <Container>
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 rounded-3xl border border-white/40 bg-white/80 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:grid-cols-3 sm:p-8 lg:grid-cols-6"
        >
          {siteConfig.quickStats.map((stat) => {
            const Icon = ICONS[stat.id] ?? Building2;
            return (
              <motion.div
                key={stat.id}
                variants={fadeUp}
                className="flex flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center transition-colors hover:bg-primary/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-heading text-2xl font-extrabold text-dark sm:text-3xl">
                  {stat.prefix ?? ""}
                  {stat.value > 0 && <CountUpNumber value={stat.value} suffix={stat.suffix} />}
                </span>
                <span className="text-xs font-medium text-text/60 sm:text-sm">{stat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
