"use client";

import * as React from "react";
import { CheckCircle2, X } from "lucide-react";

interface OrderPulse {
  id: number;
  name: string;
  district: string;
  product: string;
  time: string;
}

const SAMPLE_ORDERS = [
  { name: "Анна", district: "Северный район", product: "Рамочная сетка антикошка, 2 шт" },
  { name: "Игорь", district: "Советский район", product: "Раздвижная система на балкон" },
  { name: "Марина", district: "Заводской район", product: "Рамочная сетка, 4 окна" },
  { name: "Сергей", district: "Железнодорожный район", product: "Дверная распашная сетка" },
  { name: "Ольга", district: "Северный район", product: "Рулонная сетка на мансарду" },
  { name: "Дмитрий", district: "Советский район", product: "Плиссе на террасу" },
  { name: "Елена", district: "Заводской район", product: "Перетяжка полотна, 3 шт" },
  { name: "Павел", district: "Орловская обл.", product: "Цветная сетка по RAL, 5 шт" },
  { name: "Татьяна", district: "Северный район", product: "Антипыльца Poll-Tex, 3 окна" },
  { name: "Виктор", district: "Железнодорожный район", product: "Рамочная стандарт, 2 шт" },
];

function timeAgo(min: number) {
  if (min < 1) return "только что";
  if (min < 60) return `${min} мин назад`;
  const h = Math.floor(min / 60);
  return `${h} ч назад`;
}

export function LiveOrderToast() {
  const [current, setCurrent] = React.useState<OrderPulse | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const idxRef = React.useRef(0);
  const minRef = React.useRef(2);

  const showNext = React.useCallback(() => {
    if (dismissed) return;
    const order = SAMPLE_ORDERS[idxRef.current % SAMPLE_ORDERS.length];
    idxRef.current += 1;
    setCurrent({
      id: Date.now(),
      ...order,
      time: timeAgo(minRef.current),
    });
    setVisible(true);
    minRef.current += Math.floor(Math.random() * 7) + 3;
    // скрыть через 6 секунд
    setTimeout(() => setVisible(false), 6000);
  }, [dismissed]);

  React.useEffect(() => {
    if (dismissed) return;
    // первый показ через 8 секунд
    const first = setTimeout(showNext, 8000);
    // затем каждые 18 секунд
    const interval = setInterval(showNext, 18000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [showNext, dismissed]);

  if (dismissed || !current) return null;

  return (
    <div
      className={`fixed bottom-20 left-4 z-40 max-w-[300px] sm:bottom-24 sm:left-6 ${
        visible ? "animate-slide-in-left" : "animate-slide-out-left"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-start gap-3 rounded-xl border bg-card p-3.5 shadow-lg">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 className="size-5" />
        </div>
        <div className="flex-1 text-sm">
          <div className="font-semibold leading-tight">
            {current.name}, {current.district}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">{current.product}</div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-accent">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent" />
            {current.time} · новый заказ
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Закрыть"
          className="absolute right-1.5 top-1.5 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
