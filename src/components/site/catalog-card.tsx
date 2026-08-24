"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import type { CatalogItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function CatalogCard({
  item,
  href,
  className,
}: {
  item: CatalogItem;
  href: string;
  className?: string;
}) {
  const Icon = (Icons[item.icon as keyof typeof Icons] as React.ComponentType<{
    className?: string;
  }>) ?? Icons.Square;

  return (
    <Card
      className={cn(
        "corner-accent group relative flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl",
        className
      )}
    >
      {/* Декоративная верхняя полоска */}
      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/8 via-primary/5 to-accent/15">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        {/* Декоративный круг */}
        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-accent/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
        <Icon className="icon-bounce relative size-16 text-primary/80 drop-shadow-sm transition-colors duration-300 group-hover:text-primary" />
        {item.priceFrom && (
          <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground shadow-sm">
            {item.priceFrom}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.excerpt}</p>
        {item.bestFor && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.bestFor.slice(0, 3).map((b) => (
              <span
                key={b}
                className="rounded-full border border-border/60 bg-secondary/50 px-2 py-0.5 text-[11px] text-secondary-foreground transition-colors group-hover:border-accent/40"
              >
                {b}
              </span>
            ))}
          </div>
        )}
        <Button asChild variant="outline" className="mt-4 w-full group-hover:border-primary group-hover:text-primary">
          <Link href={href}>Подробнее</Link>
        </Button>
      </div>
    </Card>
  );
}
