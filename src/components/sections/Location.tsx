"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Route,
  Hospital,
  School,
  Trees,
  Landmark,
  Building,
  TrainFront,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { LandmarkItem } from "@/types/config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

const CATEGORY_ICON: Record<LandmarkItem["category"], LucideIcon> = {
  mall: ShoppingBag,
  road: Route,
  hospital: Hospital,
  school: School,
  park: Trees,
  landmark: Landmark,
  government: Building,
  transit: TrainFront,
};

export function Location() {
  return (
    <section id="location" className="bg-bg py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="الموقع"
          title="شمال شرق الرياض — بين القادسية وإشبيلية والرماية"
          description={siteConfig.address}
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-3xl border border-primary/10 shadow-xl shadow-primary/10"
          >
            <iframe
              src={siteConfig.googleMapsEmbedUrl}
              className="h-[380px] w-full lg:h-full lg:min-h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`خريطة موقع ${siteConfig.projectName}`}
            />
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4"
            >
              <Button variant="gold" size="sm">
                <MapPin className="h-4 w-4" />
                فتح في خرائط جوجل
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2"
          >
            {siteConfig.landmarks.map((landmark) => {
              const Icon = CATEGORY_ICON[landmark.category];
              return (
                <motion.div
                  key={landmark.id}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-dark">{landmark.name}</p>
                    <p className="text-xs text-text/50">{landmark.duration}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
