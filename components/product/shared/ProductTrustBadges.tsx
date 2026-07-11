import { getProductTrustBadges } from "@/content/global/trust";
import { Text } from "@/components/ui";
import { cn } from "@/lib/utils";

import type { TrustBadgeItem } from "@/content/global/trust";

type ProductTrustBadgesProps = {
  items?: TrustBadgeItem[];
  variant?: "row" | "compact";
  className?: string;
};

/** Product trust badges — labels sourced from global trust content. */
export function ProductTrustBadges({
  items = getProductTrustBadges(),
  variant = "row",
  className,
}: ProductTrustBadgesProps) {
  return (
    <ul
      className={cn(
        "product-trust-badges",
        `product-trust-badges--${variant}`,
        className,
      )}
      aria-label="Purchase guarantees"
    >
      {items.map((item) => (
        <li key={item.id} className="product-trust-badge">
          <Text as="span" variant="label">
            {item.label}
          </Text>
        </li>
      ))}
    </ul>
  );
}

export type { TrustBadgeItem as TrustBadge };
