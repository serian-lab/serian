import type { PolicyPageContent } from "@/types/content";

import { policyCatalog } from "@/content/global/policies";

/** Returns all policy pages. */
export function getPolicies(): PolicyPageContent[] {
  return Object.values(policyCatalog);
}

/** Returns a single policy page by slug, or undefined if not found. */
export function getPolicyBySlug(slug: string): PolicyPageContent | undefined {
  return policyCatalog[slug];
}
