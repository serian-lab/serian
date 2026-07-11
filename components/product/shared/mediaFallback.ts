import type { MediaAsset } from "@/types/content";

/** Presentation-layer asset with SVG or poster fallback chain. */
export type MediaAssetWithFallback = MediaAsset & {
  fallbackSrc?: string;
};

/** Resolves the next source in the fallback chain after a load error. */
export function getNextMediaSrc(
  asset: MediaAssetWithFallback,
  currentSrc: string,
): string | null {
  if (currentSrc === asset.src && asset.fallbackSrc) {
    return asset.fallbackSrc;
  }

  return null;
}

/** Normalizes video poster to image asset for poster-only fallback. */
export function posterToImageAsset(
  poster: string,
  alt: string,
  width?: number,
  height?: number,
  fallbackSrc?: string,
): MediaAssetWithFallback {
  return {
    src: poster,
    alt,
    width,
    height,
    fallbackSrc,
  };
}
