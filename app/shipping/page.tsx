import { notFound } from "next/navigation";

import { PolicyPage } from "@/components/pages";
import { getPolicyBySlug } from "@/lib/content";

export default function ShippingRoute() {
  const policy = getPolicyBySlug("shipping");

  if (!policy) {
    notFound();
  }

  return <PolicyPage content={policy} />;
}
