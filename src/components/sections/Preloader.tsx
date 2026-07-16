"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ParticleField } from "@/components/ui/ParticleField";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 - prev) * 0.13 + 1.2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 500);
          return 100;
        }
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const shouldHide = isDone || prefersReducedMotion === true;
  const clamped = Math.min(progress, 100);

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-navy-deep"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <ParticleField density={40} />
            <div className="absolute inset-0 [background:radial-gradient(circle_at_center,rgba(245,183,49,0.12),transparent_65%)]" />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              className="relative flex h-28 w-28 items-center justify-center"
              animate={{ filter: ["drop-shadow(0 0 0px rgba(245,183,49,0))", "drop-shadow(0 0 26px rgba(245,183,49,0.55))"] }}
              transition={{ duration: 1.8, delay: 1.6 }}
            >
              <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
                <motion.rect
                  x="2"
                  y="4"
                  width="60"
                  height="56"
                  rx="16"
                  fill="none"
                  stroke="#F5B731"
                  strokeWidth="1.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                  d="M9 24c6-1 10-5 14-9M14 22c8 3 22 3 30-2 3-1.5 6-1 8 1"
                  stroke="#EEF2F7"
                  strokeWidth="2.2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.g
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <g transform="translate(24 27) rotate(45)">
                    <path
                      d="M-11 0a4 4 0 0 1 5.4-3.75L-2 0-3.75 1.75l-3.65-3.6A4 4 0 0 1-11 0Zm22 0a4 4 0 0 1-5.4 3.75L11 0l1.75-1.75 3.65 3.6A4 4 0 0 1 11 0Z"
                      fill="#F5940A"
                    />
                    <rect x="-9" y="-1.7" width="18" height="3.4" rx="1.7" fill="#F5940A" />
                  </g>
                </motion.g>
                <motion.g
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.35 }}
                >
                  <circle cx="45" cy="45" r="8" fill="#F5940A" />
                  <circle cx="51" cy="45" r="8" fill="#C7CCD6" />
                </motion.g>
              </svg>
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="font-en text-xl font-extrabold tracking-[0.15em] text-white sm:text-2xl"
            >
              MY CAR <span className="text-gold">CARD</span>
            </motion.span>
          </div>

          <div className="relative flex flex-col items-center gap-3">
            <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10 sm:w-72">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold/60 via-gold to-gold/60"
                style={{ width: `${clamped}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <span className="font-en text-xs tracking-[0.3em] text-white/40">{Math.round(clamped)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
