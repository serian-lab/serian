import { notFound } from "next/navigation";

import { PolicyPage } from "@/components/pages";
import { getPolicyBySlug } from "@/lib/content";

export default function TermsRoute() {
  const policy = getPolicyBySlug("terms");

  if (!policy) {
    notFound();
  }

  return <PolicyPage content={policy} />;
}
