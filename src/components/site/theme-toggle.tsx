"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current === "dark";

  if (!mounted) {
    // placeholder для избежания hydration mismatch
    return (
      <Button variant="ghost" size="icon" className="size-9" aria-label="Переключить тему" disabled>
        <Sun className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Переключить тему</span>
    </Button>
  );
}
