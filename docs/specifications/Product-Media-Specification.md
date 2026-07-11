# Product Media Specification

Version: v1.0  
Purpose: Unified media structure for all Serian product landing pages.

---

## Overview

Every product owns a **Media Kit** defined in `content/products/{slug}/media.ts` and served from `public/products/{slug}/`.

Update media by:

1. Adding or replacing files under `public/products/{slug}/`
2. Updating paths and metadata in `media.ts`

No component or page structure changes are required for new assets.

---

## Directory Structure

```
public/products/{slug}/
├── hero/
│   ├── hero-01.jpg          # Primary product photo
│   ├── hero-02.jpg          # Alternate angles / in-use shots
│   └── ...
├── features/
│   ├── feature-{name}.jpg   # Feature detail images
│   └── ...
├── demonstration/
│   └── demonstration.jpg    # Solution section still image
├── before-after/
│   ├── before.jpg
│   └── after.jpg
├── packaging/
│   └── packaging.jpg
└── videos/
    ├── demo.mp4
    ├── demo-poster.jpg
    ├── ugc-01.mp4
    ├── ugc-01-poster.jpg
    ├── ugc-02.mp4
    ├── ugc-02-poster.jpg
    └── ...
```

---

## Naming Conventions

| Asset type | Pattern | Example |
|---|---|---|
| Hero gallery | `hero-{nn}.{ext}` | `hero-01.jpg` |
| Feature image | `feature-{slug}.{ext}` | `feature-barrel.jpg` |
| Demo video | `demo.mp4` | Fixed name |
| Demo poster | `demo-poster.{ext}` | Required for lazy load |
| UGC video | `ugc-{nn}.mp4` | `ugc-01.mp4` |
| UGC poster | `ugc-{nn}-poster.{ext}` | Matches video number |
| Before | `before.{ext}` | Single pair default |
| After | `after.{ext}` | Single pair default |
| Packaging | `packaging.{ext}` | Optional shared asset |

Use lowercase kebab-case. Two-digit zero padding for numbered sequences (`01`, `02`).

Feature media refs in `media.ts` use stable **feature ids** (e.g. `oval-barrel`) that match narrative content — not filenames.

---

## Recommended Dimensions

| Asset | Aspect ratio | Recommended size | Notes |
|---|---|---|---|
| Hero | 5:4 or 4:5 | 1600 × 1280 px | Primary conversion visual |
| Feature | 4:3 | 1280 × 960 px | Card and split layouts |
| Demonstration | 16:10 | 1600 × 1000 px | Solution section |
| Before / After | 4:3 | 1280 × 960 px | Paired, same framing |
| Demo video | 16:9 | 1920 × 1080 px | Landscape |
| UGC video | 9:16 | 1080 × 1920 px | Vertical, mobile-first |
| Video poster | Match video | Same as target frame | Required for all videos |
| OG / social | 1.91:1 or 5:4 | 1200 × 630 px min | SEO sharing |

---

## Image Formats

| Use case | Preferred | Acceptable |
|---|---|---|
| Product photography | WebP | JPEG |
| Placeholders / dev | SVG | — |
| Transparency | WebP / PNG | PNG |
| OG image | JPEG / WebP | PNG |

Always provide meaningful `alt` text in `media.ts`. Prefer WebP with JPEG fallback only when needed — Next.js Image handles optimization.

---

## Video Formats

| Property | Requirement |
|---|---|
| Container | MP4 (H.264) |
| Audio | Optional; muted autoplay uses no audio |
| Max demo length | 60–90 seconds |
| Max UGC clip | 15–45 seconds |
| Poster | Required — shown until lazy load / click |
| File size target | Demo ≤ 8 MB, UGC ≤ 5 MB each |

Videos use native `<video>` — no external player. `preload="none"` until visible.

---

## UGC Guidelines

- **Morning Routine** — single continuous shot, natural lighting, real bathroom or bedroom setting  
- **Before / After** — same angle, same person, clear transformation  
- **Demo** — close-up product use, hands visible, minimal editing  
- **Unboxing** — packaging reveal, first impression  

Provide 2–4 clips per product in `mediaKit.ugc.items`. Set `enabled: false` to hide the section without removing data.

---

## Media Kit Schema (`media.ts`)

```typescript
ProductMediaKit {
  slug: string
  hero: { images[], primaryIndex? }
  features: [{ id, image?, layout? }]   // layout: inline | media-start | media-end
  demo?: { enabled, headline, video }
  beforeAfter?: { enabled, headline, pairs[] }
  ugc?: { enabled, headline, items[] }
  assets?: { demonstration?, packaging?, og? }
}
```

Feature `id` must match `sections.features.features[].id` in narrative content.

---

## Performance Rules

1. **Images** — always via `next/image` with appropriate `sizes`
2. **Hero** — only first image uses `priority`
3. **Videos** — lazy load with `IntersectionObserver`; `preload="none"`
4. **UGC grid** — do not autoplay all videos; muted autoplay only when card is visible
5. **Mobile first** — vertical UGC, touch-friendly gallery swipe
6. **Batch uploads** — add files incrementally; missing video files fall back to poster

---

## Adding a New Product

1. Create `public/products/{slug}/` following this structure  
2. Create `content/products/{slug}/media.ts` exporting `mediaKit`  
3. Register `mediaKit` on the product's `ProductPageContent`  
4. Assign feature ids in narrative and matching refs in `mediaKit.features`  
5. Set `enabled: false` on optional blocks until assets are ready  

---

## Architecture Reference

```
content/products/{slug}/media.ts
        ↓
ProductPageContent.mediaKit
        ↓
ProductPage → Hero / Features / Demo / BeforeAfter / UGC sections
        ↓
components/product/shared/ (ProductMedia, ProductVideo, ProductMediaGallery)
        ↓
public/products/{slug}/
```

Access Layer (`lib/content/`) is unchanged — mediaKit travels with product content.
