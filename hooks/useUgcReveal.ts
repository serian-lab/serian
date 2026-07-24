"use client";

import { motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const UGC_SECTION_SELECTOR = "#ugc-showcase";

const SECTION_DURATION = 0.7;
const SECTION_Y = 16;
const RAIL_AT = 0.18;

function getUgcTargets(root: HTMLElement): HTMLElement[] {
  const header = root.querySelector<HTMLElement>(".product-ugc__header");
  const viewport = root.querySelector<HTMLElement>(".product-ugc__viewport");
  return [header, viewport].filter((el): el is HTMLElement => Boolean(el));
}

/**
 * UGC scroll reveal — header + rail only.
 * No per-card stagger (avoids permanent opacity:0 on remount).
 */
export function useUgcReveal() {
  useSectionReveal(
    UGC_SECTION_SELECTOR,
    ({ root, tl }) => {
      const targets = getUgcTargets(root);

      if (targets.length === 0) {
        return;
      }

      tl.from(targets, {
        autoAlpha: 0,
        y: SECTION_Y,
        duration: SECTION_DURATION,
        ease: motionTokens.ease.out,
        stagger: RAIL_AT,
        immediateRender: false,
      });
    },
    {
      getTargets: getUgcTargets,
      start: "top 82%",
    },
  );
}
