import type { ContactContent } from "@/types/content";

import { contact } from "@/content/global/contact";

/** Returns site contact information. */
export function getContact(): ContactContent {
  return contact;
}
