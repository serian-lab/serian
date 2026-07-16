import type {
  BenefitsSection,
  ComparisonSection,
  ProblemSection,
  ProductNarrativeSection,
  SolutionSection,
} from "@/types/content";

import { media } from "./media";

export const problem: ProblemSection = {
  id: "problem",
  headline: "Most mornings leave little room for a full styling routine",
  introduction:
    "If you often dry your hair with one hand and try to shape it with another, you already know the friction: extra steps, extra heat exposure, and results that vary day to day.",
  painPoints: [
    {
      title: "Two tools, one bathroom counter",
      description:
        "A separate dryer and round brush means more cord juggling, more arm fatigue, and more time before you can leave the house.",
    },
    {
      title: "Heat without direction",
      description:
        "Air alone can dry hair quickly, but it does not always help you guide the shape you want — especially around the crown and ends.",
    },
    {
      title: "Inconsistent finish",
      description:
        "When styling depends on technique and timing, it is easy to end up with flat roots, frizz at the ends, or volume in the wrong places.",
    },
  ],
};

export const solution: SolutionSection = {
  id: "solution",
  headline: "Dry and guide each section in the same motion",
  introduction:
    "The Serian Hot Air Brush sends warm air through a shaped barrel with built-in bristles. You hold the section, glide from root to tip, and let the combination of airflow and tension do the work.",
  highlights: [
    {
      title: "Airflow follows the barrel",
      description:
        "Heat is directed along the hair strand as the bristles hold tension, which helps you smooth and shape while drying rather than after.",
    },
    {
      title: "One continuous pass",
      description:
        "Instead of drying completely and then restyling, you can work section by section with a single tool and a clearer routine.",
    },
    {
      title: "Built for everyday use",
      description:
        "The handle is sized for at-home styling, with controls you can adjust without stopping mid-section.",
    },
  ],
  demonstrationImage: media.demonstration,
};

export const productNarrative: ProductNarrativeSection = {
  id: "closer-look",
  eyebrow: "A closer look",
  headline: "Why this brush exists",
  introduction:
    "Every choice here serves a morning — not a spec sheet. These are the decisions that shaped how the brush feels in your hand and moves through your hair.",
  chapters: [
    {
      id: "the-shape",
      title: "The Shape",
      body:
        "We chose an oval barrel rather than a round one. A round barrel curls evenly in every direction. An oval barrel creates bend where you want volume and keeps the ends from curling more than you intend.",
    },
    {
      id: "the-control",
      title: "The Control",
      body:
        "Three heat and airflow settings — not five. Enough range for fine hair, everyday use, and thicker sections. Fewer settings mean less second-guessing before your coffee cools.",
    },
    {
      id: "the-balance",
      title: "The Balance",
      body:
        "Under one pound, deliberately. A styling session should not feel like an arm workout. The weight sits toward the handle so the barrel feels light as you work through each section.",
    },
    {
      id: "the-finish",
      title: "The Finish",
      body:
        "A cool tip you can hold. Styling close to the scalp means your fingers are never far from heat. The insulated tip gives you a place to rotate and guide without thinking about distance.",
    },
    {
      id: "the-detail",
      title: "The Detail",
      body:
        "A cord that moves with you. The swivel base follows your path from one side to the other — less tangling when you switch hands or reach the back.",
    },
  ],
};

export const benefits: BenefitsSection = {
  id: "benefits",
  headline: "What changes in your routine",
  enabled: true,
  benefits: [
    {
      title: "Less time between shower and door",
      description:
        "Combining drying and shaping into one step removes the back-and-forth between tools, which many people find saves meaningful time on busy mornings.",
    },
    {
      title: "A more predictable finish",
      description:
        "When each section is dried with tension applied, hair tends to lay smoother and with more intentional shape than air-only drying alone.",
    },
    {
      title: "Easier to repeat the same look",
      description:
        "A consistent tool and section-by-section method makes it simpler to reproduce a result you liked yesterday, not just on a good hair day.",
    },
  ],
};

export const comparison: ComparisonSection = {
  id: "comparison",
  headline: "How it compares to common alternatives",
  enabled: true,
  rows: [
    {
      aspect: "Tools required",
      product: "One hot air brush",
      alternative: "Separate dryer and round brush",
    },
    {
      aspect: "Styling while drying",
      product: "Yes — tension and heat together",
      alternative: "Usually two separate steps",
    },
    {
      aspect: "Learning curve",
      product: "Section-by-section gliding",
      alternative: "Varies with brush technique and dryer angle",
    },
    {
      aspect: "Root volume",
      product: "Oval barrel lifts at the root",
      alternative: "Depends on brush size and timing",
    },
    {
      aspect: "Travel packing",
      product: "One item in your bag",
      alternative: "Two items plus attachments",
    },
  ],
};
