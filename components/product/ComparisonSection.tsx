import { Card, Container, Section, Stack } from "@/components/ui";
import { ProductSectionHeader } from "@/components/product/shared";
import type { ComparisonSection as ComparisonSectionContent } from "@/types/content";

type ComparisonSectionProps = {
  content: ComparisonSectionContent;
};

/** Compares the product against alternatives as evidence. */
export function ComparisonSection({ content }: ComparisonSectionProps) {
  if (!content.enabled) {
    return null;
  }

  return (
    <Section
      id={content.id}
      aria-label="Comparison"
      className="product-section product-section--specification"
    >
      <Container width="content">
        <Stack gap="xl">
          <ProductSectionHeader headline={content.headline} />
          <Card className="product-comparison product-comparison--specification">
            <table>
              <thead>
                <tr>
                  <th scope="col">Aspect</th>
                  <th scope="col">Product</th>
                  <th scope="col">Alternative</th>
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row) => (
                  <tr key={row.aspect}>
                    <th scope="row">{row.aspect}</th>
                    <td>{row.product}</td>
                    <td>{row.alternative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
}
