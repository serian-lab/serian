import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motionTokens } from "./tokens";

let isRegistered = false;

/** Registers GSAP plugins once. Safe to call multiple times; no-op on SSR. */
export function initGsap(): void {
  if (typeof window === "undefined" || isRegistered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, useGSAP);

  gsap.defaults({
    duration: motionTokens.duration.base,
    ease: motionTokens.ease.out,
  });

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  isRegistered = true;
}

/** Returns the shared GSAP instance after client-side registration. */
export function getGsap(): typeof gsap {
  initGsap();
  return gsap;
}

/** Returns ScrollTrigger after client-side registration. */
export function getScrollTrigger(): typeof ScrollTrigger {
  initGsap();
  return ScrollTrigger;
}

/** Whether the motion runtime has been initialized in the browser. */
export function isMotionReady(): boolean {
  return isRegistered;
}
