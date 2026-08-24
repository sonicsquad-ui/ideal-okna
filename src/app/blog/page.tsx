import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, FileText, HelpCircle } from "lucide-react";
import { FAQ } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Блог — статьи о москитных сетках",
  description:
    "Полезные статьи и инструкции о москитных сетках: как выбрать, замерить, установить и ухаживать. Обзоры материалов и ответы на частые вопросы от производителя ИДЕАЛ в Орле.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 300;

const ALL_CATEGORIES = [
  "Инструкции",
  "Полезная информация",
  "Обзоры материалов",
  "FAQ",
];

function formatDate(iso: Date): string {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(iso);
  } catch {
    return "";
  }
}

function categoryColor(category: string): string {
  switch (category) {
    case "Инструкции":
      return "bg-emerald-100 text-emerald-900 border-emerald-200";
    case "Обзоры материалов":
      return "bg-amber-100 text-amber-900 border-amber-200";
    case "FAQ":
      return "bg-rose-100 text-rose-900 border-rose-200";
    default:
      return "bg-accent/15 text-accent border-accent/30";
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory =
    category && ALL_CATEGORIES.includes(category) ? category : null;

  const where = activeCategory
    ? { published: true, category: activeCategory }
    : { published: true };

  const posts = await db.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Подсчёт количества постов по категориям
  const categoryCounts = await Promise.all(
    ALL_CATEGORIES.map(async (c) => ({
      category: c,
      count: await db.blogPost.count({
        where: { published: true, category: c },
      }),
    }))
  );

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог ИДЕАЛ — москитные сетки в Орле",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ideal-okna57.ru"}/blog`,
    description:
      "Полезные статьи, инструкции и обзоры материалов о москитных сетках в Орле.",
    blogPost: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.createdAt.toISOString(),
      dateModified: p.updatedAt.toISOString(),
      articleSection: p.category,
      keywords: p.tags || "",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://ideal-okna57.ru"}/blog/${p.slug}`,
    })),
  };

  // Берём несколько популярных вопросов для боковой колонки
  const popularFaq = FAQ.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <PageHero
        eyebrow="Блог / Полезная информация"
        title="Блог о москитных сетках"
        description="Инструкции по замеру и установке, обзоры материалов, советы по выбору и уходу за москитными сетками в Орле от производителя ИДЕАЛ."
        breadcrumb={
          <Breadcrumbs
            items={[{ title: "Блог" }]}
            className="text-primary-foreground/70"
          />
        }
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          {/* Фильтр по категориям */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Link
              href="/blog"
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                !activeCategory
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
              )}
            >
              Все статьи
            </Link>
            {categoryCounts.map((c) => (
              <Link
                key={c.category}
                href={`/blog?category=${encodeURIComponent(c.category)}`}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  activeCategory === c.category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
                )}
              >
                {c.category}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs",
                    activeCategory === c.category
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {c.count}
                </span>
              </Link>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Список статей */}
            <div>
              {posts.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {posts.map((post) => (
                    <Card
                      key={post.id}
                      className="group flex h-full flex-col overflow-hidden transition-all hover:border-primary hover:shadow-md"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex h-full flex-col p-5"
                      >
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              "border",
                              categoryColor(post.category)
                            )}
                          >
                            {post.category}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="size-3" />
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold leading-snug group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                        {post.tags && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {post.tags
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean)
                              .slice(0, 3)
                              .map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                                >
                                  #{tag}
                                </span>
                              ))}
                          </div>
                        )}
                        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-accent">
                          Читать
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="flex flex-col items-center justify-center gap-3 p-12 text-center">
                  <FileText className="size-10 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold">
                    {activeCategory
                      ? `Пока нет статей в категории «${activeCategory}»`
                      : "Пока нет опубликованных статей"}
                  </h3>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Загляните позже или подпишитесь на обновления. А пока —
                    посмотрите другие категории или задайте вопрос напрямую.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/blog">Все статьи</Link>
                  </Button>
                </Card>
              )}
            </div>

            {/* Сайдбар: популярные вопросы */}
            <aside className="space-y-6">
              <Card className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <HelpCircle className="size-5 text-accent" />
                  <h2 className="font-semibold">Популярные вопросы</h2>
                </div>
                <ul className="space-y-3">
                  {popularFaq.map((item, i) => (
                    <li key={i}>
                      <Link
                        href="/#faq"
                        className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-primary"
                      >
                        <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                        <span className="font-medium text-foreground group-hover:text-primary">
                          {item.q}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                  <Link href="/#faq">Все вопросы FAQ</Link>
                </Button>
              </Card>

              <Card className="bg-primary p-5 text-primary-foreground">
                <h3 className="font-semibold">Нужна помощь с выбором?</h3>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Позвоните или закажите обратный звонок — поможем выбрать
                  тип сетки и полотно под ваш проём.
                </p>
                <div className="mt-4 space-y-2">
                  <Button asChild variant="secondary" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href="tel:+79536187596">Позвонить</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Link href="/kalkulyator">Рассчитать стоимость</Link>
                  </Button>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      {/* Полезные ссылки */}
      <section className="border-t bg-secondary/40 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            align="left"
            eyebrow="Полезное"
            title="Смотрите также"
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Инструкция по замеру",
                href: "/instrukciya-zamera",
                desc: "Как правильно замерить проём под москитную сетку",
              },
              {
                title: "Каталог конструкций",
                href: "/katalog/konstrukcii",
                desc: "Рамочные, раздвижные, рулонные, плиссе и другие",
              },
              {
                title: "Типы полотен",
                href: "/katalog/polotna",
                desc: "Fiberglass, антикошка, антипыльца, ультравью",
              },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-start gap-3 rounded-lg border bg-card p-4 transition-all hover:border-primary hover:shadow-sm"
              >
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-primary">
                    {l.title}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {l.desc}
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
