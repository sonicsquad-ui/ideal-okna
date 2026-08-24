import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { CallbackButton } from "@/components/site/callback-button";
import { GalleryBlock } from "@/components/blocks/gallery-block";
import { Card } from "@/components/ui/card";
import { Camera, Ruler, ShieldCheck, Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "Фотогалерея работ — москитные сетки в Орле",
  description:
    "Фотогалерея установленных москитных сеток в Орле: рамочные, раздвижные, плиссе, дверные, рулонные и нестандартные. Более 500 реализованных объектов за 10 лет работы.",
  alternates: { canonical: "/galereya" },
};

const STATS = [
  { icon: Camera, value: "500+", label: "установленных объектов" },
  { icon: Timer, value: "10 лет", label: "на рынке Орла" },
  { icon: Ruler, value: "0 ₽", label: "замер по городу" },
  { icon: ShieldCheck, value: "2 года", label: "гарантии" },
];

export default function GalereyaPage() {
  return (
    <>
      <PageHero
        eyebrow="Галерея работ"
        title="Фотогалерея наших работ"
        description="Реализованные объекты в Орле и Орловской области: от рамочных сеток на окна ПВХ до плиссе на террасы частных домов. Выберите категорию и нажмите на карточку для увеличения."
        breadcrumb={
          <Breadcrumbs items={[{ title: "Галерея" }]} className="text-primary-foreground/70" />
        }
      >
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-lg bg-primary-foreground/10 px-3 py-3 backdrop-blur"
            >
              <s.icon className="mb-1.5 size-5 text-accent" />
              <div className="text-xl font-bold text-primary-foreground">{s.value}</div>
              <div className="text-xs text-primary-foreground/70">{s.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Галерея */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Портфолио"
            title="Объекты сезона 2026"
            description="Каждая работа — это результат бесплатного замера, точного изготовления и аккуратного монтажа. Нажмите на фото, чтобы рассмотреть детали."
          />

          <div className="mt-10">
            <GalleryBlock />
          </div>

          <div className="mt-6 flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
            <Camera className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>
              В галерее представлены типовые проекты. Хотите увидеть фото объектов в вашем районе
              или с конкретным типом полотна? Позвоните — пришлём дополнительные материалы.
            </p>
          </div>
        </div>
      </section>

      {/* Хотите так же? */}
      <section className="border-t bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <Card className="relative overflow-hidden border-0 bg-primary p-8 text-primary-foreground sm:p-12">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <span className="h-px w-6 bg-accent" />
                  Хотите так же?
                </div>
                <h2 className="text-balance text-2xl font-bold sm:text-3xl">
                  Закажите бесплатный замер и получите расчёт за 15 минут
                </h2>
                <p className="mt-3 text-primary-foreground/80 sm:text-lg">
                  Покажем примеры работ в вашем районе, поможем выбрать оптимальную конструкцию
                  и полотно под ваши задачи. Изготовление за 1-2 дня, монтаж под ключ.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CallbackButton
                  source="Галерея — Хотите так же"
                  size="lg"
                  variant="secondary"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Заказать звонок
                </CallbackButton>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Не нашли нужный тип конструкции в галерее?"
        text="Изготовим по вашему чертежу — арки, трапеции, нестандартные размеры и цвета. Бесплатный замер по Орлу, изготовление 1-2 дня, гарантия 2 года."
      />
    </>
  );
}
