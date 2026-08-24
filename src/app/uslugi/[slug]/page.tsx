import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetailPage } from "@/components/site/catalog-detail-page";
import { SERVICES } from "@/lib/site-data";

export function generateStaticParams() {
  return SERVICES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = SERVICES.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} в Орле`,
    description: item.excerpt,
    alternates: { canonical: `/uslugi/${slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = SERVICES.find((c) => c.slug === slug);
  if (!item) notFound();
  const related = SERVICES.filter((c) => c.slug !== slug).slice(0, 3);
  return (
    <CatalogDetailPage
      item={item}
      category="Услуги"
      basePath="/uslugi"
      categoryHref="/uslugi"
      categoryLabel="Услуги"
      related={related}
      schemaType="Service"
    />
  );
}
