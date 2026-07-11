import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductSectionHeader } from "@/components/product/shared";
import type { BenefitsSection as BenefitsSectionContent } from "@/types/content";

type BenefitsSectionProps = {
  content: BenefitsSectionContent;
};

/** Communicates the outcomes and value the user gains. */
export function BenefitsSection({ content }: BenefitsSectionProps) {
  return (
    <Section id={content.id} aria-label="Benefits" className="product-section product-section--story">
      <Container width="reading">
        <Stack gap="2xl">
          <ProductSectionHeader headline={content.headline} />
          <Stack as="ul" className="product-benefit-list product-benefit-list--story">
            {content.benefits.map((benefit) => (
              <Card as="li" key={benefit.title} variant="flat" className="product-benefit-item">
                <Stack gap="sm">
                  <Heading level={3} variant="title">
                    {benefit.title}
                  </Heading>
                  <Text variant="caption">{benefit.description}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
