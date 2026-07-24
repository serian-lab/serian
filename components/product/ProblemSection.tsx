"use client";

import { Container, Heading, Section, Text } from "@/components/ui";
import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";
import { useProblemReveal } from "@/hooks/useProblemReveal";
import type { ProblemSection as ProblemSectionContent } from "@/types/content";

type ProblemSectionProps = {
  content: ProblemSectionContent;
};

/** Describes the user pain points the product addresses. */
export function ProblemSection({ content }: ProblemSectionProps) {
  useProblemReveal();

  return (
    <LayoutDebugRegion label="PROBLEM" order={3}>
      <Section
        id={content.id}
        aria-label="Problem"
        className="product-section product-section--story serian-i06-problem"
      >
        <Container width="wide">
          <div className="serian-i06-problem__frame">
            <div className="serian-i06-problem__intro-block problem-intro">
              <Text as="p" variant="label" className="serian-i06-section-index">
                The context
              </Text>
              <Heading level={2} variant="heading" className="serian-i06-problem__headline">
                {content.headline}
              </Heading>
              <Text className="serian-i06-problem__intro ui-text--lead">{content.introduction}</Text>
            </div>

            <ol className="serian-i06-problem__list">
              {content.painPoints.map((point, index) => (
                <li key={point.id} className="serian-i06-problem__item">
                  <span className="serian-i06-problem__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="serian-i06-problem__icon-wrap" aria-hidden="true">
                    {point.icon ? (
                      // Local SVG placeholders — path-driven for future asset swap.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={point.icon}
                        alt=""
                        width={30}
                        height={30}
                        className="serian-i06-problem__icon"
                      />
                    ) : null}
                  </div>
                  <div className="serian-i06-problem__content">
                    <Heading level={3} variant="title" className="serian-i06-problem__item-title">
                      {point.title}
                    </Heading>
                    <Text className="serian-i06-problem__item-body">{point.description}</Text>
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
