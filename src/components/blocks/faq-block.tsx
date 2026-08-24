"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/lib/site-data";

export function FaqBlock({
  items = FAQ,
  title = "Частые вопросы и ответы заказчиков (FAQ)",
}: {
  items?: { q: string; a: string }[];
  title?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-px w-6 bg-accent" />
            FAQ
            <span className="h-px w-6 bg-accent" />
          </div>
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
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
      </div>
    </section>
  );
}
