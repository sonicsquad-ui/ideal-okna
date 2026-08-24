import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetailPage } from "@/components/site/catalog-detail-page";
import { CONSTRUCTIONS } from "@/lib/site-data";

export function generateStaticParams() {
  return CONSTRUCTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = CONSTRUCTIONS.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} в Орле — цена ${item.priceFrom}`,
    description: item.excerpt,
    alternates: { canonical: `/katalog/konstrukcii/${slug}` },
    openGraph: {
      title: `${item.title} в Орле`,
      description: item.excerpt,
    },
  };
}

export default async function ConstructionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = CONSTRUCTIONS.find((c) => c.slug === slug);
  if (!item) notFound();

  const related = CONSTRUCTIONS.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <CatalogDetailPage
      item={item}
      category="Каталог конструкций"
      basePath="/katalog/konstrukcii"
      categoryHref="/katalog/konstrukcii"
      categoryLabel="Типы конструкций"
      related={related}
    />
  );
}
