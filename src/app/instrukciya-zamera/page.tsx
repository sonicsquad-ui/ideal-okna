import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Ruler,
  DoorOpen,
  ArrowLeftRight,
  Notebook,
  Camera,
  PenTool,
  AlertTriangle,
  Info,
  Wrench,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Инструкция по самостоятельному замеру москитной сетки",
  description:
    "Пошаговая инструкция по замеру москитной сетки самостоятельно: подготовка инструментов, замер ширины и высоты по штапику, нюансы для поворотно-откидных створок. Когда нужен специалист.",
  alternates: { canonical: "/instrukciya-zamera" },
};

const STEPS = [
  {
    icon: Wrench,
    title: "Подготовка инструментов",
    text: "Понадобится металлическая рулетка (не тканевая!), лист бумаги, ручка и телефон для фото. Тканевая рулетка даёт погрешность — она не подходит для точного замера.",
    hint: "Точность замера — до миллиметра",
  },
  {
    icon: DoorOpen,
    title: "Откройте створку окна",
    text: "Откройте створку, на которую будет устанавливаться сетка. Осмотрите штапик — это узкая пластиковая или деревянная планка, которая удерживает стеклопакет. Замер делается именно по световому проёму, ограниченному штапиком.",
    hint: "Световой проём = пространство между штапиками",
  },
  {
    icon: ArrowLeftRight,
    title: "Замер ширины (в 3 местах)",
    text: "Измерьте ширину светового проёма по штапику в трёх местах: сверху, посередине и снизу. Рулетку прикладывайте строго горизонтально, параллельно полу.",
    hint: "Ширина: верх / середина / низ",
  },
  {
    icon: Ruler,
    title: "Замер высоты (в 3 местах)",
    text: "Аналогично измерьте высоту светового проёма в трёх местах: слева, по центру и справа. Рулетка должна быть строго вертикально.",
    hint: "Высота: слева / центр / справа",
  },
  {
    icon: Notebook,
    title: "Запишите наименьшие значения",
    text: "Из трёх замеров ширины выберите наименьший, из трёх замеров высоты — тоже наименьший. Именно эти значения нужны для изготовления сетки. Запишите результат в формате Ш × В.",
    hint: "Берём минимум, а не среднее",
  },
  {
    icon: Camera,
    title: "Сфотографируйте профиль и крепления",
    text: "Сделайте 2-3 фото: профиль створки крупным планом (чтобы был виден тип пластика и штапик), существующие крепления (если есть старая сетка) и общий план окна. Это поможет мастеру подобрать правильный крепёж.",
    hint: "Фото облегчат подбор крепежа",
  },
];

const NUANCES = [
  {
    title: "Тип профиля створки",
    text: "Обратите внимание на ширину и форму штапика. От этого зависит выбор уплотнителя и тип крепления. Замерьте ширину штапика отдельно — это поможет мастеру.",
  },
  {
    title: "Старые крепления",
    text: "Если раньше уже стояла москитная сетка, проверьте: остались ли Z-крепления (2 сверху, 2 снизу) или отверстия от плунжеров. Если есть — сфотографируйте и сообщите мастеру.",
  },
  {
    title: "Поворотно-откидные створки",
    text: "Для поворотно-откидных створок (с двумя режимами открывания) замер делается по световому проёму как обычно, но требуется усиленная рама с перемычкой жёсткости при ширине более 80 см.",
  },
  {
    title: "Нестандартные формы",
    text: "Для арочных, трапециевидных и круглых проёмов самостоятельный замер не подходит — нужен шаблон. Вызовите бесплатного замерщика.",
  },
];

export default function InstrukciyaZameraPage() {
  return (
    <>
      <PageHero
        eyebrow="Инструкция"
        title="Как самостоятельно замерить москитную сетку"
        description="Пошаговое руководство для рамочных москитных сеток на окна ПВХ. Точный замер — залог идеальной посадки. Если сомневаетесь — закажите бесплатный выезд мастера."
        breadcrumb={
          <Breadcrumbs
            items={[{ title: "Инструкция по замеру" }]}
            className="text-primary-foreground/70"
          />
        }
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/uslugi/zamer">
              <Ruler className="size-4" /> Заказать бесплатный замер
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <Link href="/ceny">Цены на москитные сетки</Link>
          </Button>
        </div>
      </PageHero>

      {/* Пошаговая инструкция */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeading
            align="left"
            eyebrow="Шаги"
            title="Пошаговая инструкция замера"
            description="Шесть простых шагов для точного самостоятельного замера рамочной москитной сетки. Время — 5-10 минут на одно окно."
          />

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <Card key={s.title} className="relative flex flex-col p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon className="size-6 text-accent" />
                </div>
                <h3 className="font-semibold leading-tight">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.text}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                  <PenTool className="size-3" />
                  {s.hint}
                </div>
              </Card>
            ))}
          </ol>
        </div>
      </section>

      {/* Визуальная схема замера */}
      <section className="border-t bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Схема"
            title="Схема замера светового проёма"
            description="Замер делается по световому проёму — пространству между штапиками окна. Не по раме створки и не по внешней раме окна."
          />

          <Card className="mt-8 overflow-hidden p-6 sm:p-10">
            <div className="mx-auto max-w-md">
              {/* Стилизованная схема окна с размерами */}
              <div className="relative">
                {/* Внешняя рама окна */}
                <div className="relative mx-auto aspect-[3/4] rounded-md border-4 border-primary bg-secondary p-4">
                  {/* Штапик — пунктирная внутренняя рамка */}
                  <div className="relative h-full w-full border-2 border-dashed border-accent">
                    {/* Световой проём */}
                    <div className="absolute inset-1 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
                      <span className="rounded-md bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                        Световой проём
                      </span>
                    </div>

                    {/* Стрелка ширины — сверху */}
                    <div className="absolute -top-7 left-0 right-0 flex items-center">
                      <div className="relative h-px flex-1 bg-accent">
                        <span className="absolute -left-2 -top-1 size-2 rotate-45 border-b-2 border-l-2 border-accent" />
                        <span className="absolute -right-2 -top-1 size-2 rotate-45 border-t-2 border-r-2 border-accent" />
                      </div>
                    </div>
                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                      Ширина (min)
                    </span>

                    {/* Стрелка высоты — слева */}
                    <div className="absolute -left-7 top-0 bottom-0 flex flex-col items-center justify-center">
                      <div className="relative w-px flex-1 bg-accent">
                        <span className="absolute -top-2 -left-1 size-2 rotate-45 border-l-2 border-t-2 border-accent" />
                        <span className="absolute -bottom-2 -left-1 size-2 rotate-45 border-r-2 border-b-2 border-accent" />
                      </div>
                    </div>
                    <span className="absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                      Высота (min)
                    </span>

                    {/* Точки замеров ширины */}
                    <span className="absolute -top-3 left-[15%] size-1.5 rounded-full bg-primary ring-2 ring-primary/30" />
                    <span className="absolute -top-3 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary ring-2 ring-primary/30" />
                    <span className="absolute -top-3 right-[15%] size-1.5 rounded-full bg-primary ring-2 ring-primary/30" />

                    {/* Точки замеров высоты */}
                    <span className="absolute -left-3 top-[15%] size-1.5 rounded-full bg-primary ring-2 ring-primary/30" />
                    <span className="absolute -left-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary ring-2 ring-primary/30" />
                    <span className="absolute -left-3 bottom-[15%] size-1.5 rounded-full bg-primary ring-2 ring-primary/30" />
                  </div>
                </div>

                {/* Подпись штапика */}
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-block h-2 w-6 border-2 border-dashed border-accent" />
                  — штапик (по нему делается замер)
                </div>
              </div>

              <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-lg border bg-card p-3">
                  <span className="font-semibold text-primary">Ширина</span>
                  <p className="mt-1 text-muted-foreground">
                    3 замера: по верху, середине и низу проёма. Берём наименьший.
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <span className="font-semibold text-primary">Высота</span>
                  <p className="mt-1 text-muted-foreground">
                    3 замера: слева, по центру и справа. Берём наименьший.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Нюансы замера */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            align="left"
            eyebrow="Нюансы"
            title="Нюансы замера"
            description="Четыре важных момента, на которые стоит обратить внимание при самостоятельном замере."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {NUANCES.map((n) => (
              <Card key={n.title} className="flex gap-4 p-5">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold leading-tight">{n.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{n.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Когда нужен специалист */}
      <section className="border-t bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <Card className="relative overflow-hidden border-0 bg-primary p-8 text-primary-foreground sm:p-10">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Info className="size-3.5" />
                  Когда нужен специалист
                </div>
                <h2 className="text-balance text-2xl font-bold sm:text-3xl">
                  В этих случаях вызывайте замерщика бесплатно
                </h2>
                <ul className="mt-4 space-y-1.5 text-primary-foreground/85">
                  <li>• Нестандартные формы — арки, трапеции, круглые проёмы</li>
                  <li>• Раздвижные системы для балконов Provedal и Slidors</li>
                  <li>• Сетки плиссе на широкие порталы от 2 м</li>
                  <li>• Рулонные и мансардные системы со сложной фурнитурой</li>
                  <li>• Если сомневаетесь в точности собственных замеров</li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/uslugi/zamer">
                    <Ruler className="size-4" /> Заказать замер <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="/kalkulyator">Калькулятор стоимости</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Не уверены в своём замере?"
        text="Вызовите бесплатного замерщика по Орлу — приедем в день обращения, привезём образцы полотен и фурнитуры, рассчитаем точную стоимость на месте."
      />
    </>
  );
}
