import type {
  BenefitsSection,
  ComparisonSection,
  FeaturesSection,
  ProblemSection,
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

export const features: FeaturesSection = {
  id: "features",
  headline: "What the brush includes",
  features: [
    {
      id: "oval-barrel",
      title: "Oval ceramic barrel",
      description:
        "The barrel is oval rather than round, which helps create gentle bend and volume at the root while keeping ends smoother.",
    },
    {
      id: "heat-settings",
      title: "Three heat and airflow settings",
      description:
        "Low, medium, and high settings let you adjust for fine, normal, or thicker hair — and for roots versus ends.",
    },
    {
      id: "lightweight",
      title: "Lightweight handle",
      description:
        "At under 1 lb, the brush is easier to hold through a full styling session without shoulder strain.",
    },
    {
      id: "cool-tip",
      title: "Cool tip",
      description:
        "A heat-insulated tip gives you a safe place to hold and rotate the brush while working close to the scalp.",
    },
    {
      id: "swivel-cord",
      title: "360° swivel cord",
      description:
        "The cord rotates as you move, which reduces tangling when you switch sides or work at the back of your head.",
    },
    {
      id: "us-plug",
      title: "US-compatible plug",
      description:
        "Designed for 110V outlets in the United States and Canada. A US plug is included.",
    },
  ],
};

export const benefits: BenefitsSection = {
  id: "benefits",
  headline: "What changes in your routine",
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
