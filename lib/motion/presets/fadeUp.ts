import { getGsap } from "../gsap";
import { motionTokens } from "../tokens";
import type { MotionPresetVars, MotionTarget } from "../types";
import { applyReducedMotion } from "../utils/reduced-motion";

/** Fade in with subtle upward movement. */
export function fadeUp(target: MotionTarget, vars: MotionPresetVars = {}) {
  const { reduceMotion, y = motionTokens.distance.md, ...tweenVars } = vars;

  return getGsap().from(target, {
    autoAlpha: 0,
    y,
    duration: motionTokens.duration.base,
    ease: motionTokens.ease.entrance,
    ...applyReducedMotion(tweenVars, reduceMotion),
  });
}
