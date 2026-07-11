import type { MediaAsset, ProductMediaKit, ProductPageSections } from "@/types/content";

/** Builds a hero gallery from mediaKit when available, otherwise from section assets. */
export function buildHeroGallery(
  sections: ProductPageSections,
  mediaKit?: ProductMediaKit,
): MediaAsset[] {
  if (mediaKit?.hero.images.length) {
    return mediaKit.hero.images;
  }

  const seen = new Set<string>();
  const images: MediaAsset[] = [];

  const add = (asset?: MediaAsset) => {
    if (!asset || seen.has(asset.src)) {
      return;
    }

    seen.add(asset.src);
    images.push(asset);
  };

  add(sections.hero.primaryImage);
  sections.hero.secondaryImages?.forEach(add);
  add(sections.solution.demonstrationImage);
  sections.features.features.forEach((feature) => add(feature.image));

  return images;
}
