import type { ProductPageContent } from "@/types/content";

import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";

import { ComparisonSection } from "./ComparisonSection";
import { DemoVideoSection } from "./DemoVideoSection";
import { FaqSection } from "./FaqSection";
import { ProductNarrativeSection } from "./ProductNarrativeSection";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { PurchaseSection } from "./PurchaseSection";
import { ReviewsSection } from "./ReviewsSection";
import { UgcShowcaseSection } from "./UgcShowcaseSection";

type ProductPageProps = {
  product: ProductPageContent;
};

/** Composes all product sections for a single product landing page. */
export function ProductPage({ product }: ProductPageProps) {
  const { commerce, mediaKit, sections } = product;
  const heroImages = mediaKit.hero.images;
  const reviewSummary =
    sections.reviews.enabled && sections.reviews.summary
      ? sections.reviews.summary
      : undefined;

  return (
    <article className="product-page">
      <LayoutDebugRegion label="HERO" order={2}>
        <HeroSection
          content={sections.hero}
          galleryImages={heroImages}
          reviewSummary={reviewSummary}
          ctaLabel={sections.purchase.primaryCta?.label ?? sections.purchase.ctaLabel}
        />
      </LayoutDebugRegion>
      <ProblemSection content={sections.problem} />
      {mediaKit.demo && (
        <LayoutDebugRegion label="DEMO" order={4}>
          <DemoVideoSection content={mediaKit.demo} />
        </LayoutDebugRegion>
      )}
      <LayoutDebugRegion label="NARRATIVE" order={5}>
        <ProductNarrativeSection
          content={sections.productNarrative}
          narrativeMedia={mediaKit.narrative}
        />
      </LayoutDebugRegion>
      {sections.comparison?.enabled ? (
        <LayoutDebugRegion label="COMPARISON" order={6}>
          <ComparisonSection content={sections.comparison} />
        </LayoutDebugRegion>
      ) : null}
      {mediaKit.ugc &&
      mediaKit.ugc.enabled !== false &&
      mediaKit.ugc.items.length > 0 ? (
        <LayoutDebugRegion label="UGC" order={7}>
          <UgcShowcaseSection content={mediaKit.ugc} />
        </LayoutDebugRegion>
      ) : null}
      <LayoutDebugRegion label="REVIEWS" order={8}>
        <ReviewsSection content={sections.reviews} />
      </LayoutDebugRegion>
      <LayoutDebugRegion label="FAQ" order={9}>
        <FaqSection content={sections.faq} />
      </LayoutDebugRegion>
      <LayoutDebugRegion label="PURCHASE" order={10}>
        <PurchaseSection content={sections.purchase} commerce={commerce} />
      </LayoutDebugRegion>
    </article>
  );
}
