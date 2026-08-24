"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Phone, Clock, MapPin, Menu, PhoneCall } from "lucide-react";
import { NAV, SITE } from "@/lib/site-data";
import { useCallbackModal } from "@/components/site/callback-context";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { SearchButton } from "@/components/site/search-button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { openModal } = useCallbackModal();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Верхняя информационная полоса */}
      <div className="hidden border-b bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-xs lg:px-6">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 opacity-80" /> {SITE.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 opacity-80" /> {SITE.workHours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-80">Производство москитных сеток в Орле</span>
            <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground">
              Гарантия {SITE.guarantee}
            </span>
          </div>
        </div>
      </div>

      {/* Основная шапка */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 lg:gap-6 lg:px-6">
          {/* Логотип */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="ИДЕАЛ — на главную">
            <Image
              src="/logo-ideal.png"
              alt="Логотип ИДЕАЛ — москитные сетки в Орле"
              width={44}
              height={44}
              className="size-11 rounded-md object-contain"
              priority
            />
            <div className="hidden flex-col leading-none sm:flex">
              <span className="text-lg font-bold tracking-tight text-primary">ИДЕАЛ</span>
              <span className="text-[10px] text-muted-foreground">
                Москитные сетки в Орле
              </span>
            </div>
          </Link>

          {/* Десктоп навигация */}
          <NavigationMenu className="hidden flex-1 justify-center lg:flex">
            <NavigationMenuList>
              {NAV.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="text-sm">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[420px] gap-1 p-2 md:w-[520px] md:grid-cols-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block rounded-md p-3 transition-colors hover:bg-accent/60"
                              >
                                <div className="text-sm font-semibold text-foreground">
                                  {child.title}
                                </div>
                                {child.desc && (
                                  <div className="mt-0.5 text-xs text-muted-foreground">
                                    {child.desc}
                                  </div>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={item.href}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="ml-auto flex items-center gap-2 lg:gap-3">
            {/* Телефон */}
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 text-sm font-semibold transition-colors hover:text-primary md:flex"
            >
              <PhoneCall className="size-4 text-primary" />
              <span className="hidden xl:inline">{SITE.phone}</span>
              <span className="xl:hidden">{SITE.phone}</span>
            </a>

            {/* Поиск */}
            <SearchButton className="hidden sm:inline-flex" />

            {/* Переключатель темы */}
            <ThemeToggle className="hidden sm:inline-flex" />

            {/* Кнопка обратного звонка */}
            <Button
              onClick={() => openModal("Кнопка в шапке сайта")}
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Phone className="size-4" /> Заказать звонок
            </Button>

            {/* Мобильное меню */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Открыть меню">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] overflow-y-auto sm:w-[380px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Меню сайта</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <a
                    href={SITE.phoneHref}
                    className="flex items-center gap-2 text-lg font-bold text-primary"
                  >
                    <Phone className="size-5" /> {SITE.phone}
                  </a>
                  <Button
                    onClick={() => {
                      setMobileOpen(false);
                      openModal("Мобильное меню");
                    }}
                    className="w-full"
                  >
                    Заказать звонок
                  </Button>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">Поиск по сайту</span>
                    <SearchButton />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Тема оформления</span>
                    <ThemeToggle />
                  </div>

                  <div className="space-y-1 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="size-3.5" /> {SITE.workHours}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-3.5" /> {SITE.address}
                    </div>
                  </div>

                  <nav className="space-y-3">
                    {NAV.map((item) => (
                      <div key={item.title} className="space-y-1">
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm font-semibold text-foreground"
                        >
                          {item.title}
                        </Link>
                        {item.children && (
                          <div className="ml-3 space-y-1 border-l pl-3">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-0.5 text-sm text-muted-foreground hover:text-primary"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
