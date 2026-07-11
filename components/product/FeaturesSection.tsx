import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import {
  ProductMedia,
  ProductSectionHeader,
  resolveFeatureMedia,
} from "@/components/product/shared";
import { cn } from "@/lib/utils";
import type { FeatureMediaRef, FeaturesSection as FeaturesSectionContent } from "@/types/content";

type FeaturesSectionProps = {
  content: FeaturesSectionContent;
  featureMedia?: FeatureMediaRef[];
};

/** Lists the product's core capabilities with optional media kit layouts. */
export function FeaturesSection({ content, featureMedia }: FeaturesSectionProps) {
  return (
    <Section
      id={content.id}
      aria-label="Features"
      className="product-section product-section--specification"
    >
      <Container width="content">
        <Stack gap="xl">
          <ProductSectionHeader headline={content.headline} />
          <Stack as="ul" className="product-feature-grid product-feature-grid--specification">
            {content.features.map((feature) => {
              const { image, layout } = resolveFeatureMedia(
                feature.id,
                featureMedia,
                feature.image,
              );
              const hasMedia = Boolean(image);

              return (
                <Card
                  as="li"
                  key={feature.id}
                  className={cn(
                    "product-feature-card",
                    hasMedia && "product-feature-card--with-media",
                    hasMedia && layout === "media-end" && "product-feature-card--media-end",
                    hasMedia && layout === "inline" && "product-feature-card--inline-media",
                    !hasMedia && "product-feature-card--text-only",
                  )}
                >
                  {hasMedia && image && (
                    <ProductMedia asset={image} variant="feature" />
                  )}
                  <Stack gap="sm" className="product-feature-card__content">
                    <Heading level={3} variant="title">
                      {feature.title}
                    </Heading>
                    <Text variant="caption">{feature.description}</Text>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
