import { Stack, Text } from "@/components/ui";

type PurchaseNotesProps = {
  shippingNote?: string;
  guaranteeNote?: string;
};

/** Shipping / guarantee copy under the CTA. Hidden when both notes are empty. */
export function PurchaseNotes({ shippingNote, guaranteeNote }: PurchaseNotesProps) {
  if (!shippingNote && !guaranteeNote) {
    return null;
  }

  return (
    <Stack gap="sm" className="product-purchase__trust">
      {shippingNote ? <Text variant="caption">{shippingNote}</Text> : null}
      {guaranteeNote ? <Text variant="caption">{guaranteeNote}</Text> : null}
    </Stack>
  );
}
