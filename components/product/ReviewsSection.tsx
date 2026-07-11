import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductRating, ProductSectionHeader } from "@/components/product/shared";
import type { ReviewsSection as ReviewsSectionContent } from "@/types/content";

type ReviewsSectionProps = {
  content: ReviewsSectionContent;
};

function ReviewStars({ rating }: { rating: number }) {
  return (
    <span className="product-review-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={
            rating >= index + 1
              ? "product-review-stars__star product-review-stars__star--full"
              : "product-review-stars__star"
          }
        />
      ))}
    </span>
  );
}

/** Displays customer reviews and rating summary. */
export function ReviewsSection({ content }: ReviewsSectionProps) {
  if (!content.enabled) {
    return null;
  }

  return (
    <Section id={content.id} aria-label="Reviews" className="product-section product-section--decision">
      <Container width="reading">
        <Stack gap="xl">
          <ProductSectionHeader headline={content.headline} />
          {content.summary && (
            <div className="product-review-summary">
              <ProductRating
                rating={content.summary.averageRating}
                reviewCount={content.summary.totalCount}
              />
            </div>
          )}
          <Stack as="ul" className="product-review-grid">
            {content.reviews.map((review) => (
              <Card as="li" key={review.id} className="product-review-card" interactive>
                <Stack gap="sm">
                  <div className="product-review-card__header">
                    <Heading level={3} variant="subtitle">
                      {review.author}
                    </Heading>
                    {review.verified && (
                      <Text variant="label" className="product-review-card__verified">
                        Verified
                      </Text>
                    )}
                  </div>
                  <ReviewStars rating={review.rating} />
                  <Text variant="caption">{review.content}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
