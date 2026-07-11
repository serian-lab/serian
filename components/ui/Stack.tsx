import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type StackDirection = "vertical" | "horizontal";

type StackGap = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type StackElement = "div" | "nav" | "ul";

type StackProps = {
  as?: StackElement;
  direction?: StackDirection;
  gap?: StackGap;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

/** Groups child elements in a vertical or horizontal flow using spacing tokens. */
export function Stack({
  as: Component = "div",
  direction = "vertical",
  gap = "md",
  children,
  className,
  ...props
}: StackProps) {
  return (
    <Component
      className={cn(
        "ui-stack",
        `ui-stack--${direction}`,
        `ui-stack--gap-${gap}`,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export type { StackGap };
