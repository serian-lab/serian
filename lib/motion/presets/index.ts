export { fade } from "./fade";
export { fadeUp } from "./fadeUp";
export { sectionReveal } from "./sectionReveal";
export { textReveal } from "./textReveal";
export { imageReveal } from "./imageReveal";
export { staggerReveal } from "./staggerReveal";
export { headerTransition } from "./headerTransition";
export { hoverTransition } from "./hoverTransition";

/** Canonical list of Serian motion primitives — the only animation vocabulary. */
export const motionPrimitives = [
  "fade",
  "fadeUp",
  "sectionReveal",
  "textReveal",
  "imageReveal",
  "staggerReveal",
  "headerTransition",
  "hoverTransition",
] as const;

export type MotionPrimitive = (typeof motionPrimitives)[number];
