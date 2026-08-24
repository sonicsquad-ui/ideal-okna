import type { Metadata } from "next";
import { CatalogHubPage } from "@/components/site/catalog-hub-page";
import { CANVASES, CONSTRUCTIONS, COMPONENTS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Типы полотен москитных сеток — Fiberglass, антикошка, антипыльца",
  description:
    "Все типы полотен для москитных сеток: стандартное стекловолокно, антикошка, антипыль, антипыльца, ультравью, антивандальные, цветные по RAL. Подбор под задачу.",
  alternates: { canonical: "/katalog/polotna" },
};

export default function CanvasesHubPage() {
  return (
    <CatalogHubPage
      eyebrow="Каталог полотен"
      title="Типы полотен и назначения"
      description="Материалы для решения специфических бытовых проблем: от базовой защиты от комаров до специализированных антиаллергенных и антивандальных полотен."
      items={CANVASES}
      basePath="/katalog/polotna"
      crossLinks={[
        { title: "Типы конструкций", href: "/katalog/konstrukcii", desc: "Рамочные, раздвижные, рулонные, плиссе" },
        { title: "Комплектующие", href: "/komplektuyushchie", desc: "Профиль, крепёж, фурнитура" },
        { title: "Полотно в рулонах", href: "/komplektuyushchie/polotno-v-rulonah", desc: "Все типы полотен на отрез" },
      ]}
    />
  );
}
