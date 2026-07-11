import type { FeatureMediaLayout, FeatureMediaRef } from "@/types/content";

export type ResolvedFeatureMedia = {
  image?: FeatureMediaRef["image"];
  layout: FeatureMediaLayout;
};

/** Merges narrative feature ids with media kit layout configuration. */
export function resolveFeatureMedia(
  featureId: string,
  refs: FeatureMediaRef[] | undefined,
  fallbackImage?: FeatureMediaRef["image"],
): ResolvedFeatureMedia {
  const ref = refs?.find((item) => item.id === featureId);

  return {
    image: ref?.image ?? fallbackImage,
    layout: ref?.layout ?? (ref?.image || fallbackImage ? "inline" : "inline"),
  };
}
