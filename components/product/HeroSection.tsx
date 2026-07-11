import { Container, Heading, Section, Text } from "@/components/ui";
import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";
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
          <LayoutDebugRegion label="BRAND" variant="sub" className="product-hero__brand">
            <Text as="p" variant="caption" className="product-hero__eyebrow">
              Serian
            </Text>
          </LayoutDebugRegion>
          <LayoutDebugRegion label="GALLERY" variant="sub" className="product-hero__stage">
            <ProductMediaGallery images={images} priority presentation="stage" />
          </LayoutDebugRegion>

          <div className="product-hero__story">
            <LayoutDebugRegion label="STORY" variant="sub" className="product-hero__text">
              <Heading level={1} variant="display" className="product-hero__headline">
                {content.headline}
              </Heading>

              {content.subheadline && (
                <Text className="product-hero__lead">{content.subheadline}</Text>
              )}
            </LayoutDebugRegion>

            <LayoutDebugRegion label="CTA" variant="sub" className="product-hero__cta-wrap">
              {ctaLabel && (
                <a href="#purchase" className="product-hero__cta">
                  {ctaLabel}
                </a>
              )}
            </LayoutDebugRegion>

            <LayoutDebugRegion label="TRUST" variant="sub" className="product-hero__trust">
              <HeroSupport
                rating={reviewSummary?.averageRating}
                reviewCount={reviewSummary?.totalCount}
              />
            </LayoutDebugRegion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
