"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Cookie, ChevronDown, ChevronUp, ShieldCheck, BarChart3, Check } from "lucide-react";
import { saveConsent, useCookieConsent } from "@/lib/cookie-consent";

export function CookieBanner() {
  const { consent } = useCookieConsent();
  const [visible, setVisible] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(true);

  React.useEffect(() => {
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, [consent]);

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, ts: Date.now() });
    setVisible(false);
  };

  const acceptSelected = () => {
    saveConsent({ necessary: true, analytics, ts: Date.now() });
    setVisible(false);
  };

  const acceptNecessaryOnly = () => {
    saveConsent({ necessary: true, analytics: false, ts: Date.now() });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 animate-in slide-in-from-bottom-8 duration-500">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border bg-card/95 shadow-xl backdrop-blur">
        {/* Основная часть */}
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-4">
          <div className="flex items-start gap-3 sm:flex-1">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Cookie className="size-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Мы используем cookie-файлы для улучшения работы сайта, анализа посещаемости и
                персонализации контента. Вы можете выбрать, какие категории разрешить.
              </p>
              <button
                onClick={() => setShowSettings((v) => !v)}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                {showSettings ? (
                  <>
                    Скрыть настройки <ChevronUp className="size-3" />
                  </>
                ) : (
                  <>
                    Настройки cookies <ChevronDown className="size-3" />
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button onClick={acceptAll} size="sm" className="w-full sm:w-auto">
              Принять все
            </Button>
            {!showSettings && (
              <Button
                onClick={acceptNecessaryOnly}
                size="sm"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Только необходимые
              </Button>
            )}
          </div>
        </div>

        {/* Раскрывающаяся панель настроек */}
        {showSettings && (
          <div className="border-t bg-muted/30 p-4">
            <div className="space-y-3">
              {/* Необходимые */}
              <div className="flex items-start gap-3 rounded-lg border bg-card p-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-md bg-accent/15 text-accent">
                  <ShieldCheck className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Необходимые</span>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
                      Обязательно
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Обеспечивают базовую работу сайта: сессия, безопасность, корзина. Всегда включены.
                  </p>
                </div>
                <Switch checked disabled aria-label="Необходимые cookies — всегда включены" />
              </div>

              {/* Аналитика */}
              <div className="flex items-start gap-3 rounded-lg border bg-card p-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                  <BarChart3 className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Аналитика</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                      Опционально
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Яндекс.Метрика: помогают понять, как используется сайт, для его улучшения.
                  </p>
                </div>
                <Switch
                  checked={analytics}
                  onCheckedChange={setAnalytics}
                  aria-label="Аналитика cookies"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button onClick={acceptNecessaryOnly} size="sm" variant="ghost" className="w-full sm:w-auto">
                Отклонить все
              </Button>
              <Button onClick={acceptSelected} size="sm" className="w-full sm:w-auto">
                <Check className="size-4" /> Сохранить выбор
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
