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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Star, User, MapPin, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "Рамочные сетки",
  "Раздвижные сетки",
  "Рулонные сетки",
  "Плиссе",
  "Дверные сетки",
  "Мансардные сетки",
  "Нестандартные",
  "Антикошка",
  "Антипыльца / Антипыль",
  "Ремонт / перетяжка",
  "Замер и монтаж",
  "Другое",
];

const reviewSchema = z.object({
  name: z
    .string()
    .min(2, "Введите имя (минимум 2 символа)")
    .max(120, "Слишком длинное имя"),
  city: z.string().max(80).default("Орёл"),
  rating: z.number().int().min(1, "Поставьте оценку").max(5),
  service: z.string().optional(),
  text: z
    .string()
    .min(10, "Отзыв должен содержать минимум 10 символов")
    .max(2000, "Слишком длинный отзыв (максимум 2000 символов)"),
});

type ReviewValues = z.infer<typeof reviewSchema>;

export function ReviewForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [rating, setRating] = React.useState<number>(5);
  const [hoverRating, setHoverRating] = React.useState<number>(0);
  const [service, setService] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      city: "Орёл",
      rating: 5,
      text: "",
      service: "",
    },
  });

  React.useEffect(() => {
    setValue("rating", rating);
  }, [rating, setValue]);

  React.useEffect(() => {
    setValue("service", service);
  }, [service, setValue]);

  const onSubmit = async (values: ReviewValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          service: values.service || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Ошибка отправки");
      }
      toast.success("Спасибо! Отзыв отправлен на модерацию.", {
        description: "После проверки администратором он появится на сайте.",
      });
      reset();
      setRating(5);
      setService("");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Ошибка отправки";
      toast.error("Не удалось отправить отзыв", { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="review-name" className="text-sm font-medium">
            Ваше имя <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="review-name"
              placeholder="Иван"
              className="pl-9"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="review-city" className="text-sm font-medium">
            Город
          </Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="review-city"
              placeholder="Орёл"
              className="pl-9"
              {...register("city")}
            />
          </div>
          {errors.city && (
            <p className="text-xs text-destructive">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">
          Оценка <span className="text-destructive">*</span>
        </Label>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1"
            role="radiogroup"
            aria-label="Оценка от 1 до 5 звёзд"
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const value = i + 1;
              const active = value <= displayRating;
              return (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} ${value === 1 ? "звезда" : value < 5 ? "звезды" : "звёзд"}`}
                  aria-checked={value === rating}
                  role="radio"
                  className="rounded p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={cn(
                      "size-7 transition-colors",
                      active
                        ? "fill-accent text-accent"
                        : "fill-muted text-muted"
                    )}
                  />
                </button>
              );
            })}
          </div>
          <span className="ml-2 text-sm font-semibold text-primary">
            {displayRating} / 5
          </span>
        </div>
        {errors.rating && (
          <p className="text-xs text-destructive">{errors.rating.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="review-service" className="text-sm font-medium">
          Услуга / продукт <span className="text-muted-foreground">(необязательно)</span>
        </Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger id="review-service" className="w-full">
            <SelectValue placeholder="Выберите услугу или продукт" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="review-text" className="text-sm font-medium">
          Текст отзыва <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
          <Textarea
            id="review-text"
            placeholder="Поделитесь впечатлениями: качество изделия, монтаж, сроки, обслуживание..."
            className="min-h-[140px] pl-9"
            aria-invalid={!!errors.text}
            {...register("text")}
          />
        </div>
        {errors.text && (
          <p className="text-xs text-destructive">{errors.text.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        size="lg"
        className="w-full"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Отправляем...
          </>
        ) : (
          "Отправить отзыв"
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
        Отзыв появится на сайте после проверки модератором.
      </p>
    </form>
  );
}
