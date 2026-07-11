import type { MediaAsset, SectionBase, SectionVisibility, TextBlock } from "./shared";

/**
 * Narrative sections aligned with the Serian product page flow:
 * Hero → Problem → Solution → Product Narrative → Benefits → Comparison → Reviews → FAQ → Purchase
 */

/** Section 1 — Attention: "What is this?" */
export interface HeroSection extends SectionBase {
  primaryImage: MediaAsset;
  secondaryImages?: MediaAsset[];
}

/** Section 2 — Problem: "Why should I care?" */
export interface ProblemSection extends SectionBase {
  introduction: string;
  painPoints: TextBlock[];
}

/** Section 3 — Solution: "How does this solve my problem?" */
export interface SolutionSection extends SectionBase {
  introduction: string;
  highlights: TextBlock[];
  demonstrationImage?: MediaAsset;
}

/** One design decision in the product narrative — not a feature listing. */
export interface ProductNarrativeChapter {
  id: string;
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

/** Section 5 — Benefits: outcome-focused value */
export interface BenefitsSection extends SectionBase {
  benefits: TextBlock[];
}

/** Section 6 — Comparison: "Does it actually work?" (Evidence) */
export interface ComparisonSection extends SectionBase, SectionVisibility {
  rows: ComparisonRow[];
}

export interface ComparisonRow {
  aspect: string;
  product: string;
  alternative: string;
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

/** Section 9 — Purchase: "Am I ready to buy?" */
export interface PurchaseSection extends SectionBase {
  description: string;
  ctaLabel: string;
  shippingNote?: string;
  guaranteeNote?: string;
}

/** All narrative sections that compose a product landing page. */
export interface ProductPageSections {
  hero: HeroSection;
  problem: ProblemSection;
  solution: SolutionSection;
  productNarrative: ProductNarrativeSection;
  benefits: BenefitsSection;
  comparison: ComparisonSection;
  reviews: ReviewsSection;
  faq: FaqSection;
  purchase: PurchaseSection;
}
