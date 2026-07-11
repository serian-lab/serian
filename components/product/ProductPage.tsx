import type { ProductPageContent } from "@/types/content";

import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";

import { BeforeAfterSection } from "./BeforeAfterSection";
import { BenefitsSection } from "./BenefitsSection";
import { ComparisonSection } from "./ComparisonSection";
import { DemoVideoSection } from "./DemoVideoSection";
import { FaqSection } from "./FaqSection";
import { FeaturesSection } from "./FeaturesSection";
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
      <LayoutDebugRegion label="HERO">
        <HeroSection
          content={sections.hero}
          galleryImages={heroImages}
          reviewSummary={reviewSummary}
          ctaLabel={sections.purchase.ctaLabel}
        />
      </LayoutDebugRegion>
      <ProblemSection content={sections.problem} />
      <LayoutDebugRegion label="SOLUTION">
        <SolutionSection content={sections.solution} />
      </LayoutDebugRegion>
      {mediaKit.demo && (
        <LayoutDebugRegion label="DEMO">
          <DemoVideoSection content={mediaKit.demo} />
        </LayoutDebugRegion>
      )}
      <LayoutDebugRegion label="FEATURES">
        <FeaturesSection content={sections.features} featureMedia={mediaKit.features} />
      </LayoutDebugRegion>
      <LayoutDebugRegion label="BENEFITS">
        <BenefitsSection content={sections.benefits} />
      </LayoutDebugRegion>
      {mediaKit.beforeAfter && (
        <LayoutDebugRegion label="BEFORE AFTER">
          <BeforeAfterSection content={mediaKit.beforeAfter} />
        </LayoutDebugRegion>
      )}
      <LayoutDebugRegion label="COMPARISON">
        <ComparisonSection content={sections.comparison} />
      </LayoutDebugRegion>
      {mediaKit.ugc && (
        <LayoutDebugRegion label="UGC">
          <UgcShowcaseSection content={mediaKit.ugc} />
        </LayoutDebugRegion>
      )}
      <LayoutDebugRegion label="REVIEWS">
        <ReviewsSection content={sections.reviews} />
      </LayoutDebugRegion>
      <LayoutDebugRegion label="FAQ">
        <FaqSection content={sections.faq} />
      </LayoutDebugRegion>
      <LayoutDebugRegion label="PURCHASE">
        <PurchaseSection content={sections.purchase} commerce={commerce} />
      </LayoutDebugRegion>
    </article>
  );
}

