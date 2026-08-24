import type { Metadata } from "next";
import { CatalogHubPage } from "@/components/site/catalog-hub-page";
import { CONSTRUCTIONS, CANVASES, COMPONENTS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Типы конструкций москитных сеток — рамочные, раздвижные, плиссе, рулонные",
  description:
    "Все типы конструкций москитных сеток в Орле: рамочные, раздвижные, рулонные, плиссе, дверные, мансардные и нестандартные. Изготовление и монтаж от производителя ИДЕАЛ.",
  alternates: { canonical: "/katalog/konstrukcii" },
};

export default function ConstructionsHubPage() {
  return (
    <CatalogHubPage
      eyebrow="Каталог конструкций"
      title="Типы конструкций москитных сеток"
      description="Инженерные решения для каждого типа проёма — от классических рамочных до премиальных плиссе-систем. Перекрываем любые световые проёмы с сохранением эстетики фасада."
      items={CONSTRUCTIONS}
      basePath="/katalog/konstrukcii"
      crossLinks={[
        { title: "Типы полотен", href: "/katalog/polotna", desc: "Fiberglass, антикошка, антипыльца, антивандальные" },
        { title: "Комплектующие", href: "/komplektuyushchie", desc: "Профиль, крепёж, фурнитура, полотно в рулонах" },
        { title: "Услуги", href: "/uslugi", desc: "Замер, монтаж, ремонт, доставка" },
      ]}
    />
  );
}
