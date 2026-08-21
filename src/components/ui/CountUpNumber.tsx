"use client";

import { useLocale } from "next-intl";
import { useCountUp } from "@/hooks/useCountUp";
import { cn, formatNumber } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

interface CountUpNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Set false for values that should render raw (e.g. "3.4X"). */
  localizeNumber?: boolean;
}

export function CountUpNumber({
  value,
  prefix,
  suffix,
  className,
  localizeNumber = true,
}: CountUpNumberProps) {
  const locale = useLocale() as Locale;
  const { ref, display } = useCountUp({ end: value });
  const formatted = localizeNumber ? formatNumber(Number(display), locale) : display;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
