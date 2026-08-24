"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/site/lead-form";
import { useCallbackModal } from "@/components/site/callback-context";
import { Phone, Clock, MapPin } from "lucide-react";
import { SITE } from "@/lib/site-data";

export function CallbackModal() {
  const { open, closeModal, source } = useCallbackModal();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-balance">Заказать обратный звонок</DialogTitle>
          <DialogDescription>
            Перезвоним в течение 15 минут в рабочее время и ответим на все вопросы.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-1 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
          Источник заявки: <span className="font-medium text-foreground">{source}</span>
        </div>

        <LeadForm
          type="callback"
          source={source}
          submitLabel="Жду звонка"
          onSuccess={closeModal}
        />

        <div className="mt-2 grid gap-2 border-t pt-4 text-sm">
          <a href={SITE.phoneHref} className="flex items-center gap-2 font-semibold hover:text-primary">
            <Phone className="size-4 text-primary" /> {SITE.phone}
          </a>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4" /> {SITE.workHours}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4" /> {SITE.address}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
