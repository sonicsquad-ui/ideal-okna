import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Calculator } from "@/components/blocks/calculator";
import { CtaBanner } from "@/components/site/cta-banner";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Timer, Truck, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Калькулятор стоимости москитных сеток в Орле — онлайн расчёт",
  description:
    "Рассчитайте стоимость москитной сетки онлайн: тип конструкции, полотно, размеры и количество. Точная цена за 30 секунд. Бесплатный замер и монтаж в Орле от ИДЕАЛ.",
  alternates: { canonical: "/kalkulyator" },
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Калькулятор"
        title="Калькулятор стоимости москитных сеток"
        description="Рассчитайте предварительную стоимость за 30 секунд. Выберите тип конструкции, полотно и размеры — получите цену мгновенно."
        breadcrumb={
          <Breadcrumbs items={[{ title: "Калькулятор" }]} className="text-primary-foreground/70" />
        }
      />

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <Calculator />
        </div>
      </section>

      {/* Преимущества заказа */}
      <section className="border-t bg-secondary/40 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            align="left"
            eyebrow="Почему мы"
            title="Что вы получаете при заказе"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Ruler, title: "Бесплатный замер", text: "Выезд по Орлу в день обращения" },
              { icon: Timer, title: "Изготовление 1-2 дня", text: "Стандартные модели быстро" },
              { icon: Truck, title: "Доставка и монтаж", text: "Привезём и установим под ключ" },
              { icon: ShieldCheck, title: "Гарантия 2 года", text: "На изделие и монтаж" },
            ].map((b) => (
              <Card key={b.title} className="p-5">
                <b.icon className="mb-3 size-7 text-accent" />
                <div className="font-semibold">{b.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Не нашли свой вариант в калькуляторе?"
        text="Позвоните — рассчитаем индивидуально, поможем с выбором и подберём оптимальное решение под ваш проём и бюджет."
      />
    </>
  );
}
