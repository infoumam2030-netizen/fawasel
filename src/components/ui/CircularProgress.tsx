"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface CircularProgressProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function CircularProgress({ percent, size = 160, strokeWidth = 12, label }: CircularProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [animatedPercent, setAnimatedPercent] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    const timeout = setTimeout(() => setAnimatedPercent(percent), 100);
    return () => clearTimeout(timeout);
  }, [isInView, percent, prefersReducedMotion]);

  const displayPercent = prefersReducedMotion ? percent : animatedPercent;
  const offset = circumference - (displayPercent / 100) * circumference;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${label ?? "نسبة التقدم"}: ${Math.round(displayPercent)}%`}
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-white/10"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#circularProgressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="circularProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5B731" />
            <stop offset="100%" stopColor="#FFD772" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-heading text-3xl font-extrabold text-gold">{Math.round(displayPercent)}%</span>
        {label && <span className="mt-1 text-xs text-white/60">{label}</span>}
      </div>
    </div>
  );
}
