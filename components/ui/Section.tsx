import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

/** Semantic page section wrapper. Groups related content under one landmark. */
export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("ui-section", className)} {...props}>
      {children}
    </section>
  );
}
