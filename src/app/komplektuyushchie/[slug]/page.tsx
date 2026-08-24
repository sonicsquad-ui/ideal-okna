import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetailPage } from "@/components/site/catalog-detail-page";
import { COMPONENTS } from "@/lib/site-data";

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPONENTS.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} в Орле — цена ${item.priceFrom}`,
    description: item.excerpt,
    alternates: { canonical: `/komplektuyushchie/${slug}` },
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = COMPONENTS.find((c) => c.slug === slug);
  if (!item) notFound();
  const related = COMPONENTS.filter((c) => c.slug !== slug).slice(0, 3);
  return (
    <CatalogDetailPage
      item={item}
      category="Комплектующие"
      basePath="/komplektuyushchie"
      categoryHref="/komplektuyushchie"
      categoryLabel="Комплектующие"
      related={related}
    />
  );
}
