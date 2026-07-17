"use client";

import { getGsap, motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const UGC_SECTION_SELECTOR = "#ugc-showcase";

const SECTION_DURATION = 0.7;
const SECTION_Y = 16;
const CARD_DURATION = 0.45;
const CARD_Y = 10;
const CARD_SCALE = 0.985;
/** Cards overlap section enter so total timeline stays ~0.85–0.95s. */
const CARD_AT = 0.32;
/** Soft per-card delay; clamped so long grids still finish under ~1s. */
const CARD_STAGGER_MAX = 0.07;
const CARD_STAGGER_BUDGET = 0.2;

function getUgcTargets(root: HTMLElement): HTMLElement[] {
  const gsap = getGsap();
  const intro = root.querySelector<HTMLElement>(".product-ugc__intro");
  const cards = gsap.utils.toArray<HTMLElement>(".product-ugc-card", root);

  return [...(intro ? [intro] : []), ...cards];
}

function cardStagger(count: number) {
  if (count <= 1) {
    return 0;
  }

  return Math.min(CARD_STAGGER_MAX, CARD_STAGGER_BUDGET / (count - 1));
}

/**
 * UGC scroll reveal — section enter + data-driven card stagger.
 * Targets every `.product-ugc-card`; works for 1…n items. Video is untouched.
 */
export function useUgcReveal() {
  useSectionReveal(
    UGC_SECTION_SELECTOR,
    ({ root, tl }) => {
      const gsap = getGsap();
      const intro = root.querySelector<HTMLElement>(".product-ugc__intro");
      const cards = gsap.utils.toArray<HTMLElement>(".product-ugc-card", root);

      if (intro) {
        tl.from(intro, {
          autoAlpha: 0,
          y: SECTION_Y,
          duration: SECTION_DURATION,
          ease: motionTokens.ease.out,
        });
      }

      if (cards.length > 0) {
        tl.from(
          cards,
          {
            autoAlpha: 0,
            y: CARD_Y,
            scale: CARD_SCALE,
            duration: CARD_DURATION,
            ease: motionTokens.ease.out,
            stagger: cardStagger(cards.length),
          },
          intro ? CARD_AT : 0,
        );
      }
    },
    {
      getTargets: getUgcTargets,
      start: "top 82%",
    },
  );
}
