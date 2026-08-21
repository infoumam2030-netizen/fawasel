"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useInlineDirection } from "@/hooks/useInlineDirection";
import { DURATION, impact, move, observe, focus, textReveal } from "@/lib/motion";

/**
 * Replayable demonstrations of the four motion primitives. Each one is keyed
 * on a counter so pressing Replay remounts it and the animation runs again —
 * the only reliable way to review timing side by side.
 */
export function MotionLab({
  replayLabel,
  items,
}: {
  replayLabel: string;
  items: { key: string; name: string; text: string }[];
}) {
  const [run, setRun] = useState(0);
  const direction = useInlineDirection();

  const variantFor = (key: string) =>
    key === "observe" ? observe : key === "focus" ? focus : key === "move" ? move(direction, 56) : impact;

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setRun((n) => n + 1)}
        iconStart={<RotateCcw className="size-3.5" aria-hidden="true" />}
      >
        {replayLabel}
      </Button>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={item.key} className="flex flex-col gap-3">
            <span className="latin text-label uppercase text-faint">{item.name}</span>
            <div className="flex min-h-28 items-center border border-border-soft bg-surface p-6">
              {item.key === "impact" ? (
                // Masked line reveal — the wrapper clips, the inner line travels.
                <span key={run} className="block overflow-hidden">
                  <motion.span
                    variants={textReveal}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.08 }}
                    className="latin block text-h4 tracking-[0.18em] text-lavender-soft"
                  >
                    {item.text}
                  </motion.span>
                </span>
              ) : (
                <motion.p
                  key={run}
                  variants={variantFor(item.key)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.08 }}
                  className="text-h4 text-foreground"
                >
                  {item.text}
                </motion.p>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="latin text-caption text-faint">
        {`observe ${DURATION.slow}s · focus ${DURATION.base}s · move ${DURATION.base}s · impact ${DURATION.slow}s`}
      </p>
    </div>
  );
}
