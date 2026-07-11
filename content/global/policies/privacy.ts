import type { PolicyPageContent } from "@/types/content";

export const privacyPolicy: PolicyPageContent = {
  id: "privacy",
  slug: "privacy",
  title: "Privacy Policy",
  lastUpdated: "2026-06-28",
  sections: [
    {
      title: "Overview",
      description:
        "Serian Lab respects your privacy. This policy explains what information we collect when you visit our website or place an order, and how we use it. We keep data collection to what is necessary to serve you.",
    },
    {
      title: "Information we collect",
      description:
        "When you purchase a product, we collect your name, shipping address, email address, and payment details processed through our payment provider. When you contact support, we collect the information you provide in your message. We also collect basic analytics such as page views and device type to improve site performance.",
    },
    {
      title: "How we use your information",
      description:
        "We use your information to fulfill orders, send shipping updates, respond to support requests, and improve our website. We do not sell your personal information to third parties.",
    },
    {
      title: "Payment processing",
      description:
        "Payments are processed by trusted third-party providers. Serian Lab does not store full credit card numbers on our servers. Payment providers handle your financial data according to their own privacy policies.",
    },
    {
      title: "Cookies",
      description:
        "Our website may use essential cookies required for basic functionality. We do not use aggressive tracking or advertising cookies.",
    },
    {
      title: "Your rights",
      description:
        "You may request access to, correction of, or deletion of your personal data by contacting us at support@serianlab.com. We will respond within a reasonable timeframe.",
    },
    {
      title: "Contact",
      description:
        "For privacy-related questions, email support@serianlab.com with the subject line \"Privacy Request.\"",
    },
  ],
};
