import type { PurchaseSection } from "@/types/content";

export const purchase: PurchaseSection = {
  id: "purchase",
  headline: "Ready when you are",
  description:
    "Includes the Serian Hot Air Brush, a US plug, and a quick-start guide. One payment — no subscription.",
  primaryCta: {
    label: "Continue to checkout",
  },
  /** Hero deep-link label (same as primary CTA). */
  ctaLabel: "Continue to checkout",
  shippingNote: "Free standard shipping on orders within the contiguous United States.",
  guaranteeNote: "30-day satisfaction guarantee. 12-month limited warranty included.",
  // Single-SKU product: no variantGroups, no quantity module.
};
