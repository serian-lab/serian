import type { FooterContent } from "@/types/content";

import { globalTrustMessage } from "./trust";

export const footer: FooterContent = {
  trustStatements: [globalTrustMessage],
  legalLinks: [
    { id: "privacy", label: "Privacy Policy", href: "/privacy" },
    { id: "refund", label: "Refund Policy", href: "/refund" },
    { id: "shipping", label: "Shipping Policy", href: "/shipping" },
    { id: "terms", label: "Terms of Service", href: "/terms" },
  ],
};

export type FooterSiteContent = {
  brandDescription: string;
  copyright: string;
  supportLinks: Array<{ id: string; label: string; href: string }>;
  socialLinks: Array<{ id: string; label: string; href: string }>;
  paymentNote: string;
};

export const footerSite: FooterSiteContent = {
  brandDescription:
    "Serian designs practical tools for everyday routines — with clear information, honest policies, and support you can reach.",
  copyright: "© 2026 Serian Lab. All rights reserved.",
  supportLinks: [
    { id: "contact", label: "Contact", href: "/contact" },
    { id: "support", label: "Support", href: "/contact#support" },
    { id: "shipping", label: "Shipping", href: "/shipping" },
    { id: "returns", label: "Returns", href: "/refund" },
  ],
  socialLinks: [
    { id: "instagram", label: "Instagram", href: "#" },
    { id: "tiktok", label: "TikTok", href: "#" },
  ],
  paymentNote: "Visa · Mastercard · PayPal · Apple Pay",
};
