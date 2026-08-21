"use client";

import { motion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "raised" | "featured" | "bare";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  /** Lifts and brightens the border on hover. Use for anything clickable. */
  interactive?: boolean;
  className?: string;
  as?: "div" | "article" | "li";
}

/**
 * On a black ground a shadow alone reads as nothing, so depth here is a
 * hairline border plus a wide ambient shadow. `featured` is the only variant
 * that glows — reserved for a highlighted package or an active state, never
 * more than one per viewport.
 */
const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "border border-border bg-surface",
  raised: "border border-border bg-surface-raised shadow-elev-2",
  featured:
    "border border-lavender/45 bg-surface shadow-glow-md " +
    "bg-[radial-gradient(120%_100%_at_50%_0%,rgb(113_54_192/0.14),transparent_60%)]",
  bare: "border border-transparent",
};

export function Card({
  children,
  variant = "default",
  interactive = false,
  className,
  as = "div",
}: CardProps) {
  const Component = motion[as];

  return (
    <Component
      whileHover={interactive ? { y: -3 } : undefined}
      transition={{ duration: DURATION.fast, ease: EASE.panther }}
      className={cn(
        "rounded-none",
        VARIANT_CLASSES[variant],
        interactive &&
          "cursor-pointer transition-[border-color,box-shadow] duration-200 ease-panther hover:border-border-strong hover:shadow-elev-2",
        className
      )}
    >
      {children}
    </Component>
  );
}
