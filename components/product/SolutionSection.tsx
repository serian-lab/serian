"use client";

import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductMedia, ProductSectionHeader } from "@/components/product/shared";
import { useSolutionReveal } from "@/hooks/useSolutionReveal";
import type { SolutionSection as SolutionSectionContent } from "@/types/content";

type SolutionSectionProps = {
  content: SolutionSectionContent;
};

/**
 * Editorial reading section — headline, introduction, then
 * highlights (left) + demonstration image (right).
 * One container fade-up on enter; cards/media keep CSS hover only.
 */
export function SolutionSection({ content }: SolutionSectionProps) {
  useSolutionReveal();

  return (
    <Section
      id={content.id}
      aria-label="Solution"
      className="product-section product-section--story"
    >
      <Container width="content">
        <div className="product-solution">
          <Stack gap="lg" className="product-solution__lead">
            <ProductSectionHeader headline={content.headline} />
            <Text className="product-section-intro product-solution__intro">
              {content.introduction}
            </Text>
          </Stack>

          <div className="product-solution__body">
            <Stack as="ul" gap="lg" className="product-solution__highlights">
              {content.highlights.map((highlight) => (
                <Card
                  as="li"
                  key={highlight.title}
                  className="product-item-card product-solution__card"
                  interactive
                >
                  <Stack gap="sm">
                    <Heading level={3} variant="title">
                      {highlight.title}
                    </Heading>
                    <Text variant="caption">{highlight.description}</Text>
                  </Stack>
                </Card>
              ))}
            </Stack>

            {content.demonstrationImage && (
              <div className="product-solution-media">
                <ProductMedia
                  asset={content.demonstrationImage}
                  variant="demonstration"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
