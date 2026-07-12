import type { MotionPresetVars } from "../types";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Reads prefers-reduced-motion at call time (client only). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Resolves reduceMotion flag from explicit override or system preference. */
export function shouldReduceMotion(explicit?: boolean): boolean {
  if (explicit === true) {
    return true;
  }

  if (explicit === false) {
    return false;
  }

  return prefersReducedMotion();
}

/** Strips animation timing when reduced motion is active. */
export function applyReducedMotion<T extends MotionPresetVars>(
  vars: T,
  reduceMotion?: boolean,
): T {
  if (!shouldReduceMotion(reduceMotion)) {
    return vars;
  }

  return {
    ...vars,
    duration: 0,
    delay: 0,
    stagger: 0,
    ease: "none",
  };
}
