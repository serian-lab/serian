import { getProductTrustBadges, globalTrustBadges } from "@/content/global/trust";
import { ProductTrustBadges } from "@/components/product/shared";
import type { PurchaseTrustConfig } from "@/types/content";

type PurchaseTrustProps = {
  trust?: PurchaseTrustConfig;
  className?: string;
};

function resolveTrustItems(trust?: PurchaseTrustConfig) {
  if (trust?.enabled === false) {
    return null;
  }

  if (trust?.badgeIds && trust.badgeIds.length > 0) {
    const idSet = new Set(trust.badgeIds);
    return globalTrustBadges.filter((badge) => idSet.has(badge.id));
  }

  return getProductTrustBadges();
}

/** Content-driven trust badges — hidden when trust.enabled is false. */
export function PurchaseTrust({ trust, className }: PurchaseTrustProps) {
  const items = resolveTrustItems(trust);

  if (!items || items.length === 0) {
    return null;
  }

  return <ProductTrustBadges items={items} className={className} />;
}
