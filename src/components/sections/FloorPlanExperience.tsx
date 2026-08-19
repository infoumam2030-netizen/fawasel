"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import type { UnitType } from "@/types/unit";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const TYPE_TABS: { id: UnitType; label: string }[] = [
  { id: "apartment", label: "الشقق" },
  { id: "duplex", label: "الدوبلكسات" },
];

export function FloorPlanExperience() {
  const [activeType, setActiveType] = useState<UnitType>("duplex");
  const [activeFloorId, setActiveFloorId] = useState(siteConfig.unitTypes.duplex.floorPlans[0].id);

  const floorPlans = siteConfig.unitTypes[activeType].floorPlans;
  const activeFloor = floorPlans.find((f) => f.id === activeFloorId) ?? floorPlans[0];

  function handleTypeChange(type: UnitType) {
    setActiveType(type);
    setActiveFloorId(siteConfig.unitTypes[type].floorPlans[0].id);
  }

  return (
    <section className="bg-white py-28 sm:py-36">
      <Container>
        <SectionHeading eyebrow="المخططات" title="تجربة مخطط الوحدة" className="mb-12" />

        <div className="mb-10 flex flex-wrap items-center gap-4">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTypeChange(tab.id)}
              className={cn(
                "border px-5 py-2 text-sm font-medium transition-colors",
                activeType === tab.id ? "border-navy bg-navy text-white" : "border-border text-muted hover:border-navy hover:text-navy"
              )}
            >
              {tab.label}
            </button>
          ))}

          <span className="mx-2 hidden h-6 w-px bg-border sm:block" />

          {floorPlans.map((floor) => (
            <button
              key={floor.id}
              onClick={() => setActiveFloorId(floor.id)}
              className={cn(
                "text-sm font-medium transition-colors",
                activeFloorId === floor.id ? "text-gold" : "text-muted hover:text-navy"
              )}
            >
              {floor.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeType}-${activeFloorId}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            <div className="relative aspect-[4/3] border border-border">
              <Image src={activeFloor.image} alt={activeFloor.label} fill className="object-contain p-6" />
            </div>

            <div className="flex flex-col gap-6">
              <span className="section-label">
                <span className="gold-rule" />
                {activeFloor.label}
              </span>
              <ul className="flex flex-col gap-4">
                {activeFloor.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 border-b border-border pb-4 text-navy last:border-b-0">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
