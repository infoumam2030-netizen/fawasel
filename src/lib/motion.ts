import type { Transition, Variants } from "framer-motion";

/**
 * ===========================================================================
 * PANTHER MOTION PRIMITIVES
 * ===========================================================================
 *
 * The brand's narrative is OBSERVE → FOCUS → MOVE → IMPACT, and the motion
 * language names its primitives after it:
 *
 *   observe  something emerges from darkness — opacity and blur only
 *   focus    it sharpens and settles — scale converges on 1
 *   move     it travels with intent — inline translation, direction-aware
 *   impact   it lands — a fast clip reveal, the most decisive of the four
 *
 * Rules: fast, controlled, never bouncy, never decorative for its own sake.
 * Only transform/opacity/filter are animated, so everything stays on the
 * compositor. Every variant ends in its resting state, which is what makes
 * `prefers-reduced-motion` safe — disabling motion never hides content.
 * ===========================================================================
 */

/** Mirrors the CSS duration tokens in globals.css, in seconds. */
export const DURATION = {
  instant: 0.12,
  fast: 0.2,
  base: 0.34,
  slow: 0.56,
} as const;

/** Two easings only. Entrance/movement, and the sharper impact landing. */
type Easing = readonly [number, number, number, number];

export const EASE: Record<"panther" | "impact", Easing> = {
  panther: [0.22, 1, 0.36, 1],
  impact: [0.16, 0.9, 0.24, 1],
};

const transition = (duration: number, ease: Easing = EASE.panther): Transition => ({
  duration,
  ease: [...ease],
});

/** Reveal once, slightly before the element is fully in view. */
export const viewportOnce = { once: true, margin: "-72px 0px -72px 0px" } as const;

/* --- OBSERVE ------------------------------------------------------------ */

/** Emergence from darkness. No movement — presence only. */
export const observe: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: transition(DURATION.slow) },
};

/* --- FOCUS -------------------------------------------------------------- */

/** Sharpening into place. The workhorse for headings and copy. */
export const focus: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transition(DURATION.base) },
};

/* --- MOVE --------------------------------------------------------------- */

/**
 * Inline travel. `direction` is +1 to enter from the inline start and -1 from
 * the inline end; pass the value from `useInlineDirection()` so the motion
 * mirrors correctly under RTL rather than always sliding from the left.
 */
export const move = (direction: 1 | -1 = 1, distance = 40): Variants => ({
  hidden: { opacity: 0, x: direction * distance },
  visible: { opacity: 1, x: 0, transition: transition(DURATION.base) },
});

/* --- IMPACT ------------------------------------------------------------- */

/** A decisive clip reveal for imagery and large blocks. */
export const impact: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.5 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: transition(DURATION.slow, EASE.impact),
  },
};

/** Masked line-by-line text reveal. Apply to a wrapper with overflow hidden. */
export const textReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: transition(DURATION.slow, EASE.impact) },
};

/* --- Supporting --------------------------------------------------------- */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition(DURATION.base) },
};

/** Orchestrates children. Keep stagger tight — this brand is not leisurely. */
export const stagger = (each = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: each, delayChildren } },
});

/** Named registry, so `<Reveal variant="impact" />` stays type-safe. */
export const REVEAL_VARIANTS = { observe, focus, impact, textReveal, fadeIn } as const;

export type RevealVariant = keyof typeof REVEAL_VARIANTS;
