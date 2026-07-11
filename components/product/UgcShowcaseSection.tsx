import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductSectionHeader, ProductVideo } from "@/components/product/shared";
import type { UgcShowcaseMedia } from "@/types/content";

type UgcShowcaseSectionProps = {
  content: UgcShowcaseMedia;
};

/** UGC short-form video showcase — lazy-loaded per card. */
export function UgcShowcaseSection({ content }: UgcShowcaseSectionProps) {
  if (!content.enabled || content.items.length === 0) {
    return null;
  }

  return (
    <Section
      id="ugc-showcase"
      aria-label="Customer videos"
      className="product-section product-section--surface"
    >
      <Container width="content">
        <Stack gap="xl">
          <ProductSectionHeader headline={content.headline} />
          {content.subheadline && (
            <Text className="product-section-intro">{content.subheadline}</Text>
          )}
          <ul className="product-ugc-grid">
            {content.items.map((item) => (
              <Card as="li" key={item.id} className="product-ugc-card">
                <Stack gap="sm">
                  <ProductVideo asset={item.video} variant="ugc" autoPlayMuted />
                  <Stack gap="xs">
                    <Heading level={3} variant="title">
                      {item.title}
                    </Heading>
                    {item.caption && <Text variant="caption">{item.caption}</Text>}
                  </Stack>
                </Stack>
              </Card>
            ))}
          </ul>
        </Stack>
      </Container>
    </Section>
  );
}
