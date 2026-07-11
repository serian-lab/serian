import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type TextElement = "p" | "span";

type TextVariant = "body" | "caption" | "label";

type TextProps = {
  as?: TextElement;
  variant?: TextVariant;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

/** Renders body copy using a semantic text element and typography scale. */
export function Text({
  as = "p",
  variant = "body",
  children,
  className,
  ...props
}: TextProps) {
  const Component = as;

  return (
    <Component className={cn("ui-text", `ui-text--${variant}`, className)} {...props}>
      {children}
    </Component>
  );
}

export type { TextVariant };
