import { getGsap } from "../gsap";
import { motionTokens } from "../tokens";
import type { MotionPresetVars, MotionTarget } from "../types";
import { applyReducedMotion } from "../utils/reduced-motion";

/** Fade in — opacity only. */
export function fade(target: MotionTarget, vars: MotionPresetVars = {}) {
  const { reduceMotion, ...tweenVars } = vars;

  return getGsap().from(target, {
    autoAlpha: 0,
    duration: motionTokens.duration.base,
    ease: motionTokens.ease.entrance,
    ...applyReducedMotion(tweenVars, reduceMotion),
  });
}
