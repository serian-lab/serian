import { getGsap } from "../gsap";
import { motionTokens } from "../tokens";
import type { MotionScrollVars, MotionTarget } from "../types";
import { applyReducedMotion } from "../utils/reduced-motion";
import { createSectionScrollTrigger } from "../utils/scroll";

/** Staggered group reveal for lists, grids, or chapter stacks. */
export function staggerReveal(target: MotionTarget, vars: MotionScrollVars = {}) {
  const {
    reduceMotion,
    y = motionTokens.distance.md,
    stagger = motionTokens.stagger.base,
    duration = motionTokens.duration.base,
    scrollTrigger,
    ...tweenVars
  } = vars;

  return getGsap().from(target, {
    autoAlpha: 0,
    y,
    duration,
    stagger,
    ease: motionTokens.ease.entrance,
    scrollTrigger: createSectionScrollTrigger(
      typeof target === "string" ? target : target,
      scrollTrigger,
    ),
    ...applyReducedMotion(tweenVars, reduceMotion),
  });
}
