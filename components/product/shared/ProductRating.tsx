import { Text } from "@/components/ui";
import { cn } from "@/lib/utils";

type ProductRatingProps = {
  rating: number;
  reviewCount: number;
  className?: string;
  linked?: boolean;
};

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="product-rating__stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const fill =
          rating >= starValue
            ? "full"
            : rating >= starValue - 0.5
              ? "partial"
              : "empty";

        return (
          <span
            key={starValue}
            className={cn(
              "product-rating__star",
              fill === "full" && "product-rating__star--full",
              fill === "partial" && "product-rating__star--partial",
            )}
          />
        );
      })}
    </span>
  );
}

/** Compact star rating with review count for hero and reviews summary. */
export function ProductRating({
  rating,
  reviewCount,
  className,
  linked = false,
}: ProductRatingProps) {
  const label = (
    <Text variant="caption" className="product-rating__label">
      {rating.toFixed(1)} · {reviewCount} reviews
    </Text>
  );

  return (
    <div
      className={cn("product-rating", className)}
      aria-label={`Rated ${rating.toFixed(1)} out of 5 from ${reviewCount} reviews`}
    >
      <StarRow rating={rating} />
      {linked ? (
        <a href="#reviews" className="product-rating__link">
          {label}
        </a>
      ) : (
        label
      )}
    </div>
  );
}
