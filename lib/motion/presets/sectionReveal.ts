import type { MotionScrollVars, MotionTarget } from "../types";
import { createSectionScrollTrigger } from "../utils/scroll";
import { fadeUp } from "./fadeUp";

/** Scroll-triggered section entrance — the default reveal for page sections. */
export function sectionReveal(target: MotionTarget, vars: MotionScrollVars = {}) {
  const { scrollTrigger, reduceMotion, ...tweenVars } = vars;

  return fadeUp(target, {
    reduceMotion,
    scrollTrigger: createSectionScrollTrigger(
      typeof target === "string" ? target : target,
      scrollTrigger,
    ),
    ...tweenVars,
  });
}
