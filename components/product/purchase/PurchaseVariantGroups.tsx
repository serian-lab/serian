"use client";

import { useState } from "react";

import { Stack, Text } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { PurchaseVariantGroup } from "@/types/content";

type PurchaseVariantGroupsProps = {
  groups: PurchaseVariantGroup[];
};

function defaultSelection(groups: PurchaseVariantGroup[]) {
  const selected: Record<string, string> = {};

  for (const group of groups) {
    const fallback = group.options.find((option) => option.available !== false);
    selected[group.id] =
      group.defaultOptionId ?? fallback?.id ?? group.options[0]?.id ?? "";
  }

  return selected;
}

/** Generic variant axes — color, size, capacity, etc. Content-driven. */
export function PurchaseVariantGroups({ groups }: PurchaseVariantGroupsProps) {
  const [selected, setSelected] = useState(() => defaultSelection(groups));

  if (groups.length === 0) {
    return null;
  }

  return (
    <Stack gap="md" className="product-purchase__variants">
      {groups.map((group) => {
        const selectionType = group.selectionType ?? "single";
        const activeId = selected[group.id];

        return (
          <Stack key={group.id} gap="sm" className="product-purchase__variant-group">
            <Text variant="label" className="product-purchase__variant-label">
              {group.label}
            </Text>
            <div
              className={cn(
                "product-purchase__variant-options",
                selectionType === "swatch" && "product-purchase__variant-options--swatch",
              )}
              role="radiogroup"
              aria-label={group.label}
            >
              {group.options.map((option) => {
                const isActive = option.id === activeId;
                const unavailable = option.available === false;

                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    aria-label={option.label}
                    disabled={unavailable}
                    className={cn(
                      "product-purchase__variant-option",
                      selectionType === "swatch" && "product-purchase__variant-option--swatch",
                      isActive && "product-purchase__variant-option--active",
                      unavailable && "product-purchase__variant-option--unavailable",
                    )}
                    style={
                      selectionType === "swatch" && option.swatch
                        ? { backgroundColor: option.swatch }
                        : undefined
                    }
                    onClick={() =>
                      setSelected((current) => ({
                        ...current,
                        [group.id]: option.id,
                      }))
                    }
                  >
                    {selectionType === "swatch" ? (
                      <span className="product-purchase__variant-swatch-label">
                        {option.label}
                      </span>
                    ) : (
                      option.label
                    )}
                  </button>
                );
              })}
            </div>
          </Stack>
        );
      })}
    </Stack>
  );
}
