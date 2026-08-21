"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * Foundation button. Sharp geometry, no radius — the PANTHER visual language
 * is built on hard edges. Variant styling is expanded in Phase 02 alongside
 * the rest of the design system.
 */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-lavender text-white hover:bg-lavender-soft hover:text-ink",
  secondary: "bg-foreground text-ink hover:bg-white",
  outline: "border border-border text-foreground hover:border-lavender hover:text-lavender-soft",
  ghost: "text-muted hover:text-foreground",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 font-medium tracking-wide",
        "transition-colors duration-200 focus-visible:outline-none disabled:opacity-50",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
);

Button.displayName = "Button";
