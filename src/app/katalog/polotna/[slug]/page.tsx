import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetailPage } from "@/components/site/catalog-detail-page";
import { CANVASES } from "@/lib/site-data";

export function generateStaticParams() {
  return CANVASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = CANVASES.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — полотно для москитной сетки в Орле`,
    description: item.excerpt,
    alternates: { canonical: `/katalog/polotna/${slug}` },
  };
}

export default async function CanvasDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = CANVASES.find((c) => c.slug === slug);
  if (!item) notFound();
  const related = CANVASES.filter((c) => c.slug !== slug).slice(0, 3);
  return (
    <CatalogDetailPage
      item={item}
      category="Каталог полотен"
      basePath="/katalog/polotna"
      categoryHref="/katalog/polotna"
      categoryLabel="Типы полотен"
      related={related}
    />
  );
}
