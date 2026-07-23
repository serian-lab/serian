"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { VideoMediaAsset } from "@/types/content";
import {
  claimExclusivePlayback,
  registerExclusivePlayer,
} from "@/lib/video/exclusivePlayback";
import { cn } from "@/lib/utils";

import { posterToImageAsset } from "./mediaFallback";
import { ProductMedia } from "./ProductMedia";

type ProductVideoProps = {
  asset: VideoMediaAsset & { posterFallbackSrc?: string };
  variant?: "demo" | "ugc";
  /** Legacy muted autoplay — unused by UGC (click-to-play only). */
  autoPlayMuted?: boolean;
  /** When set with playerId, only one video in the group may play. */
  exclusiveGroup?: string;
  playerId?: string;
  className?: string;
};

/** Native video with poster overlay, lazy load, and click-to-play. */
export function ProductVideo({
  asset,
  variant = "demo",
  autoPlayMuted = false,
  exclusiveGroup,
  playerId,
  className,
}: ProductVideoProps) {
  const reactId = useId();
  const resolvedPlayerId = playerId ?? reactId;
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const posterOnly = hasError;

  const pausePlayback = useCallback(() => {
    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!exclusiveGroup) {
      return;
    }

    return registerExclusivePlayer(exclusiveGroup, resolvedPlayerId, {
      pause: pausePlayback,
    });
  }, [exclusiveGroup, pausePlayback, resolvedPlayerId]);

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
      if (exclusiveGroup) {
        claimExclusivePlayback(exclusiveGroup, resolvedPlayerId);
      }

      try {
        video.controls = true;
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    pausePlayback();
  }, [exclusiveGroup, pausePlayback, posterOnly, resolvedPlayerId]);

  const posterAsset = posterToImageAsset(
    asset.poster,
    asset.alt,
    asset.width,
    asset.height,
    asset.posterFallbackSrc,
  );

  const showPoster = posterOnly || !isPlaying;
  const posterFadeMs = variant === "ugc";
  const playLabel =
    variant === "demo"
      ? "Play product demonstration"
      : isPlaying
        ? "Pause video"
        : "Play video";

  return (
    <div
      ref={containerRef}
      className={cn("product-video", `product-video--${variant}`, className)}
    >
      <button
        type="button"
        className="product-video__trigger"
        onClick={() => void togglePlayback()}
        aria-label={posterOnly ? asset.alt : isPlaying ? "Pause video" : playLabel}
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

        <div
          className={cn(
            "product-video__poster",
            posterFadeMs && "product-video__poster--fade",
            !showPoster && "product-video__poster--hidden",
          )}
          aria-hidden={!showPoster}
        >
          <ProductMedia asset={posterAsset} variant={variant === "ugc" ? "ugc" : "poster"} />
        </div>

        {!posterOnly ? (
          <span
            className={cn(
              "product-video__play",
              isPlaying && "product-video__play--hidden",
            )}
            aria-hidden="true"
          >
            <span className="product-video__play-icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                aria-hidden="true"
                focusable="false"
              >
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        ) : null}
      </button>
    </div>
  );
}
