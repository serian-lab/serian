import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPage } from "@/components/product";
import { getAllProductSlugs, getProductBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { seo } = product;

  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    ...(seo.ogImage && {
      openGraph: {
        images: [{ url: seo.ogImage.src, alt: seo.ogImage.alt }],
      },
    }),
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
