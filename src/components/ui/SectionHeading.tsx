"use client";

import { motion } from "framer-motion";
import { fadeUpSlow, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUpSlow}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      {eyebrow && (
        <span className="section-label">
          <span className="gold-rule" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-xl text-base leading-relaxed sm:text-lg", light ? "text-white/70" : "text-muted")}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
