import { getGsap, getScrollTrigger, initGsap, isMotionReady } from "./gsap";
import {
  fade,
  fadeUp,
  headerTransition,
  hoverTransition,
  imageReveal,
  motionPrimitives,
  sectionReveal,
  staggerReveal,
  textReveal,
} from "./presets";
import { motionTokens } from "./tokens";

export {
  fade,
  fadeUp,
  getGsap,
  getScrollTrigger,
  headerTransition,
  hoverTransition,
  imageReveal,
  initGsap,
  isMotionReady,
  motionPrimitives,
  motionTokens,
  sectionReveal,
  staggerReveal,
  textReveal,
};

export type {
  MotionHoverHandle,
  MotionPresetVars,
  MotionScrollVars,
  MotionTarget,
} from "./types";

export type { MotionPrimitive } from "./presets";
export type { MotionTokens } from "./tokens";

export {
  applyReducedMotion,
  createSectionScrollTrigger,
  prefersReducedMotion,
  refreshScrollTriggers,
  resolveMotionTarget,
  shouldReduceMotion,
} from "./utils";

export { verifyMotionSystem } from "./verify";
