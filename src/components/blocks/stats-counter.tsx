"use client";

import * as React from "react";

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

function useCountUp(target: number, durationMs = 1800, start = false) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutExpo для плавного замедления
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);

  return value;
}

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function AnimatedCounter({ stat, start }: { stat: StatItem; start: boolean }) {
  const value = useCountUp(stat.value, 2000, start);
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-baseline gap-0.5">
        {stat.prefix && <span className="text-lg font-bold text-accent">{stat.prefix}</span>}
        <span className="text-3xl font-extrabold text-accent sm:text-4xl">
          {new Intl.NumberFormat("ru-RU").format(value)}
        </span>
        {stat.suffix && (
          <span className="text-xl font-bold text-accent">{stat.suffix}</span>
        )}
      </div>
      <div className="mt-1 text-sm font-semibold text-primary-foreground">{stat.label}</div>
      {stat.sublabel && (
        <div className="text-xs text-primary-foreground/60">{stat.sublabel}</div>
      )}
    </div>
  );
}

export function StatsCounter({ stats }: { stats: StatItem[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s, i) => (
        <AnimatedCounter key={i} stat={s} start={inView} />
      ))}
    </div>
  );
}
