"use client";

import { useEffect } from "react";

import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductSectionHeader, ProductVideo } from "@/components/product/shared";
import { useUgcReveal } from "@/hooks/useUgcReveal";
import { pauseExclusiveGroup } from "@/lib/video/exclusivePlayback";
import type { UgcShowcaseMedia } from "@/types/content";

const UGC_PLAYBACK_GROUP = "ugc-showcase";
const UGC_SECTION_ID = "ugc-showcase";

type UgcShowcaseSectionProps = {
  content: UgcShowcaseMedia;
};

/** UGC short-form videos — poster-first, click-to-play, one active player. */
export function UgcShowcaseSection({ content }: UgcShowcaseSectionProps) {
  useUgcReveal();

  const hasItems = content.enabled && content.items.length > 0;

  useEffect(() => {
    if (!hasItems) {
      return;
    }

    const node = document.getElementById(UGC_SECTION_ID);
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && !entry.isIntersecting) {
          pauseExclusiveGroup(UGC_PLAYBACK_GROUP);
        }
      },
      { threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasItems]);

  if (!hasItems) {
    return null;
  }

  return (
    <Section
      id={UGC_SECTION_ID}
      aria-label="Customer videos"
      className="product-section product-section--surface"
    >
      <Container width="content">
        <div className="product-ugc">
          <Stack gap="xl">
            <div className="product-ugc__intro">
              <Stack gap="xl">
                <ProductSectionHeader headline={content.headline} />
                {content.subheadline ? (
                  <Text className="product-section-intro">{content.subheadline}</Text>
                ) : null}
              </Stack>
            </div>
            <ul
              className="product-ugc-grid"
              onClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest(".product-video__trigger")) {
                  return;
                }

                const card = target.closest(".product-ugc-card");
                if (!card) {
                  return;
                }

                card.querySelector<HTMLButtonElement>(".product-video__trigger")?.click();
              }}
            >
              {content.items.map((item) => (
                <Card as="li" key={item.id} className="product-ugc-card">
                  <Stack gap="sm">
                    <ProductVideo
                      asset={item.video}
                      variant="ugc"
                      exclusiveGroup={UGC_PLAYBACK_GROUP}
                      playerId={item.id}
                    />
                    <Stack gap="xs">
                      <Heading level={3} variant="title">
                        {item.title}
                      </Heading>
                      {item.caption ? <Text variant="caption">{item.caption}</Text> : null}
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </ul>
          </Stack>
        </div>
      </Container>
    </Section>
  );
}
