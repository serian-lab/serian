"use client";

import { getGsap, motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const PROBLEM_SECTION_SELECTOR = ".serian-i06-problem";

const HEADING_STAGGER = 0.12;
const HEADING_START = 0.35;
const LIST_STAGGER = 0.08;
const LIST_GAP = 0.08;

function getProblemTargets(root: HTMLElement): HTMLElement[] {
  const gsap = getGsap();

  return [
    root.querySelector<HTMLElement>(".serian-i06-problem__frame"),
    root.querySelector<HTMLElement>(".serian-i06-section-index"),
    root.querySelector<HTMLElement>(".serian-i06-problem__headline"),
    root.querySelector<HTMLElement>(".serian-i06-problem__intro"),
    ...gsap.utils.toArray<HTMLElement>(".serian-i06-problem__item", root),
  ].filter((el): el is HTMLElement => el !== null);
}

/** Scroll-triggered editorial reveal for Problem — standard section timeline. */
export function useProblemReveal() {
  useSectionReveal(
    PROBLEM_SECTION_SELECTOR,
    ({ root, tl }) => {
      const gsap = getGsap();
      const container = root.querySelector<HTMLElement>(".serian-i06-problem__frame");
      const eyebrow = root.querySelector<HTMLElement>(".serian-i06-section-index");
      const headline = root.querySelector<HTMLElement>(".serian-i06-problem__headline");
      const intro = root.querySelector<HTMLElement>(".serian-i06-problem__intro");
      const items = gsap.utils.toArray<HTMLElement>(".serian-i06-problem__item", root);

      if (container) {
        tl.from(container, {
          autoAlpha: 0,
          y: motionTokens.distance.md,
          duration: motionTokens.duration.slow,
        });
      }

      if (eyebrow) {
        tl.from(
          eyebrow,
          {
            autoAlpha: 0,
            y: motionTokens.distance.sm,
            duration: motionTokens.duration.base,
          },
          HEADING_START,
        );
      }

      if (headline) {
        tl.from(
          headline,
          {
            autoAlpha: 0,
            y: motionTokens.distance.sm,
            duration: motionTokens.duration.base,
          },
          HEADING_START + HEADING_STAGGER,
        );
      }

      if (intro) {
        tl.from(
          intro,
          {
            autoAlpha: 0,
            y: motionTokens.distance.sm,
            duration: motionTokens.duration.base,
          },
          HEADING_START + HEADING_STAGGER * 2,
        );
      }

      const listStart =
        HEADING_START + HEADING_STAGGER * 2 + motionTokens.duration.base + LIST_GAP;

      if (items.length > 0) {
        tl.from(
          items,
          {
            autoAlpha: 0,
            y: motionTokens.distance.sm,
            duration: motionTokens.duration.base,
            stagger: LIST_STAGGER,
          },
          listStart,
        );
      }
    },
    { getTargets: getProblemTargets },
  );
}
