"use client";

import { Container, Section, Stack, Text } from "@/components/ui";
import { ProductSectionHeader, ProductVideo } from "@/components/product/shared";
import { useDemoReveal } from "@/hooks/useDemoReveal";
import type { DemoVideoMedia } from "@/types/content";

type DemoVideoSectionProps = {
  content: DemoVideoMedia;
};

/** Product demonstration video block. */
export function DemoVideoSection({ content }: DemoVideoSectionProps) {
  useDemoReveal();

  if (!content.enabled) {
    return null;
  }

  return (
    <Section
      id="demo-video"
      aria-label="Product demonstration"
      className="product-section product-section--narrative"
    >
      <Container width="content">
        <Stack gap="lg" className="product-demo">
          <ProductSectionHeader headline={content.headline} />
          {content.description && (
            <Text className="product-section-intro">{content.description}</Text>
          )}
          <ProductVideo asset={content.video} variant="demo" />
        </Stack>
      </Container>
    </Section>
  );
}
