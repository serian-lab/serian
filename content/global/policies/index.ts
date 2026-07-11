import type { PolicyCatalog } from "@/types/content";

import { privacyPolicy } from "./privacy";
import { refundPolicy } from "./refund";
import { shippingPolicy } from "./shipping";
import { termsPolicy } from "./terms";

export const policyCatalog = {
  [privacyPolicy.slug]: privacyPolicy,
  [refundPolicy.slug]: refundPolicy,
  [shippingPolicy.slug]: shippingPolicy,
  [termsPolicy.slug]: termsPolicy,
} satisfies PolicyCatalog;
