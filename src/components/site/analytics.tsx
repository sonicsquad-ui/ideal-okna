"use client";

import * as React from "react";
import Script from "next/script";
import { useCookieConsent } from "@/lib/cookie-consent";

// Яндекс.Метрика — счётчик для поведенческого ранжирования
// ID: 90000000 (заменить на реальный при получении)
const YM_ID = "90000000";

export function Analytics() {
  const { analyticsAllowed, loaded } = useCookieConsent();

  // Не загружаем скрипт, пока consent не загружен или аналитика не разрешена
  if (!loaded || !analyticsAllowed) {
    return null;
  }

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${YM_ID}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,
            trackHash:true,
            ecommerce:"dataLayer"
          });
        `}
      </Script>
      <noscript>
        <div style={{ position: "absolute", left: -9999 }} aria-hidden="true">
          <img
            src={`https://mc.yandex.ru/watch/${YM_ID}`}
            alt=""
            style={{ position: "absolute", left: -9999 }}
          />
        </div>
      </noscript>
    </>
  );
}
