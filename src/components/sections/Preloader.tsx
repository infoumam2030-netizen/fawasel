"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site.config";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 - prev) * 0.15 + 1.5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 350);
          return 100;
        }
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const shouldHide = isDone || prefersReducedMotion === true;

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-dark"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-2xl font-extrabold text-white sm:text-3xl"
          >
            {siteConfig.projectName}
          </motion.span>
          <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/10 sm:w-72">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-gold"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="text-sm tracking-widest text-white/50">{Math.round(Math.min(progress, 100))}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
