import { Button, Card, Container, Section, Stack, Text } from "@/components/ui";
import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";
import {
  ProductSectionHeader,
  ProductTrustBadges,
} from "@/components/product/shared";
import type {
  CommerceInfo,
  PurchaseSection as PurchaseSectionContent,
} from "@/types/content";

type PurchaseSectionProps = {
  content: PurchaseSectionContent;
  commerce: CommerceInfo;
};

/** Presents pricing and the primary purchase call-to-action. */
export function PurchaseSection({ content, commerce }: PurchaseSectionProps) {
  return (
    <Section
      id={content.id}
      aria-label="Purchase"
      className="product-section product-section--decision"
    >
      <Container width="reading">
        <Card as="div" className="product-purchase product-purchase--decision">
          <Stack gap="lg">
            <LayoutDebugRegion label="PRODUCT CARD" variant="sub">
              <Stack gap="sm">
                <ProductSectionHeader headline={content.headline} />
                <Text className="product-section-intro">{content.description}</Text>
              </Stack>
            </LayoutDebugRegion>
            <LayoutDebugRegion label="PAYMENT" variant="sub">
              <ProductTrustBadges className="product-purchase__badges" />
            </LayoutDebugRegion>
            <LayoutDebugRegion label="PRICE" variant="sub">
              <Stack gap="xs" className="product-purchase__pricing">
                <Text as="span" className="product-purchase__price">
                  {commerce.price} {commerce.currency}
                </Text>
                {commerce.compareAtPrice && (
                  <Text as="span" variant="caption" className="product-purchase__compare">
                    {commerce.compareAtPrice} {commerce.currency}
                  </Text>
                )}
                {commerce.sku && (
                  <Text variant="label" className="product-purchase__meta">
                    SKU: {commerce.sku}
                  </Text>
                )}
              </Stack>
            </LayoutDebugRegion>
            <LayoutDebugRegion label="CTA" variant="sub" className="product-purchase__cta">
              <Button type="button" fullWidth>
                {content.ctaLabel}
              </Button>
            </LayoutDebugRegion>
            {(content.shippingNote || content.guaranteeNote) && (
              <LayoutDebugRegion label="GUARANTEE" variant="sub" className="product-purchase__trust">
                <Stack gap="sm">
                  {content.shippingNote && (
                    <Text variant="caption">{content.shippingNote}</Text>
                  )}
                  {content.guaranteeNote && (
                    <Text variant="caption">{content.guaranteeNote}</Text>
                  )}
                </Stack>
              </LayoutDebugRegion>
            )}
          </Stack>
        </Card>
      </Container>
    </Section>
  );
}
