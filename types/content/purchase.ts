import type { CurrencyCode } from "./shared";

/**
 * Purchase Panel content modules.
 * Omit optional modules per product — the panel simply does not render them.
 */

/** One selectable value inside a variant group (maps to Shopify option values later). */
export interface PurchaseVariantOption {
  id: string;
  label: string;
  /** Commerce / Shopify option value string. */
  value: string;
  /** Optional swatch color (CSS color) when selectionType is "swatch". */
  swatch?: string;
  available?: boolean;
}

/**
 * Generic variant axis — Color, Size, Material, Capacity, etc.
 * Never hardcode axis names in components; drive from content.
 */
export interface PurchaseVariantGroup {
  id: string;
  label: string;
  /** Defaults to single-select pills. */
  selectionType?: "single" | "swatch";
  options: PurchaseVariantOption[];
  defaultOptionId?: string;
}

export interface PurchaseQuantityConfig {
  enabled: boolean;
  min?: number;
  max?: number;
  defaultValue?: number;
}

export interface PurchaseCta {
  label: string;
  /** Future checkout / Shopify URL. Button is inert when omitted. */
  href?: string;
  variant?: "primary" | "secondary";
}

/** Trust badges resolved from global trust catalog by id. */
export interface PurchaseTrustConfig {
  /** Defaults to true when omitted. */
  enabled?: boolean;
  /** Subset of globalTrustBadges ids. Defaults to productTrustBadgeIds. */
  badgeIds?: string[];
}

/**
 * Panel-facing purchase config composed with CommerceInfo at render time.
 * Used by PurchasePanel; section wrapper adds SectionBase fields.
 */
export interface PurchasePanelModules {
  primaryCta: PurchaseCta;
  secondaryCta?: PurchaseCta;
  variantGroups?: PurchaseVariantGroup[];
  quantity?: PurchaseQuantityConfig;
  shippingNote?: string;
  guaranteeNote?: string;
  trust?: PurchaseTrustConfig;
  /** When false, hide SKU even if commerce.sku exists. Default true. */
  showSku?: boolean;
}

/** Alias for panel props documentation / imports. */
export type PurchasePanelContent = PurchasePanelModules & {
  headline: string;
  description: string;
};
