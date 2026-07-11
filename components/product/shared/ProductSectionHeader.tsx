import { Heading, Stack } from "@/components/ui";
import type { HeadingVariant } from "@/components/ui";
import { cn } from "@/lib/utils";

type SectionHeaderLevel = 1 | 2;

type ProductSectionHeaderProps = {
  headline: string;
  level?: SectionHeaderLevel;
  variant?: HeadingVariant;
  className?: string;
};

/** Reusable section headline with consistent reading-width constraint. */
export function ProductSectionHeader({
  headline,
  level = 2,
  variant = "heading",
  className,
}: ProductSectionHeaderProps) {
  return (
    <Stack gap="sm" className={cn("product-section-header", className)}>
      <Heading level={level} variant={variant}>
        {headline}
      </Heading>
    </Stack>
  );
}
