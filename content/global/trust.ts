/** Global trust language — single source for badges and banners site-wide. */

export type TrustBadgeItem = {
  id: string;
  label: string;
};

export const globalTrustBadges: TrustBadgeItem[] = [
  { id: "shipping", label: "Free Shipping" },
  { id: "returns", label: "30-Day Returns" },
  { id: "checkout", label: "Secure Checkout" },
  { id: "support", label: "Friendly Support" },
  { id: "quality", label: "Quality Guarantee" },
];

/** Subset shown on product Hero and Purchase sections. */
export const productTrustBadgeIds = [
  "shipping",
  "returns",
  "quality",
  "checkout",
] as const;

export function getProductTrustBadges(): TrustBadgeItem[] {
  return globalTrustBadges.filter((badge) =>
    (productTrustBadgeIds as readonly string[]).includes(badge.id),
  );
}

export const globalTrustMessage =
  "Every order ships free within the contiguous United States. Returns are straightforward, and our team responds within one business day.";
