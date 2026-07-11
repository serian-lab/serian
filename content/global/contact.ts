import type { ContactContent, TextBlock } from "@/types/content";

export const contact: ContactContent = {
  email: "support@serianlab.com",
};

export type ContactPageContent = {
  title: string;
  introduction: string;
  location: string;
  businessHours: string;
  responseTime: string;
  supportSections: TextBlock[];
  quickLinks: Array<{ id: string; label: string; href: string; description: string }>;
};

export const contactPage: ContactPageContent = {
  title: "We are here to help",
  introduction:
    "Whether you have a question about an order, a product, or a return, reach out anytime. We keep support simple — no ticket maze, no long hold times.",
  location: "Portland, Oregon, United States",
  businessHours: "Monday – Friday, 9:00 AM – 5:00 PM Pacific Time",
  responseTime: "Most messages receive a reply within one business day.",
  supportSections: [
    {
      title: "Order and shipping questions",
      description:
        "For tracking, delivery timing, or address changes, email us with your order number. We will confirm the status and next steps.",
    },
    {
      title: "Returns and exchanges",
      description:
        "If a product is not the right fit, you may return it within 30 days of delivery. See our Refund Policy for step-by-step instructions.",
    },
    {
      title: "Product guidance",
      description:
        "Not sure about heat settings, hair type compatibility, or how to use a feature? We are happy to walk you through it.",
    },
  ],
  quickLinks: [
    {
      id: "shipping-guide",
      label: "Shipping guide",
      href: "/shipping",
      description: "Delivery times, regions, and tracking.",
    },
    {
      id: "return-guide",
      label: "Return guide",
      href: "/refund",
      description: "How to start a return within 30 days.",
    },
    {
      id: "product-faq",
      label: "Product FAQ",
      href: "/products/hair-dryer-brush#faq",
      description: "Common questions about our hot air brush.",
    },
  ],
};
