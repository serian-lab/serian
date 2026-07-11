import Link from "next/link";

import { SupportCard, TrustBanner } from "@/components/brand";
import { Card, Container, Heading, Section, Stack, Text } from "@/components/ui";
import { contactPage } from "@/content/global/contact";
import type { ContactContent } from "@/types/content";

type ContactPageProps = {
  contact: ContactContent;
};

/** DTC support center — contact information and helpful guides. */
export function ContactPage({ contact }: ContactPageProps) {
  return (
    <Section aria-label="Contact" className="brand-page">
      <Container width="reading">
        <Stack gap="2xl">
          <Stack gap="md" className="brand-page__intro">
            <Heading level={1}>{contactPage.title}</Heading>
            <Text className="brand-page__lead">{contactPage.introduction}</Text>
            <TrustBanner variant="badges" />
          </Stack>

          <div id="support" className="brand-contact-grid">
            <Card className="brand-contact-card">
              <Stack gap="md">
                <Heading level={2} variant="heading">
                  Reach us directly
                </Heading>
                <Stack gap="sm">
                  <Text variant="caption">
                    Email:{" "}
                    <Link href={`mailto:${contact.email}`} className="brand-link">
                      {contact.email}
                    </Link>
                  </Text>
                  <Text variant="caption">Location: {contactPage.location}</Text>
                  <Text variant="caption">Hours: {contactPage.businessHours}</Text>
                  <Text variant="caption">{contactPage.responseTime}</Text>
                </Stack>
              </Stack>
            </Card>

            {contactPage.supportSections.map((section) => (
              <SupportCard
                key={section.title}
                title={section.title}
                description={section.description}
              />
            ))}
          </div>

          <Stack gap="lg">
            <Heading level={2} variant="heading">
              Helpful guides
            </Heading>
            <div className="brand-contact-grid">
              {contactPage.quickLinks.map((link) => (
                <SupportCard
                  key={link.id}
                  title={link.label}
                  description={link.description}
                  href={link.href}
                  linkLabel={`View ${link.label.toLowerCase()}`}
                />
              ))}
            </div>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
