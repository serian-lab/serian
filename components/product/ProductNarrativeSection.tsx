import { Container, Heading, Section, Stack, Text } from "@/components/ui";
import { ProductMedia, ProductSectionHeader } from "@/components/product/shared";
import { cn } from "@/lib/utils";
import type {
  NarrativeChapterMediaRef,
  ProductNarrativeSection as ProductNarrativeSectionContent,
} from "@/types/content";

type ProductNarrativeSectionProps = {
  content: ProductNarrativeSectionContent;
  narrativeMedia?: NarrativeChapterMediaRef[];
};

function resolveChapterImage(
  chapterId: string,
  narrativeMedia: NarrativeChapterMediaRef[] | undefined,
  fallback?: ProductNarrativeSectionContent["chapters"][number]["image"],
) {
  return narrativeMedia?.find((item) => item.id === chapterId)?.image ?? fallback;
}

/** Editorial product narrative — one design decision per chapter. */
export function ProductNarrativeSection({
  content,
  narrativeMedia,
}: ProductNarrativeSectionProps) {
  return (
    <Section
      id={content.id}
      aria-label="A closer look"
      className="product-section product-narrative"
    >
      <Container width="content">
        <Stack gap="2xl">
          <header className="product-narrative__header">
            {content.eyebrow ? (
              <Text as="p" variant="label" className="product-narrative__eyebrow">
                {content.eyebrow}
              </Text>
            ) : null}
            <ProductSectionHeader headline={content.headline} />
            {content.introduction ? (
              <Text className="product-section-intro product-narrative__intro">
                {content.introduction}
              </Text>
            ) : null}
          </header>

          <div className="product-narrative__chapters">
            {content.chapters.map((chapter, index) => {
              const image = resolveChapterImage(chapter.id, narrativeMedia, chapter.image);
              const isReverse = index % 2 === 1;

              return (
                <article
                  key={chapter.id}
                  className={cn(
                    "product-narrative__chapter",
                    isReverse && "product-narrative__chapter--reverse",
                  )}
                >
                  <div className="product-narrative__chapter-inner">
                    {image ? (
                      <div className="product-narrative__media">
                        <ProductMedia asset={image} variant="narrative" />
                      </div>
                    ) : null}
                    <div className="product-narrative__content">
                      <header className="product-narrative__chapter-head">
                        <span className="product-narrative__index" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Heading level={3} variant="title" className="product-narrative__title">
                          {chapter.title}
                        </Heading>
                      </header>
                      <Text className="product-narrative__body">{chapter.body}</Text>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
