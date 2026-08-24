import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBanner } from "@/components/site/cta-banner";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CONSTRUCTIONS, SITE } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";
import { Check, X, ArrowRight, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Сравнение типов москитных сеток — какая подходит вам",
  description:
    "Подробное сравнение рамочных, раздвижных, рулонных, плиссе и дверных москитных сеток: по цене, применению, плюсам и минусам. Поможем выбрать оптимальный вариант.",
  alternates: { canonical: "/sravnenie" },
};

const COMPARISON: Record<string, { pros: string[]; cons: string[] }> = {
  ramochnye: {
    pros: ["Самая низкая цена", "Быстрый монтаж", "Универсальность", "Лёгкое снятие на зиму"],
    cons: ["Нужно снимать зимой", "Не для балконов", "Ограничение по ширине 1.5 м"],
  },
  razdvizhnye: {
    pros: ["Экономит пространство", "Не снимать зимой", "Плавный ход", "Для Provedal/Slidors"],
    cons: ["Дороже рамочной", "Только для балконов", "Нужны направляющие"],
  },
  rulonnye: {
    pros: ["Прячется в короб", "Круглогодичная эксплуатация", "Для мансард", "Не загораживает обзор"],
    cons: ["Высокая цена", "Сложный монтаж", "Нужен короб сверху"],
  },
  plisse: {
    pros: ["Премиум-дизайн", "Проёмы до 3 м", "Двустороннее открывание", "Компактный пенал"],
    cons: ["Самая дорогая", "Сложный механизм", "Требует точного монтажа"],
  },
  dvernye: {
    pros: ["Усиленный профиль", "Магнитная защёлка", "Доводчик", "Интенсивная эксплуатация"],
    cons: ["Только для дверей", "Нужны петли", "Выше цены рамочной"],
  },
  mansardnye: {
    pros: ["Совместимость Velux/Fakro", "Не провисает под углом", "Не блокирует створку"],
    cons: ["Только для мансард", "Спецзаказ", "Дороже рамочной"],
  },
  nestandartnye: {
    pros: ["Любая геометрия", "Покраска RAL", "Точная подгонка", "Для архитектурных проёмов"],
    cons: ["Срок 5-7 дней", "Дороже стандартных", "Нужен точный замер"],
  },
};

export default function SravneniePage() {
  return (
    <>
      <PageHero
        eyebrow="Сравнение"
        title="Сравнение типов москитных сеток"
        description="Подробное сравнение всех типов конструкций по цене, применению, плюсам и минусам. Поможем выбрать оптимальный вариант под ваш проём и задачи."
        breadcrumb={
          <Breadcrumbs items={[{ title: "Сравнение" }]} className="text-primary-foreground/70" />
        }
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            align="left"
            eyebrow="Таблица"
            title="Основные характеристики"
            description="Сравните ключевые параметры всех типов москитных сеток."
          />
          <div className="mt-8 overflow-x-auto">
            <Table className="price-table min-w-[900px]">
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground">Тип</TableHead>
                  <TableHead className="text-primary-foreground">Цена от</TableHead>
                  <TableHead className="text-primary-foreground">С монтажом</TableHead>
                  <TableHead className="text-primary-foreground">Применение</TableHead>
                  <TableHead className="text-primary-foreground">Срок службы</TableHead>
                  <TableHead className="text-primary-foreground">Зимой</TableHead>
                  <TableHead className="text-primary-foreground"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CONSTRUCTIONS.map((c) => (
                  <TableRow key={c.slug} className="text-sm">
                    <TableCell className="font-semibold">{c.title}</TableCell>
                    <TableCell className="font-semibold text-primary">{c.priceFrom}</TableCell>
                    <TableCell className="text-muted-foreground">{c.priceWithMount}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {c.bestFor?.slice(0, 2).join(", ")}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {c.specs?.find((s) => s.label.toLowerCase().includes("срок"))?.value || "—"}
                    </TableCell>
                    <TableCell>
                      {["razdvizhnye", "rulonnye", "plisse", "mansardnye"].includes(c.slug) ? (
                        <Badge className="bg-accent/15 text-accent">Круглогодично</Badge>
                      ) : (
                        <Badge variant="secondary">Снимать</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/katalog/konstrukcii/${c.slug}`}>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Детально"
            title="Плюсы и минусы каждого типа"
            description="Принимайте решение осознанно — изучите сильные и слабые стороны конструкций."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONSTRUCTIONS.map((c, i) => {
              const comp = COMPARISON[c.slug];
              if (!comp) return null;
              return (
                <Reveal key={c.slug} delay={i * 80} direction="up">
                  <Card className="card-hover flex flex-col p-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="font-semibold leading-tight">{c.shortTitle || c.title}</h3>
                      <Badge variant="secondary" className="shrink-0">{c.priceFrom}</Badge>
                    </div>
                    <div className="space-y-1.5">
                      {comp.pros.map((p) => (
                        <div key={p} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div className="my-3 h-px bg-border" />
                    <div className="space-y-1.5">
                      {comp.cons.map((con) => (
                        <div key={con} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <X className="mt-0.5 size-4 shrink-0 text-destructive/70" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild variant="outline" size="sm" className="mt-4">
                      <Link href={`/katalog/konstrukcii/${c.slug}`}>
                        Подробнее <ArrowRight className="size-3.5" />
                      </Link>
                    </Button>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <Card className="relative overflow-hidden border-0 bg-primary p-8 text-primary-foreground sm:p-10">
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="grid size-16 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                <Scale className="size-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Не знаете, что выбрать?</h2>
                <p className="mt-2 text-primary-foreground/80">
                  Позвоните нам — бесплатно проконсультируем и поможем подобрать оптимальный
                  тип конструкции под ваш проём, бюджет и задачи. Или закажите бесплатный
                  выезд замерщика по Орлу.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href={SITE.phoneHref}>Позвонить: {SITE.phone}</a>
                  </Button>
                  <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Link href="/uslugi/zamer">Заказать замер</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Нужна помощь с выбором москитной сетки?"
        text="Опытные инженеры ИДЕАЛ подберут оптимальную конструкцию под ваш проём и бюджет. Бесплатная консультация по телефону."
      />
    </>
  );
}
