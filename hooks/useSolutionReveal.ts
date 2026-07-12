"use client";

import type { RefObject } from "react";

import { motionTokens } from "@/lib/motion";

import { useSectionReveal } from "./useSectionReveal";

const INTRO_DELAY = 0.12;

function getSolutionTargets(root: HTMLElement): HTMLElement[] {
  return [
    root.querySelector<HTMLElement>(".product-section-header"),
    root.querySelector<HTMLElement>(".product-section-intro"),
  ].filter((el): el is HTMLElement => el !== null);
}

/** Header-only scroll reveal for Solution — standard section timeline. */
export function useSolutionReveal(sectionRef: RefObject<HTMLElement | null>) {
  useSectionReveal(
    sectionRef,
    ({ root, tl }) => {
      const headline = root.querySelector<HTMLElement>(".product-section-header");
      const intro = root.querySelector<HTMLElement>(".product-section-intro");

      if (headline) {
        tl.from(headline, {
          autoAlpha: 0,
          y: motionTokens.distance.md,
          duration: motionTokens.duration.slow,
        });
      }

      if (intro) {
        tl.from(
          intro,
          {
            autoAlpha: 0,
            y: motionTokens.distance.md,
            duration: motionTokens.duration.slow,
          },
          INTRO_DELAY,
        );
      }
    },
    { getTargets: getSolutionTargets },
  );
}
