"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site-data";

export interface Crumb {
  title: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  // Schema.org BreadcrumbList JSON-LD
  const itemList = [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE.url },
    ...items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: item.title,
      ...(item.href ? { item: `${SITE.url}${item.href}` } : {}),
    })),
  ];
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: itemList };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav
        aria-label="Хлебные крошки"
        className={cn("flex flex-wrap items-center gap-1 text-sm text-muted-foreground", className)}
      >
        <Link href="/" className="flex items-center hover:text-primary">
          <Home className="size-3.5" />
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="size-3.5 text-muted-foreground/60" />
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">
                {item.title}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.title}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
