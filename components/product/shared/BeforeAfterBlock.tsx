import { Card, Heading, Stack, Text } from "@/components/ui";
import type { BeforeAfterPair } from "@/types/content";

import { ProductMedia } from "./ProductMedia";

type BeforeAfterBlockProps = {
  pair: BeforeAfterPair;
};

/** Side-by-side before / after comparison — stacks on mobile. */
export function BeforeAfterBlock({ pair }: BeforeAfterBlockProps) {
  return (
    <Card as="article" className="product-before-after-block">
      <Stack gap="md">
        <Stack gap="xs">
          <Heading level={3} variant="title">
            {pair.title}
          </Heading>
          {pair.description && <Text variant="caption">{pair.description}</Text>}
        </Stack>
        <div className="product-before-after-block__grid">
          <figure className="product-before-after-block__figure">
            <ProductMedia asset={pair.before} variant="before-after" />
            <figcaption className="product-before-after-block__label">Before</figcaption>
          </figure>
          <figure className="product-before-after-block__figure">
            <ProductMedia asset={pair.after} variant="before-after" />
            <figcaption className="product-before-after-block__label">After</figcaption>
          </figure>
        </div>
      </Stack>
    </Card>
  );
}
