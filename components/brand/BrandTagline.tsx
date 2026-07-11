import { Text } from "@/components/ui";
import { cn } from "@/lib/utils";

type BrandTaglineProps = {
  tagline: string;
  className?: string;
};

/** Displays the brand tagline with consistent typography. */
export function BrandTagline({ tagline, className }: BrandTaglineProps) {
  return (
    <Text variant="caption" className={cn("brand-tagline", className)}>
      {tagline}
    </Text>
  );
}
