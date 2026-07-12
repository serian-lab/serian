import { getGsap, getScrollTrigger, isMotionReady } from "./gsap";
import { motionPrimitives } from "./presets";

/**
 * Dev-only sanity check — confirms registration without creating visible animation.
 * Called once from MotionProvider on mount.
 */
export function verifyMotionSystem(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const gsap = getGsap();
  const ScrollTrigger = getScrollTrigger();

  const pluginsReady = Boolean(gsap && ScrollTrigger);
  const primitivesReady = motionPrimitives.length === 8;

  return isMotionReady() && pluginsReady && primitivesReady;
}
