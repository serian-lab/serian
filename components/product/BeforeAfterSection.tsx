import { Container, Section, Stack, Text } from "@/components/ui";
import { BeforeAfterBlock, ProductSectionHeader } from "@/components/product/shared";
import type { BeforeAfterMedia } from "@/types/content";

type BeforeAfterSectionProps = {
  content: BeforeAfterMedia;
};

/** Before / after comparison section driven by media kit. */
export function BeforeAfterSection({ content }: BeforeAfterSectionProps) {
  if (!content.enabled || content.pairs.length === 0) {
    return null;
  }

  return (
    <Section
      id="before-after"
      aria-label="Before and after"
      className="product-section product-section--surface"
    >
      <Container width="content">
        <Stack gap="xl">
          <ProductSectionHeader headline={content.headline} />
          {content.subheadline && (
            <Text className="product-section-intro">{content.subheadline}</Text>
          )}
          <Stack gap="lg" className="product-before-after-list">
            {content.pairs.map((pair) => (
              <BeforeAfterBlock key={pair.id} pair={pair} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
