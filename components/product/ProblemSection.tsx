"use client";

import { useRef } from "react";

import { Container, Heading, Section, Text } from "@/components/ui";
import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";
import { useProblemReveal } from "@/hooks/useProblemReveal";
import type { ProblemSection as ProblemSectionContent } from "@/types/content";

type ProblemSectionProps = {
  content: ProblemSectionContent;
};

/** Describes the user pain points the product addresses. */
export function ProblemSection({ content }: ProblemSectionProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useProblemReveal({
    scope: frameRef,
    container: frameRef,
    eyebrow: eyebrowRef,
    headline: headlineRef,
    intro: introRef,
    list: listRef,
  });

  return (
    <LayoutDebugRegion label="PROBLEM" order={3}>
      <Section
        id={content.id}
        aria-label="Problem"
        className="product-section product-section--story serian-i06-problem"
      >
        <Container width="content">
          <div ref={frameRef} className="serian-i06-problem__frame">
            <div className="serian-i06-problem__intro-block">
              <div ref={eyebrowRef}>
                <Text as="p" variant="label" className="serian-i06-section-index">
                  The context
                </Text>
              </div>
              <div ref={headlineRef}>
                <Heading level={2} variant="heading" className="serian-i06-problem__headline">
                  {content.headline}
                </Heading>
              </div>
              <div ref={introRef}>
                <Text className="serian-i06-problem__intro">{content.introduction}</Text>
              </div>
            </div>

            <ol ref={listRef} className="serian-i06-problem__list">
              {content.painPoints.map((point, index) => (
                <li key={point.title} className="serian-i06-problem__item">
                  <span className="serian-i06-problem__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Heading level={3} variant="title" className="serian-i06-problem__item-title">
                      {point.title}
                    </Heading>
                    <Text variant="caption" className="serian-i06-problem__item-body">
                      {point.description}
                    </Text>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>
    </LayoutDebugRegion>
  );
}
