import { getGsap } from "../gsap";
import { motionTokens } from "../tokens";
import type { MotionScrollVars, MotionTarget } from "../types";
import { applyReducedMotion } from "../utils/reduced-motion";
import { createSectionScrollTrigger } from "../utils/scroll";

/** Large media entrance — scale and fade, transform-only for performance. */
export function imageReveal(target: MotionTarget, vars: MotionScrollVars = {}) {
  const {
    reduceMotion,
    scale = 0.98,
    duration = motionTokens.duration.editorial,
    scrollTrigger,
    ...tweenVars
  } = vars;

  return getGsap().from(target, {
    autoAlpha: 0,
    scale,
    duration,
    ease: motionTokens.ease.out,
    scrollTrigger: createSectionScrollTrigger(
      typeof target === "string" ? target : target,
      scrollTrigger,
    ),
    ...applyReducedMotion(tweenVars, reduceMotion),
  });
}
