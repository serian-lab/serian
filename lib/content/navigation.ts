import type { NavigationContent } from "@/types/content";

import { navigation } from "@/content/global/navigation";

/** Returns site navigation and brand content. */
export function getNavigation(): NavigationContent {
  return navigation;
}
