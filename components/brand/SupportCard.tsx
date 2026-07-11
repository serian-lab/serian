import Link from "next/link";

import { Card, Heading, Stack, Text } from "@/components/ui";
import { cn } from "@/lib/utils";

type SupportCardProps = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  className?: string;
};

/** Reusable support information card for Contact and Help sections. */
export function SupportCard({
  title,
  description,
  href,
  linkLabel,
  className,
}: SupportCardProps) {
  return (
    <Card className={cn("brand-support-card", className)}>
      <Stack gap="sm">
        <Heading level={3} variant="title">
          {title}
        </Heading>
        <Text variant="caption">{description}</Text>
        {href && linkLabel && (
          <Text variant="label" className="brand-link">
            <Link href={href}>{linkLabel}</Link>
          </Text>
        )}
      </Stack>
    </Card>
  );
}
