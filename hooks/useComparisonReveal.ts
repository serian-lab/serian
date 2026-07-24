"use client";

import { motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const COMPARISON_SECTION_SELECTOR = "#comparison";

/** Calm section enter — header then panel, no row stagger. */
const CONTAINER_DURATION = 0.7;
const CONTAINER_Y = 16;
const PANEL_STAGGER = 0.1;

function getComparisonTargets(root: HTMLElement): HTMLElement[] {
  const header = root.querySelector<HTMLElement>(".product-comparison__header");
  const panel = root.querySelector<HTMLElement>(".product-comparison__panel");
  return [header, panel].filter((el): el is HTMLElement => Boolean(el));
}

/**
 * Comparison scroll reveal — header + panel fade-up only.
 */
export function useComparisonReveal() {
  useSectionReveal(
    COMPARISON_SECTION_SELECTOR,
    ({ root, tl }) => {
      const targets = getComparisonTargets(root);

      if (targets.length === 0) {
        return;
      }

      tl.from(targets, {
        autoAlpha: 0,
        y: CONTAINER_Y,
        duration: CONTAINER_DURATION,
        ease: motionTokens.ease.out,
        stagger: PANEL_STAGGER,
      });
    },
    {
      getTargets: getComparisonTargets,
      start: "top 82%",
    },
  );
}
