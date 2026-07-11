import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardVariant = "elevated" | "flat";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variant?: CardVariant;
  interactive?: boolean;
};

/** Unified surface card — radius, border, shadow, and padding from design tokens. */
export function Card({
  children,
  className,
  as: Component = "div",
  variant = "elevated",
  interactive = false,
}: CardProps) {
  return (
    <Component
      className={cn(
        "ui-card",
        variant === "flat" && "ui-card--flat",
        interactive && "ui-card--interactive",
        className,
      )}
    >
      {children}
    </Component>
  );
}
