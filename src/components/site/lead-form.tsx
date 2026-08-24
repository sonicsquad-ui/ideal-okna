"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Phone, User, MessageSquare } from "lucide-react";

const phoneRegex = /^[\d\s+()\-]{10,}$/;

const leadSchema = z.object({
  name: z.string().min(2, "Введите имя (минимум 2 символа)"),
  phone: z.string().regex(phoneRegex, "Введите корректный номер телефона"),
  message: z.string().optional(),
});

type LeadValues = z.infer<typeof leadSchema>;

export function LeadForm({
  type = "callback",
  source,
  showComment = true,
  submitLabel = "Отправить заявку",
  onSuccess,
  compact = false,
}: {
  type?: string;
  source?: string;
  showComment?: boolean;
  submitLabel?: string;
  onSuccess?: () => void;
  compact?: boolean;
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadValues>({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (values: LeadValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          type,
          source: source || (typeof window !== "undefined" ? window.location.pathname : undefined),
        }),
      });
      if (!res.ok) throw new Error("Ошибка отправки");
      toast.success("Заявка отправлена!", {
        description: "Мы перезвоним вам в течение 15 минут в рабочее время.",
      });
      reset();
      onSuccess?.();
    } catch {
      toast.error("Не удалось отправить заявку", {
        description: "Позвоните нам: +7 953 618 75 96",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={compact ? "space-y-3" : "space-y-4"}>
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-medium">
          Ваше имя
        </Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            placeholder="Иван"
            className="pl-9"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </div>
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-sm font-medium">
          Телефон
        </Label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            className="pl-9"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </div>
        {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
      </div>
      {showComment && (
        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-sm font-medium">
            Комментарий <span className="text-muted-foreground">(необязательно)</span>
          </Label>
          <div className="relative">
            <MessageSquare className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
            <Textarea
              id="message"
              placeholder="Например: нужно 3 рамочные сетки на окна ПВХ"
              className="pl-9 min-h-[80px]"
              {...register("message")}
            />
          </div>
        </div>
      )}
      <Button type="submit" disabled={submitting} className="w-full" size="lg">
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Отправляем...
          </>
        ) : (
          submitLabel
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
      </p>
    </form>
  );
}
