"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "gold" | "navy" | "outline" | "outline-light" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gold: "bg-gold text-navy hover:bg-light-gold",
  navy: "bg-navy text-white hover:bg-luxury-navy",
  outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy/[0.03]",
  "outline-light": "border border-white/35 text-white hover:border-gold hover:text-gold",
  ghost: "text-navy hover:text-gold",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "navy", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
