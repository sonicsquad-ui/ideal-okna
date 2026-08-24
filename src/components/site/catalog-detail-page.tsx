import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBanner } from "@/components/site/cta-banner";
import { LeadForm } from "@/components/site/lead-form";
import { SectionHeading } from "@/components/site/section-heading";
import { CatalogCard } from "@/components/site/catalog-card";
import type { CatalogItem } from "@/lib/site-data";
import * as Icons from "lucide-react";
import { CheckCircle2, ArrowLeft, ArrowRight, PhoneCall } from "lucide-react";
import { CallbackButton } from "@/components/site/callback-button";

export function CatalogDetailPage({
  item,
  category,
  basePath,
  categoryHref,
  categoryLabel,
  related,
  schemaType = "Product",
}: {
  item: CatalogItem;
  category: string;
  basePath: string;
  categoryHref: string;
  categoryLabel: string;
  related: CatalogItem[];
  schemaType?: "Product" | "Service";
}) {
  const Icon = (Icons[item.icon as keyof typeof Icons] as React.ComponentType<{
    className?: string;
  }>) ?? Icons.Square;

  const orgAddress = {
    "@type": "PostalAddress",
    streetAddress: "ул. Сурена-Шаумяна, 35",
    addressLocality: "Орёл",
    addressRegion: "Орловская область",
    addressCountry: "RU",
  };
  const orgPhone = "+7 953 618 75 96";
  const priceDigits = item.priceFrom?.replace(/[^\d]/g, "") || "0";

  // Schema.org: Product для каталога, Service для услуг
  const schema =
    schemaType === "Service"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          name: item.title,
          description: item.description,
          serviceType: categoryLabel,
          provider: {
            "@type": "Organization",
            name: "ИДЕАЛ",
            address: orgAddress,
            telephone: orgPhone,
          },
          areaServed: { "@type": "City", name: "Орёл" },
          offers: {
            "@type": "Offer",
            priceCurrency: "RUB",
            price: priceDigits,
            availability: "https://schema.org/InStock",
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Product",
          name: item.title,
          description: item.description,
          category: categoryLabel,
          brand: { "@type": "Brand", name: "ИДЕАЛ" },
          manufacturer: {
            "@type": "Organization",
            name: "ИДЕАЛ",
            address: orgAddress,
            telephone: orgPhone,
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "RUB",
            price: priceDigits,
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "ИДЕАЛ" },
          },
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHero
        eyebrow={category}
        title={item.title}
        description={item.excerpt}
        breadcrumb={
          <Breadcrumbs
            items={[
              { title: categoryLabel, href: categoryHref },
              { title: item.shortTitle || item.title },
            ]}
            className="text-primary-foreground/70"
          />
        }
      >
        <div className="mt-6 flex flex-wrap gap-3">
          {item.priceFrom && (
            <Badge className="bg-accent text-accent-foreground">
              Цена: {item.priceFrom}
            </Badge>
          )}
          <CallbackButton
            variant="secondary"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            source={`Кнопка на странице ${item.title}`}
          >
            <PhoneCall className="size-4" /> Заказать звонок
          </CallbackButton>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.6fr_1fr] lg:px-6">
          {/* Левая колонка — контент */}
          <div className="space-y-8">
            {/* Описание */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-14 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-8" />
                </span>
                <h2 className="text-2xl font-bold">Описание</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>

            {/* Характеристики */}
            {item.specs && item.specs.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Характеристики</h2>
                <Card className="overflow-hidden">
                  <div className="grid sm:grid-cols-2">
                    {item.specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`flex items-center justify-between gap-3 p-4 ${
                          i % 2 === 0 ? "sm:border-r" : ""
                        } ${i < item.specs!.length - 2 ? "border-b" : ""}`}
                      >
                        <span className="text-sm text-muted-foreground">{spec.label}</span>
                        <span className="text-right text-sm font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Преимущества / features */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Преимущества</h2>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {item.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 rounded-lg border bg-card p-3 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Применение */}
            {item.bestFor && item.bestFor.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Где применяется</h2>
                <div className="flex flex-wrap gap-2">
                  {item.bestFor.map((b) => (
                    <Badge key={b} variant="secondary" className="px-3 py-1.5 text-sm">
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Навигация назад */}
            <div className="flex items-center justify-between border-t pt-6">
              <Button asChild variant="ghost">
                <Link href={categoryHref}>
                  <ArrowLeft className="size-4" /> Все {categoryLabel.toLowerCase()}
                </Link>
              </Button>
              <Button asChild>
                <Link href="/kalkulyator">
                  Рассчитать стоимость <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Правая колонка — форма + цена */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <div className="mb-3 text-sm text-muted-foreground">Стоимость изделия:</div>
              <div className="text-3xl font-extrabold text-primary">{item.priceFrom}</div>
              {item.priceWithMount && (
                <div className="mt-2 text-sm text-muted-foreground">
                  С монтажом под ключ: <span className="font-semibold text-foreground">{item.priceWithMount}</span>
                </div>
              )}
              <div className="my-4 h-px bg-border" />
              <h3 className="mb-3 font-semibold">Заказать с бесплатным замером</h3>
              <LeadForm
                type="service"
                source={`Страница: ${item.title}`}
                submitLabel="Получить расчёт"
                showComment={false}
                compact
              />
            </Card>
            <Card className="bg-primary p-5 text-primary-foreground">
              <div className="text-sm text-primary-foreground/80">Позвоните нам:</div>
              <a
                href="tel:+79536187596"
                className="mt-1 block text-xl font-bold hover:text-accent"
              >
                +7 953 618 75 96
              </a>
              <div className="mt-2 text-xs text-primary-foreground/70">
                Пн-Пт: 9.00-19.00; Сб: 9.00-15.00
              </div>
            </Card>
          </aside>
        </div>
      </section>

      {/* Похожие */}
      {related.length > 0 && (
        <section className="border-t bg-secondary/40 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <SectionHeading align="left" eyebrow="Смотрите также" title="Похожие позиции" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((r) => (
                <CatalogCard key={r.slug} item={r} href={`${basePath}/${r.slug}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
