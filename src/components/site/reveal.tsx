"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** задержка анимации в мс (0-1000) */
  delay?: number;
  /** направление появления */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** порог видимости 0-1 */
  threshold?: number;
  /** однократное срабатывание (по умолчанию true) */
  once?: boolean;
  as?: React.ElementType;
};

const directionClass: Record<NonNullable<RevealProps["direction"]>, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  threshold = 0.15,
  once = true,
  as: Tag = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Если IntersectionObserver недоступен — показываем сразу
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-x-0 translate-y-0" : cn("opacity-0", directionClass[direction]),
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
