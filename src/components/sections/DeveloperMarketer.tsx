"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building, Handshake } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

const PARTIES = [
  {
    id: "developer",
    role: "المطوّر العقاري",
    name: siteConfig.developerName,
    logo: "/images/logos/developer-logo.svg",
    icon: Building,
    description:
      "فواصل المستقبل، المطوّر العقاري لمشروع تاون هاوس القادسية، يقدّم مفهوم الميني كومباوند الخاص بمعايير تصميم وتنفيذ عالية الجودة.",
  },
  {
    id: "marketer",
    role: "المسوّق الحصري",
    name: siteConfig.exclusiveMarketerName,
    logo: "/images/logos/marketer-logo.svg",
    icon: Handshake,
    description:
      "أمم العقارية هي الجهة المسوّقة الحصرية للمشروع، وتتولى إدارة كافة الاستفسارات والحجوزات والتنسيق مع العملاء.",
  },
];

export function DeveloperMarketer() {
  return (
    <section className="bg-dark py-24 sm:py-32">
      <Container>
        <SectionHeading
          light
          eyebrow="شركاء المشروع"
          title="المطوّر والمسوّق الحصري"
          description="جهتان موثوقتان تقفان خلف تاون هاوس القادسية، من التطوير إلى التسويق والمبيعات."
          className="mb-14"
        />

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2"
        >
          {PARTIES.map((party) => (
            <motion.div key={party.id} variants={fadeUp}>
              <GlassCard dark className="flex h-full flex-col gap-6 p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                      <party.icon className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gold">{party.role}</p>
                      <h3 className="font-heading text-2xl font-bold text-white">{party.name}</h3>
                    </div>
                  </div>
                  <div className="relative h-14 w-28 shrink-0">
                    <Image src={party.logo} alt={party.name} fill sizes="112px" className="object-contain" />
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">{party.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
