"use client";

import { useGSAP } from "@gsap/react";
import { useRef, type RefObject } from "react";

import {
  getGsap,
  getScrollTrigger,
  initGsap,
  isMotionReady,
} from "@/lib/motion";

type UseMotionOptions = {
  dependencies?: unknown[];
  revertOnUpdate?: boolean;
};

/**
 * Client hook for scoped GSAP setup.
 * Always pass `scope` so selectors stay inside the component subtree.
 */
export function useMotion(
  callback: Parameters<typeof useGSAP>[0],
  scope: React.RefObject<Element | null>,
  options: UseMotionOptions = {},
) {
  initGsap();

  return useGSAP(callback, {
    scope,
    dependencies: options.dependencies,
    revertOnUpdate: options.revertOnUpdate,
  });
}

/** Access the shared motion runtime from client components. */
export function useMotionRuntime() {
  const readyRef = useRef(false);

  if (typeof window !== "undefined" && !readyRef.current) {
    initGsap();
    readyRef.current = isMotionReady();
  }

  return {
    gsap: getGsap(),
    ScrollTrigger: getScrollTrigger(),
    isReady: isMotionReady(),
    useGSAP,
  };
}
