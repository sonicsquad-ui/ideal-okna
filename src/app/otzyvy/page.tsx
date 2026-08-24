import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { ReviewCard } from "@/components/blocks/review-card";
import { ReviewForm } from "@/components/blocks/review-form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Отзывы клиентов о москитных сетках в Орле",
  description:
    "Реальные отзывы клиентов компании ИДЕАЛ о москитных сетках в Орле. Оценки, комментарии, средний рейтинг. Оставьте свой отзыв об изготовлении и монтаже москитных сеток.",
  alternates: { canonical: "/otzyvy" },
};

export const revalidate = 60;

// Распределение оценок для сводной карточки
function buildDistribution(ratings: number[]) {
  const counts = [0, 0, 0, 0, 0]; // индекс 0 = 1 звезда
  for (const r of ratings) {
    if (r >= 1 && r <= 5) counts[r - 1]++;
  }
  const total = ratings.length || 1;
  // Сортируем от 5 к 1
  return [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: counts[star - 1],
    percent: Math.round((counts[star - 1] / total) * 100),
  }));
}

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

export default async function ReviewsPage() {
  const reviews = await db.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  const total = reviews.length;
  const average =
    total > 0
      ? Math.round(
          (reviews.reduce((s, r) => s + r.rating, 0) / total) * 10
        ) / 10
      : 5;
  const distribution = buildDistribution(reviews.map((r) => r.rating));

  // JSON-LD: AggregateRating + отдельные Review
  const aggregateSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Москитные сетки в Орле — ИДЕАЛ",
    description:
      "Изготовление и монтаж москитных сеток в Орле от производителя ИДЕАЛ.",
    brand: { "@type": "Brand", name: "ИДЕАЛ" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: average,
      bestRating: 5,
      worstRating: 1,
      ratingCount: total,
      reviewCount: total,
    },
    review: reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.createdAt.toISOString().split("T")[0],
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
      name: r.service || "Москитная сетка",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateSchema) }}
      />

      <PageHero
        eyebrow="Отзывы клиентов"
        title="Отзывы клиентов о москитных сетках в Орле"
        description="Реальные отзывы заказчиков компании ИДЕАЛ — о качестве изделий, сроках изготовления и качестве монтажа. Каждый отзыв проходит модерацию."
        breadcrumb={
          <Breadcrumbs
            items={[{ title: "Отзывы" }]}
            className="text-primary-foreground/70"
          />
        }
      />

      {/* Сводная карточка с рейтингом */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <Card className="overflow-hidden">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr]">
              {/* Средний рейтинг */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-primary/5 p-6 text-center">
                <div className="text-5xl font-extrabold text-primary">
                  {average.toFixed(1)}
                </div>
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < Math.round(average)
                          ? "size-5 fill-accent text-accent"
                          : "size-5 fill-muted text-muted"
                      }
                    />
                  ))}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  На основе {total}{" "}
                  {total === 1
                    ? "отзыва"
                    : total >= 2 && total <= 4
                    ? "отзывов"
                    : "отзывов"}
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge className="bg-accent text-accent-foreground">
                    <ShieldCheck className="mr-1 size-3.5" /> Проверенные отзывы
                  </Badge>
                </div>
              </div>

              {/* Распределение оценок */}
              <div className="space-y-2.5">
                <h2 className="mb-3 text-lg font-semibold">
                  Распределение оценок
                </h2>
                {distribution.map((d) => (
                  <div
                    key={d.star}
                    className="flex items-center gap-3"
                  >
                    <span className="flex w-16 shrink-0 items-center gap-1 text-sm font-medium">
                      {d.star}
                      <Star className="size-3.5 fill-accent text-accent" />
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-accent transition-all"
                        style={{ width: `${d.percent}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-sm text-muted-foreground">
                      {d.count}
                    </span>
                  </div>
                ))}
                <p className="pt-3 text-xs text-muted-foreground">
                  Отзывы собираются с сайта, а также у клиентов после завершения
                  работ. Все отзывы проходят модерацию.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Список отзывов */}
      {reviews.length > 0 ? (
        <section className="border-t bg-secondary/40 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <SectionHeading
              align="left"
              eyebrow={`Всего ${total} ${total === 1 ? "отзыв" : total <= 4 ? "отзыва" : "отзывов"}`}
              title="Что говорят наши клиенты"
              description="Свежие отзывы покупателей об изготовлении и монтаже москитных сеток в Орле и области."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 80} direction="up">
                  <ReviewCard
                    review={{
                      name: r.name,
                      city: r.city,
                      rating: r.rating,
                      text: r.text,
                      service: r.service || undefined,
                      date: formatDate(r.createdAt),
                    }}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t bg-secondary/40 py-12">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-6">
            <MessageSquare className="mx-auto size-10 text-muted-foreground/50" />
            <p className="mt-3 text-muted-foreground">
              Пока нет одобренных отзывов. Будьте первым — оставьте свой отзыв
              ниже!
            </p>
          </div>
        </section>
      )}

      {/* Форма отзыва */}
      <section id="add-review" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Оставить отзыв"
            title="Поделитесь своим опытом"
            description="Ваш отзыв поможет другим покупателям сделать выбор. После проверки модератором он появится на странице."
          />
          <Card className="mt-8 p-6 sm:p-8">
            <ReviewForm />
          </Card>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-accent" />
            Не публикуем персональные данные. Имя можно указать любое.
          </div>
        </div>
      </section>

      <CtaBanner
        title="Хотите такой же качественный результат?"
        text="Закажите бесплатный замер и расчёт стоимости москитных сеток в Орле. Изготовление за 1-2 дня, гарантия 2 года."
      />
    </>
  );
}
