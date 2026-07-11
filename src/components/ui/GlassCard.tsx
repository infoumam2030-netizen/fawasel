"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverLift?: boolean;
  dark?: boolean;
}

export function GlassCard({ className, hoverLift = true, dark = false, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverLift ? { y: -8, boxShadow: "0 24px 48px -12px rgba(107,79,161,0.28)" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "rounded-3xl p-6 shadow-xl shadow-primary/5",
        dark ? "glass-dark text-white" : "glass text-dark",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
