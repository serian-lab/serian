import type { ProductPageContent } from "@/types/content";

import { productCatalog } from "@/content/catalog";

/** Returns a single product by URL slug, or undefined if not found. */
export function getProductBySlug(slug: string): ProductPageContent | undefined {
  return productCatalog[slug];
}

/** Returns all registered products. */
export function getAllProducts(): ProductPageContent[] {
  return Object.values(productCatalog);
}

/** Returns all registered product slugs. */
export function getAllProductSlugs(): string[] {
  return Object.keys(productCatalog);
}
