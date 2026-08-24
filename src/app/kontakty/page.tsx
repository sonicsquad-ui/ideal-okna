import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBanner } from "@/components/site/cta-banner";
import { LeadForm } from "@/components/site/lead-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Navigation,
  MessageSquare,
  Send,
} from "lucide-react";
import { SITE, DISTRICTS } from "@/lib/site-data";

export const metadata: Metadata = {
  title:
    "Контакты — ИДЕАЛ москитные сетки в Орле, Сурена-Шаумяна 35",
  description:
    "Контакты компании ИДЕАЛ в Орле: телефон +7 953 618 75 96, адрес ул. Сурена-Шаумяна, 35. Режим работы: Пн-Пт 9.00-19.00, Сб 9.00-15.00. Бесплатный выезд замерщика по всем районам Орла.",
  alternates: { canonical: "/kontakty" },
};

export const revalidate = 3600;

const CONTACTS = [
  {
    icon: Phone,
    title: "Телефон",
    lines: [SITE.phone],
    href: SITE.phoneHref,
    hint: "Звоните в рабочее время",
  },
  {
    icon: MapPin,
    title: "Адрес",
    lines: [SITE.address],
    href: "https://yandex.ru/maps/?text=Орёл, Сурена-Шаумяна 35",
    hint: "Производство и офис продаж",
  },
  {
    icon: Clock,
    title: "Режим работы",
    lines: ["Пн-Пт: 9.00-19.00", "Сб: 9.00-15.00", "Вс: выходной"],
    hint: "Приём заявок на сайте — круглосуточно",
  },
  {
    icon: Mail,
    title: "Email",
    lines: [SITE.email],
    href: `mailto:${SITE.email}`,
    hint: "Для документов и вопросов",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ИДЕАЛ — москитные сетки в Орле",
  image: `${SITE.url}/hero-bg.jpeg`,
  logo: `${SITE.url}/logo-ideal.png`,
  "@id": `${SITE.url}/kontakty`,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: "₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Сурена-Шаумяна, 35",
    addressLocality: "Орёл",
    addressRegion: "Орловская область",
    postalCode: "302028",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.9654,
    longitude: 36.0785,
  },
  hasMap: "https://yandex.ru/maps/?text=Орёл, Сурена-Шаумяна 35",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "15:00",
    },
  ],
  areaServed: DISTRICTS.map((d) => ({
    "@type": "AdministrativeArea",
    name: d,
  })),
};

export default function ContactsPage() {
  const mapSrc =
    "https://yandex.ru/map-widget/v1/?text=Орёл, Сурена-Шаумяна 35";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <PageHero
        eyebrow="Контакты"
        title="Контакты — ИДЕАЛ москитные сетки в Орле"
        description="Производство и офис продаж по адресу ул. Сурена-Шаумяна, 35. Звоните, пишите или оставляйте заявку — перезвоним в течение 15 минут в рабочее время."
        breadcrumb={
          <Breadcrumbs
            items={[{ title: "Контакты" }]}
            className="text-primary-foreground/70"
          />
        }
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg">
            <a href={SITE.phoneHref}>
              <Phone className="size-4" /> {SITE.phone}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`mailto:${SITE.email}`}>
              <Mail className="size-4" /> Написать на почту
            </a>
          </Button>
        </div>
      </PageHero>

      {/* Карточки контактов */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACTS.map((c) => {
              const Icon = c.icon;
              const content = (
                <Card className="group flex h-full flex-col gap-3 p-5 transition-all hover:border-primary hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-semibold">{c.title}</h3>
                  </div>
                  <div className="space-y-1">
                    {c.lines.map((line) => (
                      <p
                        key={line}
                        className={
                          c.title === "Телефон" || c.title === "Email"
                            ? "text-base font-semibold text-primary group-hover:text-accent"
                            : "text-sm text-foreground"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <p className="mt-auto text-xs text-muted-foreground">
                    {c.hint}
                  </p>
                </Card>
              );
              return c.href ? (
                <a
                  key={c.title}
                  href={c.href}
                  className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
                >
                  {content}
                </a>
              ) : (
                <div key={c.title} className="h-full">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Карта + районы выезда */}
      <section className="border-t bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Карта */}
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <iframe
                  src={mapSrc}
                  title="Карта: Орёл, ул. Сурена-Шаумяна, 35"
                  className="absolute inset-0 size-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <div className="font-semibold">{SITE.address}</div>
                    <div className="text-sm text-muted-foreground">
                      {SITE.workHours}
                    </div>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://yandex.ru/maps/?text=Орёл, Сурена-Шаумяна 35"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="size-4" /> Построить маршрут
                  </a>
                </Button>
              </div>
            </Card>

            {/* Районы выезда */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="size-5 text-accent" />
                <h2 className="text-lg font-semibold">Районы выезда</h2>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Бесплатный выезд замерщика по всем районам Орла и пригороду.
                Изготовление и доставка — по городу и Орловской области.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {DISTRICTS.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    <span className="size-1.5 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">Бесплатный замер по Орлу</Badge>
                <Badge variant="secondary">Выезд в область</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Форма обратной связи */}
      <section id="callback" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <SectionHeading
            eyebrow="Обратная связь"
            title="Остались вопросы? Напишите нам"
            description="Оставьте контакты — перезвоним в течение 15 минут в рабочее время и ответим на все вопросы по москитным сеткам."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.4fr]">
            <Card className="flex flex-col gap-3 bg-primary p-6 text-primary-foreground">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-5 text-accent" />
                <h3 className="font-semibold">Контактная информация</h3>
              </div>
              <div className="space-y-3 text-sm">
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2 hover:text-accent"
                >
                  <Phone className="size-4 text-accent" /> {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 hover:text-accent"
                >
                  <Mail className="size-4 text-accent" /> {SITE.email}
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{SITE.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{SITE.workHours}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Send className="size-5 text-primary" />
                <h3 className="font-semibold">Заявка на обратный звонок</h3>
              </div>
              <LeadForm
                type="contact"
                source="Страница контакты"
                submitLabel="Перезвоните мне"
                showComment={false}
                compact
              />
            </Card>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Не знаете, какая сетка вам нужна?"
        text="Позвоните или закажите обратный звонок — поможем выбрать конструкцию и полотно под ваш проём и бюджет."
      />
    </>
  );
}
