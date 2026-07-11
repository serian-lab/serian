import type { PolicyPageContent } from "@/types/content";

export const refundPolicy: PolicyPageContent = {
  id: "refund",
  slug: "refund",
  title: "Refund Policy",
  lastUpdated: "2026-06-28",
  sections: [
    {
      title: "Our commitment",
      description:
        "We want you to feel confident about your purchase. If a product is not the right fit, you may return it within 30 days of delivery for a refund.",
    },
    {
      title: "Eligibility",
      description:
        "Items must be returned in their original condition with all included accessories and packaging. Products that show significant wear, damage from misuse, or missing parts may not qualify for a full refund.",
    },
    {
      title: "How to start a return",
      description:
        "Email support@serianlab.com with your order number and reason for the return. We will reply with return instructions and, if applicable, a prepaid return label within one business day.",
    },
    {
      title: "Refund timing",
      description:
        "Once we receive and inspect your return, refunds are processed within 5–7 business days to your original payment method. Your bank may take additional time to post the credit.",
    },
    {
      title: "Exchanges",
      description:
        "We do not offer direct exchanges at this time. To receive a different product, return the original item for a refund and place a new order.",
    },
    {
      title: "Damaged or defective items",
      description:
        "If your product arrives damaged or defective, contact us within 7 days of delivery with photos. We will arrange a replacement or full refund at no additional cost.",
    },
    {
      title: "Contact",
      description:
        "For return questions, email support@serianlab.com with your order number.",
    },
  ],
};
