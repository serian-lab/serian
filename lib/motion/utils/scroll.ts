import type { ScrollTrigger } from "gsap/ScrollTrigger";

import { getScrollTrigger } from "../gsap";
import { motionTokens } from "../tokens";
import type { MotionTarget } from "../types";

/** Default scroll trigger for section reveals — once, calm entry. */
export function createSectionScrollTrigger(
  trigger: MotionTarget,
  overrides?: ScrollTrigger.Vars,
): ScrollTrigger.Vars {
  return {
    trigger: trigger as ScrollTrigger.Vars["trigger"],
    start: motionTokens.scroll.sectionStart,
    end: motionTokens.scroll.sectionEnd,
    toggleActions: "play none none none",
    once: motionTokens.scroll.once,
    ...overrides,
  };
}

/** Recalculate ScrollTrigger positions after layout changes. */
export function refreshScrollTriggers(): void {
  if (typeof window === "undefined") {
    return;
  }

  getScrollTrigger().refresh();
}
