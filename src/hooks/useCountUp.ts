"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
}

export function useCountUp({ end, duration = 1.8, decimals = 0 }: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      // Deferred via setTimeout (not called synchronously in the effect
      // body) so this doesn't trip the "no setState in effect" rule, and
      // — critically — so the very first client render still matches the
      // server-rendered "0" instead of jumping straight to `end`, which
      // would otherwise cause a hydration mismatch for anyone with
      // prefers-reduced-motion enabled.
      const timeout = setTimeout(() => setValue(end), 0);
      return () => clearTimeout(timeout);
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration, prefersReducedMotion]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return { ref, display };
}
