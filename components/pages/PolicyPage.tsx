import { PolicyNavigation } from "@/components/brand";
import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { getFooter } from "@/lib/content";
import type { PolicyPageContent } from "@/types/content";

type PolicyPageProps = {
  content: PolicyPageContent;
};

/** Renders a trust policy page with navigation and readable sections. */
export function PolicyPage({ content }: PolicyPageProps) {
  const footer = getFooter();

  return (
    <Section aria-label={content.title} className="brand-page">
      <Container width="reading">
        <Stack gap="2xl">
          <Stack gap="md" className="brand-page__intro">
            <Heading level={1}>{content.title}</Heading>
            <Text variant="caption">Last updated: {content.lastUpdated}</Text>
            <PolicyNavigation links={footer.legalLinks} currentSlug={content.slug} />
          </Stack>

          <Stack gap="lg" className="brand-policy-sections">
            {content.sections.map((section) => (
              <Card key={section.title} variant="flat" className="brand-policy-section">
                <Stack gap="sm">
                  <Heading level={2} variant="title">
                    {section.title}
                  </Heading>
                  <Text variant="caption">{section.description}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
