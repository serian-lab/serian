"use client";

import { motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const BENEFITS_SECTION_SELECTOR = "#benefits";

/** Quiet transitional enter — barely noticeable after Narrative. */
const CONTAINER_DURATION = 0.65;
const CONTAINER_Y = 12;

function getBenefitsTargets(root: HTMLElement): HTMLElement[] {
  const frame = root.querySelector<HTMLElement>(".product-benefits");
  return frame ? [frame] : [];
}

/**
 * Benefits scroll reveal — one tween on the section root.
 * Buffer between Narrative and Decision; items stay static.
 */
export function useBenefitsReveal() {
  useSectionReveal(
    BENEFITS_SECTION_SELECTOR,
    ({ root, tl }) => {
      const frame = root.querySelector<HTMLElement>(".product-benefits");

      if (!frame) {
        return;
      }

      tl.from(frame, {
        autoAlpha: 0,
        y: CONTAINER_Y,
        duration: CONTAINER_DURATION,
        ease: motionTokens.ease.out,
      });
    },
    {
      getTargets: getBenefitsTargets,
      start: "top 82%",
    },
  );
}
