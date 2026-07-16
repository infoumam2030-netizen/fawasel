"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "gold" | "outline" | "ghost" | "navy" | "glass";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gold: "bg-gold text-navy shadow-lg shadow-gold/25 hover:brightness-105",
  outline: "border-2 border-white/25 text-white hover:border-gold/60 hover:text-gold",
  ghost: "text-white/80 hover:text-gold",
  navy: "bg-navy text-white shadow-lg shadow-navy/30 hover:bg-navy-soft",
  glass: "glass text-white hover:border-gold/40",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors focus-visible:outline-none";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

const MotionLink = motion.create(Link);

interface LinkButtonProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function LinkButton({ href, variant = "gold", size = "md", className, children, onClick }: LinkButtonProps) {
  return (
    <MotionLink
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}
    >
      {children}
    </MotionLink>
  );
}
