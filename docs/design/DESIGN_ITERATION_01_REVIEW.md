# Design Iteration 01 — Design Review

**Focus:** Give the product a stage (Header + Hero only)  
**Product:** Serian Hot Air Brush  
**Screenshots:** `docs/screenshots/design-iteration-01/`

| Viewport | File |
|----------|------|
| Desktop (1440×900) | `desktop.png` |
| Tablet (768×1024) | `tablet.png` |
| Mobile (390×844) | `mobile.png` |
| Hero close-up | `hero-closeup.png` |

---

## Before vs After

**Before** (pre-iteration structure — no preserved screenshot):

```
Header: brand + tagline + uppercase nav + bottom border
Hero:
  Left:  Rating → Headline → Subheadline → Trust pills
  Right: Product gallery (bordered card, cover crop, heavy shadow)
  No Hero CTA
```

**After** (this iteration):

```
Header (product pages): brand only + caption nav + no border
Hero:
  Left:  Product stage (soft surface, contain crop, quiet thumbnails)
  Right: Headline → Subheadline → CTA → Trust block (rating + guarantees)
```

---

## 1. What problem did this iteration try to solve?

The Hero delivered information but did not create a memorable first impression. Every element — rating, headline, trust pills, gallery card — competed at the same visual level. The product felt placed on the page inside a bordered card, not displayed on a calm stage. The Header read like a template navigation bar rather than the beginning of a brand experience.

---

## 2. What design decisions were made? Why?

| Decision | Why |
|----------|-----|
| **Product-first layout** — gallery column before story on all breakpoints | The eye should meet the product first. Desktop places media left; mobile stacks product above copy. |
| **Stage presentation** (`product-media-gallery--stage`) — soft secondary surface, no card border/shadow, `object-fit: contain` | Removes the “ecommerce card” feeling. The product sits in whitespace with breathing room instead of being cropped into a box. |
| **Quiet Header on product pages** — hide tagline, remove border, caption-style nav | Reduces chrome above the Hero. The first screen belongs to the product, not navigation. |
| **Reordered story stack** — Headline → Lead → CTA → Support | Matches the intended scan path: understand what it is, why it matters, what to do next, then reassurance. |
| **HeroSupport block** — rating + guarantees as one muted layer with a single divider | Trust was scattered across pill badges. One coherent support layer reads as reassurance, not marketing. |
| **Hero CTA** — existing `purchase.ctaLabel`, anchor to `#purchase`, fit-content width | Gives a natural next step without duplicating commerce logic or adding urgency styling. |
| **Spacing over size** — `gap` between story elements, `max-width: 34ch` on lead | Hierarchy through rhythm, not louder typography. |

---

## 3. Where is the visual focal point now?

1. **First:** Product image in the stage surface  
2. **Second:** Headline (“One tool to dry and style your hair”)  
3. **Third:** CTA, then the muted trust support line  

Rating and shipping guarantees are deliberately last — they support the decision, they do not open the conversation.

---

## 4. Which elements were intentionally simplified? Why?

- **Trust pills** → single caption line with middots. Pills added visual noise and felt promotional.
- **Rating position** → moved from top of Hero to the support block. Stars at the top competed with the product.
- **Header tagline** → hidden on product pages. Tagline is brand context, not first-impression content.
- **Gallery counter** → transparent background, muted color. The counter is utility, not decoration.
- **Thumbnails** → smaller, lower opacity until active. They assist exploration without pulling focus from the main stage.

---

## 5. What was deliberately NOT changed? Why?

- **Content architecture, schema, tokens, routing** — out of scope; this is presentation only.
- **Sections below Hero** — Problem, Solution, Purchase, Reviews, etc. unchanged.
- **Purchase section commerce** — Hero CTA links down; no duplicate checkout UI.
- **Design token values** — reused existing tokens; new styles are presentation classes in `product-layout.css` and `theme.css`.
- **Gallery functionality** — keyboard, swipe, and thumbnails preserved; only visual treatment changed.

---

## 6. What still feels unfinished?

- **Hero image asset** — `hero-main.png` is a composite with circular crops; the stage surfaces it well, but a single clean product-on-white shot would strengthen the “designed product” feeling.
- **Tablet breakpoint** — layout transitions work, but the stage could use slightly more vertical presence at ~768px.
- **CTA copy** — “Continue to checkout” is functional but not yet product-confident; copy iteration is a content task, not done here.
- **Header on non-product pages** — unchanged; brand home still uses the fuller header pattern.

---

## 7. Score out of 100

**68 / 100**

**Why not higher:** The structural hierarchy is correct and the page is calmer, but the hero media asset itself still reads as a marketing composite rather than a studio product photograph. The stage does its job; the photography has not fully caught up.

**Why not lower:** Product is clearly first, trust no longer competes, Header is quieter, and the scan path matches the design intent. This is a meaningful step from “component collection” toward “product presentation.”

---

## 8. What should Design Iteration 02 focus on?

**One experience: Product Story rhythm** — the Problem → Solution narrative immediately below the Hero.

The first screen now introduces the product. The next scroll should deepen understanding without reverting to generic section blocks. Iteration 02 should make the story feel like a continuation of the same calm presentation, not a new page template.
