import { Stack, Text } from "@/components/ui";
import type { CommerceInfo } from "@/types/content";

type PurchasePriceProps = {
  commerce: CommerceInfo;
  showSku?: boolean;
};

/** Product price, optional compare-at, optional SKU. */
export function PurchasePrice({ commerce, showSku = true }: PurchasePriceProps) {
  return (
    <Stack gap="xs" className="product-purchase__pricing">
      <Text as="span" className="product-purchase__price">
        {commerce.price} {commerce.currency}
      </Text>
      {commerce.compareAtPrice ? (
        <Text as="span" variant="caption" className="product-purchase__compare">
          {commerce.compareAtPrice} {commerce.currency}
        </Text>
      ) : null}
      {showSku && commerce.sku ? (
        <Text variant="label" className="product-purchase__meta">
          SKU: {commerce.sku}
        </Text>
      ) : null}
    </Stack>
  );
}
