import { Card, Container, Section } from "@/components/ui";
import type {
  CommerceInfo,
  PurchaseSection as PurchaseSectionContent,
} from "@/types/content";

import { PurchasePanel } from "./purchase/PurchasePanel";

type PurchaseSectionProps = {
  content: PurchaseSectionContent;
  commerce: CommerceInfo;
};

/** Decision-band section wrapping the reusable Product Purchase Panel. */
export function PurchaseSection({ content, commerce }: PurchaseSectionProps) {
  return (
    <Section
      id={content.id}
      aria-label="Purchase"
      className="product-section product-section--decision"
    >
      <Container width="reading">
        <Card as="div" className="product-purchase product-purchase--decision">
          <PurchasePanel content={content} commerce={commerce} />
        </Card>
      </Container>
    </Section>
  );
}
