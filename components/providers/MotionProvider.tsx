"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { initGsap, verifyMotionSystem } from "@/lib/motion";

type MotionProviderProps = {
  children: ReactNode;
};

/**
 * Client boundary for Serian Motion System.
 * Registers GSAP once; does not animate any UI in this iteration.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  useEffect(() => {
    initGsap();

    if (process.env.NODE_ENV === "development") {
      verifyMotionSystem();
    }
  }, []);

  return children;
}
