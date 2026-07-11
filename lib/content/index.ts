/**
 * Content Access Layer — the sole data entry point for all pages.
 *
 * Pages must import from `@/lib/content` only.
 * Direct imports from `@/content` are prohibited.
 */

export { getContact } from "./contact";
export { getFooter } from "./footer";
export { getNavigation } from "./navigation";
export { getPolicies, getPolicyBySlug } from "./policies";
export {
  getAllProducts,
  getAllProductSlugs,
  getProductBySlug,
} from "./products";
