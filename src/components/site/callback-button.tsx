"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCallbackModal } from "@/components/site/callback-context";

export function CallbackButton({
  source,
  children,
  ...props
}: ButtonProps & { source?: string }) {
  const { openModal } = useCallbackModal();
  return (
    <Button {...props} onClick={() => openModal(source)}>
      {children}
    </Button>
  );
}
