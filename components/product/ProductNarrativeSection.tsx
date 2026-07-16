"use client";

import { useId, useMemo, useRef, useState } from "react";

import { Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductMedia, ProductSectionHeader } from "@/components/product/shared";
import {
  NARRATIVE_LOOP_COPIES,
  useNarrativeTrack,
} from "@/hooks/useNarrativeTrack";
import type {
  ImageMediaAsset,
  NarrativeChapterMediaRef,
  ProductNarrativeSection as ProductNarrativeSectionContent,
} from "@/types/content";

type ProductNarrativeSectionProps = {
  content: ProductNarrativeSectionContent;
  narrativeMedia?: NarrativeChapterMediaRef[];
};

type NarrativeChapter = ProductNarrativeSectionContent["chapters"][number];

function resolveChapterImage(
  chapterId: string,
  narrativeMedia: NarrativeChapterMediaRef[] | undefined,
  fallback?: NarrativeChapter["image"],
) {
  return narrativeMedia?.find((item) => item.id === chapterId)?.image ?? fallback;
}

type StoryCardProps = {
  chapter: NarrativeChapter;
  image?: ImageMediaAsset;
};

/** Visual-only card. Never focusable / clickable for navigation. */
function StoryCard({ chapter, image }: StoryCardProps) {
  return (
    <article
      className="product-narrative__card"
      aria-roledescription="slide"
      aria-label={chapter.title}
    >
      {image ? (
        <div className="product-narrative__media">
          <ProductMedia asset={image} variant="narrative" />
        </div>
      ) : null}
      <div className="product-narrative__copy">
        <Heading level={3} variant="title" className="product-narrative__title">
          {chapter.title}
        </Heading>
        <Text className="product-narrative__body">{chapter.body}</Text>
      </div>
    </article>
  );
}

/**
 * Narrative Product Showcase — continuous physical track.
 * React renders the strip once; motion is runtime-driven (no drag rerenders).
 */
export function ProductNarrativeSection({
  content,
  narrativeMedia,
}: ProductNarrativeSectionProps) {
  const chapters = content.chapters;
  const count = chapters.length;
  const labelId = useId();
  const statusId = useId();

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /** A11y only — updated when the engine settles on a logical chapter. */
  const [activeIndex, setActiveIndex] = useState(0);

  const trackChapters = useMemo(() => {
    if (count === 0) {
      return [];
    }

    const copies: NarrativeChapter[] = [];
    for (let copy = 0; copy < NARRATIVE_LOOP_COPIES; copy += 1) {
      for (const chapter of chapters) {
        copies.push(chapter);
      }
    }
    return copies;
  }, [chapters, count]);

  useNarrativeTrack({
    stageRef,
    trackRef,
    count,
    onActiveChange: setActiveIndex,
  });

  if (count === 0) {
    return null;
  }

  return (
    <Section
      id={content.id}
      aria-label="A closer look"
      className="product-section product-narrative"
    >
      <Container width="content">
        <Stack gap="xl" className="product-narrative__frame">
          <header className="product-narrative__header">
            {content.eyebrow ? (
              <Text as="p" variant="label" className="product-narrative__eyebrow">
                {content.eyebrow}
              </Text>
            ) : null}
            <ProductSectionHeader headline={content.headline} />
            {content.introduction ? (
              <Text className="product-section-intro product-narrative__intro">
                {content.introduction}
              </Text>
            ) : null}
          </header>

          <div
            className="product-narrative__showcase"
            role="region"
            aria-roledescription="carousel"
            aria-labelledby={labelId}
            aria-describedby={statusId}
          >
            <p id={labelId} className="product-narrative__sr-only">
              Product design showcase. Drag horizontally to explore.
            </p>
            <p id={statusId} className="product-narrative__sr-only" aria-live="polite">
              Slide {activeIndex + 1} of {count}: {chapters[activeIndex]?.title}
            </p>

            <div ref={stageRef} className="product-narrative__stage">
              <div ref={trackRef} className="product-narrative__track">
                {trackChapters.map((chapter, index) => {
                  const image = resolveChapterImage(
                    chapter.id,
                    narrativeMedia,
                    chapter.image,
                  );
                  const copy = Math.floor(index / count);

                  return (
                    <StoryCard
                      key={`${copy}-${chapter.id}-${index}`}
                      chapter={chapter}
                      image={image}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
