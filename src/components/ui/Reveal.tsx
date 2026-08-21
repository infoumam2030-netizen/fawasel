"use client";

import { motion, type Variants } from "framer-motion";
import { REVEAL_VARIANTS, viewportOnce, type RevealVariant } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  /** Named primitive from the motion system. Defaults to `focus`. */
  variant?: RevealVariant;
  /** Escape hatch for a composed variant, e.g. `move(direction)`. */
  variants?: Variants;
  className?: string;
  delay?: number;
  /** Replay every time the element enters the viewport rather than once. */
  repeat?: boolean;
  as?: "div" | "section" | "li" | "span";
}

export function Reveal({
  children,
  variant = "focus",
  variants,
  className,
  delay = 0,
  repeat = false,
  as = "div",
}: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      variants={variants ?? REVEAL_VARIANTS[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={repeat ? { ...viewportOnce, once: false } : viewportOnce}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
