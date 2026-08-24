"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  PartyPopper,
  Frame,
  DoorOpen,
  AlignHorizontalJustifyCenter,
  Blinds as Roller,
  Cat,
  Sparkles,
  Flower2,
  ShieldCheck,
  Grid3x3,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { label: string; value: string; desc?: string; icon?: React.ComponentType<{ className?: string }> };

const TYPE_OPTIONS: Option[] = [
  { label: "Окно (рамочная)", value: "frame", icon: Frame, desc: "Стандартное окно ПВХ" },
  { label: "Дверь (распашная)", value: "door", icon: DoorOpen, desc: "Входная или балконная дверь" },
  { label: "Балкон (раздвижная)", value: "sliding", icon: AlignHorizontalJustifyCenter, desc: "Provedal / Slidors" },
  { label: "Широкий портал (плиссе)", value: "pleated", icon: AlignHorizontalJustifyCenter, desc: "Терраса, веранда" },
  { label: "Рулонная / мансарда", value: "roller", icon: Roller, desc: "Роллетная или под углом" },
];

const TASK_OPTIONS: Option[] = [
  { label: "Защита от комаров", value: "standard", icon: Grid3x3, desc: "Стандарт Fiberglass" },
  { label: "Защита питомцев", value: "pet", icon: Cat, desc: "Антикошка Pet Screen" },
  { label: "Защита от пыли/мошки", value: "micro", icon: Sparkles, desc: "Micro Mesh" },
  { label: "Защита от пыльцы", value: "pollen", icon: Flower2, desc: "Poll-Tex антиаллергенная" },
  { label: "Антивандальная", value: "metal", icon: ShieldCheck, desc: "Металл, 1 этаж" },
];

const COUNT_OPTIONS: Option[] = [
  { label: "1 шт", value: "1" },
  { label: "2-3 шт", value: "2-3" },
  { label: "4-6 шт", value: "4-6" },
  { label: "Больше 6 шт", value: "6+" },
];

const STEPS = [
  { key: "type", title: "Тип проёма", subtitle: "Куда нужна москитная сетка?", options: TYPE_OPTIONS },
  { key: "task", title: "Функциональная задача", subtitle: "Что защищаем?", options: TASK_OPTIONS },
  { key: "count", title: "Количество", subtitle: "Сколько изделий нужно?", options: COUNT_OPTIONS },
] as const;

export function QuizBlock() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const totalSteps = STEPS.length + 1; // +1 для контактов
  const progress = ((step + (done ? 1 : 0)) / totalSteps) * 100;

  const select = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 220);
  };

  const submit = async () => {
    if (!name || name.trim().length < 2) {
      toast.error("Введите имя");
      return;
    }
    const phoneOk = /^[\d\s+()\-]{10,}$/.test(phone);
    if (!phoneOk) {
      toast.error("Введите корректный телефон");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          type: "quiz",
          source: "Квиз на главной странице",
          data: answers,
        }),
      });
      if (!res.ok) throw new Error("err");
      setDone(true);
      toast.success("Заявка отправлена!");
    } catch {
      toast.error("Ошибка отправки. Позвоните: +7 953 618 75 96");
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setDone(false);
    setStep(0);
    setAnswers({});
    setName("");
    setPhone("");
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const current = STEPS[step];
  const isContactStep = step === STEPS.length;

  return (
    <Card className="relative overflow-hidden border-0 bg-card p-5 shadow-lg sm:p-7">
      <div className="absolute -right-20 -top-20 size-48 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative">
        {/* Прогресс */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {done ? "✓" : step + 1}
            </span>
            Шаг {Math.min(step + 1, totalSteps)} из {totalSteps}
          </div>
          <span className="text-xs text-muted-foreground">
            {done ? "Готово" : current?.title}
          </span>
        </div>
        <Progress value={progress} className="mb-6 h-1.5" />

        {done ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-accent/15 text-accent">
              <PartyPopper className="size-8" />
            </div>
            <h3 className="text-xl font-bold">Заявка принята!</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Спасибо! Наш менеджер перезвонит вам в течение 15 минут в рабочее время,
              проконсультирует и рассчитает точную стоимость.
            </p>
            <Button onClick={restart} variant="outline" className="mt-5">
              Пройти заново
            </Button>
          </div>
        ) : isContactStep ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold">Почти готово! Куда отправить расчёт?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Введите контакты — перезвоним и назовём точную цену.
              </p>
            </div>
            {/* Сводка выборов */}
            <div className="rounded-lg bg-muted/60 p-3">
              <div className="grid gap-1.5 text-sm">
                {STEPS.map((s) => {
                  const opt = s.options.find((o) => o.value === answers[s.key]);
                  return (
                    <div key={s.key} className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">{s.title}:</span>
                      <span className="font-medium text-right">{opt?.label ?? "—"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="qz-name" className="text-sm">Ваше имя</Label>
                <Input
                  id="qz-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="qz-phone" className="text-sm">Телефон</Label>
                <Input
                  id="qz-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={back} disabled={submitting}>
                <ArrowLeft className="size-4" /> Назад
              </Button>
              <Button onClick={submit} disabled={submitting} className="flex-1">
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Отправляем...
                  </>
                ) : (
                  <>
                    Получить расчёт <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold">{current.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{current.subtitle}</p>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {current.options.map((opt) => {
                const Icon = opt.icon;
                const active = answers[current.key] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => select(current.key, opt.value)}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg border p-3 text-left transition-all hover:border-primary hover:bg-accent/10",
                      active && "border-primary bg-accent/10 ring-1 ring-primary"
                    )}
                  >
                    {Icon && (
                      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                    )}
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">{opt.label}</span>
                      {opt.desc && (
                        <span className="block text-xs text-muted-foreground">{opt.desc}</span>
                      )}
                    </span>
                    {active && <Check className="size-4 text-primary" />}
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <Button variant="ghost" size="sm" onClick={back} className="text-muted-foreground">
                <ArrowLeft className="size-4" /> Назад
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
