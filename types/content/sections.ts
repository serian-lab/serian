import type { ImageMediaAsset } from "./media";
import type { MediaAsset, SectionBase, SectionVisibility } from "./shared";
import type { PurchasePanelModules } from "./purchase";

/**
 * Core story sections:
 * Hero → Problem → Product Narrative → Comparison → Reviews → FAQ → Purchase
 *
 * Optional modules (see ProductPage): Demo, UGC, and future add-ons.
 */

/** Section 1 — Attention: "What is this?" */
export interface HeroSection extends SectionBase {
  primaryImage: MediaAsset;
  secondaryImages?: MediaAsset[];
}

/** Section 2 — Problem: "Why should I care?" */
export interface ProblemPainPoint {
  id: string;
  title: string;
  description: string;
  /** Optional path to a local icon asset (e.g. `/images/problem/….svg`). */
  icon?: string;
}

export interface ProblemSection extends SectionBase {
  introduction: string;
  painPoints: ProblemPainPoint[];
}

/** One design decision in the product narrative — not a feature listing. */
export interface ProductNarrativeChapter {
  id: string;
  /** Optional topic label shown in the card header (e.g. "THE SHAPE"). */
  eyebrow?: string;
  title: string;
  body: string;
  image?: MediaAsset;
}

/** Section 4 — Product Narrative: "Why was this designed this way?" */
export interface ProductNarrativeSection extends SectionBase {
  eyebrow?: string;
  introduction?: string;
  chapters: ProductNarrativeChapter[];
}

/** One side of a product-vs-alternative comparison. */
export interface ComparisonSide {
  label: string;
  sublabel?: string;
  /** Optional decorative image — product column / header only. */
  image?: ImageMediaAsset;
}

/** Optional module — Comparison: structural workflow differences (Evidence). */
export interface ComparisonSection extends SectionBase, SectionVisibility {
  eyebrow?: string;
  description?: string;
  product: ComparisonSide;
  alternative: ComparisonSide;
  rows: ComparisonRow[];
  /** Quiet footer note inside the comparison panel. */
  note?: string;
}

export interface ComparisonRow {
  id: string;
  label: string;
  helper?: string;
  /** Semantic icon key resolved by the Comparison section (e.g. `tools`). */
  icon?: string;
  productValue: string;
  alternativeValue: string;
}

/** Section 7 — Reviews: social proof (Trust) */
export interface ReviewsSection extends SectionBase, SectionVisibility {
  summary?: ReviewSummary;
  reviews: Review[];
}

export interface ReviewSummary {
  averageRating: number;
  totalCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date?: string;
  verified?: boolean;
}

/** Section 8 — FAQ: objection handling (Trust) */
export interface FaqSection extends SectionBase {
  items: FaqItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Section 9 — Purchase: "Am I ready to buy?" (modular purchase panel) */
export interface PurchaseSection extends SectionBase, PurchasePanelModules {
  description: string;
  /**
   * @deprecated Prefer `primaryCta.label`. Kept so Hero deep-links keep working
   * during migration; if omitted, consumers should read `primaryCta.label`.
   */
  ctaLabel?: string;
}

/** All narrative sections that compose a product landing page. */
export interface ProductPageSections {
  hero: HeroSection;
  problem: ProblemSection;
  productNarrative: ProductNarrativeSection;
  /** Omit or set `null` when the product has no meaningful alternative workflow. */
  comparison?: ComparisonSection | null;
  reviews: ReviewsSection;
  faq: FaqSection;
  purchase: PurchaseSection;
}
