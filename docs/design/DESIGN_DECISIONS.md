# Serian Design Decisions

> This document records important design decisions made during the development of the Serian website.
>
> It explains **why** decisions were made, not only **what** was built.
>
> This document grows over time and should be appended rather than rewritten.

---

# DD-001

## The website exists to sell products, not to demonstrate design ability.

### Decision

The product should always receive more attention than the interface itself.

### Reason

Visitors come to evaluate products.

They do not come to admire the website.

Good design removes friction instead of demanding attention.

### Result

Future UI decisions should strengthen product presentation rather than increase visual complexity.

---

# DD-002

## Serian follows a calm visual language.

### Decision

Use restrained typography, generous whitespace and subtle visual hierarchy.

### Reason

Trust is built through clarity.

Not through visual excitement.

### Result

Avoid excessive decoration, bright accents and overly expressive layouts.

---

# DD-003

## Avoid traditional high-pressure DTC patterns.

### Decision

The website will not rely on fake urgency or psychological pressure.

### Reason

The brand wants customers to feel informed rather than persuaded.

Confidence creates stronger long-term trust than pressure.

### Result

The following patterns are generally avoided:

* Countdown timers
* Fake scarcity
* Flash sale banners
* Popups
* Forced subscriptions
* Excessive promotional badges

---

# DD-004

## Homepage represents the brand, not a single product.

### Decision

The homepage will introduce Serian as a brand.

Individual products belong to dedicated product pages.

### Reason

The business is expected to expand into multiple products.

A brand-focused homepage scales better than a single-product landing page.

### Result

Homepage design should explain who Serian is before highlighting specific products.

---

# DD-005

## Product pages should tell a story.

### Decision

Sections should form one continuous narrative.

Hero → Problem → Solution → Features → Benefits → Social Proof → Purchase.

### Reason

Visitors naturally ask different questions while evaluating a product.

Each section should answer one question before leading to the next.

### Result

Avoid treating sections as isolated content blocks.

---

# DD-006

## Real media has higher priority than decorative graphics.

### Decision

Invest effort into photography, demonstrations and usage media.

### Reason

Authentic product presentation creates stronger credibility than decorative illustrations.

### Result

Future media work focuses on:

* Product photography
* UGC
* Before / After
* Demonstration videos
* Lifestyle imagery

---

# DD-007

## Architecture should remain stable during design work.

### Decision

Presentation improvements should not trigger architecture redesign.

### Reason

Stable architecture allows design to evolve safely.

Repeated structural changes slow development and increase maintenance cost.

### Result

Design Iterations work primarily inside the Presentation Layer.

---

# DD-008

## Every design iteration has only one objective.

### Decision

Each iteration focuses on improving one experience.

### Reason

Small improvements are easier to evaluate and preserve.

Large redesigns often destroy previous improvements.

### Result

Examples include:

* Hero Experience
* Product Story
* Gallery Experience
* Purchase Experience
* Homepage Experience

---

# DD-009

## Motion should support understanding.

### Decision

Animations should be subtle and purposeful.

### Reason

Motion should guide users, not entertain them.

### Result

Avoid exaggerated animation.

Prefer soft fades, gentle movement and natural transitions.

---

# DD-010

## Every design decision must answer "Why?"

### Decision

Every meaningful UI change should include its reasoning.

### Reason

Future contributors, including AI, should understand the intention behind previous work instead of repeating old discussions.

### Result

Design reports should always include:

* Why was this change made?
* What problem does it solve?
* What still needs improvement?

---

# DD-011

## The brand should feel like a trustworthy modern trading company.

### Decision

Serian presents itself as a carefully curated product brand rather than a manufacturer.

### Reason

The company's value comes from selecting and presenting practical products thoughtfully.

### Result

Brand communication should emphasize careful selection, practical value and honest presentation rather than manufacturing claims.

---

# DD-012

## The Hero should present the product on a stage, not inside a card.

### Decision

On product pages, the Hero uses a product-first layout: media column before story column. The gallery uses a stage presentation (soft surface, contain crop, quiet thumbnails). Trust and rating merge into a single support block below the CTA. The Header becomes quieter on product routes.

### Reason

The previous Hero communicated everything at once. Rating, pills, bordered gallery card, and copy competed equally. First impression should answer: “This product looks thoughtfully designed.” That requires one focal point and supporting layers, not more components.

### Result

- Visual scan path: Product → Headline → Value → CTA → Trust
- Hero CTA anchors to `#purchase` using existing `ctaLabel` — no commerce duplication
- Presentation-only changes in `HeroSection`, `HeroSupport`, `Header`, and `product-layout.css`

---

# Future Decisions

Append all future design decisions below using the same format.

Never remove historical decisions.

If a previous decision is intentionally replaced, create a new Design Decision explaining why the change was made instead of editing the original.
