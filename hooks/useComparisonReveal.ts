"use client";

import { motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const COMPARISON_SECTION_SELECTOR = "#comparison";

/** Calm section enter — single container fade-up for rational reading. */
const CONTAINER_DURATION = 0.8;
const CONTAINER_Y = 20;

function getComparisonTargets(root: HTMLElement): HTMLElement[] {
  const container = root.querySelector<HTMLElement>(".product-comparison-enter");
  return container ? [container] : [];
}

/**
 * Comparison scroll reveal — one timeline, one tween, one ScrollTrigger.
 * Table stays still; no row/cell stagger.
 */
export function useComparisonReveal() {
  useSectionReveal(
    COMPARISON_SECTION_SELECTOR,
    ({ root, tl }) => {
      const container = root.querySelector<HTMLElement>(".product-comparison-enter");

      if (!container) {
        return;
      }

      tl.from(container, {
        autoAlpha: 0,
        y: CONTAINER_Y,
        duration: CONTAINER_DURATION,
        ease: motionTokens.ease.out,
      });
    },
    {
      getTargets: getComparisonTargets,
      start: "top 82%",
    },
  );
}
