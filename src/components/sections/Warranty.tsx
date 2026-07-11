"use client";

import { motion } from "framer-motion";
import {
  Pipette,
  Zap,
  Database,
  LayoutPanelTop,
  ShieldCheck,
  Thermometer,
  DoorClosed,
  ArrowUpDown,
  Smartphone,
  Lightbulb,
  Droplets,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

const ICON_MAP: Record<string, LucideIcon> = {
  pipette: Pipette,
  zap: Zap,
  database: Database,
  "layout-panel-top": LayoutPanelTop,
  "shield-check": ShieldCheck,
  thermometer: Thermometer,
  "door-closed": DoorClosed,
  "arrow-up-down": ArrowUpDown,
  smartphone: Smartphone,
  lightbulb: Lightbulb,
  droplets: Droplets,
  "badge-check": BadgeCheck,
};

export function Warranty() {
  return (
    <section id="warranty" className="relative overflow-hidden bg-dark py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <Container className="relative">
        <SectionHeading
          light
          eyebrow="ضمانات فواصل"
          title="ضمانات شاملة تمتد حتى 50 عامًا"
          description="راحة بال طويلة الأمد على أهم عناصر الوحدة، من المواسير إلى الأجهزة الذكية."
          className="mb-14"
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {siteConfig.warrantyItems.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? BadgeCheck;
            return (
              <motion.div
                key={item.id}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass-dark group flex flex-col items-center gap-3 rounded-3xl p-6 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white transition-transform group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="font-heading text-2xl font-extrabold text-gold">
                  {item.years} {item.years === 1 ? "عام" : "أعوام"}
                </span>
                <span className="text-sm font-bold text-white">{item.label}</span>
                <span className="text-xs leading-relaxed text-white/65">{item.description}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
