"use client";

import { Container, Heading, Section, Text } from "@/components/ui";
import {
  ProductMedia,
  ProductVideo,
  posterToImageAsset,
} from "@/components/product/shared";
import { useDemoReveal } from "@/hooks/useDemoReveal";
import type { DemoVideoMedia, VideoMediaAsset } from "@/types/content";

type DemoVideoSectionProps = {
  content: DemoVideoMedia;
};

type VideoWithPosterFallback = VideoMediaAsset & { posterFallbackSrc?: string };

/** Editorial product evidence frame — header, 16:9 media, value highlights. */
export function DemoVideoSection({ content }: DemoVideoSectionProps) {
  useDemoReveal();

  if (!content.enabled) {
    return null;
  }

  const video = content.video as VideoWithPosterFallback | undefined;
  const hasPlayableVideo = Boolean(video?.src);
  const highlights = content.highlights ?? [];
  const posterAsset = video
    ? posterToImageAsset(
        video.poster,
        video.alt,
        video.width,
        video.height,
        video.posterFallbackSrc,
      )
    : null;

  return (
    <Section
      id="demo-video"
      aria-label="Product demonstration"
      className="product-section product-section--narrative product-demo-section"
    >
      <Container width="wide">
        <div className="product-demo">
          <div className="product-demo__frame">
            <div className="product-demo__header">
              <div className="product-demo__heading">
                {content.eyebrow ? (
                  <Text as="p" variant="label" className="product-demo__eyebrow">
                    {content.eyebrow}
                  </Text>
                ) : null}
                <Heading level={2} variant="heading" className="product-demo__headline">
                  {content.headline}
                </Heading>
              </div>

              {content.description ? (
                <Text className="product-demo__description ui-text--lead">
                  {content.description}
                </Text>
              ) : null}
            </div>

            {hasPlayableVideo && video ? (
              <div className="product-demo__media">
                <ProductVideo asset={video} variant="demo" />
              </div>
            ) : posterAsset ? (
              <div className="product-demo__media product-demo__media--static">
                <ProductMedia asset={posterAsset} variant="poster" />
              </div>
            ) : null}

            {highlights.length > 0 ? (
              <ul className="product-demo__highlights">
                {highlights.map((item) => (
                  <li key={item.id} className="product-demo__highlight">
                    {item.icon ? (
                      // Local SVG placeholders — path-driven for future asset swap.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.icon}
                        alt=""
                        width={26}
                        height={26}
                        className="product-demo__highlight-icon"
                      />
                    ) : null}
                    <span className="product-demo__highlight-label">{item.label}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
