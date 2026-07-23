import type { ImageMediaAsset, ProductMediaKit, VideoMediaAsset } from "@/types/content";

const slug = "hair-dryer-brush";
const base = `/products/${slug}`;

type ImageWithFallback = ImageMediaAsset & { fallbackSrc?: string };
type VideoWithFallback = VideoMediaAsset & { posterFallbackSrc?: string };

/** Builds a real asset path with SVG placeholder fallback. */
function image(
  src: string,
  fallbackSrc: string,
  alt: string,
  width: number,
  height: number,
): ImageWithFallback {
  return { src, fallbackSrc, alt, width, height };
}

function video(
  src: string,
  poster: string,
  posterFallbackSrc: string,
  alt: string,
  width: number,
  height: number,
): VideoWithFallback {
  return {
    kind: "video",
    src,
    poster,
    posterFallbackSrc,
    alt,
    width,
    height,
  };
}

/**
 * Lifestyle assets — registered for future Brand/Home pages.
 * Not consumed by the product page in this milestone.
 */
export const lifestyleMedia: ImageMediaAsset[] = [
  image(
    `${base}/lifestyle/lifestyle-morning.png`,
    `${base}/hero/hero-03.svg`,
    "Morning styling routine with the Serian Hot Air Brush",
    1200,
    900,
  ),
  image(
    `${base}/lifestyle/lifestyle-bathroom.png`,
    `${base}/demonstration/demonstration.svg`,
    "Hot air brush on a calm bathroom counter",
    1200,
    900,
  ),
  image(
    `${base}/lifestyle/lifestyle-bedroom.png`,
    `${base}/hero/hero-05.svg`,
    "Serian Hot Air Brush in a bedroom vanity setting",
    1200,
    900,
  ),
  image(
    `${base}/lifestyle/lifestyle-closeup.png`,
    `${base}/hero/hero-04.svg`,
    "Close-up of the hot air brush barrel and bristles",
    1200,
    900,
  ),
];

/**
 * Complete media kit for Serian Hot Air Brush — real assets with SVG fallbacks.
 * Update paths here when adding or replacing files under public/products/{slug}/.
 */
export const mediaKit: ProductMediaKit = {
  slug,
  hero: {
    primaryIndex: 0,
    images: [
      image(
        `${base}/hero/hero-main.png`,
        `${base}/hero/hero-01.svg`,
        "Serian Hot Air Brush — front product view with oval barrel and built-in bristles",
        1200,
        1200,
      ),
      image(
        `${base}/hero/hero-front.png`,
        `${base}/hero/hero-02.svg`,
        "Serian Hot Air Brush — front angle showing the styling barrel",
        1200,
        1200,
      ),
      image(
        `${base}/hero/hero-side.png`,
        `${base}/hero/hero-01.svg`,
        "Serian Hot Air Brush — side profile with ergonomic handle",
        1200,
        1200,
      ),
      image(
        `${base}/hero/hero-back.png`,
        `${base}/hero/hero-02.svg`,
        "Serian Hot Air Brush — rear view showing cord exit and controls",
        1200,
        1200,
      ),
      image(
        `${base}/hero/hero-detail.png`,
        `${base}/hero/hero-04.svg`,
        "Close-up of heat and airflow controls on the Serian Hot Air Brush",
        1200,
        1200,
      ),
    ],
  },
  narrative: [
    {
      id: "the-shape",
      image: image(
        `${base}/features/ceramic-barrel.png`,
        `${base}/features/feature-barrel.svg`,
        "The oval ceramic barrel — shaped to guide hair rather than fight it",
        1024,
        1024,
      ),
    },
    {
      id: "the-control",
      image: image(
        `${base}/features/heat-control.png`,
        `${base}/features/feature-controls.svg`,
        "Three-position heat and airflow control on the handle",
        1024,
        1024,
      ),
    },
    {
      id: "the-balance",
      image: image(
        `${base}/features/lightweight.png`,
        `${base}/features/feature-lightweight.svg`,
        "The brush held in one hand — balanced toward the handle for everyday use",
        1024,
        1024,
      ),
    },
    {
      id: "the-finish",
      image: image(
        `${base}/features/cool-shot.png`,
        `${base}/features/feature-barrel.svg`,
        "Heat-insulated tip for guiding the brush close to the scalp",
        1024,
        1024,
      ),
    },
    {
      id: "the-detail",
      image: image(
        `${base}/features/oval-design.png`,
        `${base}/features/feature-lightweight.svg`,
        "Cord exit and swivel base — designed to follow your movement",
        1024,
        1024,
      ),
    },
  ],
  demo: {
    enabled: true,
    eyebrow: "PRODUCT DEMO",
    headline: "See it in action",
    description:
      "Watch how the Serian Hot Air Brush dries and shapes each section in one continuous motion.",
    video: video(
      `${base}/videos/demo.mp4`,
      `${base}/videos/demo-poster.png`,
      `${base}/videos/demo-poster.svg`,
      "Product demonstration video showing the hot air brush styling workflow",
      1280,
      720,
    ),
    highlights: [
      {
        id: "continuous-pass",
        label: "One continuous pass",
        icon: "/images/demo/demo-airflow.svg",
      },
      {
        id: "root-to-tip",
        label: "Smooth from root to tip",
        icon: "/images/demo/demo-smooth.svg",
      },
      {
        id: "natural-finish",
        label: "Shiny, natural finish",
        icon: "/images/demo/demo-finish.svg",
      },
    ],
  },
  ugc: {
    enabled: true,
    headline: "Real mornings, real results",
    subheadline: "Short clips from customers using the brush in their daily routine",
    items: [
      {
        id: "ugc-morning",
        title: "Morning routine",
        caption: "5-minute blowout before work",
        style: "morning-routine",
        video: video(
          `${base}/videos/ugc-morning-routine.mp4`,
          `${base}/videos/ugc-morning-routine-poster.png`,
          `${base}/videos/ugc-01-poster.svg`,
          "Customer morning routine using the hot air brush",
          720,
          1280,
        ),
      },
      {
        id: "ugc-before-after",
        title: "Before / after",
        caption: "Same section, one pass",
        style: "before-after",
        video: video(
          `${base}/videos/ugc-before-after.mp4`,
          `${base}/videos/ugc-before-after-poster.png`,
          `${base}/videos/ugc-02-poster.svg`,
          "Before and after comparison from a customer video",
          720,
          1280,
        ),
      },
      {
        id: "ugc-results",
        title: "Volume at the root",
        caption: "Oval barrel lift without extra tools",
        style: "demo",
        video: video(
          `${base}/videos/ugc-review.mp4`,
          `${base}/videos/ugc-review-poster.png`,
          `${base}/videos/ugc-03-poster.svg`,
          "Customer demo showing root volume with the hot air brush",
          720,
          1280,
        ),
      },
    ],
  },
  assets: {
    packaging: image(
      `${base}/packaging/packaging.png`,
      `${base}/packaging/packaging.svg`,
      "Serian Hot Air Brush retail box",
      1024,
      1024,
    ),
    og: image(
      `${base}/hero/hero-main.png`,
      `${base}/hero/hero-01.svg`,
      "Serian Hot Air Brush product photo",
      1200,
      1200,
    ),
  },
};

/** Extended registry including lifestyle assets for future pages. */
export const productMediaRegistry = {
  mediaKit,
  lifestyle: lifestyleMedia,
} as const;

/** Convenience accessors for narrative sections that reference single assets. */
export const media = {
  hero: mediaKit.hero.images[mediaKit.hero.primaryIndex ?? 0],
  narrativeShape: mediaKit.narrative[0].image!,
  narrativeControl: mediaKit.narrative[1].image!,
  narrativeBalance: mediaKit.narrative[2].image!,
} as const;
