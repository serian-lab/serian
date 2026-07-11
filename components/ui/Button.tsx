import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Native button primitive — primary (wood) or secondary (outlined). */
export function Button({
  children,
  type = "button",
  fullWidth = false,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "ui-button",
        variant === "secondary" && "ui-button--secondary",
        fullWidth && "ui-button--full-width",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
