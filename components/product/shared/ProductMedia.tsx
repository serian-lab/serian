"use client";

import { useCallback, useState } from "react";

import type { MediaAsset } from "@/types/content";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { getNextMediaSrc, type MediaAssetWithFallback } from "./mediaFallback";

type ProductMediaVariant =
  | "hero"
  | "feature"
  | "narrative"
  | "thumbnail"
  | "poster"
  | "ugc";

type ProductMediaProps = {
  asset: MediaAsset | MediaAssetWithFallback;
  variant?: ProductMediaVariant;
  priority?: boolean;
};

const sizesByVariant: Record<ProductMediaVariant, string> = {
  hero: "(max-width: 48rem) 100vw, 480px",
  feature: "(max-width: 48rem) 100vw, 320px",
  narrative: "(max-width: 48rem) 100vw, 50vw",
  thumbnail: "72px",
  poster: "(max-width: 48rem) 100vw, 720px",
  ugc: "(max-width: 48rem) 45vw, 240px",
};

/** Standardized product media with next/image, sizes, and SVG fallback. */
export function ProductMedia({
  asset,
  variant = "feature",
  priority = false,
}: ProductMediaProps) {
  const [src, setSrc] = useState(asset.src);
  const [failed, setFailed] = useState(false);

  const handleError = useCallback(() => {
    const next = getNextMediaSrc(asset as MediaAssetWithFallback, src);
    if (next) {
      setSrc(next);
      return;
    }

    setFailed(true);
  }, [asset, src]);

  if (failed) {
    return (
      <div
        className={cn("product-media", `product-media--${variant}`, "product-media--empty")}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={cn("product-media", `product-media--${variant}`)}>
      <Image
        src={src}
        alt={asset.alt}
        fill
        sizes={sizesByVariant[variant]}
        className="product-media__image"
        priority={priority}
        onError={handleError}
      />
    </div>
  );
}
