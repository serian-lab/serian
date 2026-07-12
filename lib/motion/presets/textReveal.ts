import { getGsap } from "../gsap";
import { motionTokens } from "../tokens";
import type { MotionScrollVars, MotionTarget } from "../types";
import { applyReducedMotion } from "../utils/reduced-motion";
import { createSectionScrollTrigger } from "../utils/scroll";

/** Editorial text entrance — shorter travel, calm timing. */
export function textReveal(target: MotionTarget, vars: MotionScrollVars = {}) {
  const {
    reduceMotion,
    y = motionTokens.distance.sm,
    duration = motionTokens.duration.slow,
    scrollTrigger,
    ...tweenVars
  } = vars;

  return getGsap().from(target, {
    autoAlpha: 0,
    y,
    duration,
    ease: motionTokens.ease.entrance,
    scrollTrigger: createSectionScrollTrigger(
      typeof target === "string" ? target : target,
      scrollTrigger,
    ),
    ...applyReducedMotion(tweenVars, reduceMotion),
  });
}
