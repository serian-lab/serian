"use client";

import type { RefObject } from "react";

import { useMotion } from "@/hooks/useMotion";
import {
  createSectionScrollTrigger,
  getGsap,
  shouldReduceMotion,
} from "@/lib/motion";

type ProblemRevealRefs = {
  scope: RefObject<HTMLElement | null>;
  container: RefObject<HTMLElement | null>;
  eyebrow: RefObject<HTMLElement | null>;
  headline: RefObject<HTMLElement | null>;
  intro: RefObject<HTMLElement | null>;
  list: RefObject<HTMLElement | null>;
  divider?: RefObject<HTMLElement | null>;
};

const EASE = "power2.out";
const HEADING_DURATION = 0.55;
const HEADING_STAGGER = 0.12;
const HEADING_START = 0.35;
const LIST_DURATION = 0.55;
const LIST_STAGGER = 0.08;

/** Scroll-triggered editorial reveal for Problem — once, scoped, calm pacing. */
export function useProblemReveal({
  scope,
  container,
  eyebrow,
  headline,
  intro,
  list,
  divider,
}: ProblemRevealRefs) {
  useMotion(
    () => {
      const gsap = getGsap();
      const reduced = shouldReduceMotion();

      const items = list.current
        ? (Array.from(list.current.children) as HTMLElement[])
        : [];

      const allTargets = [
        container.current,
        eyebrow.current,
        headline.current,
        intro.current,
        ...items,
        divider?.current,
      ].filter(Boolean);

      if (reduced) {
        if (allTargets.length > 0) {
          gsap.set(allTargets, {
            autoAlpha: 1,
            y: 0,
            clearProps: "transform,opacity,visibility",
          });
        }
        return;
      }

      const trigger = scope.current;
      if (!trigger) {
        return;
      }

      const scrollTrigger = createSectionScrollTrigger(trigger, {
        start: "top 82%",
      });

      const tl = gsap.timeline({ scrollTrigger, defaults: { ease: EASE } });

      if (container.current) {
        tl.from(container.current, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
        });
      }

      if (eyebrow.current) {
        tl.from(
          eyebrow.current,
          { autoAlpha: 0, y: 16, duration: HEADING_DURATION },
          HEADING_START,
        );
      }

      if (headline.current) {
        tl.from(
          headline.current,
          { autoAlpha: 0, y: 16, duration: HEADING_DURATION },
          HEADING_START + HEADING_STAGGER,
        );
      }

      if (intro.current) {
        tl.from(
          intro.current,
          { autoAlpha: 0, y: 16, duration: HEADING_DURATION },
          HEADING_START + HEADING_STAGGER * 2,
        );
      }

      const listStart =
        HEADING_START + HEADING_STAGGER * 2 + HEADING_DURATION + 0.08;

      if (items.length > 0) {
        tl.from(
          items,
          {
            autoAlpha: 0,
            y: 16,
            duration: LIST_DURATION,
            stagger: LIST_STAGGER,
          },
          listStart,
        );
      }

      if (divider?.current) {
        const dividerStart =
          items.length > 0
            ? listStart + LIST_DURATION + LIST_STAGGER * (items.length - 1)
            : HEADING_START + HEADING_STAGGER * 2 + HEADING_DURATION;

        tl.from(divider.current, { autoAlpha: 0, duration: 0.4 }, dividerStart);
      }
    },
    scope,
  );
}
