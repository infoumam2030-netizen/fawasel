"use client";

import { motion } from "framer-motion";
import { Wrench, Droplets, CircleDot, BellRing } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Icon } from "@/components/ui/IconMap";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const NOTIFICATIONS = [
  { icon: Wrench, text: "بدأ الفني بفحص سيارتك", time: "الآن" },
  { icon: Droplets, text: "تم إنهاء الغسيل والتلميع", time: "قبل 5 د" },
  { icon: CircleDot, text: "إطاراتك جاهزة للاستلام", time: "قبل 12 د" },
];

export function MobileApp() {
  return (
    <section id="mobile-app" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_30%_50%,rgba(245,183,49,0.08),transparent_60%)]" aria-hidden="true" />

      <Container className="relative grid items-center gap-16 lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-8 lg:order-1">
          <SectionHeading
            eyebrow={siteConfig.mobileApp.eyebrow}
            title={siteConfig.mobileApp.title}
            description={siteConfig.mobileApp.description}
            align="start"
          />

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-4 sm:grid-cols-2"
          >
            {siteConfig.mobileApp.features.map((feature) => (
              <motion.div key={feature.id} variants={fadeUp} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Icon name={feature.icon} className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{feature.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative order-1 mx-auto lg:order-2">
          <div className="absolute inset-0 -z-10 rounded-full bg-gold/10 blur-[110px]" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, rotate: -6, x: -30 }}
            whileInView={{ opacity: 0.5, rotate: -8, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9 }}
            className="absolute -start-10 top-10 hidden w-48 sm:block"
          >
            <PhoneMockup className="max-w-[180px]">
              <div className="h-full bg-gradient-to-b from-navy-soft to-navy-deep" />
            </PhoneMockup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative animate-float"
          >
            <PhoneMockup>
              <NotificationScreen />
            </PhoneMockup>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function NotificationScreen() {
  return (
    <div className="flex h-full flex-col gap-4 p-4 pt-8">
      <div className="flex items-center justify-between">
        <span className="font-en text-xs font-bold tracking-wide text-white">الإشعارات</span>
        <BellRing className="h-3.5 w-3.5 text-gold" />
      </div>

      <div className="flex flex-col gap-3">
        {NOTIFICATIONS.map((n, i) => (
          <motion.div
            key={n.text}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
            className="flex items-center gap-3 rounded-xl border border-gold/15 bg-white/5 p-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
              <n.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-white">{n.text}</p>
              <p className="text-[10px] text-white/40">{n.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto rounded-2xl bg-white/[0.04] p-3">
        <p className="mb-2 text-[11px] font-semibold text-white/70">تتبع لحظي</p>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`h-1.5 flex-1 rounded-full ${step <= 3 ? "bg-gold" : "bg-white/10"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
