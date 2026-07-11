import type { PolicyPageContent } from "@/types/content";

export const shippingPolicy: PolicyPageContent = {
  id: "shipping",
  slug: "shipping",
  title: "Shipping Policy",
  lastUpdated: "2026-06-28",
  sections: [
    {
      title: "Where we ship",
      description:
        "We currently ship to addresses within the contiguous United States. Orders to Alaska, Hawaii, and U.S. territories may not be available at this time.",
    },
    {
      title: "Processing time",
      description:
        "Orders are processed within 1–2 business days after payment is confirmed. You will receive an email confirmation when your order is placed and another when it ships.",
    },
    {
      title: "Delivery time",
      description:
        "Most domestic orders arrive within 5–8 business days after shipping, depending on your location and carrier conditions. Delivery times are estimates, not guarantees.",
    },
    {
      title: "Shipping cost",
      description:
        "Standard shipping is free for all orders within the contiguous United States. No minimum purchase is required.",
    },
    {
      title: "Tracking",
      description:
        "Once your order ships, you will receive a tracking number by email. Tracking updates may take up to 24 hours to appear in the carrier system.",
    },
    {
      title: "Delivery issues",
      description:
        "If your package is marked delivered but you have not received it, contact us within 7 days at support@serianlab.com. We will work with the carrier to investigate.",
    },
    {
      title: "Contact",
      description:
        "For shipping questions, email support@serianlab.com with your order number.",
    },
  ],
};
