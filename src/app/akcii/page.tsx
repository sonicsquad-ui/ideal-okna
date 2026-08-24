import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { LeadForm } from "@/components/site/lead-form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { Gift, CalendarClock, Percent, Tag, Bell, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Акции и скидки на москитные сетки в Орле",
  description:
    "Акции и спецпредложения на москитные сетки в Орле: скидки при заказе от 3 сеток, бесплатный замер, ремонт со скидкой для пенсионеров. Подпишитесь и не пропустите выгоды.",
  alternates: { canonical: "/akcii" },
};

// Фолбэк, если в БД нет активных акций
const FALLBACK_PROMOTIONS = [
  {
    id: "fb-1",
    title: "Скидка 15% при заказе от 3 сеток",
    description:
      "При заказе трёх и более москитных сеток на один адрес — скидка 15% на изготовление. Акция действует весь сезон 2026.",
    discount: "15%",
    validUntil: "31 декабря 2026",
    active: true,
    createdAt: new Date(),
  },
  {
    id: "fb-2",
    title: "Бесплатный замер по Орлу",
    description:
      "Выезд инженера-замерщика по всем районам Орла — бесплатно, без обязательств. Замер вечером и в субботу — по записи.",
    discount: "0 ₽",
    validUntil: "постоянно",
    active: true,
    createdAt: new Date(),
  },
  {
    id: "fb-3",
    title: "Ремонт со скидкой 20% для пенсионеров",
    description:
      "Перетяжка полотна, замена уголков и ручек для пенсионеров — со скидкой 20%. Достаточно предъявить пенсионное удостоверение.",
    discount: "20%",
    validUntil: "31 декабря 2026",
    active: true,
    createdAt: new Date(),
  },
];

export default async function AkciiPage() {
  let promotions: Array<{
    id: string;
    title: string;
    description: string;
    discount: string | null;
    validUntil: string | null;
    active: boolean;
    createdAt: Date;
  }> = [];

  try {
    promotions = await db.promotion.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // если БД недоступна — показываем фолбэк
    promotions = FALLBACK_PROMOTIONS;
  }

  if (promotions.length === 0) {
    promotions = FALLBACK_PROMOTIONS;
  }

  // Schema.org — структурированные данные об акциях
  const promoSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Акции и скидки ИДЕАЛ",
    itemListElement: promotions.map((p, i) => ({
      "@type": "Offer",
      position: i + 1,
      name: p.title,
      description: p.description,
      validThrough: p.validUntil || undefined,
      seller: { "@type": "Organization", name: "ИДЕАЛ" },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(promoSchema) }}
      />

      <PageHero
        eyebrow="Акции и скидки"
        title="Специальные предложения сезона 2026"
        description="Выгодные условия на изготовление и монтаж москитных сеток в Орле: скидки за объём, бесплатный замер, спецпредложения для пенсионеров. Подпишитесь, чтобы не пропустить новые акции."
        breadcrumb={
          <Breadcrumbs items={[{ title: "Акции" }]} className="text-primary-foreground/70" />
        }
      />

      {/* Список акций */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            align="left"
            eyebrow="Действующие акции"
            title="Текущие спецпредложения"
            description="Все акции действуют на сезон 2026 года. Скидки суммируются с постоянными предложениями — уточняйте детали у менеджера."
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {promotions.map((p) => {
              const isFree = p.discount === "0 ₽" || p.discount === "0%";
              const isPermanent = p.validUntil === "постоянно";
              return (
                <Card
                  key={p.id}
                  className="relative flex flex-col overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Бейдж скидки */}
                  <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-primary via-primary to-accent/60">
                    <div className="absolute inset-0 bg-grid opacity-15" />
                    {isFree ? (
                      <Gift className="size-14 text-primary-foreground drop-shadow" />
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl font-extrabold text-accent drop-shadow-sm">
                          {p.discount ? `-${p.discount}` : "Акция"}
                        </div>
                        <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
                          скидка
                        </div>
                      </div>
                    )}
                    <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground">
                      <Sparkles className="size-3" /> Активна
                    </Badge>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold leading-tight">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t pt-4 text-xs">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <Tag className="size-3.5 text-primary" />
                        {isFree ? "Бесплатно" : p.discount ? `Скидка ${p.discount}` : "Акция"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <CalendarClock className="size-3.5 text-primary" />
                        {isPermanent ? "Бессрочно" : `До ${p.validUntil}`}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-muted-foreground">
            <Percent className="mt-0.5 size-4 shrink-0 text-accent" />
            <p>
              Скидки по акциям суммируются с предложением «Бесплатный замер по Орлу». Для получения
              скидки назовите название акции менеджеру при оформлении заявки.
            </p>
          </div>
        </div>
      </section>

      {/* Подписка на акции */}
      <section className="border-t bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Подписка"
                title="Подпишитесь на акции и скидки"
                description="Первыми узнавайте о сезонных распродажах, спецпредложениях и закрытых акциях. Никакого спама — только выгодные предложения."
              />
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Bell className="size-4 text-accent" /> Уведомления о новых акциях первыми
                </li>
                <li className="flex items-center gap-2">
                  <Percent className="size-4 text-accent" /> Закрытые промокоды для подписчиков
                </li>
                <li className="flex items-center gap-2">
                  <CalendarClock className="size-4 text-accent" /> Напоминания о закрытии сезона
                </li>
              </ul>
            </div>

            <Card className="p-6 sm:p-8">
              <div className="mb-5">
                <h3 className="text-xl font-bold">Оставьте контакты</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Перезвоним в течение 15 минут в рабочее время и подберём актуальную акцию под
                  ваш заказ.
                </p>
              </div>
              <LeadForm
                type="promotion"
                source="Акции — подписка"
                submitLabel="Подписаться на акции"
                showComment={false}
              />
            </Card>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Готовы воспользоваться акцией?"
        text="Назовите менеджеру название акции при оформлении заявки — скидка будет применена автоматически. Бесплатный замер по Орлу и изготовление за 1-2 дня."
      />
    </>
  );
}
