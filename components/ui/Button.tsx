import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Native button primitive for interactive actions. */
export function Button({
  children,
  type = "button",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn("ui-button", fullWidth && "ui-button--full-width", className)}
      {...props}
    >
      {children}
    </button>
  );
}
