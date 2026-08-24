"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, PhoneCall, Clock, MapPin, Mail, ArrowUp } from "lucide-react";
import { FOOTER_GROUPS, SITE } from "@/lib/site-data";
import { useCallbackModal } from "@/components/site/callback-context";

export function SiteFooter() {
  const { openModal } = useCallbackModal();
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_3fr] lg:gap-12">
          {/* Левая колонка — о компании */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-ideal.png"
                alt="Логотип ИДЕАЛ"
                width={52}
                height={52}
                className="size-13 rounded-md bg-white/95 p-0.5 object-contain"
              />
              <div className="leading-tight">
                <div className="text-xl font-bold">ИДЕАЛ</div>
                <div className="text-xs text-primary-foreground/70">
                  Москитные сетки в Орле
                </div>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Собственное производство антимоскитных конструкций. Изготовление, замер и монтаж
              на окна ПВХ, дерева и алюминия. Гарантия {SITE.guarantee}.
            </p>

            <div className="space-y-2.5 text-sm">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2 text-lg font-bold transition-colors hover:text-accent"
              >
                <Phone className="size-4" /> {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-primary-foreground/80 transition-colors hover:text-accent"
              >
                <Mail className="size-4" /> {SITE.email}
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="mt-0.5 size-4 shrink-0" /> {SITE.address}
              </div>
              <div className="flex items-start gap-2 text-primary-foreground/80">
                <Clock className="mt-0.5 size-4 shrink-0" /> {SITE.workHours}
              </div>
            </div>

            <Button
              onClick={() => openModal("Кнопка в футере")}
              variant="secondary"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <PhoneCall className="size-4" /> Заказать звонок
            </Button>
          </div>

          {/* Правая часть — группы ссылок */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title} className="space-y-2.5">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-accent">
                  {group.title}
                </h4>
                <ul className="space-y-1.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-primary-foreground/75 transition-colors hover:text-accent hover:underline"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {year} {SITE.name}. Все права защищены. Москитные сетки в Орле и Орловской области.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/garantii" className="hover:text-accent">
              Гарантии
            </Link>
            <Link href="/kontakty" className="hover:text-accent">
              Контакты
            </Link>
            <button
              onClick={scrollTop}
              className="flex items-center gap-1.5 rounded-full border border-primary-foreground/25 px-3 py-1 transition-colors hover:bg-primary-foreground/10 hover:text-accent"
            >
              Наверх <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
