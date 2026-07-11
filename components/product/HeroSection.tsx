import { Heading, Section, Text } from "@/components/ui";
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

/** Product-first hero — editorial stage where the product is the visual protagonist. */
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
      className="product-section product-section--hero serian-i06-hero"
    >
      <div className="serian-i06-hero__grid">
        <div className="serian-i06-hero__gallery">
          <LayoutDebugRegion label="GALLERY" variant="sub">
            <ProductMediaGallery images={images} priority presentation="stage" />
          </LayoutDebugRegion>
        </div>

        <div className="serian-i06-hero__panel">
          <div className="serian-i06-hero__panel-inner">
            <LayoutDebugRegion label="BRAND" variant="sub">
              <Text as="p" variant="caption" className="serian-i06-hero__eyebrow">
                Serian
              </Text>
            </LayoutDebugRegion>

            <LayoutDebugRegion label="STORY" variant="sub" className="serian-i06-hero__story">
              <Heading level={1} variant="display" className="serian-i06-hero__headline">
                {content.headline}
              </Heading>

              {content.subheadline && (
                <Text className="serian-i06-hero__lead">{content.subheadline}</Text>
              )}
            </LayoutDebugRegion>

            <LayoutDebugRegion label="CTA" variant="sub" className="serian-i06-hero__actions">
              {ctaLabel && (
                <a href="#purchase" className="ui-link serian-i06-hero__cta">
                  {ctaLabel}
                  <span className="serian-i06-hero__cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              )}
            </LayoutDebugRegion>

            <LayoutDebugRegion label="TRUST" variant="sub">
              <HeroSupport
                rating={reviewSummary?.averageRating}
                reviewCount={reviewSummary?.totalCount}
              />
            </LayoutDebugRegion>
          </div>
        </div>
      </div>
    </Section>
  );
}
