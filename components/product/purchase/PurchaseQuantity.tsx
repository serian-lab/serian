"use client";

import { useState } from "react";

import { Stack, Text } from "@/components/ui";
import type { PurchaseQuantityConfig } from "@/types/content";

type PurchaseQuantityProps = {
  config: PurchaseQuantityConfig;
};

/** Optional quantity stepper — renders only when content enables it. */
export function PurchaseQuantity({ config }: PurchaseQuantityProps) {
  const min = config.min ?? 1;
  const max = config.max ?? 99;
  const initial = Math.min(max, Math.max(min, config.defaultValue ?? min));
  const [value, setValue] = useState(initial);

  if (!config.enabled) {
    return null;
  }

  return (
    <Stack gap="sm" className="product-purchase__quantity" direction="horizontal">
      <Text variant="label" className="product-purchase__quantity-label">
        Quantity
      </Text>
      <div className="product-purchase__quantity-controls">
        <button
          type="button"
          className="product-purchase__quantity-btn"
          aria-label="Decrease quantity"
          disabled={value <= min}
          onClick={() => setValue((current) => Math.max(min, current - 1))}
        >
          −
        </button>
        <Text as="span" className="product-purchase__quantity-value" aria-live="polite">
          {value}
        </Text>
        <button
          type="button"
          className="product-purchase__quantity-btn"
          aria-label="Increase quantity"
          disabled={value >= max}
          onClick={() => setValue((current) => Math.min(max, current + 1))}
        >
          +
        </button>
      </div>
    </Stack>
  );
}
