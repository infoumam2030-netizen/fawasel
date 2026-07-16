"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Icon } from "@/components/ui/IconMap";
import { LogoMark } from "@/components/ui/Logo";
import { viewportOnce } from "@/lib/animations";

const RADIUS = 40;

function nodePosition(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: Number((50 + RADIUS * Math.cos(rad)).toFixed(2)),
    y: Number((50 + RADIUS * Math.sin(rad)).toFixed(2)),
  };
}

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <AuroraBackground className="opacity-60" />
      <Container className="relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={siteConfig.ecosystem.eyebrow}
          title={siteConfig.ecosystem.title}
          description={siteConfig.ecosystem.description}
        />

        <div className="relative mx-auto aspect-square w-full max-w-3xl">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {siteConfig.ecosystem.nodes.map((node, i) => {
              const pos = nodePosition(node.angle);
              return (
                <motion.line
                  key={node.id}
                  x1={50}
                  y1={50}
                  x2={pos.x}
                  y2={pos.y}
                  stroke="url(#ecosystemLineGradient)"
                  strokeWidth={0.25}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
            <defs>
              <linearGradient id="ecosystemLineGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F5B731" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#F5B731" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          >
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-navy-deep ring-2 ring-gold/40 sm:h-28 sm:w-28">
              <div className="absolute inset-0 rounded-full bg-gold/15 blur-xl animate-pulse-slow" />
              <LogoMark className="relative h-12 w-12 sm:h-14 sm:w-14" />
            </div>
            <span className="font-en text-[11px] font-bold tracking-widest text-gold sm:text-xs">
              {siteConfig.ecosystem.center}
            </span>
          </motion.div>

          {siteConfig.ecosystem.nodes.map((node, i) => {
            const pos = nodePosition(node.angle);
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.12 }}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              >
                <div className="glass-navy flex h-12 w-12 items-center justify-center rounded-2xl text-gold shadow-lg sm:h-14 sm:w-14">
                  <Icon name={node.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="whitespace-nowrap text-[10px] font-semibold text-white/70 sm:text-xs">
                  {node.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
