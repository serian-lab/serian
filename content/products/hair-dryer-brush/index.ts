import type { ProductPageContent } from "@/types/content";

import { faq } from "./faq";
import { hero } from "./hero";
import { mediaKit } from "./media";
import { commerce, meta } from "./meta";
import { comparison, productNarrative, problem } from "./narrative";
import { purchase } from "./purchase";
import { reviews } from "./reviews";
import { seo } from "./seo";

export const hairDryerBrush: ProductPageContent = {
  meta,
  seo,
  commerce,
  mediaKit,
  sections: {
    hero,
    problem,
    productNarrative,
    comparison,
    reviews,
    faq,
    purchase,
  },
};
