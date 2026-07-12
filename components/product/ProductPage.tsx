import type { ProductPageContent } from "@/types/content";

import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";

import { BenefitsSection } from "./BenefitsSection";
import { ComparisonSection } from "./ComparisonSection";
import { DemoVideoSection } from "./DemoVideoSection";
import { FaqSection } from "./FaqSection";
import { ProductNarrativeSection } from "./ProductNarrativeSection";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { PurchaseSection } from "./PurchaseSection";
import { ReviewsSection } from "./ReviewsSection";
import { SolutionSection } from "./SolutionSection";
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
          ctaLabel={sections.purchase.ctaLabel}
        />
      </LayoutDebugRegion>
      <ProblemSection content={sections.problem} />
      <LayoutDebugRegion label="SOLUTION" order={4}>
        <SolutionSection content={sections.solution} />
      </LayoutDebugRegion>
      {mediaKit.demo && (
        <LayoutDebugRegion label="DEMO">
          <DemoVideoSection content={mediaKit.demo} />
        </LayoutDebugRegion>
      )}
      <LayoutDebugRegion label="NARRATIVE" order={5}>
        <ProductNarrativeSection
          content={sections.productNarrative}
          narrativeMedia={mediaKit.narrative}
        />
      </LayoutDebugRegion>
      <LayoutDebugRegion label="BENEFITS" order={6}>
        <BenefitsSection content={sections.benefits} />
      </LayoutDebugRegion>
      {sections.comparison?.enabled && (
        <LayoutDebugRegion label="COMPARISON" order={7}>
          <ComparisonSection content={sections.comparison} />
        </LayoutDebugRegion>
      )}
      {mediaKit.ugc && (
        <LayoutDebugRegion label="UGC">
          <UgcShowcaseSection content={mediaKit.ugc} />
        </LayoutDebugRegion>
      )}
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

