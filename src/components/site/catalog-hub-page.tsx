import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { CatalogCard } from "@/components/site/catalog-card";
import { CtaBanner } from "@/components/site/cta-banner";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading } from "@/components/site/section-heading";
import type { CatalogItem } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export function CatalogHubPage({
  eyebrow,
  title,
  description,
  items,
  basePath,
  crossLinks,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: CatalogItem[];
  basePath: string;
  crossLinks?: { title: string; href: string; desc: string }[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumb={
          <Breadcrumbs items={[{ title: eyebrow }]} className="text-primary-foreground/70" />
        }
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <CatalogCard key={item.slug} item={item} href={`${basePath}/${item.slug}`} />
            ))}
          </div>
        </div>
      </section>

      {crossLinks && crossLinks.length > 0 && (
        <section className="border-t bg-secondary/40 py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <SectionHeading
              align="left"
              eyebrow="Смотрите также"
              title="Другие разделы каталога"
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {crossLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-start gap-3 rounded-lg border bg-card p-4 transition-all hover:border-primary hover:shadow-sm"
                >
                  <div className="flex-1">
                    <div className="font-semibold group-hover:text-primary">{link.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{link.desc}</div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
