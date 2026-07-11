import { Container, Heading, Section, Text } from "@/components/ui";
import {
  HeroSupport,
  ProductMediaGallery,
} from "@/components/product/shared";
import type { HeroSection as HeroSectionContent, ReviewSummary } from "@/types/content";
import type { MediaAsset } from "@/types/content";

type HeroSectionProps = {
  content: HeroSectionContent;
  galleryImages?: MediaAsset[];
  reviewSummary?: ReviewSummary;
  ctaLabel?: string;
};

/** Product-first hero — a calm stage where the product is the visual protagonist. */
export function HeroSection({
  content,
  galleryImages,
  reviewSummary,
  ctaLabel,
}: HeroSectionProps) {
  const images =
    galleryImages && galleryImages.length > 0
      ? galleryImages
      : [content.primaryImage];

  return (
    <Section
      id={content.id}
      aria-label="Hero"
      className="product-section product-section--hero product-section--hero-stage product-section--stage"
    >
      <Container width="content">
        <div className="product-hero product-hero--gallery-first">
          <div className="product-hero__stage">
            <ProductMediaGallery images={images} priority presentation="stage" />
          </div>

          <div className="product-hero__story">
            <Heading level={1} variant="display" className="product-hero__headline">
              {content.headline}
            </Heading>

            {content.subheadline && (
              <Text className="product-hero__lead">{content.subheadline}</Text>
            )}

            {ctaLabel && (
              <a href="#purchase" className="product-hero__cta">
                {ctaLabel}
              </a>
            )}

            <HeroSupport
              rating={reviewSummary?.averageRating}
              reviewCount={reviewSummary?.totalCount}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
