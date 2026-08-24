"use client";

import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export interface ReviewItem {
  name: string;
  city?: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
}

export function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <Card className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-full bg-primary/10 text-base font-bold text-primary">
            {review.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold leading-tight">{review.name}</div>
            <div className="text-xs text-muted-foreground">{review.city || "Орёл"}</div>
          </div>
        </div>
        <Quote className="size-7 text-accent/40" />
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < review.rating ? "fill-accent text-accent" : "fill-muted text-muted"
            }
          />
        ))}
      </div>
      <p className="flex-1 text-sm text-muted-foreground">{review.text}</p>
      {review.service && (
        <div className="mt-auto text-xs">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
            {review.service}
          </span>
        </div>
      )}
    </Card>
  );
}
