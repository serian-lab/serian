import type { ReviewsSection } from "@/types/content";

export const reviews: ReviewsSection = {
  id: "reviews",
  headline: "What customers mention most",
  enabled: true,
  summary: {
    averageRating: 4.6,
    totalCount: 128,
  },
  reviews: [
    {
      id: "review_001",
      author: "Michelle T.",
      rating: 5,
      content:
        "I bought this to cut down on morning steps. Drying and brushing at the same time actually works — my hair looks smoother than when I used my old dryer alone.",
      date: "2026-03-12",
      verified: true,
    },
    {
      id: "review_002",
      author: "Jordan R.",
      rating: 4,
      content:
        "Took one or two tries to get the section size right, but once I did, it was straightforward. The medium setting is enough for my shoulder-length hair.",
      date: "2026-02-28",
      verified: true,
    },
    {
      id: "review_003",
      author: "Priya K.",
      rating: 5,
      content:
        "The handle is lighter than my previous hot brush. I can finish the back of my head without feeling like I need a break halfway through.",
      date: "2026-04-02",
      verified: true,
    },
    {
      id: "review_004",
      author: "Alex M.",
      rating: 4,
      content:
        "Does what it says — one tool instead of two. I still use a little product for frizz, but the overall shape comes out more consistent than before.",
      date: "2026-01-19",
      verified: true,
    },
    {
      id: "review_005",
      author: "Samantha L.",
      rating: 5,
      content:
        "My daughter borrowed it once and now I have to hide it in the bathroom drawer. Easy enough that she figured it out without instructions.",
      date: "2026-03-30",
      verified: false,
    },
  ],
};
