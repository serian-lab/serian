"use client";

import { motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const DEMO_SECTION_SELECTOR = "#demo-video";

/** Editorial enter — single container fade-up (~0.8s). */
const CONTAINER_DURATION = 0.8;

function getDemoTargets(root: HTMLElement): HTMLElement[] {
  const container = root.querySelector<HTMLElement>(".product-demo");
  return container ? [container] : [];
}

/**
 * Demo scroll reveal — one timeline, one tween, one ScrollTrigger.
 * Targets the editorial `.product-demo` frame (header + media + highlights).
 */
export function useDemoReveal() {
  useSectionReveal(
    DEMO_SECTION_SELECTOR,
    ({ root, tl }) => {
      const container = root.querySelector<HTMLElement>(".product-demo");

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
      getTargets: getDemoTargets,
    },
  );
}
