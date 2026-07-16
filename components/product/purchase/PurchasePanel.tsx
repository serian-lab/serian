import { Stack, Text } from "@/components/ui";
import { ProductSectionHeader } from "@/components/product/shared";
import { LayoutDebugRegion } from "@/components/layout/LayoutDebugRegion";
import type { CommerceInfo, PurchaseSection as PurchaseSectionContent } from "@/types/content";

import { PurchaseCtaGroup } from "./PurchaseCtaGroup";
import { PurchaseNotes } from "./PurchaseNotes";
import { PurchasePrice } from "./PurchasePrice";
import { PurchaseQuantity } from "./PurchaseQuantity";
import { PurchaseTrust } from "./PurchaseTrust";
import { PurchaseVariantGroups } from "./PurchaseVariantGroups";

type PurchasePanelProps = {
  content: PurchaseSectionContent;
  commerce: CommerceInfo;
};

/**
 * Modular, content-driven purchase panel.
 * Optional modules (variants, quantity, secondary CTA, trust) render only when configured.
 */
export function PurchasePanel({ content, commerce }: PurchasePanelProps) {
  const variantGroups = content.variantGroups ?? [];
  const showVariants = variantGroups.length > 0;
  const showQuantity = content.quantity?.enabled === true;
  const showSku = content.showSku !== false;

  return (
    <Stack gap="lg">
      <LayoutDebugRegion label="PRODUCT CARD" variant="sub">
        <Stack gap="sm">
          <ProductSectionHeader headline={content.headline} />
          <Text className="product-section-intro">{content.description}</Text>
        </Stack>
      </LayoutDebugRegion>

      <LayoutDebugRegion label="PAYMENT" variant="sub">
        <PurchaseTrust trust={content.trust} className="product-purchase__badges" />
      </LayoutDebugRegion>

      <LayoutDebugRegion label="PRICE" variant="sub">
        <PurchasePrice commerce={commerce} showSku={showSku} />
      </LayoutDebugRegion>

      {showVariants ? (
        <LayoutDebugRegion label="VARIANTS" variant="sub">
          <PurchaseVariantGroups groups={variantGroups} />
        </LayoutDebugRegion>
      ) : null}

      {showQuantity && content.quantity ? (
        <LayoutDebugRegion label="QUANTITY" variant="sub">
          <PurchaseQuantity config={content.quantity} />
        </LayoutDebugRegion>
      ) : null}

      <LayoutDebugRegion label="CTA" variant="sub">
        <PurchaseCtaGroup primary={content.primaryCta} secondary={content.secondaryCta} />
      </LayoutDebugRegion>

      <LayoutDebugRegion label="GUARANTEE" variant="sub">
        <PurchaseNotes
          shippingNote={content.shippingNote}
          guaranteeNote={content.guaranteeNote}
        />
      </LayoutDebugRegion>
    </Stack>
  );
}
