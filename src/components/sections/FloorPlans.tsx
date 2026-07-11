"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function FloorPlans() {
  const [activeId, setActiveId] = useState(siteConfig.floorPlans[0].id);
  const activePlan = siteConfig.floorPlans.find((p) => p.id === activeId) ?? siteConfig.floorPlans[0];

  return (
    <section id="floor-plans" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="المخططات" title="مخططات الأدوار" className="mb-10" />

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {siteConfig.floorPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActiveId(plan.id)}
              className={cn(
                "rounded-full px-6 py-3 text-sm font-bold transition-colors",
                activeId === plan.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-primary/5 text-primary hover:bg-primary/10"
              )}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePlan.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]"
          >
            <ul className="order-2 flex flex-col gap-3 lg:order-1">
              {activePlan.features.slice(0, Math.ceil(activePlan.features.length / 2)).map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4 text-sm font-semibold text-dark"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="relative order-1 mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/15 lg:order-2">
              <Image src={activePlan.image} alt={activePlan.name} fill className="object-cover" />
            </div>

            <ul className="order-3 flex flex-col gap-3">
              {activePlan.features.slice(Math.ceil(activePlan.features.length / 2)).map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4 text-sm font-semibold text-dark"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
