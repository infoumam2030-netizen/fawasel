"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AuroraBackground({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <motion.div
        className="absolute -top-1/3 start-[-10%] h-[70vh] w-[70vh] rounded-full bg-gold/20 blur-[120px]"
        animate={prefersReducedMotion ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 end-[-10%] h-[60vh] w-[60vh] rounded-full bg-[#2A3AA8]/30 blur-[130px]"
        animate={prefersReducedMotion ? undefined : { x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] start-1/3 h-[55vh] w-[55vh] rounded-full bg-gold/10 blur-[140px]"
        animate={prefersReducedMotion ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="noise-overlay" />
    </div>
  );
}
