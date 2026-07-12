"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

import { getScrollTrigger, initGsap } from "@/lib/motion";

/** Fixed pin scroll distance — infrastructure validation only. */
export const NARRATIVE_PIN_END = "+=300vh";

/**
 * Pins the narrative section when its top reaches the viewport top.
 * Releases after 300vh of scroll. No tweens, no scrub, no chapter logic.
 */
export function useNarrativePin(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const trigger = scope.current;
      if (!trigger) {
        return;
      }

      initGsap();
      const ScrollTrigger = getScrollTrigger();

      ScrollTrigger.create({
        id: "narrative-pin",
        trigger,
        start: "top top",
        end: NARRATIVE_PIN_END,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const refresh = () => ScrollTrigger.refresh();

      trigger.querySelectorAll("img").forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", refresh, { once: true });
        }
      });

      if (document.fonts?.ready) {
        void document.fonts.ready.then(refresh);
      }
    },
    { scope },
  );
}
