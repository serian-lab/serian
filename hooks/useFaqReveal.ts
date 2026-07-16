"use client";

import { motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const FAQ_SECTION_SELECTOR = "#faq";

/** Quiet section enter — one container only. */
const CONTAINER_DURATION = 0.8;
const CONTAINER_Y = 20;

function getFaqTargets(root: HTMLElement): HTMLElement[] {
  const frame = root.querySelector<HTMLElement>(".product-faq");
  return frame ? [frame] : [];
}

/**
 * FAQ reading reveal — single fade-up on the section wrapper.
 * FAQ rows are never animated independently.
 */
export function useFaqReveal() {
  useSectionReveal(
    FAQ_SECTION_SELECTOR,
    ({ root, tl }) => {
      const frame = root.querySelector<HTMLElement>(".product-faq");

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
      getTargets: getFaqTargets,
      start: "top 82%",
    },
  );
}
