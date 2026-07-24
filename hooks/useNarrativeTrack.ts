"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Copies of the chapter strip — user stays in the middle band. */
export const NARRATIVE_LOOP_COPIES = 3;

const DEFAULT_SIDE_SCALE = 0.9;
const DEFAULT_SIDE_OPACITY = 0.58;

/**
 * Settle physics — slightly overdamped spring (px/s units).
 * Lower ω = heavier, slower final approach (premium hardware feel).
 */
const SETTLE_OMEGA = 5.2;
const SETTLE_ZETA = 1.18;
/** Soft friction while still carrying release momentum (1/s). */
const COAST_FRICTION = 1.55;
/** Above this speed (px/s), spring is diluted so inertia leads. */
const INERTIA_SPEED = 920;
/** Settle when close and nearly still. */
const SETTLE_DISTANCE = 0.4;
const SETTLE_SPEED = 8;

type Metrics = {
  stageWidth: number;
  cardWidth: number;
  step: number;
  loopWidth: number;
  count: number;
  sideScale: number;
  sideOpacity: number;
};

type DragSession = {
  pointerId: number;
  lastX: number;
  lastT: number;
  /** Samples for release velocity (px/ms). */
  samples: Array<{ x: number; t: number }>;
};

type EngineMode = "idle" | "dragging" | "settling";

type UseNarrativeTrackOptions = {
  stageRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
  /** Unique chapters (not including loop copies). */
  count: number;
  /** Fires only when the settled logical chapter changes (0..count-1). */
  onActiveChange?: (logicalIndex: number) => void;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Continuous narrative track — drag 1:1, inertia → overdamped settle, infinite loop.
 * translateX is the single source of truth; no discrete snap lock.
 */
export function useNarrativeTrack({
  stageRef,
  trackRef,
  count,
  onActiveChange,
}: UseNarrativeTrackOptions) {
  const metricsRef = useRef<Metrics | null>(null);
  const xRef = useRef(0);
  /** Velocity in px/s. */
  const vRef = useRef(0);
  const modeRef = useRef<EngineMode>("idle");
  const targetIndexRef = useRef(0);
  const dragRef = useRef<DragSession | null>(null);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const activeLogicalRef = useRef(0);
  const onActiveChangeRef = useRef(onActiveChange);
  const reducedRef = useRef(false);

  onActiveChangeRef.current = onActiveChange;

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track || count <= 0) {
      return;
    }

    const cards = () =>
      track.querySelectorAll<HTMLElement>(".product-narrative__card");

    const measure = (): Metrics | null => {
      const list = cards();
      if (list.length === 0) {
        return null;
      }

      const first = list[0];
      const second = list[1] ?? first;
      const cardWidth = first.offsetWidth;
      const step =
        list.length > 1 ? second.offsetLeft - first.offsetLeft : cardWidth;
      if (step <= 0 || cardWidth <= 0) {
        return null;
      }

      const root = stage.closest<HTMLElement>(".product-narrative") ?? stage;
      const tokens = getComputedStyle(root);
      const sideScale =
        Number.parseFloat(tokens.getPropertyValue("--narrative-side-scale")) ||
        DEFAULT_SIDE_SCALE;
      const sideOpacity =
        Number.parseFloat(tokens.getPropertyValue("--narrative-side-opacity")) ||
        DEFAULT_SIDE_OPACITY;

      return {
        stageWidth: stage.clientWidth,
        cardWidth,
        step,
        loopWidth: step * count,
        count,
        sideScale,
        sideOpacity,
      };
    };

    const centerXForIndex = (index: number, m: Metrics) =>
      m.stageWidth / 2 - (index * m.step + m.cardWidth / 2);

    const nearestIndex = (x: number, m: Metrics) => {
      const raw = (m.stageWidth / 2 - m.cardWidth / 2 - x) / m.step;
      return Math.round(raw);
    };

    /** Bias pick by short velocity lookahead so settle commits to intended neighbor. */
    const pickSettleIndex = (x: number, velocityPxPerSec: number, m: Metrics) => {
      const lookaheadMs = clamp(Math.abs(velocityPxPerSec) * 0.18, 40, 220);
      const projected = x + velocityPxPerSec * (lookaheadMs / 1000);
      return nearestIndex(projected, m);
    };

    const wrapIntoMiddleBand = (
      x: number,
      m: Metrics,
      adjustTarget = false,
    ) => {
      if (m.loopWidth <= 0 || m.count <= 0) {
        return x;
      }

      let i = nearestIndex(x, m);
      let next = x;

      while (i < m.count) {
        next -= m.loopWidth;
        i += m.count;
        if (adjustTarget) {
          targetIndexRef.current += m.count;
        }
      }

      while (i >= m.count * 2) {
        next += m.loopWidth;
        i -= m.count;
        if (adjustTarget) {
          targetIndexRef.current -= m.count;
        }
      }

      return next;
    };

    const applyCardLooks = (x: number, m: Metrics) => {
      const list = cards();
      const stageCenter = m.stageWidth / 2;
      let bestLogical = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < list.length; i += 1) {
        const card = list[i];
        const cardCenter = x + i * m.step + m.cardWidth / 2;
        const dist = Math.abs(cardCenter - stageCenter);
        // Wider falloff than step so grow/shrink spans the whole travel between cards.
        const t = clamp(dist / (m.step * 0.92), 0, 1);
        const blend = t * t * (3 - 2 * t);
        const scale = lerp(1, m.sideScale, blend);
        const opacity = lerp(1, m.sideOpacity, blend);
        const elevation = 1 - blend;
        const isActive = dist < m.step * 0.5;

        card.style.transform = `scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = isActive ? "2" : "1";
        // Soft elevation — never a hard shadow pop.
        card.style.boxShadow =
          elevation < 0.06
            ? "none"
            : `0 ${1 + 3 * elevation}px ${6 + 14 * elevation}px rgba(15, 15, 20, ${0.045 * elevation})`;
        card.classList.toggle("product-narrative__card--active", isActive);
        card.setAttribute("aria-hidden", isActive ? "false" : "true");

        if (dist < bestDist) {
          bestDist = dist;
          bestLogical = ((i % m.count) + m.count) % m.count;
        }
      }

      return bestLogical;
    };

    const paint = (x: number) => {
      const m = metricsRef.current;
      if (!m) {
        return 0;
      }

      track.style.transform = `translate3d(${x}px, 0, 0)`;
      return applyCardLooks(x, m);
    };

    const commitActive = (logical: number) => {
      if (logical === activeLogicalRef.current) {
        return;
      }

      activeLogicalRef.current = logical;
      onActiveChangeRef.current?.(logical);
    };

    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const tick = (now: number) => {
      rafRef.current = 0;
      const m = metricsRef.current;
      if (!m) {
        return;
      }

      const last = lastFrameRef.current || now;
      const dt = clamp((now - last) / 1000, 0, 0.064);
      lastFrameRef.current = now;

      let x = xRef.current;
      let v = vRef.current;

      if (modeRef.current !== "settling") {
        return;
      }

      if (reducedRef.current) {
        x = wrapIntoMiddleBand(centerXForIndex(targetIndexRef.current, m), m);
        xRef.current = x;
        vRef.current = 0;
        modeRef.current = "idle";
        commitActive(paint(x));
        return;
      }

      const target = centerXForIndex(targetIndexRef.current, m);
      const speed = Math.abs(v);
      // Inertia leads at high speed; spring takes over as we slow — one continuous curve.
      const inertiaMix = clamp(speed / INERTIA_SPEED, 0, 1);
      const omega = SETTLE_OMEGA * (1 - 0.35 * inertiaMix);
      const zeta = SETTLE_ZETA;

      const springAccel = -2 * zeta * omega * v - omega * omega * (x - target);
      const frictionAccel = -COAST_FRICTION * v * inertiaMix;

      v += (springAccel + frictionAccel) * dt;
      x += v * dt;
      x = wrapIntoMiddleBand(x, m, true);

      xRef.current = x;
      vRef.current = v;

      const delta = target - x;
      if (Math.abs(delta) < SETTLE_DISTANCE && Math.abs(v) < SETTLE_SPEED) {
        x = wrapIntoMiddleBand(target, m);
        xRef.current = x;
        vRef.current = 0;
        modeRef.current = "idle";
        commitActive(paint(x));
        return;
      }

      paint(x);
      rafRef.current = requestAnimationFrame(tick);
    };

    const ensureLoop = () => {
      if (rafRef.current) {
        return;
      }
      lastFrameRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    };

    const layout = () => {
      const m = measure();
      if (!m) {
        return;
      }

      metricsRef.current = m;
      reducedRef.current = prefersReducedMotion();

      const startIndex = m.count;
      const x = wrapIntoMiddleBand(centerXForIndex(startIndex, m), m);
      xRef.current = x;
      vRef.current = 0;
      modeRef.current = "idle";
      targetIndexRef.current = startIndex;
      commitActive(paint(x));
    };

    layout();

    const resizeObserver = new ResizeObserver(() => {
      const logical = activeLogicalRef.current;
      const m = measure();
      if (!m) {
        return;
      }

      metricsRef.current = m;
      const indexInMiddle = m.count + logical;
      const x = wrapIntoMiddleBand(centerXForIndex(indexInMiddle, m), m);
      xRef.current = x;
      vRef.current = 0;
      modeRef.current = "idle";
      targetIndexRef.current = indexInMiddle;
      stopLoop();
      commitActive(paint(x));
    });

    resizeObserver.observe(stage);

    const velocityFromSamples = (samples: DragSession["samples"]) => {
      if (samples.length < 2) {
        return 0;
      }

      const latest = samples[samples.length - 1];
      let earliest = samples[0];
      for (let i = samples.length - 2; i >= 0; i -= 1) {
        if (latest.t - samples[i].t > 90) {
          earliest = samples[i];
          break;
        }
        earliest = samples[i];
      }

      const dt = latest.t - earliest.t;
      if (dt <= 0) {
        return 0;
      }

      // px/ms → px/s
      return ((latest.x - earliest.x) / dt) * 1000;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || count < 1) {
        return;
      }

      if (dragRef.current) {
        return;
      }

      stopLoop();
      modeRef.current = "dragging";
      vRef.current = 0;
      stage.classList.add("product-narrative__stage--dragging");

      const t = performance.now();
      dragRef.current = {
        pointerId: event.pointerId,
        lastX: event.clientX,
        lastT: t,
        samples: [{ x: event.clientX, t }],
      };

      stage.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      const m = metricsRef.current;
      if (!drag || drag.pointerId !== event.pointerId || !m) {
        return;
      }

      const dx = event.clientX - drag.lastX;
      drag.lastX = event.clientX;
      drag.lastT = performance.now();
      drag.samples.push({ x: event.clientX, t: drag.lastT });
      if (drag.samples.length > 10) {
        drag.samples.shift();
      }

      let x = xRef.current + dx;
      x = wrapIntoMiddleBand(x, m);
      xRef.current = x;
      paint(x);
    };

    const onPointerUp = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) {
        return;
      }

      dragRef.current = null;
      stage.classList.remove("product-narrative__stage--dragging");

      const m = metricsRef.current;
      if (!m) {
        modeRef.current = "idle";
        return;
      }

      const velocity = velocityFromSamples(drag.samples);
      vRef.current = velocity;
      targetIndexRef.current = pickSettleIndex(xRef.current, velocity, m);
      modeRef.current = "settling";
      ensureLoop();
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      dragRef.current = null;
    };
  }, [stageRef, trackRef, count]);
}
