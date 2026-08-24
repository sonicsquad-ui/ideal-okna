"use client";

import * as React from "react";

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  ts: number;
}

const STORAGE_KEY = "ideal-cookie-consent";

function loadConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.analytics === "boolean") {
      return {
        necessary: true,
        analytics: parsed.analytics,
        ts: parsed.ts || Date.now(),
      };
    }
  } catch {
    /* noop */
  }
  return null;
}

export function saveConsent(c: CookieConsent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: c }));
  } catch {
    /* noop */
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = React.useState<CookieConsent | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setConsent(loadConsent());
    setLoaded(true);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as CookieConsent;
      setConsent(detail);
    };
    window.addEventListener("cookie-consent-change", onChange);
    return () => window.removeEventListener("cookie-consent-change", onChange);
  }, []);

  return { consent, loaded, analyticsAllowed: consent?.analytics ?? false };
}

// Проверка, разрешена ли аналитика (для использования вне React-компонентов)
export function isAnalyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  return loadConsent()?.analytics ?? false;
}
