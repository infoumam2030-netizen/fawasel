"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CountUpNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  formatAsNumber?: boolean;
}

export function CountUpNumber({ value, prefix, suffix, className, formatAsNumber = true }: CountUpNumberProps) {
  const { ref, display } = useCountUp({ end: value });
  const formatted = formatAsNumber ? formatNumber(Number(display)) : display;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
