import { notFound } from "next/navigation";

import { PolicyPage } from "@/components/pages";
import { getPolicyBySlug } from "@/lib/content";

export default function RefundRoute() {
  const policy = getPolicyBySlug("refund");

  if (!policy) {
    notFound();
  }

  return <PolicyPage content={policy} />;
}
