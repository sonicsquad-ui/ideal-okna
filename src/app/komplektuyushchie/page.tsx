import type { Metadata } from "next";
import { CatalogHubPage } from "@/components/site/catalog-hub-page";
import { COMPONENTS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Комплектующие и фурнитура для москитных сеток в Орле",
  description:
    "Алюминиевый профиль, крепёжные элементы (Z-крепления, плунжеры, флажки), фиксирующий шнур, фурнитура и полотно в рулонах. Продажа оптом и в розницу от производителя ИДЕАЛ.",
  alternates: { canonical: "/komplektuyushchie" },
};

export default function ComponentsHubPage() {
  return (
    <CatalogHubPage
      eyebrow="Комплектующие"
      title="Комплектующие и фурнитура"
      description="Всё для производства и ремонта москитных сеток: алюминиевый профиль, крепёж, фиксирующий шнур, фурнитура и полотно в рулонах на отрез."
      items={COMPONENTS}
      basePath="/komplektuyushchie"
      crossLinks={[
        { title: "Типы конструкций", href: "/katalog/konstrukcii", desc: "Готовые москитные сетки" },
        { title: "Типы полотен", href: "/katalog/polotna", desc: "Все виды полотен" },
        { title: "Ремонт сеток", href: "/uslugi/remont", desc: "Перетяжка и замена фурнитуры" },
      ]}
    />
  );
}
