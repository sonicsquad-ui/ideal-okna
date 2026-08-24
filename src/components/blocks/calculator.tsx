"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Frame,
  DoorOpen,
  AlignHorizontalJustifyCenter,
  Blinds as Roller,
  Triangle,
  Shapes,
  Cat,
  Grid3x3,
  Sparkles,
  Flower2,
  ShieldCheck,
  Eye,
  Calculator as CalcIcon,
  Loader2,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LeadForm } from "@/components/site/lead-form";

type Option = {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  basePrice: number; // базовая цена за изделие (рамочные/дверные)
  perM2?: boolean; // если true — цена за м²
  desc: string;
};

const CONSTRUCTION_OPTIONS: Option[] = [
  { value: "frame", label: "Рамочная", icon: Frame, basePrice: 900, desc: "Окно ПВХ, стандарт" },
  { value: "door", label: "Дверная", icon: DoorOpen, basePrice: 3500, desc: "Распашная на петлях" },
  { value: "sliding", label: "Раздвижная", icon: AlignHorizontalJustifyCenter, basePrice: 2800, desc: "Балкон Provedal" },
  { value: "roller", label: "Рулонная", icon: Roller, basePrice: 4200, desc: "Роллетная / мансарда" },
  { value: "pleated", label: "Плиссе", icon: AlignHorizontalJustifyCenter, basePrice: 8500, perM2: true, desc: "Гармошка, портал" },
  { value: "mansard", label: "Мансардная", icon: Triangle, basePrice: 4800, desc: "Под углом" },
  { value: "custom", label: "Нестандартная", icon: Shapes, basePrice: 1800, desc: "Арка, трапеция" },
];

const CANVAS_OPTIONS: Option[] = [
  { value: "fiberglass", label: "Fiberglass", icon: Grid3x3, basePrice: 0, desc: "Стандарт, +0 ₽" },
  { value: "pet", label: "Антикошка", icon: Cat, basePrice: 900, desc: "Pet Screen, +900 ₽" },
  { value: "micro", label: "Антипыль", icon: Sparkles, basePrice: 500, desc: "Micro Mesh, +500 ₽" },
  { value: "pollen", label: "Антипыльца", icon: Flower2, basePrice: 700, desc: "Poll-Tex, +700 ₽" },
  { value: "ultravue", label: "Ультравью", icon: Eye, basePrice: 800, desc: "Прозрачная, +800 ₽" },
  { value: "metal", label: "Антивандальная", icon: ShieldCheck, basePrice: 1300, desc: "Сталь, +1300 ₽" },
];

const MOUNT_PRICE = 500; // монтаж за изделие
const RAL_SURCHARGE = 0.25; // покраска +25%

function formatPrice(n: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " ₽";
}

export function Calculator() {
  const [construction, setConstruction] = React.useState("frame");
  const [canvas, setCanvas] = React.useState("fiberglass");
  const [width, setWidth] = React.useState("1300");
  const [height, setHeight] = React.useState("1500");
  const [quantity, setQuantity] = React.useState(1);
  const [mount, setMount] = React.useState(true);
  const [ral, setRal] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const w = Math.max(0, Number(width) || 0);
  const h = Math.max(0, Number(height) || 0);
  const areaM2 = (w * h) / 1_000_000; // мм → м²

  const calc = React.useMemo(() => {
    const cons = CONSTRUCTION_OPTIONS.find((c) => c.value === construction)!;
    const canv = CANVAS_OPTIONS.find((c) => c.value === canvas)!;

    let unitPrice: number;
    if (cons.perM2) {
      // плиссе — цена за м², минимум за 1 м²
      const effArea = Math.max(areaM2, 1);
      unitPrice = (cons.basePrice + canv.basePrice) * effArea;
    } else {
      // стандартная площадь до 1.5 м² без наценки, далее +15% за каждые 0.5 м²
      let sizeFactor = 1;
      if (areaM2 > 1.5) {
        sizeFactor = 1 + Math.ceil((areaM2 - 1.5) / 0.5) * 0.15;
      }
      unitPrice = (cons.basePrice + canv.basePrice) * sizeFactor;
    }

    if (ral) unitPrice *= 1 + RAL_SURCHARGE;

    const mountCost = mount ? MOUNT_PRICE : 0;
    const perItem = unitPrice + mountCost;
    const total = perItem * quantity;

    return { unitPrice, mountCost, perItem, total, cons, canv };
  }, [construction, canvas, areaM2, mount, ral, quantity]);

  const calcData = {
    construction: calc.cons.label,
    canvas: calc.canv.label,
    width: `${w} мм`,
    height: `${h} мм`,
    quantity,
    mounting: mount ? "да" : "нет",
    ralColor: ral ? "да" : "нет",
    perItem: formatPrice(calc.perItem),
    total: formatPrice(calc.total),
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* Левая часть — настройки */}
      <Card className="p-5 sm:p-6">
        <div className="space-y-6">
          {/* Тип конструкции */}
          <div>
            <Label className="mb-2 block text-sm font-semibold">1. Тип конструкции</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CONSTRUCTION_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = construction === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setConstruction(opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all hover:border-primary",
                      active && "border-primary bg-primary/5 ring-1 ring-primary"
                    )}
                  >
                    <Icon className={cn("size-6", active ? "text-primary" : "text-muted-foreground")} />
                    <span className="text-xs font-medium">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Тип полотна */}
          <div>
            <Label className="mb-2 block text-sm font-semibold">2. Тип полотна</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CANVAS_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = canvas === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCanvas(opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all hover:border-primary",
                      active && "border-primary bg-primary/5 ring-1 ring-primary"
                    )}
                  >
                    <Icon className={cn("size-6", active ? "text-primary" : "text-muted-foreground")} />
                    <span className="text-xs font-medium">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Размеры */}
          <div>
            <Label className="mb-2 block text-sm font-semibold">3. Размеры проёма (мм)</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="calc-w" className="text-xs text-muted-foreground">Ширина</Label>
                <Input
                  id="calc-w"
                  type="number"
                  min="300"
                  max="3000"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="calc-h" className="text-xs text-muted-foreground">Высота</Label>
                <Input
                  id="calc-h"
                  type="number"
                  min="300"
                  max="3000"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Площадь: {areaM2.toFixed(2)} м²
            </p>
          </div>

          {/* Количество */}
          <div>
            <Label htmlFor="calc-q" className="mb-2 block text-sm font-semibold">4. Количество</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </Button>
              <Input
                id="calc-q"
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                className="w-20 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.min(50, q + 1))}
              >
                +
              </Button>
            </div>
          </div>

          {/* Опции */}
          <div className="space-y-3">
            <Label className="block text-sm font-semibold">5. Дополнительные опции</Label>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Монтаж под ключ</div>
                <div className="text-xs text-muted-foreground">+{formatPrice(MOUNT_PRICE)} за изделие</div>
              </div>
              <Switch checked={mount} onCheckedChange={setMount} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <div className="text-sm font-medium">Покраска профиля по RAL</div>
                <div className="text-xs text-muted-foreground">+25% к стоимости</div>
              </div>
              <Switch checked={ral} onCheckedChange={setRal} />
            </div>
          </div>
        </div>
      </Card>

      {/* Правая часть — результат */}
      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <Card className="overflow-hidden border-0 bg-primary p-5 text-primary-foreground sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-accent">
            <CalcIcon className="size-4" /> Предварительный расчёт
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between gap-2">
              <span className="text-primary-foreground/70">Конструкция:</span>
              <span className="font-medium">{calc.cons.label}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-primary-foreground/70">Полотно:</span>
              <span className="font-medium">{calc.canv.label}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-primary-foreground/70">Размер:</span>
              <span className="font-medium">{w} × {h} мм</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-primary-foreground/70">Количество:</span>
              <span className="font-medium">{quantity} шт</span>
            </div>
            <Separator className="my-2 bg-primary-foreground/15" />
            <div className="flex justify-between gap-2">
              <span className="text-primary-foreground/70">За 1 изделие:</span>
              <span className="font-medium">{formatPrice(calc.perItem)}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-primary-foreground/70">в т.ч. монтаж:</span>
              <span className="font-medium">{mount ? formatPrice(calc.mountCost) : "—"}</span>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-accent/15 p-3">
            <div className="text-xs text-accent">Итого:</div>
            <div className="text-3xl font-extrabold text-accent">{formatPrice(calc.total)}</div>
          </div>

          <p className="mt-3 text-xs text-primary-foreground/60">
            * Предварительный расчёт. Точная стоимость определяется после бесплатного замера.
          </p>
        </Card>

        {submitted ? (
          <Card className="p-5 text-center">
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-accent/15 text-accent">
              <Check className="size-6" />
            </div>
            <h3 className="font-bold">Заявка отправлена!</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Перезвоним в течение 15 минут, подтвердим расчёт и согласуем замер.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
              Рассчитать ещё раз
            </Button>
          </Card>
        ) : (
          <Card className="p-5">
            <h3 className="mb-1 font-semibold">Заказать по этому расчёту</h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Оставьте контакты — отправим расчёт и предложим бесплатный замер.
            </p>
            <LeadForm
              type="calculator"
              source="Калькулятор стоимости"
              showComment={false}
              submitLabel="Заказать по расчёту"
              onSuccess={() => setSubmitted(true)}
              compact
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-[10px]">Замер бесплатно</Badge>
              <Badge variant="secondary" className="text-[10px]">Гарантия 2 года</Badge>
              <Badge variant="secondary" className="text-[10px]">Изготовление 1-2 дня</Badge>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
