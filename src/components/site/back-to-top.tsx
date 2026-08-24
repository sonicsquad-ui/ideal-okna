"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      setVisible(scrollTop > 600);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Кольцевой прогресс: окружность 2πr, r=18 → ~113
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      aria-label="Наверх"
      onClick={toTop}
      className={cn(
        "fixed bottom-4 left-4 z-40 grid size-12 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur transition-all duration-300 hover:bg-accent hover:text-accent-foreground sm:bottom-6 sm:left-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      )}
    >
      {/* Кольцевой прогресс */}
      <svg
        className="absolute inset-0 -rotate-90"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-muted/30"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-accent transition-[stroke-dashoffset] duration-150"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <ArrowUp className="relative size-5" />
    </button>
  );
}
