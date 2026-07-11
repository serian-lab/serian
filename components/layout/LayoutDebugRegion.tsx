import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { isLayoutDebugEnabled } from "@/lib/layout-debug";

type LayoutDebugVariant = "section" | "sub";

type LayoutDebugRegionProps = {
  label: string;
  children: ReactNode;
  className?: string;
  childrenClassName?: string;
  variant?: LayoutDebugVariant;
  order?: number;
  watermark?: string;
};

function formatDebugLabel(label: string, order?: number) {
  if (order == null) {
    return label;
  }

  return `${String(order).padStart(2, "0")} ${label}`;
}

/** Wraps a layout region with dashed outline + label when Review Mode is on. */
export function LayoutDebugRegion({
  label,
  children,
  className,
  childrenClassName,
  variant = "section",
  order,
  watermark,
}: LayoutDebugRegionProps) {
  if (!isLayoutDebugEnabled()) {
    return children;
  }

  const displayLabel = formatDebugLabel(label, order);
  const watermarkText = watermark ?? label;

  return (
    <div
      className={cn(
        "layout-debug-region",
        variant === "sub" ? "layout-debug-region--sub" : "layout-debug-region--section",
        className,
      )}
      data-layout-debug-label={displayLabel}
      data-layout-debug-watermark={watermarkText}
    >
      <span className="layout-debug-region__label" aria-hidden="true">
        {displayLabel}
      </span>
      <div className={cn("layout-debug-region__content", childrenClassName)}>{children}</div>
    </div>
  );
}
