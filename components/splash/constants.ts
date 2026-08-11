/**
 * Central timing values for the splash sequence.
 * One source of truth so re-timing the story doesn't mean hunting
 * through three components for magic numbers.
 */

export const SPLASH = {
  /** How long the first line stays up before crossfading to the second. */
  secondaryInMs: 1400,

  /** Total time the splash stays mounted before the reveal starts. */
  totalMs: 2800,

  /** Same, but for prefers-reduced-motion — shorter, still readable. */
  reducedMotionMs: 1800,

  /** Duration of the exit transition. */
  exitTransitionS: 0.85,
} as const;
