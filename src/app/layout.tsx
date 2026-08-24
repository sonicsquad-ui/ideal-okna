import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CallbackProvider } from "@/components/site/callback-context";
import { CallbackModal } from "@/components/site/callback-modal";
import { CookieBanner } from "@/components/site/cookie-banner";
import { BackToTop } from "@/components/site/back-to-top";
import { LiveOrderToast } from "@/components/blocks/live-order-toast";
import { ChatWidget } from "@/components/blocks/chat-widget";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Analytics } from "@/components/site/analytics";
import { SITE } from "@/lib/site-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Москитные сетки в Орле от производителя | Замер и монтаж за 1 день - ИДЕАЛ",
    template: "%s | ИДЕАЛ — москитные сетки в Орле",
  },
  description:
    "Изготовление и установка антимоскитных конструкций на пластиковые окна и двери. Рамочные, плиссе, антикошка и антипыль. Быстрый выезд мастера замерщика, гарантия 2 года. Рассчитайте стоимость на калькуляторе!",
  keywords: [
    "москитные сетки Орёл",
    "купить москитную сетку Орёл",
    "москитная сетка на пластиковое окно",
    "антикошка Орёл",
    "рамочные москитные сетки",
    "плиссе сетки Орёл",
    "замер москитных сеток",
    "ремонт москитных сеток Орёл",
    "производитель москитных сеток",
    "ИДЕАЛ Орёл",
  ],
  authors: [{ name: "ИДЕАЛ" }],
  creator: "ИДЕАЛ",
  publisher: "ИДЕАЛ",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Москитные сетки в Орле от производителя - ИДЕАЛ",
    description:
      "Изготовление и установка антимоскитных конструкций. Рамочные, плиссе, антикошка и антипыль. Замер за 1 день, гарантия 2 года.",
    url: SITE.url,
    siteName: "ИДЕАЛ — москитные сетки в Орле",
    images: [
      {
        url: "/og-image.jpg",
        width: 1152,
        height: 864,
        alt: "Москитные сетки в Орле от производителя ИДЕАЛ",
      },
      {
        url: "/hero-bg.jpeg",
        width: 1448,
        height: 1086,
        alt: "Москитные сетки в Орле от производителя ИДЕАЛ",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Москитные сетки в Орле от производителя - ИДЕАЛ",
    description: "Изготовление и установка антимоскитных конструкций. Гарантия 2 года.",
    images: ["/hero-bg.jpeg"],
  },
  icons: {
    icon: "/logo-ideal.png",
    apple: "/logo-ideal.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ИДЕАЛ",
  alternateName: "ИДЕАЛ — москитные сетки в Орле",
  description:
    "Изготовление и установка антимоскитных конструкций на пластиковые окна и двери в Орле. Рамочные, раздвижные, рулонные, плиссе сетки.",
  url: SITE.url,
  logo: `${SITE.url}/logo-ideal.png`,
  image: `${SITE.url}/hero-bg.jpeg`,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Сурена-Шаумяна, 35",
    addressLocality: "Орёл",
    addressRegion: "Орловская область",
    postalCode: "302028",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.9654,
    longitude: 36.0785,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "15:00",
    },
  ],
  priceRange: "₽₽",
  areaServed: [
    { "@type": "City", name: "Орёл" },
    { "@type": "AdministrativeArea", name: "Орловская область" },
  ],
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ИДЕАЛ — москитные сетки в Орле",
  url: SITE.url,
  inLanguage: "ru-RU",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Analytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CallbackProvider>
            <ScrollProgress />
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <CallbackModal />
            <CookieBanner />
            <BackToTop />
            <LiveOrderToast />
            <ChatWidget />
          </CallbackProvider>
        </ThemeProvider>
        <Toaster />
        <SonnerToaster richColors position="top-center" />
      </body>
    </html>
  );
}
