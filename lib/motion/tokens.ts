/**
 * Serian Motion tokens — calm, editorial timing.
 * All presets reference these values; sections must not define ad-hoc durations.
 */
export const motionTokens = {
  duration: {
    instant: 0,
    fast: 0.3,
    base: 0.6,
    slow: 0.9,
    editorial: 1.1,
  },
  ease: {
    out: "power2.out",
    inOut: "power2.inOut",
    entrance: "power1.out",
    hover: "power1.out",
  },
  distance: {
    sm: 12,
    md: 24,
    lg: 40,
  },
  stagger: {
    tight: 0.06,
    base: 0.1,
    relaxed: 0.14,
  },
  scroll: {
    sectionStart: "top 88%",
    sectionEnd: "bottom 60%",
    once: true,
  },
  hover: {
    scale: 1.015,
    duration: 0.28,
  },
} as const;

export type MotionTokens = typeof motionTokens;
