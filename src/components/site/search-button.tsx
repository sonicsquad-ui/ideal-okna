"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, FileText, Package, Wrench, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONSTRUCTIONS,
  CANVASES,
  COMPONENTS,
  SERVICES,
  SITE,
} from "@/lib/site-data";

interface SearchResult {
  title: string;
  href: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ALL_ITEMS: SearchResult[] = [
  ...CONSTRUCTIONS.map((c) => ({
    title: c.title,
    href: `/katalog/konstrukcii/${c.slug}`,
    category: "Конструкции",
    icon: Package,
  })),
  ...CANVASES.map((c) => ({
    title: c.title,
    href: `/katalog/polotna/${c.slug}`,
    category: "Полотна",
    icon: Package,
  })),
  ...COMPONENTS.map((c) => ({
    title: c.title,
    href: `/komplektuyushchie/${c.slug}`,
    category: "Комплектующие",
    icon: Wrench,
  })),
  ...SERVICES.map((s) => ({
    title: s.title,
    href: `/uslugi/${s.slug}`,
    category: "Услуги",
    icon: Wrench,
  })),
  { title: "Цены (прайс-лист)", href: "/ceny", category: "Информация", icon: FileText },
  { title: "Калькулятор стоимости", href: "/kalkulyator", category: "Информация", icon: FileText },
  { title: "Сравнение типов", href: "/sravnenie", category: "Информация", icon: FileText },
  { title: "Фотогалерея работ", href: "/galereya", category: "Информация", icon: FileText },
  { title: "Отзывы клиентов", href: "/otzyvy", category: "Информация", icon: FileText },
  { title: "Акции и скидки", href: "/akcii", category: "Информация", icon: FileText },
  { title: "Гарантии", href: "/garantii", category: "Информация", icon: FileText },
  { title: "Контакты", href: "/kontakty", category: "Информация", icon: Phone },
  { title: "Блог", href: "/blog", category: "Информация", icon: FileText },
  { title: "Инструкция по замеру", href: "/instrukciya-zamera", category: "Информация", icon: FileText },
];

export function SearchButton({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setActiveIndex(-1);
    }
  }, [open]);

  // Открытие по Ctrl+K / Cmd+K
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return ALL_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const onKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(-1, i - 1));
    } else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      router.push(results[activeIndex].href);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn("size-9", className)}
        aria-label="Поиск по сайту"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-xl border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b p-3">
              <Search className="size-5 shrink-0 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={onKeydown}
                placeholder="Поиск: рамочные, антикошка, цены, замер..."
                className="border-0 px-0 shadow-none focus-visible:ring-0"
              />
              <kbd className="hidden shrink-0 rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">
                ESC
              </kbd>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                onClick={() => setOpen(false)}
                aria-label="Закрыть поиск"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2 scrollbar-thin">
              {query.trim() === "" ? (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  <Search className="mx-auto mb-2 size-8 opacity-30" />
                  Начните вводить запрос — покажем конструкции, полотна, услуги и страницы
                </div>
              ) : results.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  Ничего не найдено по запросу «{query}»
                  <div className="mt-3">
                    <a
                      href={SITE.phoneHref}
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <Phone className="size-3.5" /> Позвоните: {SITE.phone}
                    </a>
                  </div>
                </div>
              ) : (
                <ul className="space-y-1">
                  {results.map((r, i) => {
                    const Icon = r.icon;
                    return (
                      <li key={r.href}>
                        <Link
                          href={r.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg p-2.5 transition-colors",
                            i === activeIndex ? "bg-accent/15" : "hover:bg-muted"
                          )}
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                            <Icon className="size-4" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="truncate text-sm font-medium">{r.title}</div>
                            <div className="text-xs text-muted-foreground">{r.category}</div>
                          </div>
                          <ArrowRight className="size-4 shrink-0 text-muted-foreground/50" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-2">
                <kbd className="rounded border bg-card px-1 py-0.5">↑↓</kbd> навигация
                <kbd className="rounded border bg-card px-1 py-0.5">Enter</kbd> перейти
                <span className="ml-auto">Найдено: {results.length}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
