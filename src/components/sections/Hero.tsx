"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown, Bell, Calendar, CreditCard, Wrench } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { LinkButton } from "@/components/ui/Button";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ParticleField } from "@/components/ui/ParticleField";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const phoneX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const phoneY = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const chipX = useTransform(springX, [-0.5, 0.5], [16, -16]);
  const chipY = useTransform(springY, [-0.5, 0.5], [16, -16]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (prefersReducedMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-navy pt-28 pb-16"
    >
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      <AuroraBackground />
      <ParticleField density={55} className="opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-start">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-full border border-gold/30 bg-gold/10 px-5 py-1.5 text-sm font-semibold tracking-wide text-gold"
          >
            {siteConfig.hero.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl font-extrabold leading-[1.1] text-white sm:text-6xl md:text-7xl"
          >
            {siteConfig.hero.title}
            <br />
            <span className="text-gradient-gold">{siteConfig.hero.highlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl"
          >
            {siteConfig.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-2 flex flex-col items-center gap-4 sm:flex-row"
          >
            <LinkButton href="#final-cta" variant="gold" size="lg">
              {siteConfig.hero.ctaPrimary}
            </LinkButton>
            <LinkButton href="#ecosystem" variant="outline" size="lg">
              {siteConfig.hero.ctaSecondary}
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 lg:justify-start"
          >
            {siteConfig.quickStats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center lg:items-start">
                <span className="font-en text-2xl font-extrabold text-white">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="text-xs text-white/50">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: phoneX, y: phoneY }}
          className="relative mx-auto hidden lg:block"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-gold/10 blur-[100px]" />
          <div className="animate-float">
            <PhoneMockup>
              <HeroAppScreen />
            </PhoneMockup>
          </div>

          <motion.div
            style={{ x: chipX, y: chipY }}
            className="glass-navy absolute -start-10 top-16 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-xl"
          >
            <Bell className="h-4 w-4 text-gold" />
            <span className="text-xs font-semibold text-white">تم تأكيد الحجز</span>
          </motion.div>

          <motion.div
            style={{ x: chipX, y: chipY }}
            className="glass-navy absolute -end-8 bottom-24 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-xl"
          >
            <CreditCard className="h-4 w-4 text-gold" />
            <span className="text-xs font-semibold text-white">دفع آمن 100%</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#story"
        aria-label={siteConfig.hero.scrollLabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: prefersReducedMotion ? 0 : [0, 10, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 start-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-gold"
      >
        <span className="text-xs tracking-widest">{siteConfig.hero.scrollLabel}</span>
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}

function HeroAppScreen() {
  return (
    <div className="flex h-full flex-col gap-4 p-4 pt-8">
      <div className="flex items-center justify-between">
        <span className="font-en text-xs font-bold tracking-wide text-white">MY CAR CARD</span>
        <Bell className="h-3.5 w-3.5 text-gold" />
      </div>

      <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/15 to-transparent p-4">
        <p className="text-[11px] text-white/60">خصم اليوم</p>
        <p className="mt-1 font-heading text-lg font-extrabold text-gold">30% على الغسيل</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[Wrench, Calendar, CreditCard].map((Ic, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/5 p-3">
            <Ic className="h-4 w-4 text-gold" />
            <span className="h-1.5 w-8 rounded-full bg-white/15" />
          </div>
        ))}
      </div>

      <div className="mt-1 flex-1 rounded-2xl bg-white/[0.04] p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-white/70">حالة الطلب</span>
          <span className="text-[10px] text-gold">جاري التنفيذ</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-gold/60 to-gold" />
        </div>
        <div className="mt-3 space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="h-1.5 flex-1 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-full bg-gold py-2.5 text-center text-[11px] font-bold text-navy">احجز الآن</div>
    </div>
  );
}
