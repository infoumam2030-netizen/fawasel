"use client";

import { motion } from "framer-motion";
import { Building2, CheckCircle2, Clock, XCircle, Tag, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAvailability } from "@/hooks/useAvailability";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";
import { formatPrice, formatArea } from "@/lib/utils";

const STAT_ITEMS = [
  { key: "totalUnits" as const, label: "إجمالي الوحدات", icon: Building2, formatter: (v: number) => <CountUpNumber value={v} /> },
  { key: "available" as const, label: "متاحة", icon: CheckCircle2, formatter: (v: number) => <CountUpNumber value={v} /> },
  { key: "reserved" as const, label: "محجوزة", icon: Clock, formatter: (v: number) => <CountUpNumber value={v} /> },
  { key: "sold" as const, label: "مباعة", icon: XCircle, formatter: (v: number) => <CountUpNumber value={v} /> },
  { key: "startingPrice" as const, label: "السعر يبدأ من", icon: Tag, formatter: (v: number) => formatPrice(v) },
  { key: "averageArea" as const, label: "متوسط المساحة", icon: Ruler, formatter: (v: number) => formatArea(v) },
];

export function AvailabilityDashboard() {
  const { stats, isLoading } = useAvailability();

  return (
    <section id="availability" className="relative overflow-hidden bg-gradient-to-b from-primary via-primary to-accent py-24 sm:py-32">
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:28px_28px]" />

      <Container className="relative">
        <SectionHeading
          light
          eyebrow="لوحة التوفر المباشرة"
          title="تحديث لحظي لحالة الوحدات"
          description="بيانات مرتبطة مباشرة بجداول المبيعات — أي تحديث ينعكس فورًا هنا."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex justify-center">
            {isLoading || !stats ? (
              <Skeleton className="h-40 w-40 rounded-full" />
            ) : (
              <GlassCard dark className="flex flex-col items-center gap-3 p-8">
                <CircularProgress percent={stats.salesProgressPercent} label="نسبة البيع" />
                <span className="text-sm text-white/70">تقدّم المبيعات</span>
              </GlassCard>
            )}
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {STAT_ITEMS.map((item) => (
              <motion.div key={item.key} variants={fadeUp}>
                <GlassCard dark hoverLift={false} className="flex flex-col items-center gap-2 p-5 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold">
                    <item.icon className="h-5 w-5" />
                  </span>
                  {isLoading || !stats ? (
                    <Skeleton className="h-6 w-16" />
                  ) : (
                    <span className="font-heading text-lg font-extrabold text-white sm:text-xl">
                      {item.formatter(stats[item.key])}
                    </span>
                  )}
                  <span className="text-xs text-white/60">{item.label}</span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
