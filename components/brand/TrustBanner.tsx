import { globalTrustBadges } from "@/content/global/trust";
import { Text } from "@/components/ui";
import { cn } from "@/lib/utils";

import type { TrustBadgeItem } from "@/content/global/trust";

type TrustBannerProps = {
  items?: TrustBadgeItem[];
  message?: string;
  variant?: "badges" | "message" | "both";
  className?: string;
};

/** Site-wide trust language — badges and optional message. */
export function TrustBanner({
  items = globalTrustBadges,
  message,
  variant = "badges",
  className,
}: TrustBannerProps) {
  const showBadges = variant === "badges" || variant === "both";
  const showMessage = message && (variant === "message" || variant === "both");

  return (
    <div className={cn("brand-trust-banner", className)}>
      {showBadges && (
        <ul className="brand-trust-banner__badges" aria-label="Purchase guarantees">
          {items.map((item) => (
            <li key={item.id} className="brand-trust-banner__badge">
              <Text as="span" variant="label">
                {item.label}
              </Text>
            </li>
          ))}
        </ul>
      )}
      {showMessage && (
        <Text variant="caption" className="brand-trust-banner__message">
          {message}
        </Text>
      )}
    </div>
  );
}
