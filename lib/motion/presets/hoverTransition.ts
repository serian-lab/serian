import { getGsap } from "../gsap";
import { motionTokens } from "../tokens";
import type { MotionHoverHandle, MotionPresetVars } from "../types";
import { shouldReduceMotion } from "../utils/reduced-motion";

type HoverTransitionVars = MotionPresetVars & {
  scale?: number;
  autoAlpha?: number;
};

/**
 * Subtle hover feedback — returns a kill handle for use inside useGSAP cleanup.
 * Wrap handlers with contextSafe when created after initial useGSAP run.
 */
export function hoverTransition(
  element: Element,
  vars: HoverTransitionVars = {},
): MotionHoverHandle {
  if (shouldReduceMotion(vars.reduceMotion)) {
    return { kill: () => undefined };
  }

  const gsap = getGsap();
  const {
    scale = motionTokens.hover.scale,
    autoAlpha = 1,
    duration = motionTokens.hover.duration,
    ease = motionTokens.ease.hover,
  } = vars;

  const toHover = gsap.quickTo(element, "scale", { duration, ease });
  const toAlpha = gsap.quickTo(element, "autoAlpha", { duration, ease });

  const onEnter = () => {
    toHover(scale);
    toAlpha(autoAlpha);
  };

  const onLeave = () => {
    toHover(1);
    toAlpha(1);
  };

  element.addEventListener("pointerenter", onEnter);
  element.addEventListener("pointerleave", onLeave);

  return {
    kill: () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(element);
    },
  };
}
