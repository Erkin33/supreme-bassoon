"use client";
import React, { useEffect, useState } from "react";

type LinkItem = { linkName: string; href: string };
type ImgItem = { src: string; width: string; height: string; href: string };

const links: LinkItem[] = [
  { linkName: "О компании", href: "#company" },
  { linkName: "Наши работы", href: "#our-works" },
  { linkName: "Контакты", href: "#contacts" }
];

const Images: ImgItem[] = [
  { src: "/Header/telegram.svg", width: "25.81px", height: "25.81px", href: "#" },
  { src: "/Header/whatsapp.svg", width: "33.52px", height: "34.4px", href: "#" },
  { src: "/Header/vk.svg", width: "29.07px", height: "29px", href: "#" },
  { src: "/Header/youtube.svg", width: "35.96px", height: "25.26px", href: "#" }
];

export default function Header(): React.ReactElement {
  // Синхронизируем breakpoint с Tailwind: <=768px
  const [mobile, setMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    function check() {
      const isMobile = window.innerWidth <= 768;
      setMobile(isMobile);
      // если пользователь расширил экран — закрываем мобильное меню
      if (!isMobile) setOpen(false);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    setOpen(false);
    const element = document.querySelector(href) as HTMLElement | null;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <>
      {/* Header wrapper — структура не тронута */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1140px] px-4">
          <div className="w-full h-[120.4px] flex justify-between items-center mb-[11.6px] relative">
            {/* LOGO */}
            <div
              className="w-[291px] h-[49px]"
              style={mobile ? { transform: "scale(0.92)", transformOrigin: "left" } : {}}
            >
              <a href="/" className="w-full h-full" aria-label="Главная">
                <img src="/Header/logo.svg" alt="Логотип" className="w-full h-full" />
              </a>
            </div>

            {/* NAV (desktop only) — скрываются при <=768px */}
            <div className="w-[523px] h-[27px] flex justify-between items-center max-[768px]:hidden">
              {links.map((link, idx) => (
                <a key={idx} href={link.href} onClick={(e) => go(e, link.href)} className="text-lg font-bold">
                  {link.linkName}
                </a>
              ))}
            </div>

            {/* RIGHT block (phone + socials + burger inside same block) */}
            <div
              className="w-auto h-auto flex flex-col items-end"
              style={mobile ? { transform: "scale(0.92)", transformOrigin: "right" } : {}}
            >
              {/* working hours (hidden on mobile) */}
              <p className="w-[216px] h-[26px] font-bold text-sm flex justify-center items-start mb-[2px] leading-[130%] max-[768px]:hidden">
                Работаем с 08:00 до 17:00
              </p>

              {/* phone button — показан на десктоп, а на mobile прячем сам текст (оставляем телефон в мобильном меню) */}
              <div className="w-[216px] h-[49px] flex items-center bg-[#02A653] rounded-[24.5px] max-[768px]:hidden">
                <img src="/Header/ph.svg" alt="phone" width={24} height={25} className="ml-[16px]" />
                {/* Скрываем текст телефона на <=768px */}
                <a
                  href="tel:+79278435144"
                  className="text-lg flex tracking-[2%] w-[152px] ml-[10px] font-bold text-white mr-[14px] max-[768px]:hidden"
                >
                  +7 927 843 51 44
                </a>
              </div>

              {/* socials (desktop only) */}
              <div className="w-[151px] h-[34.4px] flex justify-between items-center mx-auto mt-[9px] max-[768px]:hidden">
                {Images.map((imagesHere, index) => (
                  <a key={index} href={imagesHere.href} aria-label={`social-${index}`}>
                    <img src={imagesHere.src} alt={`icon-${index}`} style={{ width: imagesHere.width, height: imagesHere.height }} />
                  </a>
                ))}
              </div>

              {/* BURGER: показываем на мобильных (<=768px) */}
              <div className="mt-2">
                <button
                  onClick={() => setOpen((v) => !v)}
                  aria-label={open ? "Закрыть меню" : "Открыть меню"}
                  className="hidden max-[768px]:inline-flex items-center justify-center p-2 rounded-md bg-transparent border-0 cursor-pointer"
                >
                  {!open ? (
                    <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden>
                      <path d="M3 6h18M3 12h18M3 18h18" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden>
                      <path d="M6 6L18 18M6 18L18 6" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU — occupies full viewport width (100vw) */}
      {mobile && (
        <div aria-hidden={!open} className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
          {/* backdrop */}
          <div onClick={() => setOpen(false)} className={`absolute inset-0 transition-bg duration-200 ${open ? "bg-[rgba(0,0,0,0.45)]" : "bg-transparent"}`} />

          {/* menu panel full-bleed (Tailwind classes + small inline transforms kept) */}
          <div
            role="dialog"
            aria-modal="true"
            className={`fixed left-0 top-0 w-screen h-screen bg-white z-60 flex flex-col p-7 overflow-y-auto transform transition-transform duration-300 ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
            style={{ zIndex: 60 }}
          >
            {/* top row: logo + close */}
            <div className="flex items-center justify-between mb-6">
              <a href="/" onClick={() => setOpen(false)} aria-label="Главная">
                <img src="/Header/logo.svg" alt="logo" className="h-11" />
              </a>

              <button onClick={() => setOpen(false)} aria-label="Закрыть меню" className="p-2 bg-transparent border-0">
                <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden>
                  <path d="M6 6L18 18M6 18L18 6" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* links — крупные, только здесь на mobile */}
            <div className="flex flex-col gap-4 mb-6">
              {links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="text-[22px] font-extrabold text-[#111827] py-3 px-3 rounded-md no-underline"
                >
                  {l.linkName}
                </a>
              ))}
            </div>

            {/* bottom CTA + socials */}
            <div className="mt-auto flex flex-col gap-3">
              <a
                href="tel:+79278435144"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-3 bg-[#02A653] text-white font-extrabold px-4 py-3 rounded-[14px] no-underline"
              >
                <img src="/Header/ph.svg" alt="phone" width={24} height={24} />
                +7 927 843 51 44
              </a>

              <div className="flex gap-4 justify-center pb-3">
                {Images.map((img, idx) => (
                  <a key={idx} href={img.href} onClick={() => setOpen(false)} aria-label={`social-${idx}`}>
                    <img src={img.src} alt={`social-${idx}`} className="w-9 h-9" />
                  </a>
                ))}
              </div>

              <div className="text-sm text-center text-[#6B7280]">Работаем с 08:00 до 17:00</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
