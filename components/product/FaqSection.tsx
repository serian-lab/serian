import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductSectionHeader } from "@/components/product/shared";
import type { FaqSection as FaqSectionContent } from "@/types/content";

type FaqSectionProps = {
  content: FaqSectionContent;
};

/** Answers common questions to reduce purchase hesitation. */
export function FaqSection({ content }: FaqSectionProps) {
  return (
    <Section
      id={content.id}
      aria-label="FAQ"
      className="product-section product-section--specification"
    >
      <Container width="content">
        <Stack gap="xl">
          <ProductSectionHeader headline={content.headline} />
          <Stack as="ul" className="product-faq-list product-faq-list--specification">
            {content.items.map((item) => (
              <Card as="li" key={item.id} variant="flat" className="product-faq-item">
                <Stack gap="sm">
                  <Heading level={3} variant="title">
                    {item.question}
                  </Heading>
                  <Text variant="caption">{item.answer}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
