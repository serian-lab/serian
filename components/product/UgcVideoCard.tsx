"use client";

import { Heading, Text } from "@/components/ui";
import { ProductVideo } from "@/components/product/shared";
import type { UgcVideoItem } from "@/types/content";

type UgcVideoCardProps = {
  item: UgcVideoItem;
  exclusiveGroup: string;
};

/** Single UGC rail card — 9:16 media + title/caption, no outer white shell. */
export function UgcVideoCard({ item, exclusiveGroup }: UgcVideoCardProps) {
  return (
    <article className="product-ugc__card">
      <div className="product-ugc__media">
        <ProductVideo
          asset={item.video}
          variant="ugc"
          exclusiveGroup={exclusiveGroup}
          playerId={item.id}
          className="product-ugc__player"
        />
      </div>
      <div className="product-ugc__copy">
        <Heading level={3} variant="title" className="product-ugc__title">
          {item.title}
        </Heading>
        {item.caption ? (
          <Text className="product-ugc__caption">{item.caption}</Text>
        ) : null}
        {item.creator ? (
          <Text className="product-ugc__creator">{item.creator}</Text>
        ) : null}
      </div>
    </article>
  );
}
