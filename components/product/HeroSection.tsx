"use client";

import { useRef } from "react";

import { Heading, Section, Text } from "@/components/ui";
import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";
import {
  HeroSupport,
  ProductMediaGallery,
} from "@/components/product/shared";
import { useHeroReveal } from "@/hooks/useHeroReveal";
import type { HeroSection as HeroSectionContent, ReviewSummary } from "@/types/content";
import type { MediaAsset } from "@/types/content";

type HeroSectionProps = {
  content: HeroSectionContent;
  galleryImages?: MediaAsset[];
  reviewSummary?: ReviewSummary;
  ctaLabel?: string;
};

/** Product-first hero — editorial stage where the product is the visual protagonist. */
export function HeroSection({
  content,
  galleryImages,
  reviewSummary,
  ctaLabel,
}: HeroSectionProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const images =
    galleryImages && galleryImages.length > 0
      ? galleryImages
      : [content.primaryImage];

  useHeroReveal({
    scope: scopeRef,
    gallery: galleryRef,
    eyebrow: eyebrowRef,
    headline: headlineRef,
    lead: leadRef,
    cta: ctaRef,
    trust: trustRef,
  });

  return (
    <Section
      id={content.id}
      aria-label="Hero"
      className="product-section product-section--hero serian-i06-hero"
    >
      <div ref={scopeRef} className="serian-i06-hero__grid">
        <div ref={galleryRef} className="serian-i06-hero__gallery">
          <LayoutDebugRegion label="GALLERY" variant="sub">
            <ProductMediaGallery images={images} priority presentation="stage" />
          </LayoutDebugRegion>
        </div>

        <div className="serian-i06-hero__panel">
          <div className="serian-i06-hero__panel-inner">
            <LayoutDebugRegion label="BRAND" variant="sub">
              <div ref={eyebrowRef}>
                <Text as="p" variant="caption" className="serian-i06-hero__eyebrow">
                  Serian
                </Text>
              </div>
            </LayoutDebugRegion>

            <LayoutDebugRegion label="STORY" variant="sub" className="serian-i06-hero__story">
              <div ref={headlineRef}>
                <Heading level={1} variant="display" className="serian-i06-hero__headline">
                  {content.headline}
                </Heading>
              </div>

              {content.subheadline && (
                <div ref={leadRef}>
                  <Text className="serian-i06-hero__lead">{content.subheadline}</Text>
                </div>
              )}
            </LayoutDebugRegion>

            <LayoutDebugRegion label="CTA" variant="sub" className="serian-i06-hero__actions">
              {ctaLabel && (
                <div ref={ctaRef}>
                  <a href="#purchase" className="ui-link serian-i06-hero__cta">
                    {ctaLabel}
                    <span className="serian-i06-hero__cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              )}
            </LayoutDebugRegion>

            <LayoutDebugRegion label="TRUST" variant="sub">
              <div ref={trustRef}>
                <HeroSupport
                  rating={reviewSummary?.averageRating}
                  reviewCount={reviewSummary?.totalCount}
                />
              </div>
            </LayoutDebugRegion>
          </div>
        </div>
      </div>
    </Section>
  );
}
