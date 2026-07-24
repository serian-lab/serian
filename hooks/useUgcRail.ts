"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseUgcRailResult = {
  railRef: React.RefObject<HTMLDivElement | null>;
  overflow: boolean;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollToPrevious: () => void;
  scrollToNext: () => void;
};

/**
 * Lightweight UGC rail controller — overflow detection + card-step scrolling.
 * No carousel library, no infinite loop, no autoplay.
 */
export function useUgcRail(itemCount: number): UseUgcRailResult {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [overflow, setOverflow] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const frameRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const hasOverflow = maxScroll > 2;

    setOverflow(hasOverflow);
    setCanScrollPrev(hasOverflow && rail.scrollLeft > 2);
    setCanScrollNext(hasOverflow && rail.scrollLeft < maxScroll - 2);
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    scheduleUpdate();

    const observer = new ResizeObserver(() => {
      scheduleUpdate();
    });
    observer.observe(rail);

    rail.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [itemCount, scheduleUpdate]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>(".product-ugc__card"),
    );
    if (cards.length === 0) {
      return;
    }

    const { scrollLeft } = rail;
    let target: HTMLElement | undefined;

    if (direction > 0) {
      target = cards.find((card) => card.offsetLeft > scrollLeft + 4);
    } else {
      for (let index = cards.length - 1; index >= 0; index -= 1) {
        const card = cards[index];
        if (card && card.offsetLeft < scrollLeft - 4) {
          target = card;
          break;
        }
      }
    }

    if (!target) {
      return;
    }

    rail.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, []);

  return {
    railRef,
    overflow,
    canScrollPrev,
    canScrollNext,
    scrollToPrevious: () => scrollByCard(-1),
    scrollToNext: () => scrollByCard(1),
  };
}
