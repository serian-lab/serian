"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductMedia, ProductSectionHeader } from "@/components/product/shared";
import { cn } from "@/lib/utils";
import type {
  ImageMediaAsset,
  NarrativeChapterMediaRef,
  ProductNarrativeSection as ProductNarrativeSectionContent,
} from "@/types/content";

type ProductNarrativeSectionProps = {
  content: ProductNarrativeSectionContent;
  narrativeMedia?: NarrativeChapterMediaRef[];
};

type NarrativeChapter = ProductNarrativeSectionContent["chapters"][number];

type SlideRole = "prev" | "current" | "next";

/** 100px pointer travel ≈ 75px track travel. */
const DRAG_DAMPING = 0.75;
/** Commit when |damped| ≥ this fraction of one card step. */
const SNAP_RATIO = 0.28;
const SNAP_MS = 420;
const SNAP_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function resolveChapterImage(
  chapterId: string,
  narrativeMedia: NarrativeChapterMediaRef[] | undefined,
  fallback?: NarrativeChapter["image"],
) {
  return narrativeMedia?.find((item) => item.id === chapterId)?.image ?? fallback;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wrapIndex(index: number, length: number) {
  if (length <= 0) {
    return 0;
  }

  return ((index % length) + length) % length;
}

type StoryCardProps = {
  chapter: NarrativeChapter;
  image?: ImageMediaAsset;
  role: SlideRole;
};

/** Visual-only card. Never focusable / clickable for navigation. */
function StoryCard({ chapter, image, role }: StoryCardProps) {
  const isSide = role !== "current";

  return (
    <article
      className={cn("product-narrative__card", `product-narrative__card--${role}`)}
      aria-roledescription="slide"
      aria-label={chapter.title}
      aria-hidden={isSide || undefined}
    >
      {image ? (
        <div className="product-narrative__media">
          <ProductMedia key={`${role}-${chapter.id}`} asset={image} variant="narrative" />
        </div>
      ) : null}
      <div className="product-narrative__copy">
        <Heading level={3} variant="title" className="product-narrative__title">
          {chapter.title}
        </Heading>
        <Text className="product-narrative__body">{chapter.body}</Text>
      </div>
    </article>
  );
}

/**
 * Narrative Product Showcase — drag-first carousel.
 * React owns only `currentIndex`. Drag / snap mutate the track DOM directly.
 */
export function ProductNarrativeSection({
  content,
  narrativeMedia,
}: ProductNarrativeSectionProps) {
  const chapters = content.chapters;
  const count = chapters.length;
  const labelId = useId();
  const statusId = useId();

  const [currentIndex, setCurrentIndex] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    lastX: number;
  } | null>(null);

  const prevIndex = wrapIndex(currentIndex - 1, count);
  const nextIndex = wrapIndex(currentIndex + 1, count);

  const slides: Array<{ role: SlideRole; chapter: NarrativeChapter }> =
    count === 0
      ? []
      : [
          { role: "prev", chapter: chapters[prevIndex] },
          { role: "current", chapter: chapters[currentIndex] },
          { role: "next", chapter: chapters[nextIndex] },
        ];

  useEffect(() => {
    return () => {
      busyRef.current = false;
      dragRef.current = null;
    };
  }, []);

  const measureStep = () => {
    const track = trackRef.current;
    if (!track) {
      return 0;
    }

    const cards = track.querySelectorAll<HTMLElement>(".product-narrative__card");
    const current = cards[1];
    const next = cards[2];
    if (!current || !next) {
      return current?.offsetWidth ?? 0;
    }

    return next.offsetLeft - current.offsetLeft;
  };

  const setTrackX = (x: number, withTransition: boolean) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    if (withTransition && !prefersReducedMotion()) {
      track.style.transition = `transform ${SNAP_MS}ms ${SNAP_EASE}`;
    } else {
      track.style.transition = "none";
    }

    track.style.transform = `translate3d(${x}px, 0, 0)`;
  };

  const resetTrackInstant = () => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    track.style.transition = "none";
    track.style.transform = "translate3d(0, 0, 0)";
    // Force layout so the next transition starts from a real zero.
    void track.offsetWidth;
  };

  const finishCommit = (direction: 1 | -1) => {
    resetTrackInstant();
    setCurrentIndex((index) => wrapIndex(index + direction, count));
    busyRef.current = false;
    stageRef.current?.classList.remove("product-narrative__stage--dragging");
  };

  const animateTrackTo = (targetX: number, onDone: () => void) => {
    const track = trackRef.current;
    if (!track) {
      onDone();
      return;
    }

    if (prefersReducedMotion()) {
      onDone();
      return;
    }

    let settled = false;
    const settle = () => {
      if (settled) {
        return;
      }
      settled = true;
      track.removeEventListener("transitionend", handleEnd);
      window.clearTimeout(safetyTimer);
      onDone();
    };

    const handleEnd = (event: TransitionEvent) => {
      if (event.target !== track || event.propertyName !== "transform") {
        return;
      }
      settle();
    };

    track.addEventListener("transitionend", handleEnd);
    setTrackX(targetX, true);

    const safetyTimer = window.setTimeout(settle, SNAP_MS + 80);
  };

  const releaseDrag = (clientX: number) => {
    const drag = dragRef.current;
    if (!drag) {
      return;
    }

    dragRef.current = null;
    stageRef.current?.classList.remove("product-narrative__stage--dragging");

    const damped = (clientX - drag.startX) * DRAG_DAMPING;
    const step = measureStep();
    const threshold = Math.max(48, step * SNAP_RATIO);

    if (Math.abs(damped) < threshold || step <= 0) {
      busyRef.current = true;
      animateTrackTo(0, () => {
        resetTrackInstant();
        busyRef.current = false;
      });
      return;
    }

    const direction: 1 | -1 = damped < 0 ? 1 : -1;
    busyRef.current = true;
    animateTrackTo(-direction * step, () => {
      finishCommit(direction);
    });
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (busyRef.current || count < 2 || event.button !== 0) {
      return;
    }

    if (dragRef.current) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
    };

    stageRef.current?.classList.add("product-narrative__stage--dragging");
    setTrackX(0, false);

    const onMove = (moveEvent: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || moveEvent.pointerId !== drag.pointerId) {
        return;
      }

      drag.lastX = moveEvent.clientX;
      const damped = (moveEvent.clientX - drag.startX) * DRAG_DAMPING;
      setTrackX(damped, false);
    };

    const onUp = (upEvent: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || upEvent.pointerId !== drag.pointerId) {
        return;
      }

      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      releaseDrag(upEvent.clientX);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  if (count === 0) {
    return null;
  }

  return (
    <Section
      id={content.id}
      aria-label="A closer look"
      className="product-section product-narrative"
    >
      <Container width="content">
        <Stack gap="xl" className="product-narrative__frame">
          <header className="product-narrative__header">
            {content.eyebrow ? (
              <Text as="p" variant="label" className="product-narrative__eyebrow">
                {content.eyebrow}
              </Text>
            ) : null}
            <ProductSectionHeader headline={content.headline} />
            {content.introduction ? (
              <Text className="product-section-intro product-narrative__intro">
                {content.introduction}
              </Text>
            ) : null}
          </header>

          <div
            className="product-narrative__showcase"
            role="region"
            aria-roledescription="carousel"
            aria-labelledby={labelId}
            aria-describedby={statusId}
          >
            <p id={labelId} className="product-narrative__sr-only">
              Product design showcase. Drag horizontally to explore.
            </p>
            <p id={statusId} className="product-narrative__sr-only" aria-live="polite">
              Slide {currentIndex + 1} of {count}: {chapters[currentIndex]?.title}
            </p>

            <div
              ref={stageRef}
              className="product-narrative__stage"
              onPointerDown={onPointerDown}
            >
              <div ref={trackRef} className="product-narrative__track">
                {slides.map(({ role, chapter }) => {
                  const image = resolveChapterImage(
                    chapter.id,
                    narrativeMedia,
                    chapter.image,
                  );

                  return (
                    <StoryCard
                      key={`${role}-${chapter.id}`}
                      chapter={chapter}
                      image={image}
                      role={role}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
