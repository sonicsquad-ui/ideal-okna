"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function ScrollProgress({ className }: { className?: string }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-1 bg-transparent pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      <div
        className="progress-animated h-full transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
