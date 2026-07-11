"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { VideoMediaAsset } from "@/types/content";
import { cn } from "@/lib/utils";

import { posterToImageAsset } from "./mediaFallback";
import { ProductMedia } from "./ProductMedia";

type ProductVideoProps = {
  asset: VideoMediaAsset & { posterFallbackSrc?: string };
  variant?: "demo" | "ugc";
  autoPlayMuted?: boolean;
  className?: string;
};

/** Native video with poster fallback, lazy load, and click-to-play controls. */
export function ProductVideo({
  asset,
  variant = "demo",
  autoPlayMuted = false,
  className,
}: ProductVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const posterOnly = hasError;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible || hasError) {
      return;
    }

    video.load();
  }, [hasError, isVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible || !autoPlayMuted || hasError || !isLoaded) {
      return;
    }

    void video.play().then(
      () => setIsPlaying(true),
      () => setIsPlaying(false),
    );
  }, [autoPlayMuted, hasError, isLoaded, isVisible]);

  const togglePlayback = useCallback(async () => {
    if (posterOnly) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        video.controls = true;
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  }, [posterOnly]);

  const posterAsset = posterToImageAsset(
    asset.poster,
    asset.alt,
    asset.width,
    asset.height,
    asset.posterFallbackSrc,
  );

  const showPosterOverlay = posterOnly || !isPlaying;

  return (
    <div
      ref={containerRef}
      className={cn("product-video", `product-video--${variant}`, className)}
    >
      <button
        type="button"
        className="product-video__trigger"
        onClick={() => void togglePlayback()}
        aria-label={posterOnly ? asset.alt : isPlaying ? "Pause video" : "Play video"}
        disabled={posterOnly}
      >
        {!posterOnly && isVisible && (
          <video
            ref={videoRef}
            className={cn(
              "product-video__element",
              isLoaded && isPlaying && "product-video__element--ready",
            )}
            muted={autoPlayMuted}
            playsInline
            loop={autoPlayMuted}
            preload="none"
            poster={asset.poster}
            controls={isPlaying}
            onLoadedData={() => setIsLoaded(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
          >
            <source src={asset.src} type="video/mp4" />
          </video>
        )}

        {showPosterOverlay && (
          <ProductMedia asset={posterAsset} variant={variant === "ugc" ? "ugc" : "poster"} />
        )}

        {!isPlaying && (
          <span className="product-video__play" aria-hidden="true">
            <span className="product-video__play-icon" />
          </span>
        )}
      </button>
    </div>
  );
}
