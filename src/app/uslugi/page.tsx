import type { Metadata } from "next";
import { CatalogHubPage } from "@/components/site/catalog-hub-page";
import { SERVICES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Услуги: замер, установка, ремонт и доставка москитных сеток в Орле",
  description:
    "Полный цикл услуг по москитным сеткам в Орле: бесплатный замер, профессиональный монтаж, ремонт (перетяжка, замена фурнитуры), доставка и оплата. Гарантия 2 года от ИДЕАЛ.",
  alternates: { canonical: "/uslugi" },
};

export default function ServicesHubPage() {
  return (
    <CatalogHubPage
      eyebrow="Услуги и сервис"
      title="Услуги и сервис"
      description="Полный цикл работ с москитными сетками в Орле: бесплатный замер, профессиональный монтаж, ремонт существующих конструкций и доставка по городу и области."
      items={SERVICES}
      basePath="/uslugi"
      crossLinks={[
        { title: "Цены на услуги", href: "/ceny", desc: "Актуальный прайс-лист" },
        { title: "Калькулятор", href: "/kalkulyator", desc: "Рассчитайте стоимость онлайн" },
        { title: "Гарантии", href: "/garantii", desc: "Гарантийные обязательства" },
      ]}
    />
  );
}
