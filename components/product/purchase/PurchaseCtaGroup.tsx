import { Button, Stack } from "@/components/ui";
import type { PurchaseCta } from "@/types/content";

type PurchaseCtaGroupProps = {
  primary: PurchaseCta;
  secondary?: PurchaseCta;
};

/** Primary + optional secondary purchase actions. */
export function PurchaseCtaGroup({ primary, secondary }: PurchaseCtaGroupProps) {
  return (
    <Stack gap="sm" className="product-purchase__cta">
      <Button
        type="button"
        fullWidth
        variant={primary.variant ?? "primary"}
        // href reserved for future Shopify / checkout wiring
        data-checkout-href={primary.href}
      >
        {primary.label}
      </Button>
      {secondary ? (
        <Button
          type="button"
          fullWidth
          variant={secondary.variant ?? "secondary"}
          data-checkout-href={secondary.href}
        >
          {secondary.label}
        </Button>
      ) : null}
    </Stack>
  );
}
