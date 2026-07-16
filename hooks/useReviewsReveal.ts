"use client";

import { motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const REVIEWS_SECTION_SELECTOR = "#reviews";

/** Quiet reading enter — one lift, then stillness. */
const CONTAINER_DURATION = 0.8;
const CONTAINER_Y = 16;

function getReviewsTargets(root: HTMLElement): HTMLElement[] {
  const reading = root.querySelector<HTMLElement>(".product-reviews-reading");
  return reading ? [reading] : [];
}

/**
 * Reviews scroll reveal — single tween on the reading block (summary + grid).
 * No card stagger; header is not animated separately.
 */
export function useReviewsReveal() {
  useSectionReveal(
    REVIEWS_SECTION_SELECTOR,
    ({ root, tl }) => {
      const reading = root.querySelector<HTMLElement>(".product-reviews-reading");

      if (!reading) {
        return;
      }

      tl.from(reading, {
        autoAlpha: 0,
        y: CONTAINER_Y,
        duration: CONTAINER_DURATION,
        ease: motionTokens.ease.out,
      });
    },
    {
      getTargets: getReviewsTargets,
      start: "top 82%",
    },
  );
}
