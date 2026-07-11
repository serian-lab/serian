import type { ProductCatalog } from "@/types/content";

import { hairDryerBrush } from "./products/hair-dryer-brush";

/**
 * Internal product registry.
 * Only consumed by lib/content — pages must not import this file directly.
 */
export const productCatalog = {
  [hairDryerBrush.meta.slug]: hairDryerBrush,
} satisfies ProductCatalog;

export type ProductSlug = keyof typeof productCatalog;
