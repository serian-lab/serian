/**
 * Shared content primitives used across product and global content.
 */

/** Reference to a static media asset served from /public or /assets. */
export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** A titled block of text used in multiple section types. */
export interface TextBlock {
  title: string;
  description: string;
}

/** SEO and social sharing metadata for a page. */
export interface SeoMetadata {
  title: string;
  description: string;
  ogImage?: MediaAsset;
  keywords?: string[];
}

/** Base fields shared by narrative page sections. */
export interface SectionBase {
  /** Stable identifier for anchors, analytics, and component mapping. */
  id: string;
  headline: string;
  subheadline?: string;
}

/** Controls whether a section is rendered on the product page. */
export interface SectionVisibility {
  enabled: boolean;
}

export type ProductStatus = "draft" | "active" | "archived";

export type CurrencyCode = "USD";
