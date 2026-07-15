"use client";

import { motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const SOLUTION_SECTION_SELECTOR = "#solution";

/** Editorial enter — single container fade-up (~0.8s). */
const CONTAINER_DURATION = 0.8;

/**
 * Later than Problem (`top 82%`) so Solution waits for reading space.
 * `top 65%` still overlapped the end of Problem; `top 60%` gives a clearer pause.
 */
const SOLUTION_SCROLL_START = "top 60%";

function getSolutionTargets(root: HTMLElement): HTMLElement[] {
  const container = root.querySelector<HTMLElement>(".product-solution");
  return container ? [container] : [];
}

/**
 * Solution scroll reveal — one timeline, one tween, one ScrollTrigger.
 * Cards and media are intentionally excluded from scroll motion (hover only).
 */
export function useSolutionReveal() {
  useSectionReveal(
    SOLUTION_SECTION_SELECTOR,
    ({ root, tl }) => {
      const container = root.querySelector<HTMLElement>(".product-solution");

      if (!container) {
        return;
      }

      tl.from(container, {
        autoAlpha: 0,
        y: motionTokens.distance.md,
        duration: CONTAINER_DURATION,
        ease: motionTokens.ease.out,
      });
    },
    {
      getTargets: getSolutionTargets,
      start: SOLUTION_SCROLL_START,
    },
  );
}
