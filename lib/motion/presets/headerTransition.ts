import { getGsap } from "../gsap";
import { motionTokens } from "../tokens";
import type { MotionPresetVars, MotionTarget } from "../types";
import { applyReducedMotion } from "../utils/reduced-motion";

/** Header state transition — opacity and vertical settle. */
export function headerTransition(target: MotionTarget, vars: MotionPresetVars = {}) {
  const {
    reduceMotion,
    y = -motionTokens.distance.sm,
    duration = motionTokens.duration.fast,
    ...tweenVars
  } = vars;

  return getGsap().fromTo(
    target,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      ease: motionTokens.ease.inOut,
      ...applyReducedMotion(tweenVars, reduceMotion),
    },
  );
}
