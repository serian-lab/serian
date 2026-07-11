import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingVariant = "display" | "heading" | "title" | "subtitle";

type HeadingProps = {
  level: HeadingLevel;
  variant?: HeadingVariant;
  children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

const headingElements: Record<HeadingLevel, "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

const defaultVariantByLevel: Record<HeadingLevel, HeadingVariant> = {
  1: "display",
  2: "heading",
  3: "title",
  4: "subtitle",
  5: "subtitle",
  6: "subtitle",
};

/** Renders a semantic heading at the requested level using the typography scale. */
export function Heading({ level, variant, children, className, ...props }: HeadingProps) {
  const Component = headingElements[level];
  const typographyVariant = variant ?? defaultVariantByLevel[level];

  return (
    <Component
      className={cn("ui-heading", `ui-heading--${typographyVariant}`, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export type { HeadingVariant };
