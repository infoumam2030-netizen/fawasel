"use client";

import { motion } from "framer-motion";
import { fadeUpSlow, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Arabic (or primary-locale) eyebrow, e.g. خدماتنا */
  eyebrow?: string;
  /** Optional English label shown alongside the eyebrow, e.g. WHAT WE DO */
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  label,
  title,
  description,
  align = "start",
  className,
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
      {(eyebrow || label) && (
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.08em] text-lavender-soft">
          <span className="h-px w-8 bg-lavender" aria-hidden="true" />
          {eyebrow}
          {label && <span className="latin text-faint">{label}</span>}
        </span>
      )}
      <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </motion.div>
  );
}
