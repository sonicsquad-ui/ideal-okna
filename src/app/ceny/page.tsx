import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
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
import { PRICE_LIST, SITE } from "@/lib/site-data";
import { Reveal } from "@/components/site/reveal";
import {
  Ruler,
  Hammer,
  Wrench,
  Truck,
  Square,
  Layers,
  RulerDimensionLine,
  Settings,
  Palette,
  ArrowRight,
  Info,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Цены на москитные сетки в Орле — прайс-лист 2026",
  description:
    "Актуальный прайс-лист на москитные сетки в Орле на сезон 2026: рамочные, раздвижные, плиссе, рулонные, дверные. Цены на услуги — замер, монтаж, ремонт, доставка. Гарантия 2 года.",
  alternates: { canonical: "/ceny" },
};

const SERVICE_PRICES = [
  {
    icon: Ruler,
    title: "Замер",
    price: "Бесплатно",
    text: "Выезд инженера-замерщика по всем районам Орла — бесплатно и без обязательств.",
    highlight: true,
  },
  {
    icon: Hammer,
    title: "Монтаж",
    price: "от 500 ₽",
    text: "Профессиональная установка на объекте: крепление, проверка геометрии, уборка рабочего места.",
    highlight: false,
  },
  {
    icon: Wrench,
    title: "Ремонт (перетяжка)",
    price: "от 400 ₽",
    text: "Перетяжка полотна, замена уголков и ручек, регулировка креплений существующих сеток.",
    highlight: false,
  },
  {
    icon: Truck,
    title: "Доставка по Орлу",
    price: "Бесплатно от 3 000 ₽",
    text: "Доставка готовых изделий по городу. Пригород и область — по тарифу транспортной службы.",
    highlight: false,
  },
];

const COST_FACTORS = [
  {
    icon: Square,
    title: "Тип конструкции",
    text: "Рамочная — самый доступный вариант. Раздвижные, рулонные и плиссе стоят дороже из-за сложной фурнитуры и направляющих.",
  },
  {
    icon: Layers,
    title: "Тип полотна",
    text: "Базовый Fiberglass входит в стоимость. Антикошка, антипыльца, антипыль и ультравью — доплата от 1 400 ₽.",
  },
  {
    icon: RulerDimensionLine,
    title: "Габариты проёма",
    text: "Цена за стандартное окно до 1,3 × 1,6 м. При больших размерах или нестандартной форме — индивидуальный расчёт.",
  },
  {
    icon: Settings,
    title: "Фурнитура и крепёж",
    text: "Z-крепление — базовое. Плунжеры, усиленные петли, доводчики и магнитные защёлки — за дополнительную плату.",
  },
  {
    icon: Palette,
    title: "Покраска по RAL",
    text: "Окрашивание алюминиевого профиля по каталогу RAL под цвет окна или фасада — +25% к базовой цене изделия.",
  },
];

// Schema.org OfferCatalog — структурированные данные прайс-листа
const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Прайс-лист москитных сеток ИДЕАЛ — сезон 2026",
  itemListElement: [
    ...PRICE_LIST.map((row, i) => ({
      "@type": "Offer",
      position: i + 1,
      priceCurrency: "RUB",
      description: `${row.model}, полотно: ${row.canvas}. Изготовление — ${row.productPrice}, с монтажом — ${row.mountPrice}.`,
      seller: {
        "@type": "Organization",
        name: "ИДЕАЛ",
        telephone: SITE.phone,
      },
    })),
    {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: "0",
      description: "Замер москитных сеток по Орлу — бесплатно.",
      itemOffered: { "@type": "Service", name: "Замер москитных сеток" },
      seller: { "@type": "Organization", name: "ИДЕАЛ" },
    },
    {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: "500",
      priceSpecification: {
        "@type": "PriceSpecification",
        minValue: "500",
        priceCurrency: "RUB",
      },
      description: "Монтаж москитных сеток — от 500 ₽.",
      itemOffered: { "@type": "Service", name: "Монтаж москитных сеток" },
      seller: { "@type": "Organization", name: "ИДЕАЛ" },
    },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Москитные сетки ИДЕАЛ в Орле",
  description:
    "Изготовление и установка москитных сеток на окна и двери в Орле. Рамочные, раздвижные, рулонные, плиссе, дверные. Гарантия 2 года.",
  brand: { "@type": "Brand", name: "ИДЕАЛ" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "RUB",
    lowPrice: "900",
    highPrice: "11000",
    offerCount: PRICE_LIST.length,
  },
};

export default function CenyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <PageHero
        eyebrow="Прайс-лист"
        title="Цены на москитные сетки в Орле"
        description="Актуальные цены на сезон 2026. Прозрачное ценообразование без скрытых платежей — итоговая стоимость фиксируется после бесплатного замера."
        breadcrumb={
          <Breadcrumbs items={[{ title: "Цены" }]} className="text-primary-foreground/70" />
        }
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/kalkulyator">
              <Calculator className="size-4" /> Рассчитать онлайн
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <Link href="/uslugi/zamer">Заказать бесплатный замер</Link>
          </Button>
        </div>
      </PageHero>

      {/* Прайс-лист на изделия */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <SectionHeading
            align="left"
            eyebrow="Изделия"
            title="Прайс-лист на москитные сетки"
            description="Стоимость изготовления и монтажа под ключ. Цены указаны для стандартных размеров — точную смету рассчитает замерщик после выезда."
          />

          <div className="mt-8 overflow-hidden rounded-xl border bg-card">
            <Table className="price-table">
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground">Модель конструкции</TableHead>
                  <TableHead className="text-primary-foreground">Тип полотна</TableHead>
                  <TableHead className="text-right text-primary-foreground">Изделие</TableHead>
                  <TableHead className="text-right text-primary-foreground">С монтажом</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PRICE_LIST.map((row) => (
                  <TableRow key={row.model} className="text-sm">
                    <TableCell className="font-medium">{row.model}</TableCell>
                    <TableCell className="text-muted-foreground">{row.canvas}</TableCell>
                    <TableCell className="text-right font-semibold">{row.productPrice}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {row.mountPrice}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-accent" />
            <p>
              Цены указаны для сезона <span className="font-semibold text-foreground">2026 года</span>{" "}
              и стандартных размеров проёма до 1,3 × 1,6 м. Точная стоимость зависит от габаритов,
              выбранного полотна и фурнитуры, рассчитывается после бесплатного замера.
            </p>
          </div>
        </div>
      </section>

      {/* Цены на услуги */}
      <section className="border-t bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Сервис"
            title="Цены на услуги"
            description="Полный цикл работ: бесплатный замер, профессиональный монтаж, ремонт и доставка готовых изделий по Орлу."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_PRICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} direction="up">
                <Card
                  className={`relative p-5 ${
                    s.highlight ? "border-accent/50 bg-accent/5" : ""
                  }`}
                >
                  {s.highlight && (
                    <Badge className="absolute -top-2.5 right-4 bg-accent text-accent-foreground">
                      Бесплатно
                    </Badge>
                  )}
                  <s.icon className="mb-3 size-7 text-primary" />
                  <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    {s.title}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-primary">{s.price}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Что влияет на стоимость */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            align="left"
            eyebrow="От чего зависит цена"
            title="Что влияет на стоимость"
            description="Пять ключевых факторов, которые формируют финальную цену москитной сетки под ваш проём."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COST_FACTORS.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} direction="up">
                <Card className="group p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                      <c.icon className="size-6" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-semibold leading-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                </Card>
              </Reveal>
            ))}
            <Card className="flex flex-col items-start justify-center gap-3 border-dashed bg-secondary/40 p-5">
              <Calculator className="size-7 text-accent" />
              <div>
                <div className="font-semibold">Хотите точную цену?</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Рассчитайте стоимость онлайн за 30 секунд — без звонка и замера.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/kalkulyator">
                  Открыть калькулятор <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Что входит в стоимость */}
      <section className="border-t bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Включено в цену"
            title="Что входит в стоимость изготовления"
            description="Никаких скрытых платежей — вы получаете готовое изделие под ключ."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Алюминиевый профиль нужного цвета (белый, коричневый, под дерево)",
              "Полотно выбранного типа (Fiberglass входит в базовую цену)",
              "Усиленные пластиковые или металлические уголки",
              "УФ-стойкий фиксирующий шнур (EPDM-резина)",
              "Ручки для снятия из УФ-стойкого полипропилена",
              "Z-крепления или плунжеры (базовый крепёж)",
              "При необходимости — перемычка жёсткости",
              "Гарантийный талон на 2 года",
            ].map((item, i) => (
              <Reveal key={item} delay={i * 60} direction="up">
                <div
                  className="flex items-start gap-3 rounded-lg border bg-card p-4"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <svg viewBox="0 0 24 24" fill="none" className="size-3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-sm">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Не нашли нужный вариант в прайсе?"
        text="Позвоните или закажите обратный звонок — рассчитаем индивидуально под ваш проём, бюджет и сроки. Бесплатный замер по Орлу в день обращения."
      />
    </>
  );
}
