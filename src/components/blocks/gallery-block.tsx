"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Square,
  MoveHorizontal,
  AlignHorizontalJustifyCenter,
  DoorOpen,
  Blinds,
  Shapes,
  Maximize2,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

type CategoryKey =
  | "ramochnye"
  | "razdvizhnye"
  | "plisse"
  | "dvernye"
  | "rulonnye"
  | "nestandartnye";

interface GalleryItem {
  id: number;
  category: CategoryKey;
  icon: React.ComponentType<{ className?: string }>;
  caption: string;
  meta: string;
  gradient: string;
  image?: string;
  real?: boolean;
}

const CATEGORIES: { key: "all" | CategoryKey; title: string; icon?: React.ComponentType<{ className?: string }> }[] = [
  { key: "all", title: "Все" },
  { key: "ramochnye", title: "Рамочные", icon: Square },
  { key: "razdvizhnye", title: "Раздвижные", icon: MoveHorizontal },
  { key: "plisse", title: "Плиссе", icon: AlignHorizontalJustifyCenter },
  { key: "dvernye", title: "Дверные", icon: DoorOpen },
  { key: "rulonnye", title: "Рулонные", icon: Blinds },
  { key: "nestandartnye", title: "Нестандартные", icon: Shapes },
];

// Реалистичные подписи к работам — без фотографий, используем градиенты + иконку
const GALLERY_ITEMS: GalleryItem[] = [
  // Рамочные
  {
    id: 1,
    category: "ramochnye",
    icon: Square,
    caption: "Рамочная сетка антикошка",
    meta: "Северный район, 3 окна",
    gradient: "from-primary/80 via-primary/60 to-accent/30",
    image: "/gallery/frame-window.jpg",
    real: true,
  },
  {
    id: 2,
    category: "ramochnye",
    icon: Square,
    caption: "Рамочная сетка с перемычкой",
    meta: "Заводской район, окно 1,4 × 1,6 м",
    gradient: "from-primary/70 via-primary/50 to-accent/40",
  },
  {
    id: 3,
    category: "ramochnye",
    icon: Square,
    caption: "Рамочная сетка Poll-Tex",
    meta: "Советский район, квартира",
    gradient: "from-accent/40 via-primary/60 to-primary/80",
    image: "/gallery/frame-pet.jpg",
    real: true,
  },
  {
    id: 4,
    category: "ramochnye",
    icon: Square,
    caption: "Комплект из 5 рамочных сеток",
    meta: "Железнодорожный район, ПВХ",
    gradient: "from-primary/60 via-accent/30 to-primary/70",
    image: "/gallery/frame-window.jpg",
    real: true,
  },
  // Раздвижные
  {
    id: 5,
    category: "razdvizhnye",
    icon: MoveHorizontal,
    caption: "Раздвижная система Provedal",
    meta: "Балкон, Северный район",
    gradient: "from-primary/70 via-primary/40 to-accent/30",
    image: "/gallery/sliding-balcony.jpg",
    real: true,
  },
  {
    id: 6,
    category: "razdvizhnye",
    icon: MoveHorizontal,
    caption: "Раздвижные сетки Slidors",
    meta: "Лоджия 6 м, Заводской район",
    gradient: "from-accent/30 via-primary/50 to-primary/80",
    image: "/gallery/sliding-balcony2.jpg",
    real: true,
  },
  {
    id: 7,
    category: "razdvizhnye",
    icon: MoveHorizontal,
    caption: "Раздвижная система с щёточным уплотнителем",
    meta: "Балкон, Советский район",
    gradient: "from-primary/80 via-primary/50 to-accent/40",
  },
  // Плиссе
  {
    id: 8,
    category: "plisse",
    icon: AlignHorizontalJustifyCenter,
    caption: "Сетка-плиссе на террасу",
    meta: "Частный дом, проём 2,8 м",
    gradient: "from-accent/50 via-primary/50 to-primary/80",
    image: "/gallery/pleated-terrace.jpg",
    real: true,
  },
  {
    id: 9,
    category: "plisse",
    icon: AlignHorizontalJustifyCenter,
    caption: "Плиссе двустороннее открывание",
    meta: "Веранда, Орловская обл.",
    gradient: "from-primary/60 via-accent/40 to-primary/70",
    image: "/gallery/pleated-terrace2.jpg",
    real: true,
  },
  // Дверные
  {
    id: 10,
    category: "dvernye",
    icon: DoorOpen,
    caption: "Дверная распашная сетка",
    meta: "Частный дом, входная группа",
    gradient: "from-primary/70 via-primary/40 to-accent/50",
    image: "/gallery/door-magnetic.jpg",
    real: true,
  },
  {
    id: 11,
    category: "dvernye",
    icon: DoorOpen,
    caption: "Дверная сетка с доводчиком",
    meta: "Дача, магнитная защёлка",
    gradient: "from-accent/40 via-primary/60 to-primary/80",
    image: "/gallery/door-magnetic2.jpg",
    real: true,
  },
  // Рулонные
  {
    id: 12,
    category: "rulonnye",
    icon: Blinds,
    caption: "Рулонная сетка на мансарду Fakro",
    meta: "Мансардное окно, Северный район",
    gradient: "from-primary/60 via-primary/50 to-accent/30",
    image: "/gallery/roller-mansard.jpg",
    real: true,
  },
  {
    id: 13,
    category: "rulonnye",
    icon: Blinds,
    caption: "Рулонная система с цепочкой",
    meta: "Высокий проём 2,2 м, Заводской район",
    gradient: "from-accent/40 via-primary/50 to-primary/80",
    image: "/gallery/roller-chain.jpg",
    real: true,
  },
  // Нестандартные
  {
    id: 14,
    category: "nestandartnye",
    icon: Shapes,
    caption: "Арочная москитная сетка",
    meta: "Эркер, частный дом",
    gradient: "from-primary/70 via-accent/40 to-primary/60",
    image: "/gallery/custom-arch.jpg",
    real: true,
  },
  {
    id: 15,
    category: "nestandartnye",
    icon: Shapes,
    caption: "Цветная сетка по RAL 7016",
    meta: "Антрацит, частный дом",
    gradient: "from-primary/80 via-primary/50 to-accent/40",
  },
  {
    id: 16,
    category: "nestandartnye",
    icon: Shapes,
    caption: "Трапециевидная сетка",
    meta: "Мансарда, нестандартная геометрия",
    gradient: "from-accent/50 via-primary/60 to-primary/70",
    image: "/gallery/custom-trapezoid.jpg",
    real: true,
  },
];

export function GalleryBlock() {
  const [active, setActive] = React.useState<"all" | CategoryKey>("all");
  const [selected, setSelected] = React.useState<GalleryItem | null>(null);

  const filtered = React.useMemo(
    () => (active === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active)),
    [active]
  );

  return (
    <>
      {/* Категории */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
              )}
            >
              {Icon && <Icon className="size-4" />}
              {cat.title}
              <span
                className={cn(
                  "ml-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                  isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-muted-foreground"
                )}
              >
                {cat.key === "all"
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((i) => i.category === cat.key).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Сетка карточек */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, idx) => (
          <Reveal key={item.id} delay={(idx % 4) * 80} direction="up">
          <button
            type="button"
            onClick={() => setSelected(item)}
            className="group block h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`Открыть фото: ${item.caption}`}
          >
            <Card className="overflow-hidden p-0 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
              <div className={cn("relative flex aspect-[4/3] items-center justify-center overflow-hidden", item.real ? "" : "bg-gradient-to-br " + item.gradient)}>
                {item.real && item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.caption}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <item.icon className="size-12 text-primary-foreground/90 drop-shadow-sm transition-transform duration-500 group-hover:scale-110" />
                  </>
                )}
                <Badge className="absolute left-2 top-2 bg-primary-foreground/15 text-primary-foreground backdrop-blur-sm">
                  {CATEGORIES.find((c) => c.key === item.category)?.title}
                </Badge>
                {item.real && (
                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                    <Camera className="size-3" /> Фото
                  </span>
                )}
                <span className="absolute bottom-2 right-2 grid size-8 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <Maximize2 className="size-4" />
                </span>
              </div>
              <div className="p-3">
                <div className="line-clamp-2 text-sm font-semibold leading-tight">{item.caption}</div>
                <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">{item.meta}</div>
              </div>
            </Card>
          </button>
          </Reveal>
        ))}
      </div>

      {/* Лайтбокс */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
          {selected && (
            <>
              <div className={cn("relative flex aspect-[16/10] items-center justify-center overflow-hidden", selected.real ? "" : "bg-gradient-to-br " + selected.gradient)}>
                {selected.real && selected.image ? (
                  <img src={selected.image} alt={selected.caption} className="size-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <selected.icon className="size-24 text-primary-foreground/90 drop-shadow" />
                  </>
                )}
                <Badge className="absolute left-4 top-4 bg-primary-foreground/15 text-primary-foreground backdrop-blur-sm">
                  {CATEGORIES.find((c) => c.key === selected.category)?.title}
                </Badge>
                {selected.real && (
                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    <Camera className="size-3.5" /> Фото работы
                  </span>
                )}
              </div>
              <DialogHeader className="px-6 pb-6 pt-4">
                <DialogTitle className="text-xl">{selected.caption}</DialogTitle>
                <DialogDescription className="text-sm">
                  {selected.meta}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
