import { Text } from "@/components/ui";
import { getProductTrustBadges } from "@/content/global/trust";
import { cn } from "@/lib/utils";

import { ProductRating } from "./ProductRating";

type HeroSupportProps = {
  rating?: number;
  reviewCount?: number;
  className?: string;
};

/** Cohesive trust block — rating and guarantees as one quiet supporting layer. */
export function HeroSupport({ rating, reviewCount, className }: HeroSupportProps) {
  const badges = getProductTrustBadges();
  const showRating = rating != null && reviewCount != null;

  return (
    <div className={cn("product-hero-support product-hero-support--quiet", className)}>
      {showRating && (
        <ProductRating
          rating={rating}
          reviewCount={reviewCount}
          linked
          className="product-hero-support__rating"
        />
      )}
      <Text as="p" variant="caption" className="product-hero-support__guarantees">
        {badges.map((badge) => badge.label).join(" · ")}
      </Text>
    </div>
  );
}
