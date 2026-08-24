"use client";

import * as React from "react";

type CallbackState = {
  open: boolean;
  source: string;
  openModal: (source?: string) => void;
  closeModal: () => void;
};

const CallbackContext = React.createContext<CallbackState | null>(null);

export function CallbackProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [source, setSource] = React.useState("Кнопка в шапке");

  const openModal = React.useCallback((src?: string) => {
    setSource(src || "Кнопка на сайте");
    setOpen(true);
  }, []);

  const closeModal = React.useCallback(() => setOpen(false), []);

  const value = React.useMemo(
    () => ({ open, source, openModal, closeModal }),
    [open, source, openModal, closeModal]
  );

  return <CallbackContext.Provider value={value}>{children}</CallbackContext.Provider>;
}

export function useCallbackModal() {
  const ctx = React.useContext(CallbackContext);
  if (!ctx) throw new Error("useCallbackModal must be used within CallbackProvider");
  return ctx;
}
