import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { isLayoutDebugEnabled } from "@/lib/layout-debug";

type LayoutDebugRegionProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/** Wraps a layout region with dashed outline + label when Review Mode is on. */
export function LayoutDebugRegion({ label, children, className }: LayoutDebugRegionProps) {
  if (!isLayoutDebugEnabled()) {
    return children;
  }

  return (
    <div className={cn("layout-debug-region", className)} data-layout-region={label}>
      <span className="layout-debug-region__label" aria-hidden="true">
        {label}
      </span>
      {children}
    </div>
  );
}
