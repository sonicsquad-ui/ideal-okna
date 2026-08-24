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
import { SITE } from "@/lib/site-data";
import {
  ShieldCheck,
  Layers,
  Settings,
  Frame,
  Wrench,
  XCircle,
  CheckCircle2,
  HeartHandshake,
  Award,
  Timer,
  ArrowRight,
  FileCheck,
  FileText,
  ClipboardList,
  Stamp,
  ScrollText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Гарантия на москитные сетки в Орле — 2 года",
  description:
    "Гарантия 2 года на москитные сетки и монтаж в Орле. Что покрывает гарантия, сроки на каркас, полотно, фурнитуру. Сервисное обслуживание после гарантии со скидкой.",
  alternates: { canonical: "/garantii" },
};

const GUARANTEE_COVERS = [
  {
    icon: Layers,
    title: "Дефекты полотна",
    text: "Заводские дефекты полотна: разрыв по шву, отслоение ПВХ-покрытия, провисание сверх нормы, выцветание в пределах гарантийного срока.",
  },
  {
    icon: Settings,
    title: "Поломка фурнитуры",
    text: "Поломка ручек для снятия, уголков, плунжеров и Z-креплений при нормальной эксплуатации. Заменим за наш счёт.",
  },
  {
    icon: Frame,
    title: "Нарушение геометрии рамы",
    text: "Деформация алюминиевого каркаса, не связанная с механическим воздействием. Перекос, потеря прямого угла, нарушение прилегания.",
  },
  {
    icon: Wrench,
    title: "Ослабление креплений",
    text: "Ослабление или самопроизвольное откручивание крепёжных элементов в течение гарантийного срока. Подтянем и отрегулируем бесплатно.",
  },
];

const NOT_COVERED = [
  {
    title: "Механические повреждения",
    text: "Порезы, проколы и удары, нанесённые в процессе эксплуатации (когти животных, удар предметом, нажим на полотно).",
  },
  {
    title: "Неправильный монтаж третьими лицами",
    text: "Дефекты, возникшие из-за самостоятельной установки или монтажа сторонними подрядчиками после доставки изделия.",
  },
  {
    title: "Естественный износ",
    text: "Изменение цвета и характеристик полотна по истечении нормативного срока службы материала (7-10 лет для разных типов).",
  },
  {
    title: "Форс-мажор",
    text: "Повреждения в результате пожара, затопления, стихийных бедствий, падения деревьев и других внешних факторов.",
  },
];

const WARRANTY_TERMS = [
  { component: "Каркас (алюминиевый профиль)", term: "2 года", note: "Деформация, нарушение геометрии" },
  { component: "Полотно", term: "2 года", note: "Заводские дефекты, провисание" },
  { component: "Фурнитура (ручки, уголки)", term: "1 год", note: "Поломка при нормальной эксплуатации" },
  { component: "Монтаж (крепёж, работа)", term: "2 года", note: "Ослабление креплений, регулировка" },
];

// Schema.org — гарантийные обязательства
const warrantySchema = {
  "@context": "https://schema.org",
  "@type": "WarrantyPromise",
  durationOfWarranty: {
    "@type": "QuantitativeValue",
    value: 2,
    unitCode: "ANN",
  },
  warrantyScope: {
    "@type": "WarrantyScope",
    name: "Гарантия на москитные сетки ИДЕАЛ — 2 года",
    description:
      "Гарантия 2 года на каркас, полотно и монтаж; 1 год на фурнитуру. Покрывает заводские дефекты и ослабление креплений. Не распространяется на механические повреждения и форс-мажор.",
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Москитные сетки ИДЕАЛ",
  description:
    "Москитные сетки в Орле с гарантией 2 года. Рамочные, раздвижные, рулонные, плиссе, дверные.",
  brand: { "@type": "Brand", name: "ИДЕАЛ" },
  warranty: warrantySchema,
  offers: {
    "@type": "Offer",
    priceCurrency: "RUB",
    price: "900",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "ИДЕАЛ",
      telephone: SITE.phone,
    },
  },
};

const DOCS = [
  {
    icon: ScrollText,
    title: "Гарантийный талон",
    desc: "Выдаётся на руки при монтаже, содержит срок гарантии и условия обслуживания.",
    format: "PDF",
    size: "1 страница",
  },
  {
    icon: FileText,
    title: "Сертификат на профиль",
    desc: "Сертификат соответствия на экструдированный алюминиевый профиль от производителя.",
    format: "PDF",
    size: "2 страницы",
  },
  {
    icon: ClipboardList,
    title: "Договор на монтаж",
    desc: "Типовой договор на оказание услуг по установке москитных сеток с реквизитами.",
    format: "PDF",
    size: "3 страницы",
  },
  {
    icon: Stamp,
    title: "Сертификат на полотно",
    desc: "Сертификаты на Fiberglass, Pet Screen, Poll-Tex, Micro Mesh от поставщиков.",
    format: "PDF",
    size: "по запросу",
  },
];

export default function GarantiiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(warrantySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <PageHero
        eyebrow="Гарантия"
        title="Гарантия на москитные сетки — 2 года"
        description="Расширенная гарантия на каркас, полотно и монтаж. Честные обязательства без мелкого шрифта и скрытых условий. Сервисное обслуживание после гарантии — со скидкой."
        breadcrumb={
          <Breadcrumbs items={[{ title: "Гарантии" }]} className="text-primary-foreground/70" />
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/uslugi/zamer">
              <ShieldCheck className="size-4" /> Заказать с гарантией
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <Link href="/uslugi/remont">Сервисное обслуживание</Link>
          </Button>
        </div>
      </PageHero>

      {/* Hero-статистика */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden border-0 bg-primary p-6 text-primary-foreground">
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="absolute -right-12 -top-12 size-40 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative">
                <ShieldCheck className="mb-2 size-8 text-accent" />
                <div className="text-5xl font-extrabold tracking-tight text-accent">2 года</div>
                <div className="mt-1 text-sm text-primary-foreground/80">
                  гарантия на изделие и монтаж
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <Award className="mb-2 size-8 text-primary" />
              <div className="text-3xl font-bold text-foreground">10+ лет</div>
              <div className="mt-1 text-sm text-muted-foreground">опыта на рынке Орла</div>
            </Card>

            <Card className="p-6">
              <Timer className="mb-2 size-8 text-primary" />
              <div className="text-3xl font-bold text-foreground">1-2 дня</div>
              <div className="mt-1 text-sm text-muted-foreground">изготовление под заказ</div>
            </Card>

            <Card className="p-6">
              <HeartHandshake className="mb-2 size-8 text-primary" />
              <div className="text-3xl font-bold text-foreground">500+</div>
              <div className="mt-1 text-sm text-muted-foreground">довольных клиентов</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Что покрывает гарантия */}
      <section className="border-t bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Покрытие"
            title="Что покрывает гарантия"
            description="Производственные дефекты и проблемы, возникшие при нормальной эксплуатации в течение гарантийного срока."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEE_COVERS.map((c) => (
              <Card key={c.title} className="group p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 grid size-12 place-items-center rounded-lg bg-accent/10 text-accent">
                  <c.icon className="size-6" />
                </div>
                <h3 className="font-semibold leading-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  <CheckCircle2 className="size-3.5" />
                  Покрыто гарантией
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Что НЕ покрывает */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Исключения"
            title="Что НЕ покрывает гарантия"
            description="Прозрачные исключения, не связанные с качеством изделия и монтажа."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {NOT_COVERED.map((c) => (
              <Card key={c.title} className="flex gap-4 border-destructive/20 p-5">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive">
                  <XCircle className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold leading-tight">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Сроки гарантии — таблица */}
      <section className="border-t bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Сроки"
            title="Сроки гарантии по компонентам"
            description="Гарантийные сроки на отдельные элементы конструкции и выполненные работы."
          />
          <div className="mt-8 overflow-hidden rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground">Компонент</TableHead>
                  <TableHead className="text-primary-foreground">Срок гарантии</TableHead>
                  <TableHead className="text-primary-foreground">Что покрывает</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WARRANTY_TERMS.map((w) => (
                  <TableRow key={w.component} className="text-sm">
                    <TableCell className="font-medium">{w.component}</TableCell>
                    <TableCell>
                      <Badge className="bg-accent text-accent-foreground">{w.term}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{w.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-muted-foreground">
            <FileCheck className="mt-0.5 size-4 shrink-0 text-accent" />
            <p>
              Гарантийный талон выдаётся после монтажа. Для обращения по гарантии достаточно
              сохранить талон и назвать телефон, указанный при оформлении заказа.
            </p>
          </div>
        </div>
      </section>

      {/* Сервисное обслуживание */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <Card className="relative overflow-hidden p-8 sm:p-10">
            <div className="absolute -right-12 -top-12 size-48 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-px w-6 bg-accent" />
                После гарантии
                <span className="h-px w-6 bg-accent" />
              </div>
              <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Сервисное обслуживание после гарантии
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Когда гарантийный срок истёк, мы продолжаем заботиться о ваших сетках. Ремонт и
                обслуживание для клиентов «ИДЕАЛ» — со скидкой 15% от действующего прайса.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { title: "Перетяжка полотна", price: "от 400 ₽" },
                  { title: "Замена фурнитуры", price: "от 350 ₽" },
                  { title: "Регулировка креплений", price: "от 300 ₽" },
                ].map((s) => (
                  <div key={s.title} className="rounded-lg border bg-card p-4">
                    <div className="text-sm font-medium text-muted-foreground">{s.title}</div>
                    <div className="mt-1 text-xl font-bold text-primary">{s.price}</div>
                    <div className="mt-1 text-xs text-accent">−15% для своих клиентов</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/uslugi/remont">
                    <Wrench className="size-4" /> Заказать ремонт <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/uslugi/zamer">Бесплатный замер</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Сертификаты и документы */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Документы"
            title="Сертификаты и гарантийные документы"
            description="Официальные документы, подтверждающие качество материалов и обязательства компании."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DOCS.map((doc, i) => (
              <div
                key={doc.title}
                className="group flex flex-col items-start gap-3 rounded-xl border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                  <doc.icon className="size-6" />
                </div>
                <div className="font-semibold leading-tight">{doc.title}</div>
                <p className="text-sm text-muted-foreground">{doc.desc}</p>
                <div className="mt-auto text-xs text-muted-foreground">
                  {doc.format} · {doc.size}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Нужны копии документов для бухгалтерии или ТЗ? Позвоните — отправим на email в течение 15 минут.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Закажите москитные сетки с гарантией 2 года"
        text="Бесплатный замер по Орлу, изготовление за 1-2 дня, монтаж под ключ и гарантийный талон на руки. Сервисное обслуживание после гарантии — со скидкой."
      />
    </>
  );
}
