"use client";
import React, { useState, useEffect } from "react";

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
  const [mobile, setMobile] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
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
    }
  };

  return (
    <>
      {/* === ДЕФОЛТНАЯ ШАПКА — НЕ ТРОГАЛ === */}
      <div className="w-full h-[120.4px] flex justify-between items-center mb-[11.6px] relative">
        {/* ЛОГО — НЕ ТРОГАЛ */}
        <div className="w-[291px] h-[49px]" style={mobile ? { transform: "scale(0.9)", transformOrigin: "left" } : {}}>
          <a href="/" className="w-full h-full" aria-label="Главная">
            <img src="/Header/logo.svg" alt="Логотип" className="w-full h-full" />
          </a>
        </div>

        {/* НАВИГАЦИЯ — прячется на мобиле, но структура НЕ изменена */}
        <div className="w-[523px] h-[27px] flex justify-between items-center" style={mobile ? { display: "none" } : {}}>
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => go(e, link.href)}
              className="text-lg font-bold"
            >
              {link.linkName}
            </a>
          ))}
        </div>

        {/* ПРАВАЯ ЧАСТЬ — структура 1:1 как у тебя */}
        <div className="w-auto h-auto flex flex-col" style={mobile ? { transform: "scale(0.9)", transformOrigin: "right" } : {}}>
          {/* ЭТОТ ТЕКСТ НЕ ТРОГАЮ — просто скрываем на мобиле */}
          {!mobile && (
            <p className="w-[216px] h-[26px] font-bold text-sm flex justify-center items-start mb-[2px] leading-[130%]">
              Работаем с 08:00 до 17:00
            </p>
          )}

          {/* ТВОЙ КНОПКА ТЕЛЕФОНА — 1:1 */}
          <div className="w-[216px] h-[49px] flex items-center bg-[#02A653] rounded-[24.5px]">
            <img src="/Header/ph.svg" width={24} height={25} className="ml-[16px]" alt="phone icon" />
            <a
              href="tel:+79278435144"
              className="text-lg flex tracking-[2%] w-[152px] ml-[10px] font-bold text-white mr-[14px]"
            >
              +7 927 843 51 44
            </a>
          </div>

          {/* СОЦСЕТИ — скрываем только на мобиле, структура НЕ меняется */}
          {!mobile && (
            <div className="w-[151px] h-[34.4px] flex justify-between items-center mx-auto mt-[9px]">
              {Images.map((imagesHere, index) => (
                <a key={index} href={imagesHere.href} aria-label={`social-${index}`}>
                  <img src={imagesHere.src} alt={`icon-${index}`} style={{ width: imagesHere.width, height: imagesHere.height }} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* === БУРГЕР (ТОЛЬКО МОБИЛЕ) — добавлен, НЕ ломает структуру === */}
        {mobile && (
          <button onClick={() => setOpen(!open)} className="absolute right-2 top-[35%]" aria-label={open ? "Закрыть меню" : "Открыть меню"}>
            <svg width="36" height="36" viewBox="0 0 24 24" role="img" aria-hidden>
              {open ? (
                <path d="M6 6L18 18M6 18L18 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* === Мобильное меню — вынесено ВНЕ шапки, структура НЕ тронута === */}
      {mobile && open && (
        <div className="w-full bg-white pb-6 px-4 flex flex-col gap-4">
          {links.map((l, i) => (
            <a key={i} href={l.href} onClick={(e) => go(e, l.href)} className="font-bold text-lg">
              {l.linkName}
            </a>
          ))}

          <p className="font-bold text-base">Работаем с 08:00 до 17:00</p>

          <div className="flex gap-4 mt-2">
            {Images.map((img, i) => (
              <img key={i} src={img.src} alt={`social-mobile-${i}`} style={{ width: img.width, height: img.height }} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
