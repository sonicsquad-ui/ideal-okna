import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBanner } from "@/components/site/cta-banner";
import { SectionHeading } from "@/components/site/section-heading";
import { SectionDivider } from "@/components/site/section-divider";
import { Reveal } from "@/components/site/reveal";
import { StatsCounter } from "@/components/blocks/stats-counter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Factory,
  Heart,
  ShieldCheck,
  Truck,
  Target,
  Eye,
  HandHeart,
  Wrench,
  Ruler,
  Phone,
  UserCog,
  Headphones,
  HardHat,
  ClipboardCheck,
} from "lucide-react";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "О компании ИДЕАЛ — производитель москитных сеток в Орле",
  description:
    "ИДЕАЛ — собственное производство москитных сеток в Орле с 2014 года. Опыт более 10 лет, 5000+ клиентов, гарантия 2 года. Узнайте о нашей миссии, ценностях и команде.",
  alternates: { canonical: "/o-kompanii" },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Качество превыше всего",
    text: "Каждая сетка проходит контроль на всех этапах: от закупки профиля до монтажа. Используем только сертифицированные материалы.",
  },
  {
    icon: HandHeart,
    title: "Честность с клиентом",
    text: "Прозрачное ценообразование без скрытых наценок. Финальная цена фиксируется после замера — никаких сюрпризов.",
  },
  {
    icon: Truck,
    title: "Оперативность",
    text: "Изготовление стандартных моделей за 1-2 дня. Выезд замерщика в день обращения по всем районам Орла.",
  },
  {
    icon: Wrench,
    title: "Сервис после продажи",
    text: "Гарантия 2 года + сервисное обслуживание. Ремонт, перетяжка, замена фурнитуры — даже после гарантийного срока.",
  },
];

const TIMELINE = [
  {
    year: "2014",
    title: "Основание компании",
    text: "ИДЕАЛ открыл первое производство москитных сеток в Орле на ул. Сурена-Шаумяна, 35.",
  },
  {
    year: "2016",
    title: "Расширение ассортимента",
    text: "Добавлены раздвижные системы для балконов Provedal и Slidors, рулонные сетки для мансард.",
  },
  {
    year: "2018",
    title: "Инновационные полотна",
    text: "Начали работу с полотнами Pet Screen, Poll-Tex, Micro Mesh и Ultravue для решения специфических задач.",
  },
  {
    year: "2020",
    title: "Премиум-сегмент",
    text: "Запущено производство сеток плиссе для широких порталов и террас шириной до 3 метров.",
  },
  {
    year: "2024",
    title: "5000+ клиентов",
    text: "Преодолели отметку в 5000 реализованных объектов в Орле и Орловской области.",
  },
  {
    year: "2026",
    title: "Цифровизация",
    text: "Запущен онлайн-калькулятор, квиз и виджет онлайн-чата для удобства клиентов.",
  },
];

const TEAM = [
  {
    name: "Алексей Морозов",
    role: "Руководитель производства",
    department: "Производство",
    experience: "12 лет в производстве москитных сеток",
    photo: "/team/manager.jpg",
    icon: UserCog,
  },
  {
    name: "Елена Соколова",
    role: "Менеджер по работе с клиентами",
    department: "Сервис",
    experience: "8 лет в клиентском сервисе",
    photo: "/team/manager-female.jpg",
    icon: Headphones,
  },
  {
    name: "Дмитрий Волков",
    role: "Инженер-замерщик",
    department: "Замеры",
    experience: "10 лет работы с окнами ПВХ и алюминием",
    photo: "/team/surveyor.jpg",
    icon: ClipboardCheck,
  },
  {
    name: "Сергей Новиков",
    role: "Мастер монтажа",
    department: "Монтаж",
    experience: "9 лет установки москитных сеток",
    photo: "/team/installer.jpg",
    icon: HardHat,
  },
];

export default function OKompaniiPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "О компании ИДЕАЛ",
    description:
      "Производитель москитных сеток в Орле с 2014 года. Собственное производство, гарантия 2 года, 5000+ клиентов.",
    url: `${SITE.url}/o-kompanii`,
    mainEntity: {
      "@type": "Organization",
      name: "ИДЕАЛ",
      foundingDate: "2014",
      numberOfEmployees: { "@type": "QuantitativeValue", value: "15" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Сурена-Шаумяна, 35",
        addressLocality: "Орёл",
        addressRegion: "Орловская область",
        addressCountry: "RU",
      },
      telephone: SITE.phone,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <PageHero
        eyebrow="О компании"
        title="Производитель москитных сеток в Орле"
        description="ИДЕАЛ — это собственное производство, опытная команда и более 10 лет на рынке антимоскитных конструкций. Делаем качественные сетки для окон, дверей и балконов."
        breadcrumb={
          <Breadcrumbs items={[{ title: "О компании" }]} className="text-primary-foreground/70" />
        }
      >
        <div className="mt-6 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur">
          <div className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-accent">
            ИДЕАЛ в цифрах
          </div>
          <StatsCounter
            stats={[
              { value: 2014, label: "год основания", sublabel: "с этого всё началось" },
              { value: 5000, suffix: "+", label: "довольных клиентов", sublabel: "за 10 лет" },
              { value: 10, suffix: " лет", label: "на рынке Орла", sublabel: "собственный опыт" },
              { value: 2, suffix: " года", label: "гарантии", sublabel: "на изделие и монтаж" },
            ]}
          />
        </div>
      </PageHero>

      {/* Миссия и видение */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal direction="up">
              <Card className="corner-accent h-full p-6 sm:p-8">
                <div className="mb-4 grid size-14 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Target className="size-7" />
                </div>
                <h2 className="text-xl font-bold sm:text-2xl">Наша миссия</h2>
                <p className="mt-3 text-muted-foreground">
                  Делать жизнь в Орле комфортнее — защищать дома и квартиры от насекомых, пыльцы и
                  пыли без ущерба для эстетики окон. Мы верим, что качественная москитная сетка
                  должна быть доступна каждой семье, а сервис — на уровне премиум-сегмента.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={100} direction="up">
              <Card className="corner-accent h-full p-6 sm:p-8">
                <div className="mb-4 grid size-14 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Eye className="size-7" />
                </div>
                <h2 className="text-xl font-bold sm:text-2xl">Наше видение</h2>
                <p className="mt-3 text-muted-foreground">
                  Быть первым производителем москитных сеток в Орловской области, к которому
                  обращаются за качеством и надёжностью. Развивать производство, внедрять
                  инновационные материалы и расширять географию обслуживания.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" className="-my-2" />

      {/* Ценности */}
      <section className="bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Принципы"
            title="Наши ценности"
            description="Четыре принципа, которыми мы руководствуемся в работе с каждым клиентом."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} direction="up">
                <Card className="card-hover group h-full p-5">
                  <div className="mb-3 grid size-12 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="font-semibold leading-tight">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="gold-line" className="-my-2" />

      {/* История / Timeline */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="История"
            title="Путь ИДЕАЛ с 2014 года"
            description="Ключевые этапы развития компании за более чем 10 лет работы."
          />
          <div className="relative mt-10">
            {/* Вертикальная линия */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30 sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <Reveal
                  key={item.year}
                  delay={i * 80}
                  direction={i % 2 === 0 ? "right" : "left"}
                >
                  <div
                    className={`relative flex items-start gap-6 sm:w-1/2 ${
                      i % 2 === 0
                        ? "sm:ml-0 sm:pr-12"
                        : "sm:ml-auto sm:flex-row-reverse sm:pl-12"
                    }`}
                  >
                    {/* Точка на линии */}
                    <div className="absolute left-4 top-2 z-10 grid size-3 -translate-x-1/2 place-items-center rounded-full bg-accent ring-4 ring-background sm:left-auto sm:right-0 sm:translate-x-1/2">
                      <div className="size-1.5 rounded-full bg-accent-foreground" />
                    </div>

                    <div className="ml-8 sm:ml-0">
                      <Badge className="mb-2 bg-primary text-primary-foreground">
                        {item.year}
                      </Badge>
                      <Card className="card-hover p-4">
                        <h3 className="font-semibold leading-tight">{item.title}</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
                      </Card>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="dots" className="-my-2" />

      {/* Команда */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Команда"
            title="Кто делает ИДЕАЛ"
            description="Опытные специалисты, которые отвечают за качество каждой москитной сетки — от замера до монтажа."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 80} direction="up">
                <Card className="card-hover group h-full overflow-hidden p-0">
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-3 pt-8">
                      <div className="flex items-center gap-1.5 text-xs text-accent">
                        <member.icon className="size-3.5" />
                        {member.department}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold leading-tight transition-colors group-hover:text-primary">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-accent">{member.role}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{member.experience}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="gold-line" className="-my-2" />

      {/* Производство */}
      <section className="bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <Reveal direction="up">
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Производство"
                  title="Собственная фабрика в Орле"
                  description="Полный цикл изготовления: от закупки алюминиевого профиля до натяжки полотна и сборки фурнитуры."
                />
                <p className="mt-4 text-muted-foreground">
                  Производство расположено по адресу {SITE.address}. Мы не работаем через
                  посредников — все заказы изготавливаем сами, что позволяет контролировать качество
                  на каждом этапе и держать честные цены.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/galereya">Смотреть работы</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/kontakty">Как добраться</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100} direction="up">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Ruler, label: "Замер", value: "Бесплатно" },
                  { icon: Factory, label: "Изготовление", value: "1-2 дня" },
                  { icon: Wrench, label: "Монтаж", value: "Под ключ" },
                  { icon: ShieldCheck, label: "Гарантия", value: "2 года" },
                ].map((item) => (
                  <Card key={item.label} className="p-4">
                    <item.icon className="mb-2 size-6 text-accent" />
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="text-lg font-bold text-primary">{item.value}</div>
                  </Card>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <Card className="relative overflow-hidden border-0 bg-primary p-8 text-primary-foreground sm:p-10">
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="grid size-16 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                <Heart className="size-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Хотите стать нашим клиентом?</h2>
                <p className="mt-2 text-primary-foreground/80">
                  Позвоните или оставьте заявку — бесплатно проконсультируем, поможем выбрать
                  оптимальную конструкцию и рассчитаем стоимость. Более 5000 семей в Орле уже
                  доверили нам защиту своих окон.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href={SITE.phoneHref}>
                      <Phone className="size-4" /> {SITE.phone}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Link href="/kalkulyator">Рассчитать стоимость</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Есть вопросы о нашей компании?"
        text="Свяжитесь с нами — расскажем о производстве, материалах и поможем выбрать москитную сетку под ваш проём."
      />
    </>
  );
}
