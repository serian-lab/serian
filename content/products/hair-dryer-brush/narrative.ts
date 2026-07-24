import type {
  ComparisonSection,
  ProblemSection,
  ProductNarrativeSection,
} from "@/types/content";

export const problem: ProblemSection = {
  id: "problem",
  headline: "Most mornings leave little room for a full styling routine",
  introduction:
    "If you often dry your hair with one hand and try to shape it with another, you already know the friction: extra steps, extra heat exposure, and results that vary day to day.",
  painPoints: [
    {
      id: "two-tools",
      title: "Two tools, one bathroom counter",
      description:
        "A separate dryer and round brush means more cord juggling, more arm fatigue, and more time before you can leave the house.",
      icon: "/images/problem/problem-tool.svg",
    },
    {
      id: "heat-without-direction",
      title: "Heat without direction",
      description:
        "Air alone can dry hair quickly, but it does not always help you guide the shape you want — especially around the crown and ends.",
      icon: "/images/problem/problem-airflow.svg",
    },
    {
      id: "inconsistent-finish",
      title: "Inconsistent finish",
      description:
        "When styling depends on technique and timing, it is easy to end up with flat roots, frizz at the ends, or volume in the wrong places.",
      icon: "/images/problem/problem-finish.svg",
    },
  ],
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
      eyebrow: "THE SHAPE",
      title: "The Shape",
      body:
        "We chose an oval barrel rather than a round one. A round barrel curls evenly in every direction. An oval barrel creates bend where you want volume and keeps the ends from curling more than you intend.",
    },
    {
      id: "the-control",
      eyebrow: "THE CONTROL",
      title: "The Control",
      body:
        "Three heat and airflow settings — not five. Enough range for fine hair, everyday use, and thicker sections. Fewer settings mean less second-guessing before your coffee cools.",
    },
    {
      id: "the-balance",
      eyebrow: "THE BALANCE",
      title: "The Balance",
      body:
        "Under one pound, deliberately. A styling session should not feel like an arm workout. The weight sits toward the handle so the barrel feels light as you work through each section.",
    },
    {
      id: "the-finish",
      eyebrow: "THE FINISH",
      title: "The Finish",
      body:
        "A cool tip you can hold. Styling close to the scalp means your fingers are never far from heat. The insulated tip gives you a place to rotate and guide without thinking about distance.",
    },
    {
      id: "the-detail",
      eyebrow: "THE DETAIL",
      title: "The Detail",
      body:
        "A cord that moves with you. The swivel base follows your path from one side to the other — less tangling when you switch hands or reach the back.",
    },
  ],
};

export const comparison: ComparisonSection = {
  id: "comparison",
  enabled: true,
  eyebrow: "A simpler routine",
  headline: "How it compares to a dryer and round brush",
  description:
    "See how a single styling tool changes the number of tools, movements, and decisions involved in your routine.",
  product: {
    label: "SERIAN",
    sublabel: "Hot Air Brush",
    image: {
      src: "/products/hair-dryer-brush/hero/hero-01.svg",
      alt: "Serian Hot Air Brush — product view",
      width: 480,
      height: 480,
    },
  },
  alternative: {
    label: "Dryer +",
    sublabel: "Round Brush",
  },
  rows: [
    {
      id: "tools",
      label: "Tools required",
      helper: "What you need to get started",
      icon: "tools",
      productValue: "One tool",
      alternativeValue: "Two separate tools",
    },
    {
      id: "workflow",
      label: "Workflow",
      helper: "How the routine is completed",
      icon: "workflow",
      productValue: "Dry and shape in one pass",
      alternativeValue: "Coordinate drying and brushing",
    },
    {
      id: "learning",
      label: "Learning curve",
      helper: "How much technique it asks for",
      icon: "learning",
      productValue: "Section-by-section gliding",
      alternativeValue: "Balance brush tension, dryer angle, and airflow",
    },
    {
      id: "repeatability",
      label: "Repeatability",
      helper: "How consistent the movement is",
      icon: "repeat",
      productValue: "One repeatable movement",
      alternativeValue: "More dependent on timing and coordination",
    },
    {
      id: "packing",
      label: "Packing",
      helper: "What you carry",
      icon: "packing",
      productValue: "One device",
      alternativeValue: "Dryer, brush, and possible attachments",
    },
  ],
  note: "A one-tool routine designed to reduce switching, coordination, and guesswork.",
};
