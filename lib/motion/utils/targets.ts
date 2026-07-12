import type { RefObject } from "react";

import type { MotionTarget } from "../types";

/** Resolves a ref, element, or selector into a GSAP target. */
export function resolveMotionTarget(
  target: MotionTarget | RefObject<Element | null> | null | undefined,
): MotionTarget | null {
  if (!target) {
    return null;
  }

  if (typeof target === "object" && "current" in target) {
    return target.current;
  }

  return target;
}
