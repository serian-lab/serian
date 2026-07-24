"use client";

import { useEffect } from "react";

import { Container, Heading, Section, Text } from "@/components/ui";
import { useUgcRail } from "@/hooks/useUgcRail";
import { useUgcReveal } from "@/hooks/useUgcReveal";
import { pauseExclusiveGroup } from "@/lib/video/exclusivePlayback";
import type { UgcShowcaseMedia } from "@/types/content";

import { UgcVideoCard } from "./UgcVideoCard";

const UGC_PLAYBACK_GROUP = "ugc-showcase";
const UGC_SECTION_ID = "ugc-showcase";

type UgcShowcaseSectionProps = {
  content: UgcShowcaseMedia;
};

function RailArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      {direction === "prev" ? (
        <path
          d="M15 6 9 12l6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="m9 6 6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

/** Variable-count UGC showcase — centered header + wide 9:16 scroll rail. */
export function UgcShowcaseSection({ content }: UgcShowcaseSectionProps) {
  useUgcReveal();

  const items = content.items ?? [];
  const hasItems = content.enabled !== false && items.length > 0;
  const description = content.description ?? content.subheadline;
  const {
    railRef,
    overflow,
    canScrollPrev,
    canScrollNext,
    scrollToPrevious,
    scrollToNext,
  } = useUgcRail(items.length);

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

  const showCta = Boolean(content.cta?.label && content.cta.href && content.cta.href !== "#");

  return (
    <Section
      id={UGC_SECTION_ID}
      aria-label="Customer videos"
      className="product-section product-section--surface product-ugc-section"
    >
      <Container width="wide">
        <div className="product-ugc">
          <header className="product-ugc__header">
            {content.eyebrow ? (
              <div className="product-ugc__eyebrow-row">
                <span className="product-ugc__eyebrow-line" aria-hidden="true" />
                <Text as="p" variant="label" className="product-ugc__eyebrow">
                  {content.eyebrow}
                </Text>
                <span className="product-ugc__eyebrow-line" aria-hidden="true" />
              </div>
            ) : null}

            <Heading level={2} variant="heading" className="product-ugc__headline">
              {content.headline}
            </Heading>

            {description ? (
              <Text className="product-ugc__description">{description}</Text>
            ) : null}
          </header>

          <div className="product-ugc__viewport">
            {overflow ? (
              <button
                type="button"
                className="product-ugc__arrow product-ugc__arrow--prev"
                aria-label="Previous videos"
                disabled={!canScrollPrev}
                onClick={scrollToPrevious}
              >
                <RailArrowIcon direction="prev" />
              </button>
            ) : null}

            <div
              ref={railRef}
              className="product-ugc__rail"
              data-overflow={overflow ? "true" : "false"}
              data-count={items.length}
            >
              {items.map((item) => (
                <UgcVideoCard
                  key={item.id}
                  item={item}
                  exclusiveGroup={UGC_PLAYBACK_GROUP}
                />
              ))}
            </div>

            {overflow ? (
              <button
                type="button"
                className="product-ugc__arrow product-ugc__arrow--next"
                aria-label="Next videos"
                disabled={!canScrollNext}
                onClick={scrollToNext}
              >
                <RailArrowIcon direction="next" />
              </button>
            ) : null}
          </div>

          {showCta && content.cta ? (
            <p className="product-ugc__cta">
              <a className="product-ugc__cta-link" href={content.cta.href}>
                <span>{content.cta.label}</span>
                <span className="product-ugc__cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </p>
          ) : null}

          {content.disclaimer ? (
            <p className="product-ugc__disclaimer">{content.disclaimer}</p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
