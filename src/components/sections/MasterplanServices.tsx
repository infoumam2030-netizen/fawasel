"use client";

import { motion } from "framer-motion";
import { Cross, Shield, Trees, GraduationCap, Flame, Waves, Droplet, Zap, Phone, Lamp, CloudRain, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { FacilityItem } from "@/types/config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUpSlow, viewportOnce } from "@/lib/animations";

const ICON_MAP: Record<string, LucideIcon> = {
  cross: Cross,
  shield: Shield,
  trees: Trees,
  "graduation-cap": GraduationCap,
  flame: Flame,
  waves: Waves,
  droplet: Droplet,
  zap: Zap,
  phone: Phone,
  lamp: Lamp,
  "cloud-rain": CloudRain,
};

function FacilityGroup({ title, items, dark }: { title: string; items: FacilityItem[]; dark?: boolean }) {
  return (
    <div>
      <span className="section-label mb-8">
        <span className="gold-rule" />
        {title}
      </span>
      <motion.ul
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3"
      >
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? Shield;
          return (
            <motion.li key={item.id} variants={fadeUpSlow} className="flex flex-col items-start gap-3">
              <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <span className={dark ? "text-sm text-white/85" : "text-sm text-navy"}>{item.label}</span>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

export function MasterplanServices() {
  return (
    <section className="bg-navy py-28 sm:py-36">
      <Container>
        <SectionHeading light eyebrow="المخطط العام" title="كل ما تحتاجه حولك" className="mb-16" />

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <FacilityGroup title="المرافق داخل المخطط" items={siteConfig.facilities} dark />
          <FacilityGroup title="البنية التحتية" items={siteConfig.infrastructure} dark />
        </div>
      </Container>
    </section>
  );
}
