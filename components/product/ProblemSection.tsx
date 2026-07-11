import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";
import { ProductSectionHeader } from "@/components/product/shared";
import type { ProblemSection as ProblemSectionContent } from "@/types/content";

type ProblemSectionProps = {
  content: ProblemSectionContent;
};

/** Describes the user pain points the product addresses. */
export function ProblemSection({ content }: ProblemSectionProps) {
  return (
    <LayoutDebugRegion label="PROBLEM" order={3}>
      <Section
        id={content.id}
        aria-label="Problem"
        className="product-section product-section--story product-section--narrative-spacious"
      >
        <Container width="reading">
          <Stack gap="2xl">
            <ProductSectionHeader headline={content.headline} />
            <Text className="product-section-intro">{content.introduction}</Text>
            <Stack as="ul" className="product-item-grid product-item-grid--story">
              {content.painPoints.map((point) => (
                <Card as="li" key={point.title} className="product-item-card">
                  <Stack gap="sm">
                    <Heading level={3} variant="title">
                      {point.title}
                    </Heading>
                    <Text variant="caption">{point.description}</Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Section>
    </LayoutDebugRegion>
  );
}
