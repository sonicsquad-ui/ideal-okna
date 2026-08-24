"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { FAQItem } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircleQuestion, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqSearch({ items }: { items: FAQItem[] }) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [query, items]);

  return (
    <div>
      {/* Поиск */}
      <div className="relative mx-auto mb-8 max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по вопросам: замер, крепление, антикошка, гарантия..."
          className="h-12 pl-12 pr-12 text-base"
          aria-label="Поиск по вопросам"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Очистить поиск"
            className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Счётчик результатов */}
      <div className="mb-4 text-center text-sm text-muted-foreground">
        {query ? (
          <>Найдено: <span className="font-semibold text-foreground">{filtered.length}</span> из {items.length} вопросов</>
        ) : (
          <>Всего: <span className="font-semibold text-foreground">{items.length}</span> вопросов</>
        )}
      </div>

      {/* Результаты */}
      {filtered.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {filtered.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="rounded-xl border bg-card p-8 text-center">
          <MessageCircleQuestion className="mx-auto mb-3 size-10 text-muted-foreground/40" />
          <h3 className="font-semibold">Ничего не найдено</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            По запросу «{query}» ничего не найдено. Попробуйте переформулировать или позвоните нам —
            ответим на любой вопрос.
          </p>
        </div>
      )}
    </div>
  );
}
