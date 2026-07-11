"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { MediaAsset } from "@/types/content";
import { cn } from "@/lib/utils";

import { ProductMedia } from "./ProductMedia";

type ProductMediaGalleryProps = {
  images: MediaAsset[];
  priority?: boolean;
  presentation?: "default" | "stage";
};

const SWIPE_THRESHOLD = 48;

/** Hero gallery — carousel with thumbnails, keyboard navigation, and touch swipe. */
export function ProductMediaGallery({
  images,
  priority,
  presentation = "default",
}: ProductMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const activeImage = images[activeIndex] ?? images[0];

  const goTo = useCallback(
    (index: number) => {
      if (images.length === 0) {
        return;
      }

      const wrapped = (index + images.length) % images.length;
      setActiveIndex(wrapped);
    },
    [images.length],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const node = galleryRef.current;
    if (!node || images.length <= 1) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(images.length - 1);
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goTo, images.length]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;

    if (startX == null || endX == null) {
      return;
    }

    const delta = endX - startX;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    touchStartX.current = null;
  };

  if (!activeImage) {
    return null;
  }

  return (
    <div
      ref={galleryRef}
      className={cn(
        "product-media-gallery",
        presentation === "stage" && "product-media-gallery--stage",
      )}
      tabIndex={images.length > 1 ? 0 : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label="Product image gallery"
    >
      <div
        className="product-media-gallery__stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-live="polite"
      >
        <ProductMedia
          key={activeImage.src}
          asset={activeImage}
          variant="hero"
          priority={priority && activeIndex === 0}
        />
        {images.length > 1 && (
          <div className="product-media-gallery__counter" aria-hidden="true">
            <span className="product-media-gallery__counter-label">Image</span>
            <span className="product-media-gallery__counter-value">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="product-media-row" role="tablist" aria-label="Product images">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`View image ${index + 1} of ${images.length}`}
              className={cn(
                "product-media-thumb",
                index === activeIndex && "product-media-thumb--active",
              )}
              onClick={() => setActiveIndex(index)}
            >
              <ProductMedia asset={image} variant="thumbnail" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
