"use client";

import { useRef, type RefObject } from "react";

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
  /** ScrollTrigger start — defaults to section entry cadence (`top 82%`). */
  start?: string;
};

type SectionRevealScope = RefObject<HTMLElement | null> | string;

function resolveSectionRoot(scope: SectionRevealScope): HTMLElement | null {
  if (typeof scope === "string") {
    return document.querySelector<HTMLElement>(scope);
  }

  return scope.current;
}

/**
 * Standard Type B section motion — one scope, one timeline, one ScrollTrigger.
 * Section-specific hooks compose their reading order inside `buildTimeline`.
 */
export function useSectionReveal(
  sectionScope: SectionRevealScope,
  buildTimeline: SectionRevealBuilder,
  options: SectionRevealOptions = {},
) {
  const motionScopeRef = useRef<HTMLElement | null>(null);

  useMotion(
    () => {
      const root = resolveSectionRoot(sectionScope);
      if (!root) {
        return;
      }

      motionScopeRef.current = root;

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
          start: options.start ?? "top 82%",
        }),
        defaults: { ease: motionTokens.ease.out },
      });

      buildTimeline({ gsap, root, tl });
    },
    motionScopeRef,
  );
}
