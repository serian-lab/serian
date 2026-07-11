import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerWidth = "page" | "content" | "reading";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  width?: ContainerWidth;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

const widthClass: Record<ContainerWidth, string | undefined> = {
  page: undefined,
  content: "ui-container--content",
  reading: "ui-container--reading",
};

/** Constrains page content to a consistent horizontal boundary. */
export function Container<T extends ElementType = "div">({
  as,
  children,
  width = "page",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={cn("ui-container", widthClass[width], className)} {...props}>
      {children}
    </Component>
  );
}
