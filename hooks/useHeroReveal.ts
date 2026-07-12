"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

import { getGsap, initGsap, shouldReduceMotion } from "@/lib/motion";

type HeroRevealRefs = {
  scope: RefObject<HTMLElement | null>;
  gallery: RefObject<HTMLElement | null>;
  eyebrow: RefObject<HTMLElement | null>;
  headline: RefObject<HTMLElement | null>;
  lead: RefObject<HTMLElement | null>;
  cta: RefObject<HTMLElement | null>;
  trust: RefObject<HTMLElement | null>;
};

const EASE = "power2.out";

/** Editorial mount reveal for Hero — load once, no ScrollTrigger. */
export function useHeroReveal({
  scope,
  gallery,
  eyebrow,
  headline,
  lead,
  cta,
  trust,
}: HeroRevealRefs) {
  initGsap();

  useGSAP(
    () => {
      const gsap = getGsap();
      const reduced = shouldReduceMotion();

      const targets = [
        gallery.current,
        eyebrow.current,
        headline.current,
        lead.current,
        cta.current,
        trust.current,
      ].filter(Boolean);

      if (reduced) {
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

      const tl = gsap.timeline({ defaults: { ease: EASE } });

      const storyStart = 0.4;
      const storyStagger = 0.08;
      const storyDuration = 0.55;
      const headlineAt = storyStart + storyStagger;
      const leadAt = headlineAt + storyStagger;
      const ctaAt = headlineAt + storyDuration + 0.1;
      const trustAt = ctaAt + 0.45;

      if (gallery.current) {
        tl.from(gallery.current, {
          autoAlpha: 0,
          scale: 1.03,
          duration: 0.75,
        });
      }

      if (eyebrow.current) {
        tl.from(
          eyebrow.current,
          { autoAlpha: 0, y: 18, duration: storyDuration },
          storyStart,
        );
      }

      if (headline.current) {
        tl.from(
          headline.current,
          { autoAlpha: 0, y: 18, duration: storyDuration },
          headlineAt,
        );
      }

      if (lead.current) {
        tl.from(
          lead.current,
          { autoAlpha: 0, y: 18, duration: storyDuration },
          leadAt,
        );
      }

      if (cta.current) {
        tl.from(
          cta.current,
          { autoAlpha: 0, y: 16, duration: 0.45 },
          ctaAt,
        );
      }

      if (trust.current) {
        tl.from(
          trust.current,
          { autoAlpha: 0, y: 12, duration: 0.4 },
          trustAt,
        );
      }
    },
    { scope },
  );
}
