/** Client-side GSAP state probe — investigation only. */
import { chromium } from "playwright-core";

const url = "http://localhost:3000/products/hair-dryer-brush";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(url, { waitUntil: "networkidle" });

// Scroll solution into view
await page.locator("#solution").scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);

const report = await page.evaluate(() => {
  const root = document.querySelector("#solution");
  if (!root) return { error: "no #solution" };

  const pick = (sel) => {
    const el = root.querySelector(sel);
    if (!el) return { found: false };
    const cs = getComputedStyle(el);
    return {
      found: true,
      opacity: cs.opacity,
      visibility: cs.visibility,
      display: cs.display,
      transform: cs.transform,
      inlineStyle: el.getAttribute("style") ?? "",
      rect: el.getBoundingClientRect(),
    };
  };

  const cards = [...root.querySelectorAll(".product-item-card")].map((el, i) => {
    const cs = getComputedStyle(el);
    return {
      i,
      opacity: cs.opacity,
      visibility: cs.visibility,
      inlineStyle: el.getAttribute("style") ?? "",
    };
  });

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const triggers = ScrollTrigger?.getAll?.() ?? [];
  const solutionTrigger = triggers.find((t) => t.trigger === root || t.vars?.trigger === root);

  const headline = pick(".product-section-header");
  const intro = pick(".product-section-intro");
  const media = pick(".product-solution-media");

  return {
    headline,
    intro,
    cards,
    media,
    cardCount: cards.length,
    scrollY: window.scrollY,
    rootTop: root.getBoundingClientRect().top,
    triggerCount: triggers.length,
    solutionTrigger: solutionTrigger
      ? {
          progress: solutionTrigger.progress,
          isActive: solutionTrigger.isActive,
          start: solutionTrigger.start,
          end: solutionTrigger.end,
          animation: !!solutionTrigger.animation,
          animationProgress: solutionTrigger.animation?.progress?.(),
          childCount: solutionTrigger.animation?.getChildren?.()?.length,
        }
      : null,
    gsapPresent: !!gsap,
  };
});

console.log(JSON.stringify(report, null, 2));
await browser.close();
