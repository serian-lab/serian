import { notFound } from "next/navigation";

import { PolicyPage } from "@/components/pages";
import { getPolicyBySlug } from "@/lib/content";

export default function PrivacyRoute() {
  const policy = getPolicyBySlug("privacy");

  if (!policy) {
    notFound();
  }

  return <PolicyPage content={policy} />;
}
