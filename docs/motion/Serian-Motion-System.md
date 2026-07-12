# Serian Motion System

Version: v1.0 (Iteration 09A)  
Status: Foundation only — no section animations yet.

---

## Purpose

Serian Motion System is the **single animation language** for the entire site. Sections must not import GSAP directly or define ad-hoc tweens. All motion flows through shared primitives, tokens, and hooks.

Philosophy: **calm, editorial, performance-first** — aligned with Explain, never persuade.

---

## Project Audit

### Current stack

- Next.js 16 App Router
- React 19 Server Components by default
- Client components only where interactivity is required (`"use client"`)
- Existing structure: `lib/` (utilities), `hooks/` (React hooks), `components/` (UI)

### Why `lib/motion/`?

| Option | Verdict |
|--------|---------|
| Animation inside sections | ❌ Duplicated logic, inconsistent timing, hard cleanup |
| `motion/` at repo root | ⚠️ Breaks project convention (`lib/`, `hooks/`, `components/`) |
| **`lib/motion/`** | ✅ Matches Serian structure; framework-agnostic presets |
| `hooks/useMotion.ts` | ✅ React lifecycle boundary per GSAP skill |
| `components/providers/MotionProvider.tsx` | ✅ Single client registration point |

GSAP runs only in the browser. Registration happens once inside `MotionProvider` (mounted in `SiteShell`). Presets are pure functions — they do nothing until called from a client `useGSAP` scope.

---

## Architecture

```
lib/motion/
├── gsap.ts              # Singleton registration (ScrollTrigger + useGSAP)
├── tokens.ts            # Duration, ease, distance, stagger, scroll defaults
├── types.ts             # MotionTarget, MotionPresetVars
├── verify.ts            # Dev sanity check (no visible animation)
├── utils/
│   ├── reduced-motion.ts
│   ├── scroll.ts
│   └── targets.ts
└── presets/             # 8 motion primitives (the only vocabulary)
    ├── fade.ts
    ├── fadeUp.ts
    ├── sectionReveal.ts
    ├── textReveal.ts
    ├── imageReveal.ts
    ├── staggerReveal.ts
    ├── headerTransition.ts
    └── hoverTransition.ts

hooks/
└── useMotion.ts         # Scoped useGSAP wrapper + runtime accessor

components/providers/
└── MotionProvider.tsx   # Client boundary — registers GSAP once
```

### Registration flow

```
SiteShell (Server)
  └── MotionProvider (Client)
        └── useEffect → initGsap()
              ├── gsap.registerPlugin(ScrollTrigger, useGSAP)  // once
              ├── gsap.defaults({ duration, ease })
              └── ScrollTrigger.config({ ignoreMobileResize: true })
```

No duplicate registration: `initGsap()` is idempotent (`isRegistered` guard + SSR no-op).

---

## Motion Primitives (8)

These are the **only** animation verbs allowed across Serian:

| Primitive | Use case |
|-----------|----------|
| `fade` | Simple opacity entrance |
| `fadeUp` | Standard content entrance |
| `sectionReveal` | Scroll-triggered section block |
| `textReveal` | Editorial copy — shorter travel |
| `imageReveal` | Large photography — scale + fade |
| `staggerReveal` | Lists, grids, chapter stacks |
| `headerTransition` | Header state changes |
| `hoverTransition` | Subtle pointer feedback (`quickTo`) |

Import from `@/lib/motion` — never reimplement inline.

---

## How Future Sections Should Consume Motion

### 1. Mark the section as a client component (only if it animates)

```tsx
"use client";

import { useRef } from "react";
import { sectionReveal, staggerReveal } from "@/lib/motion";
import { useMotion } from "@/hooks/useMotion";
```

### 2. Attach a scope ref to the section root

```tsx
const sectionRef = useRef<HTMLElement>(null);

useMotion(
  () => {
    sectionReveal(sectionRef.current);
    staggerReveal(".chapter", { scope: sectionRef }); // use class inside scope
  },
  sectionRef,
);
```

### 3. Rules (from GSAP React skill)

- Always pass **scope** (ref) to `useMotion` / `useGSAP`
- Use **refs** for targets when possible; selectors must stay inside scope
- Wrap post-mount handlers (hover, click) with **contextSafe**
- Call `refreshScrollTriggers()` after layout-affecting content loads (images, fonts)
- Never call `gsap.*` or `ScrollTrigger.*` during SSR

### Example pattern (future iteration)

```tsx
"use client";

import { useRef } from "react";
import { imageReveal, textReveal } from "@/lib/motion";
import { useMotion } from "@/hooks/useMotion";

export function ExampleSection() {
  const rootRef = useRef<HTMLElement>(null);

  useMotion(
    (context, contextSafe) => {
      if (!rootRef.current) return;

      textReveal(rootRef.current.querySelector(".intro"));
      imageReveal(rootRef.current.querySelector(".media"));
    },
    rootRef,
  );

  return (
    <section ref={rootRef}>
      <p className="intro">…</p>
      <div className="media">…</div>
    </section>
  );
}
```

---

## Avoiding Duplicated Animation Logic

1. **Tokens** — all durations/eases live in `motionTokens`; sections pass overrides only when necessary.
2. **Presets** — sections call primitives; they do not configure raw `gsap.from()` unless adding a new primitive.
3. **Utils** — `applyReducedMotion`, `createSectionScrollTrigger` are shared; do not copy-paste ScrollTrigger config.
4. **Registration** — only `initGsap()` in `MotionProvider`; never `registerPlugin` in components.
5. **Cleanup** — `useMotion` wraps `useGSAP` which auto-reverts context on unmount.

To add a new animation pattern: create a new preset in `lib/motion/presets/`, export it, add to `motionPrimitives` — do not animate inline in a section.

---

## Accessibility & Performance

| Requirement | Implementation |
|-------------|----------------|
| `prefers-reduced-motion` | `applyReducedMotion()` sets `duration: 0` on all presets |
| SSR | `initGsap()` no-op when `window` undefined; provider is `"use client"` |
| React cleanup | `useGSAP` auto-revert; `hoverTransition` returns `kill()` handle |
| ScrollTrigger lifecycle | Created inside `useGSAP` context; reverted on unmount |
| Mobile performance | Transform + `autoAlpha` only; `ignoreMobileResize`; `once: true` scroll triggers |

---

## What This Iteration Does NOT Do

- No section animations
- No Hero / Narrative / Header motion
- No layout, color, or typography changes
- No new visual behavior on the live page

`MotionProvider` only registers the runtime. The page looks identical; the framework is ready for Iteration 09B+.

---

## Verification

```bash
npm run lint
npm run build
```

Dev: `verifyMotionSystem()` runs once on mount (development only) and confirms plugin registration + 8 primitives without creating visible tweens.
