"use client";

import { useRef } from "react";

import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductMedia, ProductSectionHeader } from "@/components/product/shared";
import { useSolutionReveal } from "@/hooks/useSolutionReveal";
import type { SolutionSection as SolutionSectionContent } from "@/types/content";

type SolutionSectionProps = {
  content: SolutionSectionContent;
};

/** Explains how the product solves the identified problem. */
export function SolutionSection({ content }: SolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useSolutionReveal(sectionRef);

  return (
    <Section
      ref={sectionRef}
      id={content.id}
      aria-label="Solution"
      className="product-section product-section--story"
    >
      <Container width="reading">
        <Stack gap="2xl">
          <ProductSectionHeader headline={content.headline} />
          <Text className="product-section-intro">{content.introduction}</Text>
          <Stack as="ul" className="product-item-grid product-item-grid--story">
            {content.highlights.map((highlight) => (
              <Card as="li" key={highlight.title} className="product-item-card">
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
              <ProductMedia asset={content.demonstrationImage} variant="demonstration" />
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
}
