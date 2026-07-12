import type { ScrollTrigger } from "gsap/ScrollTrigger";

/** GSAP-compatible animation target. */
export type MotionTarget =
  | string
  | Element
  | Element[]
  | Window
  | null;

/** Shared vars accepted by motion presets. */
export type MotionPresetVars = {
  /** When true, animation runs instantly (accessibility). */
  reduceMotion?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
  y?: number;
  autoAlpha?: number;
  scale?: number;
  stagger?: number | object;
  scrollTrigger?: ScrollTrigger.Vars;
} & Record<string, unknown>;

/** Scroll-linked vars for reveal presets. */
export type MotionScrollVars = MotionPresetVars & {
  scrollTrigger?: ScrollTrigger.Vars;
};

/** Hover preset cleanup handle. */
export type MotionHoverHandle = {
  kill: () => void;
};
