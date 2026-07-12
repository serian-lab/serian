"use client";

import type { RefObject } from "react";

import { useMotion } from "@/hooks/useMotion";
import {
  createSectionScrollTrigger,
  getGsap,
  motionTokens,
  shouldReduceMotion,
} from "@/lib/motion";

type SectionRevealContext = {
  gsap: ReturnType<typeof getGsap>;
  root: HTMLElement;
  tl: gsap.core.Timeline;
};

type SectionRevealBuilder = (ctx: SectionRevealContext) => void;

type SectionRevealOptions = {
  getTargets?: (root: HTMLElement) => HTMLElement[];
};

/**
 * Standard Type B section motion — one scope, one timeline, one ScrollTrigger.
 * Section-specific hooks compose their reading order inside `buildTimeline`.
 */
export function useSectionReveal(
  sectionRef: RefObject<HTMLElement | null>,
  buildTimeline: SectionRevealBuilder,
  options: SectionRevealOptions = {},
) {
  useMotion(
    () => {
      const root = sectionRef.current;
      if (!root) {
        return;
      }

      const gsap = getGsap();
      const reduced = shouldReduceMotion();

      if (reduced) {
        const targets = options.getTargets?.(root) ?? [];
        if (targets.length > 0) {
          gsap.set(targets, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clearProps: "transform,opacity,visibility",
          });
        }
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: createSectionScrollTrigger(root, {
          start: "top 82%",
        }),
        defaults: { ease: motionTokens.ease.out },
      });

      buildTimeline({ gsap, root, tl });
    },
    sectionRef,
  );
}
