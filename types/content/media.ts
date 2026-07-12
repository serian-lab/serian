import type { MediaAsset, SectionVisibility } from "./shared";

/** Image asset — alias for clarity in media kit definitions. */
export type ImageMediaAsset = MediaAsset;

/** Native video asset with required poster for lazy loading and mobile UX. */
export interface VideoMediaAsset {
  kind: "video";
  src: string;
  poster: string;
  alt: string;
  width?: number;
  height?: number;
}

export type ProductMediaAsset = ImageMediaAsset | VideoMediaAsset;

export function isVideoMediaAsset(
  asset: ProductMediaAsset,
): asset is VideoMediaAsset {
  return "kind" in asset && asset.kind === "video";
}

/** Hero gallery — multi-image carousel source. */
export interface HeroGalleryMedia {
  images: ImageMediaAsset[];
  primaryIndex?: number;
}

/** Feature layout variants for split and inline media. */
export type FeatureMediaLayout = "inline" | "media-start" | "media-end";

/** Media configuration keyed to a feature by stable id. */
export interface FeatureMediaRef {
  id: string;
  image?: ImageMediaAsset;
  layout?: FeatureMediaLayout;
}

/** Product demonstration video block. */
export interface DemoVideoMedia extends SectionVisibility {
  headline: string;
  description?: string;
  video: VideoMediaAsset;
}

export type UgcVideoStyle =
  | "morning-routine"
  | "before-after"
  | "demo"
  | "unboxing";

/** User-generated content video card. */
export interface UgcVideoItem {
  id: string;
  title: string;
  caption?: string;
  style?: UgcVideoStyle;
  video: VideoMediaAsset;
}

export interface UgcShowcaseMedia extends SectionVisibility {
  headline: string;
  subheadline?: string;
  items: UgcVideoItem[];
}

/** Shared static assets referenced outside dedicated sections. */
export interface ProductMediaAssets {
  demonstration?: ImageMediaAsset;
  packaging?: ImageMediaAsset;
  og?: ImageMediaAsset;
}

/** Media configuration keyed to a narrative chapter by stable id. */
export interface NarrativeChapterMediaRef {
  id: string;
  image: ImageMediaAsset;
}

/**
 * Complete media kit for a product — single source for all visual assets.
 * Update only media.ts and public/products/{slug}/ to change page media.
 */
export interface ProductMediaKit {
  slug: string;
  hero: HeroGalleryMedia;
  narrative: NarrativeChapterMediaRef[];
  demo?: DemoVideoMedia;
  ugc?: UgcShowcaseMedia;
  assets?: ProductMediaAssets;
}
