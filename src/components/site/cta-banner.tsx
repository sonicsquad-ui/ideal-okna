"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PhoneCall, Calculator, Ruler } from "lucide-react";
import { useCallbackModal } from "@/components/site/callback-context";

export function CtaBanner({
  title = "Готовы заказать москитные сетки?",
  text = "Бесплатный выезд замерщика по Орлу. Изготовление за 1-2 дня. Гарантия 2 года.",
}: {
  title?: string;
  text?: string;
}) {
  const { openModal } = useCallbackModal();
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <Card className="relative overflow-hidden border-0 bg-primary p-8 text-primary-foreground sm:p-12">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-balance text-2xl font-bold sm:text-3xl">{title}</h2>
              <p className="mt-3 text-primary-foreground/80 sm:text-lg">{text}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1.5">
                  <Ruler className="size-4 text-accent" /> Бесплатный замер
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="size-4 text-accent" /> Перезвоним за 15 минут
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => openModal("CTA-баннер")}
              >
                <PhoneCall className="size-4" /> Заказать звонок
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="/kalkulyator">
                  <Calculator className="size-4" /> Калькулятор
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
