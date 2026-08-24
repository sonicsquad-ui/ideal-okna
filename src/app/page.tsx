import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { CatalogCard } from "@/components/site/catalog-card";
import { QuizBlock } from "@/components/blocks/quiz-block";
import { FaqBlock } from "@/components/blocks/faq-block";
import { ReviewCard } from "@/components/blocks/review-card";
import { StatsCounter } from "@/components/blocks/stats-counter";
import { LiveOrderToast } from "@/components/blocks/live-order-toast";
import { Reveal } from "@/components/site/reveal";
import { SectionDivider } from "@/components/site/section-divider";
import {
  SITE,
  CONSTRUCTIONS,
  CANVASES,
  PRICE_LIST,
  STEPS,
  ADVANTAGES,
  DISTRICTS,
  FAQ,
  FREQUENTLY_SEARCHED,
} from "@/lib/site-data";
import {
  PhoneCall,
  Calculator,
  MapPin,
  ShieldCheck,
  Timer,
  Factory,
  Truck,
  Award,
  BadgeRussianRuble,
  ArrowRight,
  CheckCircle2,
  Wrench,
  Ruler,
  Hammer,
  FileCheck,
  Search,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ============ БЛОК 1: HERO + КВИЗ ============ */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpeg"
            alt="Москитные сетки в Орле от производителя ИДЕАЛ"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-6 lg:py-20">
          {/* Левая часть — заголовок и CTA */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className="bg-accent text-accent-foreground">Производство в Орле</Badge>
              <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                Гарантия {SITE.guarantee}
              </Badge>
              <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                Замер за 1 день
              </Badge>
            </div>
            <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Москитные сетки в Орле от производителя{" "}
              <span className="text-accent">ИДЕАЛ</span>
            </h1>
            <p className="mt-4 max-w-xl text-balance text-base text-primary-foreground/85 sm:text-lg">
              Изготовление и установка антимоскитных конструкций на окна и двери. Рамочные,
              плиссе, антикошка, антипыль и антипыльца. Собственное производство, честные
              цены и гарантия {SITE.guarantee}.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 pulse-gold">
                <Link href="/kalkulyator">
                  <Calculator className="size-4" /> Рассчитайте стоимость
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href={SITE.phoneHref}>
                  <PhoneCall className="size-4" /> {SITE.phone}
                </a>
              </Button>
            </div>

            {/* Преимущества-бейджи */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Factory, label: "Своё производство" },
                { icon: Timer, label: "Изготовление 1-2 дня" },
                { icon: Truck, label: "Бесплатный замер" },
                { icon: ShieldCheck, label: "Гарантия 2 года" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2 rounded-lg bg-primary-foreground/10 px-3 py-2 text-xs backdrop-blur"
                >
                  <b.icon className="size-4 shrink-0 text-accent" />
                  <span className="font-medium">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Живой счётчик клиентов */}
            <div className="mt-6 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur">
              <div className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-accent">
                ИДЕАЛ в цифрах
              </div>
              <StatsCounter
                stats={[
                  { value: 5000, suffix: "+", label: "довольных клиентов", sublabel: "за 10 лет" },
                  { value: 12, suffix: " лет", label: "на рынке Орла", sublabel: "с 2014 года" },
                  { value: 2, suffix: " года", label: "гарантия", sublabel: "на изделие и монтаж" },
                  { value: 1, prefix: "за ", suffix: " день", label: "выезд замерщика", sublabel: "по всем районам" },
                ]}
              />
            </div>
          </div>

          {/* Правая часть — Квиз */}
          <div className="flex items-center">
            <div className="w-full">
              <div className="mb-3 text-center text-sm font-semibold text-primary-foreground/90">
                <span className="text-accent">●</span> Рассчитайте стоимость за 30 секунд
              </div>
              <QuizBlock />
            </div>
          </div>
        </div>
      </section>

      {/* ============ ПРЕИМУЩЕСТВА ============ */}
      <section className="border-b bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Почему ИДЕАЛ"
            title="Производитель, которому доверяют в Орле"
            description="Собственное производство, опыт более 10 лет и честные цены без посредников."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((adv, i) => {
              const Icon =
                (Icons[adv.icon as keyof typeof Icons] as React.ComponentType<{
                  className?: string;
                }>) ?? Award;
              return (
                <Reveal key={adv.title} delay={i * 80} direction="up">
                  <Card className="card-hover group h-full p-5">
                    <div className="mb-3 grid size-12 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-base font-semibold">{adv.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{adv.text}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" className="-my-2" />

      {/* ============ БЛОК 2: ТИПЫ КОНСТРУКЦИЙ ============ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Каталог"
            title="Инженерные решения для каждого типа проёма"
            description="Современное производство позволяет перекрыть любые световые проёмы, сохраняя эстетику фасада и удобство эксплуатации."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONSTRUCTIONS.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 3) * 100} direction="up">
                <CatalogCard
                  item={item}
                  href={`/katalog/konstrukcii/${item.slug}`}
                  className="h-full"
                />
              </Reveal>
            ))}
            <Reveal delay={200} direction="up">
              <Card className="flex h-full flex-col items-center justify-center gap-3 border-dashed bg-secondary/40 p-5 text-center">
                <Icons.Shapes className="size-10 text-primary/60" />
                <div>
                  <div className="font-semibold">Нужна нестандартная сетка?</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Арки, трапеции, нестандартные размеры — изготовим по чертежу
                  </p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/uslugi/zamer">Заказать замер</Link>
                </Button>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider variant="dots" className="-my-2" />

      {/* ============ БЛОК 3: СПЕЦИАЛИЗИРОВАННЫЕ ПОЛОТНА ============ */}
      <section className="bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Материалы"
            title="Материалы для решения специфических бытовых проблем"
            description="Базовое стекловолокно (Fiberglass) обеспечивает стандартную защиту от комаров. Для сложных условий применяются инновационные ткани."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CANVASES.map((item) => (
              <CatalogCard
                key={item.slug}
                item={item}
                href={`/katalog/polotna/${item.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="gold-line" className="-my-2" />

      {/* ============ БЛОК 4: ГЕОГРАФИЯ ОБСЛУЖИВАНИЯ ============ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="География"
                title="Зона выезда инженеров на замер"
                description="Фабрика «ИДЕАЛ» обеспечивает оперативный монтаж по всей территории города Орёл и пригорода."
              />
              <p className="mt-4 text-muted-foreground">
                Мастера работают во всех административных единицах города. Выезд на объекты в
                Орловской области согласовывается индивидуально.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {DISTRICTS.map((d) => (
                  <div
                    key={d}
                    className="group flex items-center gap-2.5 rounded-lg border bg-card p-3 text-sm transition-all hover:border-primary hover:bg-accent/5 hover:shadow-sm"
                  >
                    <span className="relative">
                      <MapPin className="size-4 text-primary transition-transform group-hover:scale-110" />
                      <span className="absolute -right-0.5 -top-0.5 size-1.5 animate-pulse rounded-full bg-accent" />
                    </span>
                    <span className="font-medium transition-colors group-hover:text-primary">{d}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-6">
                <Link href="/uslugi/zamer">
                  Заказать бесплатный замер <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="relative overflow-hidden rounded-xl border bg-primary p-6 text-primary-foreground">
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="relative">
                <div className="text-sm uppercase tracking-wide text-accent">Зона обслуживания</div>
                <div className="mt-1 text-3xl font-bold">г. Орёл</div>
                <div className="mt-1 text-primary-foreground/80">+ Орловская область (по согласованию)</div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-accent">4</div>
                    <div className="text-xs text-primary-foreground/70">района города</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">1 день</div>
                    <div className="text-xs text-primary-foreground/70">выезд замерщика</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">0 ₽</div>
                    <div className="text-xs text-primary-foreground/70">замер по городу</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">2 года</div>
                    <div className="text-xs text-primary-foreground/70">гарантия</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="gradient" className="-my-2" />

      {/* ============ БЛОК 5: ПРАЙС-ЛИСТ ============ */}
      <section className="bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Цены"
            title="Актуальная стоимость на сезон 2026 года"
            description="Прозрачное ценообразование без скрытых наценок. Итоговая цена зависит от габаритов и выбранной фурнитуры."
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
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>* Цены указаны для стандартных размеров. Точную стоимость рассчитает замерщик.</span>
            <Button asChild variant="outline" size="sm">
              <Link href="/ceny">Полный прайс-лист <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============ БЛОК 6: ЭТАПЫ СОТРУДНИЧЕСТВА ============ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Как мы работаем"
            title="Путь от заявки до установки"
            description="Прозрачный процесс сотрудничества на каждом этапе."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => {
              const icons = [PhoneCall, Ruler, Factory, Hammer, FileCheck];
              const Icon = icons[i] || PhoneCall;
              return (
                <Reveal key={step.num} delay={i * 120} direction="up">
                  <Card className="card-hover corner-accent group relative h-full overflow-hidden p-5">
                    {/* Декоративный номер-водяной знак */}
                    <span className="pointer-events-none absolute -right-2 -top-4 text-7xl font-extrabold text-primary/5 transition-colors group-hover:text-accent/10">
                      {step.num}
                    </span>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-sm font-bold text-primary-foreground shadow-sm">
                        {step.num}
                      </span>
                      <Icon className="icon-bounce size-5 text-accent" />
                    </div>
                    <h3 className="font-semibold leading-tight transition-colors group-hover:text-primary">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
                    {i < STEPS.length - 1 && (
                      <ArrowRight className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 text-muted-foreground/40 lg:block" />
                    )}
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA-баннер */}
      <CtaBanner />

      {/* ============ БЛОК 7: SEO-ТЕКСТОВЫЙ БЛОК ============ */}
      <section className="bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Комплексная защита дома от насекомых, пыли и аллергенов
            </h2>
            <p>
              С наступлением теплого сезона владельцы частных домов и квартир в многоэтажках
              сталкиваются с необходимостью обеспечения комфортного микроклимата. Открытые створки
              необходимы для проветривания, однако вместе со свежим воздухом в помещения проникают
              комары, мошка, тополиный пух и уличная грязь. Современное производство предлагает
              технологичные решения, позволяющие нивелировать эти факторы без ущерба для эстетики
              фасада и интерьера. Заказать качественные москитные сетки в Орле у профильной компании —
              значит инвестировать в здоровье и спокойствие всей семьи.
            </p>
            <h3 className="text-xl font-bold text-foreground">
              Специфика эксплуатации в климатических условиях региона
            </h3>
            <p>
              Климат Орловской области подразумевает значительные перепады температур, высокую
              влажность весной и сильные ветровые нагрузки на верхних этажах новостроек. Поэтому
              каркас каждой конструкции собирается из экструдированного алюминия, а угловые соединения
              фиксируются усиленными пластиковыми или металлическими элементами. Для предотвращения
              деформации рамы при габаритах, превышающих стандартные показатели, обязательно внедряется
              горизонтальная перемычка жёсткости. Это обеспечивает сохранение геометрии и плотное
              прилегание к контуру рамы ПВХ или дерева. Фиксирующий шнур из атмосферостойкой резины
              надёжно удерживает ткань в пазах даже при резких порывах ветра.
            </p>
            <h3 className="text-xl font-bold text-foreground">
              Инновационные материалы и надёжная фурнитура
            </h3>
            <p>
              Базовым материалом выступает стекловолокно с ПВХ-покрытием (Fiberglass), обладающее
              оптимальным светопропусканием и устойчивостью к ультрафиолету. Для специфических задач
              применяются узкоспециализированные ткани:
            </p>
            <ul className="ml-4 space-y-1.5">
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" /><span><b>Pet Screen</b> — многослойное полотно из полиэстера, выдерживающее когти питомцев.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" /><span><b>Poll-Tex</b> — микроскопическая ячейка задерживает аллергены.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" /><span><b>Micro Mesh</b> — электростатический эффект улавливает мелкодисперсные частицы.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" /><span><b>Ultravue</b> — тончайшая нить сохраняет панорамный обзор из окна.</span></li>
            </ul>
            <p>
              Фурнитура играет не меньшую роль. Ручки для снятия изготавливаются из УФ-стойкого
              полипропилена, а крепёжные элементы (флажок, Z-крепление, плунжер) подбираются
              индивидуально под профиль створки.
            </p>
            <h3 className="text-xl font-bold text-foreground">Обслуживание и ремонт существующих систем</h3>
            <p>
              Помимо классических оконных проёмов, инженеры компании реализуют проекты для сложных
              объектов. Раздвижная система идеально интегрируется в алюминиевое остекление балконов и
              лоджий. Для загородной недвижимости монтируются габаритные дверные конструкции на
              магнитных защёлках. Мансардное окно, расположенное под углом, также оснащается
              специализированными рулонными механизмами. Сетка плиссе позволяет перекрывать проёмы
              шириной до трёх метров без потери функциональности.
            </p>
            <p>
              Со временем даже самые надёжные изделия требуют внимания. Фабрика «ИДЕАЛ» осуществляет
              профессиональный ремонт: выполняется замена порванного полотна, установка новых уголков,
              регулировка креплений и перетяжка фиксирующего шнура. Это продлевает срок службы изделия
              на годы, экономя бюджет заказчика. Высокое качество работ подтверждается расширенной
              гарантией.
            </p>
          </div>
        </div>
      </section>

      {/* ============ ОТЗЫВЫ (превью) ============ */}
      <ReviewsPreview />

      {/* ============ БЛОК 8: FAQ ============ */}
      <FaqBlock items={FAQ} />

      {/* ============ БЛОК 9: ЧАСТО ИЩУТ ============ */}
      <section className="bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Часто ищут"
            title="Часто ищут"
            description="Популярные поисковые запросы по москитным сеткам в Орле."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {FREQUENTLY_SEARCHED.map((phrase) => (
              <Link
                key={phrase}
                href="/blog"
                className="group flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm transition-all hover:border-primary hover:bg-accent/10"
              >
                <Search className="size-3.5 text-muted-foreground group-hover:text-primary" />
                <span className="text-muted-foreground group-hover:text-primary">{phrase}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Превью отзывов (статичные, расширенные через БД на странице /otzyvy)
const PREVIEW_REVIEWS = [
  {
    name: "Елена Морозова",
    city: "Орёл, Северный район",
    rating: 5,
    service: "Рамочная сетка антикошка",
    text: "Заказывала сетки на 4 окна с полотном антикошка — дома два кота, которые обожают смотреть в окно. Сетки поставили за один день, крепко держатся, коты безопасно сидят на подоконнике. Спасибо ребятам за оперативность!",
  },
  {
    name: "Дмитрий Соколов",
    city: "Орёл, Заводской район",
    rating: 5,
    service: "Раздвижная система на балкон",
    text: "Делали раздвижные сетки на остекление балкона Provedal. Замерщик приехал на следующий день, через два дня привезли и установили. Всё чётко по размерам, ход плавный. Цена адекватная, рекомендую.",
  },
  {
    name: "Ольга Кузнецова",
    city: "Орёл, Советский район",
    rating: 5,
    service: "Ремонт сетки (перетяжка)",
    text: "Старая сетка порвалась после сильного ветра. Обратилась в ИДЕАЛ — перетянули полотно за полчаса прямо на месте, поставили новые ручки. Намного дешевле, чем покупать новую. Большое спасибо!",
  },
];

function ReviewsPreview() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          eyebrow="Отзывы"
          title="Что говорят клиенты"
          description="Более 500 довольных заказчиков в Орле и области за 10 лет работы."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PREVIEW_REVIEWS.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/otzyvy">Все отзывы <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
