import type { TextBlock } from "./shared";

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

/** Header navigation and brand identity. */
export interface NavigationContent {
  brand: {
    name: string;
    tagline?: string;
  };
  links: NavLink[];
}

/** Site footer content — legal links and trust statements. */
export interface FooterContent {
  legalLinks: FooterLink[];
  trustStatements?: string[];
}

/** Contact information shared across the site. */
export interface ContactContent {
  email: string;
}

/**
 * Trust policy pages (Privacy, Refund, Shipping, Terms).
 * Each policy is a standalone page, separate from product narrative content.
 */
export interface PolicyPageContent {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  sections: TextBlock[];
}

export type PolicyCatalog = Record<string, PolicyPageContent>;
