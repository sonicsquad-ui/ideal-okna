import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBanner } from "@/components/site/cta-banner";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionDivider } from "@/components/site/section-divider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaqSearch } from "@/components/blocks/faq-search";
import { FAQ, SITE } from "@/lib/site-data";
import { Phone, MessageCircle, HelpCircle, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — частые вопросы о москитных сетках в Орле",
  description:
    "Ответы на частые вопросы о москитных сетках: замер, монтаж, крепление, уход, гарантия, сроки. Поиск по вопросам. Не нашли ответ — позвоните +7 953 618 75 96.",
  alternates: { canonical: "/faq" },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="Частые вопросы и ответы"
        description="Собрали ответы на вопросы, которые чаще всего задают клиенты ИДЕАЛ в Орле. Воспользуйтесь поиском, чтобы быстро найти нужный ответ."
        breadcrumb={
          <Breadcrumbs items={[{ title: "FAQ" }]} className="text-primary-foreground/70" />
        }
      />

      {/* Поиск + Accordion */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <FaqSearch items={FAQ} />
        </div>
      </section>

      <SectionDivider variant="wave" className="-my-2" />

      {/* Категории вопросов */}
      <section className="bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Темы"
            title="Популярные темы вопросов"
            description="Быстрый доступ к ответам по ключевым темам."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: HelpCircle,
                title: "Замер и подготовка",
                count: FAQ.filter((f) => f.q.match(/замер|подготов|окно к приезду/i)).length,
                href: "/uslugi/zamer",
              },
              {
                icon: Lightbulb,
                title: "Виды и выбор",
                count: FAQ.filter((f) => f.q.match(/виды|выбрать|прикрепить|заменить|купить/i)).length,
                href: "/sravnenie",
              },
              {
                icon: MessageCircle,
                title: "Сроки и изготовление",
                count: FAQ.filter((f) => f.q.match(/срок|изготов|зим|снимать/i)).length,
                href: "/ceny",
              },
              {
                icon: Phone,
                title: "Уход и обслуживание",
                count: FAQ.filter((f) => f.q.match(/уход|очистк|ремонт|деревянн/i)).length,
                href: "/uslugi/remont",
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group flex flex-col items-start gap-2 rounded-xl border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                  <cat.icon className="size-6" />
                </div>
                <div className="font-semibold leading-tight transition-colors group-hover:text-primary">
                  {cat.title}
                </div>
                <div className="text-xs text-muted-foreground">{cat.count} вопросов</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Не нашли ответ? */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <Card className="relative overflow-hidden border-0 bg-primary p-8 text-primary-foreground sm:p-10">
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="grid size-16 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                <MessageCircle className="size-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Не нашли ответ на свой вопрос?</h2>
                <p className="mt-2 text-primary-foreground/80">
                  Позвоните или оставьте заявку — бесплатно проконсультируем по любому вопросу
                  о москитных сетках. Поможем выбрать конструкцию, рассчитать стоимость и
                  оформить заказ.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href={SITE.phoneHref}>
                      <Phone className="size-4" /> {SITE.phone}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Link href="/kontakty">Все контакты</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Готовы заказать москитную сетку?"
        text="Бесплатный замер по Орлу, изготовление за 1-2 дня, гарантия 2 года. Рассчитайте стоимость на калькуляторе или оставьте заявку."
      />
    </>
  );
}
