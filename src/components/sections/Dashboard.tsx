"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUpNumber } from "@/components/ui/CountUpNumber";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { Icon } from "@/components/ui/IconMap";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const CHART_BARS = [38, 52, 46, 61, 58, 70, 66, 78, 74, 88, 82, 96];
const SATISFACTION_METRIC = siteConfig.dashboard.metrics.find((m) => m.id === "satisfaction");
const HEADLINE_METRICS = siteConfig.dashboard.metrics.filter((m) => m.id !== "satisfaction");

export function Dashboard() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 sm:py-32">
      <div className="grid-lines absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />

      <Container className="relative flex flex-col gap-14">
        <SectionHeading
          eyebrow={siteConfig.dashboard.eyebrow}
          title={siteConfig.dashboard.title}
          description={siteConfig.dashboard.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-navy rounded-[2rem] p-6 shadow-2xl shadow-black/30 sm:p-10"
        >
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-4 sm:grid-cols-3"
          >
            {HEADLINE_METRICS.map((metric) => (
              <motion.div
                key={metric.id}
                variants={fadeUp}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Icon name={metric.icon} className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 font-en text-xs font-bold text-emerald-400">
                    {metric.trend}
                  </span>
                </div>
                <p className="mt-4 font-en text-2xl font-extrabold text-white sm:text-3xl">
                  <CountUpNumber value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                </p>
                <p className="mt-1 text-xs text-white/50">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-semibold text-white/70">نمو الحجوزات — آخر 12 شهراً</span>
                <span className="font-en text-xs font-bold text-gold">+32%</span>
              </div>
              <div className="flex h-40 items-end gap-2 sm:h-48">
                {CHART_BARS.map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: `${height}%`, transformOrigin: "bottom" }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-gold/30 to-gold last:from-gold last:to-gold-soft"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              {SATISFACTION_METRIC && (
                <>
                  <CircularProgress percent={SATISFACTION_METRIC.value} size={128} strokeWidth={10} label={SATISFACTION_METRIC.label} />
                  <span className="text-center text-xs text-white/50">{SATISFACTION_METRIC.trend} عن الربع السابق</span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
