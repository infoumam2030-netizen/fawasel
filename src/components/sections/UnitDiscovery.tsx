"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { useUnits } from "@/hooks/useUnits";
import { aggregateUnitsByType } from "@/lib/unit-aggregate";
import type { UnitType } from "@/types/unit";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TABS: { id: UnitType; label: string }[] = [
  { id: "apartment", label: "الشقق" },
  { id: "duplex", label: "الدوبلكسات" },
];

export function UnitDiscovery() {
  const [activeType, setActiveType] = useState<UnitType>("apartment");
  const { units, isLoading } = useUnits();

  const info = siteConfig.unitTypes[activeType];
  const aggregate = useMemo(() => aggregateUnitsByType(units, activeType), [units, activeType]);

  return (
    <section id="units" className="bg-bg py-28 sm:py-36">
      <Container>
        <SectionHeading eyebrow="الوحدات" title="اختر المساحة التي تناسبك" className="mb-14" />

        <div className="mb-12 flex gap-10 border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className={cn(
                "relative pb-5 text-lg font-medium transition-colors",
                activeType === tab.id ? "text-navy" : "text-muted hover:text-navy"
              )}
            >
              {tab.label}
              {activeType === tab.id && (
                <motion.span layoutId="unit-tab-underline" className="absolute inset-x-0 -bottom-px h-[2px] bg-gold" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-14 lg:grid-cols-[1fr_1px_1fr] lg:gap-16"
          >
            <div className="flex flex-col gap-8">
              <div>
                <span className="section-label mb-3">
                  <span className="gold-rule" />
                  يبدأ من
                </span>
                {isLoading ? (
                  <Skeleton className="h-12 w-56" />
                ) : (
                  <span className="block text-4xl font-semibold text-navy sm:text-5xl">
                    {formatPrice(aggregate.startingPrice)}
                  </span>
                )}
              </div>

              {info.area && (
                <div className="text-lg text-muted">
                  المساحة: <span className="font-medium text-navy">{info.area} م²</span>
                </div>
              )}

              <p className="text-base font-medium text-dark-gold">{info.highlight}</p>

              {!isLoading && aggregate.count > 0 && (
                <p className="text-sm text-muted">{aggregate.count} وحدة متاحة ضمن هذا التصنيف</p>
              )}
            </div>

            <div className="gold-rule-vertical hidden lg:block" />

            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {info.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-navy">
                  <Check className="h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
