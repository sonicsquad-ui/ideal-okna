"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Phone,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, FAQ } from "@/lib/site-data";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

const QUICK_QUESTIONS = FAQ.slice(0, 4).map((f) => f.q);

const WELCOME: Message = {
  id: 0,
  role: "bot",
  text: "Здравствуйте! 👋 Я — виртуальный помощник ИДЕАЛ. Помогу подобрать москитную сетку, рассчитать стоимость или ответить на частые вопросы. Чем могу помочь?",
};

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([WELCOME]);
  const [input, setInput] = React.useState("");
  const [showLeadForm, setShowLeadForm] = React.useState(false);
  const [unread, setUnread] = React.useState(true);
  const idRef = React.useRef(1);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  // авто-появление пузыря через 12 сек
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setUnread(true), 12000);
      return () => clearTimeout(t);
    }
    setUnread(false);
  }, [open]);

  React.useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, showLeadForm]);

  const findAnswer = (q: string): string => {
    const lower = q.toLowerCase();
    // поиск по FAQ
    for (const f of FAQ) {
      if (
        f.q.toLowerCase().split(" ").some((w) => w.length > 4 && lower.includes(w))
      ) {
        return f.a;
      }
    }
    // ключевые слова
    if (lower.match(/цен|стоим|скольк|прайс/))
      return "Стоимость зависит от типа конструкции, полотна и размеров. Рамочная от 900 ₽, с монтажом от 1 400 ₽. Точную цену рассчитает замерщик бесплатно — могу оформить заявку?";
    if (lower.match(/замер|выезд|приехать/))
      return "Замер по Орлу — бесплатно! Инженер выезжает в день обращения или на следующий день. Оформить заявку на замер?";
    if (lower.match(/срок|делать|изготов|ждать|доставк/))
      return "Стандартные модели изготавливаем за 1-2 рабочих дня. Нестандартные (арки, покраска RAL) — 5-7 дней. Доставка по Орлу бесплатно от 3000 ₽.";
    if (lower.match(/кошк|питом|собак|животн/))
      return "Для защиты питомцев рекомендуем полотно Антикошка (Pet Screen) — многослойный полиэстер, выдерживает когти. От 1800 ₽. Подходит для окон и дверей.";
    if (lower.match(/зим|снимать|сезон/))
      return "Рамочные сетки желательно снимать на зиму. Раздвижные, рулонные и плиссе рассчитаны на круглогодичную эксплуатацию.";
    if (lower.match(/гарант/))
      return "Гарантия 2 года на изделие и монтаж. Покрывает дефекты полотна, поломку фурнитуры, нарушение геометрии. Подробнее — на странице «Гарантии».";
    return "Хороший вопрос! Для точного ответа лучше проконсультироваться с менеджером. Оставьте телефон — перезвоним за 15 минут, или позвоните: +7 953 618 75 96.";
  };

  const sendUser = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: idRef.current++, role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // имитация «печатает»
    setTimeout(() => {
      const botMsg: Message = {
        id: idRef.current++,
        role: "bot",
        text: findAnswer(text),
      };
      setMessages((m) => [...m, botMsg]);
    }, 700);
  };

  return (
    <>
      {/* Кнопка чата */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрыть чат" : "Открыть чат"}
        className={cn(
          "fixed bottom-4 right-4 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:bottom-6 sm:right-6",
          open && "rotate-90"
        )}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
        {unread && !open && (
          <span className="absolute -right-1 -top-1 flex size-5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              1
            </span>
          </span>
        )}
      </button>

      {/* Окно чата */}
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm sm:bottom-24 sm:right-6">
          <Card className="flex h-[520px] max-h-[calc(100vh-7rem)] flex-col overflow-hidden p-0 shadow-2xl">
            {/* Шапка чата */}
            <div className="flex items-center gap-3 bg-primary p-4 text-primary-foreground">
              <div className="relative grid size-10 place-items-center rounded-full bg-accent/20">
                <Bot className="size-5 text-accent" />
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-primary bg-green-400" />
              </div>
              <div className="flex-1">
                <div className="font-semibold leading-tight">Помощник ИДЕАЛ</div>
                <div className="text-xs text-primary-foreground/70">
                  Онлайн · отвечает за ~1 мин
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="rounded-md p-1.5 transition-colors hover:bg-primary-foreground/10"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Сообщения */}
            <div
              ref={scrollRef}
              className="scrollbar-thin flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex gap-2",
                    m.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full",
                      m.role === "bot"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/15 text-accent"
                    )}
                  >
                    {m.role === "bot" ? (
                      <Bot className="size-4" />
                    ) : (
                      <User className="size-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm",
                      m.role === "bot"
                        ? "rounded-tl-sm bg-card text-card-foreground"
                        : "rounded-tr-sm bg-primary text-primary-foreground"
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Быстрые вопросы */}
              {messages.length <= 2 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-xs text-muted-foreground">Часто спрашивают:</div>
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendUser(q)}
                      className="flex w-full items-center gap-2 rounded-lg border bg-card px-3 py-2 text-left text-xs transition-colors hover:border-primary hover:bg-accent/5"
                    >
                      <ChevronRight className="size-3 shrink-0 text-accent" />
                      <span className="flex-1">{q}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Форма заявки */}
              {showLeadForm && (
                <LeadInlineForm
                  onDone={() => {
                    setShowLeadForm(false);
                    setMessages((m) => [
                      ...m,
                      {
                        id: idRef.current++,
                        role: "bot",
                        text: "Спасибо! Заявка отправлена. Менеджер перезвонит в течение 15 минут в рабочее время. 🎉",
                      },
                    ]);
                  }}
                  onCancel={() => setShowLeadForm(false)}
                />
              )}
            </div>

            {/* Поле ввода */}
            {!showLeadForm && (
              <div className="border-t bg-card p-3">
                <div className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendUser(input)}
                    placeholder="Напишите вопрос..."
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={() => sendUser(input)}
                    disabled={!input.trim()}
                    aria-label="Отправить"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <button
                    onClick={() => setShowLeadForm(true)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Оставить заявку →
                  </button>
                  <a
                    href={SITE.phoneHref}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    <Phone className="size-3" /> {SITE.phone}
                  </a>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

function LeadInlineForm({
  onDone,
  onCancel,
}: {
  onDone: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async () => {
    if (!name.trim() || !/^[\d\s+()\-]{10,}$/.test(phone)) {
      toast.error("Введите имя и корректный телефон");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          type: "chat",
          source: "Виджет онлайн-чата",
        }),
      });
      if (!res.ok) throw new Error("err");
      onDone();
    } catch {
      toast.error("Ошибка отправки. Позвоните: " + SITE.phone);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="mb-2 flex items-center gap-2">
        <Badge className="bg-accent text-accent-foreground">Заявка</Badge>
        <span className="text-xs text-muted-foreground">Перезвоним за 15 мин</span>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} className="flex-1">
            Назад
          </Button>
          <Button size="sm" onClick={submit} disabled={submitting} className="flex-1">
            {submitting ? <Loader2 className="size-3.5 animate-spin" /> : "Отправить"}
          </Button>
        </div>
      </div>
    </div>
  );
}
