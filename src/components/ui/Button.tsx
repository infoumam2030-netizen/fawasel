"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Spinner } from "@/components/ui/Spinner";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner, disables the control and blocks duplicate submits. */
  isLoading?: boolean;
  loadingLabel?: string;
  /** Rendered before the label in reading order — flips automatically in RTL. */
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/**
 * Sharp geometry, no radius. `primary` is the only variant that carries glow,
 * and only on hover — the brand's energy is spent in one place at a time.
 */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-lavender text-white hover:bg-[#7f43d2] hover:shadow-glow-sm active:bg-lavender-deep",
  secondary: "bg-foreground text-ink hover:bg-white active:bg-foreground",
  outline:
    "border border-border text-foreground hover:border-lavender hover:text-lavender-soft active:border-lavender-deep",
  ghost: "text-muted hover:text-foreground hover:bg-surface-raised",
  danger: "border border-danger/40 text-danger hover:bg-danger/10 hover:border-danger",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-caption gap-2",
  md: "px-7 py-3 text-body-sm gap-2.5",
  lg: "px-9 py-4 text-body gap-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    loadingLabel,
    iconStart,
    iconEnd,
    fullWidth = false,
    disabled,
    children,
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      ref={ref}
      whileHover={isDisabled ? undefined : { y: -1 }}
      whileTap={isDisabled ? undefined : { y: 0, scale: 0.99 }}
      transition={{ duration: DURATION.fast, ease: EASE.panther }}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-none font-medium tracking-wide",
        "transition-[background-color,border-color,color,box-shadow] duration-200 ease-panther",
        "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isLoading ? <Spinner className="size-4" /> : iconStart}
      {isLoading && loadingLabel ? loadingLabel : children}
      {!isLoading && iconEnd}
    </motion.button>
  );
});
