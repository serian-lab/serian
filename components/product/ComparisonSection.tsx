"use client";

import { Container, Heading, Section, Text } from "@/components/ui";
import { ProductMedia } from "@/components/product/shared";
import { useComparisonReveal } from "@/hooks/useComparisonReveal";
import type {
  ComparisonRow,
  ComparisonSection as ComparisonSectionContent,
  MediaAsset,
} from "@/types/content";

type ComparisonSectionProps = {
  content: ComparisonSectionContent;
};

type MediaWithFallback = MediaAsset & { fallbackSrc?: string };

function ComparisonIcon({ name }: { name?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    className: "product-comparison__icon-svg",
  };

  switch (name) {
    case "tools":
      return (
        <svg {...common}>
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <path
            d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "learning":
      return (
        <svg {...common}>
          <path
            d="M4 14c2.5-3 5-4.5 8-4.5S17.5 11 20 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M4 18c2.5-3 5-4.5 8-4.5S17.5 15 20 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "repeat":
      return (
        <svg {...common}>
          <path
            d="M17 1v4h-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 23v-4h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.49 9A9 9 0 0 0 5.64 5.64L3 8m18 8-2.64 2.36A9 9 0 0 1 3.51 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "packing":
      return (
        <svg {...common}>
          <path
            d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="4"
            y="7"
            width="16"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5 10 17.5 19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SideLabel({
  label,
  sublabel,
  emphasized = false,
}: {
  label: string;
  sublabel?: string;
  emphasized?: boolean;
}) {
  return (
    <span
      className={
        emphasized
          ? "product-comparison__side-label product-comparison__side-label--product"
          : "product-comparison__side-label"
      }
    >
      <span className="product-comparison__side-label-primary">{label}</span>
      {sublabel ? (
        <span className="product-comparison__side-label-secondary">{sublabel}</span>
      ) : null}
    </span>
  );
}

function ValueCell({
  value,
  tone,
  columnLabel,
}: {
  value: string;
  tone: "product" | "alternative";
  columnLabel: string;
}) {
  return (
    <div className={`product-comparison__value product-comparison__value--${tone}`}>
      <span className="product-comparison__mobile-col-label">{columnLabel}</span>
      <span className="product-comparison__value-row">
        <span
          className={
            tone === "product"
              ? "product-comparison__status product-comparison__status--check"
              : "product-comparison__status product-comparison__status--minus"
          }
          aria-hidden="true"
        >
          {tone === "product" ? <CheckGlyph /> : <MinusGlyph />}
        </span>
        <span className="product-comparison__value-text">{value}</span>
      </span>
    </div>
  );
}

function AspectCell({ row }: { row: ComparisonRow }) {
  return (
    <div className="product-comparison__aspect">
      <span className="product-comparison__aspect-icon" aria-hidden="true">
        <ComparisonIcon name={row.icon} />
      </span>
      <span className="product-comparison__aspect-copy">
        <span className="product-comparison__aspect-label">{row.label}</span>
        {row.helper ? (
          <span className="product-comparison__aspect-helper">{row.helper}</span>
        ) : null}
      </span>
    </div>
  );
}

/** Wide decision panel — product vs one common alternative workflow. */
export function ComparisonSection({ content }: ComparisonSectionProps) {
  useComparisonReveal();

  if (!content.enabled) {
    return null;
  }

  const productColumnLabel = [content.product.label, content.product.sublabel]
    .filter(Boolean)
    .join(" ");
  const alternativeColumnLabel = [content.alternative.label, content.alternative.sublabel]
    .filter(Boolean)
    .join(" ");
  const headerImage = content.product.image as MediaWithFallback | undefined;
  const caption = `${content.headline}. Comparing ${productColumnLabel} with ${alternativeColumnLabel}.`;

  return (
    <Section
      id={content.id}
      aria-label="Comparison"
      className="product-section product-section--specification product-comparison-section"
    >
      <Container width="wide">
        <div className="product-comparison">
          <header
            className={`product-comparison__header${
              headerImage ? " product-comparison__header--with-media" : ""
            }`}
          >
            <div className="product-comparison__intro">
              {content.eyebrow ? (
                <Text as="p" variant="label" className="product-comparison__eyebrow">
                  {content.eyebrow}
                </Text>
              ) : null}
              <Heading level={2} variant="heading" className="product-comparison__headline">
                {content.headline}
              </Heading>
              {content.description ? (
                <Text className="product-comparison__description">{content.description}</Text>
              ) : null}
            </div>

            {headerImage ? (
              <div className="product-comparison__media">
                <ProductMedia asset={headerImage} variant="feature" />
              </div>
            ) : null}
          </header>

          <div className="product-comparison__panel">
            <table className="product-comparison__table">
              <caption className="product-comparison__caption">{caption}</caption>
              <colgroup>
                <col className="product-comparison__aspect-column" />
                <col className="product-comparison__product-column" />
                <col className="product-comparison__alternative-column" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="product-comparison__th product-comparison__th--aspect">
                    Why it matters
                  </th>
                  <th
                    scope="col"
                    className="product-comparison__th product-comparison__th--product"
                  >
                    <SideLabel
                      label={content.product.label}
                      sublabel={content.product.sublabel}
                      emphasized
                    />
                  </th>
                  <th
                    scope="col"
                    className="product-comparison__th product-comparison__th--alternative"
                  >
                    <SideLabel
                      label={content.alternative.label}
                      sublabel={content.alternative.sublabel}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row) => (
                  <tr key={row.id} className="product-comparison__row">
                    <th scope="row" className="product-comparison__cell product-comparison__cell--aspect">
                      <AspectCell row={row} />
                    </th>
                    <td className="product-comparison__cell product-comparison__cell--product">
                      <ValueCell
                        value={row.productValue}
                        tone="product"
                        columnLabel={productColumnLabel}
                      />
                    </td>
                    <td className="product-comparison__cell product-comparison__cell--alternative">
                      <ValueCell
                        value={row.alternativeValue}
                        tone="alternative"
                        columnLabel={alternativeColumnLabel}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {content.note ? (
              <p className="product-comparison__note">
                <span className="product-comparison__note-marker" aria-hidden="true" />
                <span>{content.note}</span>
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
