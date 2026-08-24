"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-6 bg-accent" />
          {eyebrow}
          <span className="h-px w-6 bg-accent" />
        </div>
      )}
      <Tag className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-[2.1rem]">
        <span className={align === "center" ? "heading-underline" : ""}>{title}</span>
      </Tag>
      {description && (
        <p className="mt-3 text-balance text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}
