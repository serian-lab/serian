import type { ProductMediaKit } from "./media";
import type { ProductPageSections } from "./sections";
import type { CurrencyCode, ProductStatus, SeoMetadata } from "./shared";

/**
 * Product identity — stable identifiers used for routing, catalog, and commerce.
 * Belongs to the product entity, not a specific page layout.
 */
export interface ProductMeta {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  status: ProductStatus;
  category?: string;
}

/**
 * Commerce data required for checkout integration.
 * Separated from narrative content so pricing can evolve independently.
 */
export interface CommerceInfo {
  price: number;
  currency: CurrencyCode;
  compareAtPrice?: number;
  sku?: string;
}

/**
 * Complete content model for a single product landing page.
 *
 * This is the primary unit consumed by the product page route.
 * Adding a new product means creating a new ProductPageContent instance
 * and registering it in the catalog — no page code changes required.
 */
export interface ProductPageContent {
  meta: ProductMeta;
  seo: SeoMetadata;
  commerce: CommerceInfo;
  mediaKit: ProductMediaKit;
  sections: ProductPageSections;
}

/** Slug-keyed catalog of all product pages. */
export type ProductCatalog = Record<string, ProductPageContent>;
