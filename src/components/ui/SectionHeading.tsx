"use client";

import { motion } from "framer-motion";
import { focus, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Primary-locale eyebrow, e.g. خدماتنا */
  eyebrow?: string;
  /** English counterpart shown alongside it, e.g. WHAT WE DO */
  label?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/**
 * The standard section opener: rule + eyebrow, heading, supporting line.
 * Every public section uses this, which is what keeps the vertical rhythm
 * identical from one section to the next.
 */
export function SectionHeading({
  eyebrow,
  label,
  title,
  description,
  align = "start",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={stagger(0.06)}
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
        <motion.span
          variants={focus}
          className="inline-flex items-center gap-3 text-label uppercase text-lavender-soft"
        >
          <span className="h-px w-8 shrink-0 bg-lavender" aria-hidden="true" />
          {eyebrow}
          {label && <span className="latin text-faint">{label}</span>}
        </motion.span>
      )}

      <motion.div variants={focus}>
        <Heading className="text-h2 text-balance text-foreground">{title}</Heading>
      </motion.div>

      {description && (
        <motion.p
          variants={focus}
          className={cn("max-w-2xl text-body-lg text-muted", align === "center" && "mx-auto")}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
