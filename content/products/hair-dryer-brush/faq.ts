import type { FaqSection } from "@/types/content";

export const faq: FaqSection = {
  id: "faq",
  headline: "Common questions",
  items: [
    {
      id: "faq_hair_types",
      question: "What hair types is this brush suited for?",
      answer:
        "It works best on straight, wavy, and lightly curly hair from fine to medium-thick. Very coarse or tightly coiled hair may need higher heat and smaller sections. Start on the low setting and adjust based on how your hair responds.",
    },
    {
      id: "faq_heat_settings",
      question: "How should I use the three heat settings?",
      answer:
        "Use low for fine or damaged hair and for polishing ends. Medium suits most daily styling. High is intended for thicker or damp-heavy sections — avoid holding one spot for too long on any setting.",
    },
    {
      id: "faq_voltage",
      question: "What voltage does it support?",
      answer:
        "This model is built for 110V outlets in the United States and Canada. It is not compatible with 220V regions without a separate voltage converter.",
    },
    {
      id: "faq_wet_dry",
      question: "Can I use it on soaking-wet hair?",
      answer:
        "For best results, towel-dry first until hair is damp, not dripping. Work in sections roughly 2 inches wide so airflow can reach the strand as you glide.",
    },
    {
      id: "faq_shipping",
      question: "How long does shipping take?",
      answer:
        "Orders ship from our US fulfillment partner. Most domestic orders arrive within 5–8 business days. You will receive tracking by email once the order leaves the warehouse.",
    },
    {
      id: "faq_returns",
      question: "What if it is not right for my hair?",
      answer:
        "If you are not satisfied, you may return the brush within 30 days of delivery in its original condition. See our Refund Policy for full details on how to start a return.",
    },
    {
      id: "faq_warranty",
      question: "Is there a warranty?",
      answer:
        "The brush includes a 12-month limited warranty covering defects in materials and workmanship under normal household use. Contact us with your order number if you need support.",
    },
  ],
};
