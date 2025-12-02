"use client";
import React, { useState } from "react";

export default function HeroBanners(): React.ReactElement {
  const tabs = ["Электрика", "Сантехника", "Кондиционер"];
  const [activeIndex, setActiveIndex] = useState<number>(2); // по умолчанию Кондиционер

  const [digits, setDigits] = useState<string>(""); // максимум 9 цифр
  const isValid = digits.length === 9;

  function formatPhone(digs: string): string {
    const p1 = digs.slice(0, 2);
    const p2 = digs.slice(2, 5);
    const p3 = digs.slice(5, 7);
    const p4 = digs.slice(7, 9);
    let res = "+998";
    if (p1) res += " " + p1;
    if (p2) res += " " + p2;
    if (p3) res += " " + p3;
    if (p4) res += " " + p4;
    return res;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    let only = e.target.value.replace(/[^\d+]/g, "");
    if (only.startsWith("+")) only = only.slice(1);
    if (only.startsWith("998")) only = only.slice(3);
    only = only.replace(/\D/g, "").slice(0, 9);
    setDigits(only);
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>): void {
    e.preventDefault();
    const txt = e.clipboardData?.getData("text") ?? "";
    let only = txt.replace(/\D/g, "");
    if (only.startsWith("998")) only = only.slice(3);
    setDigits(only.slice(0, 9));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const k = e.key;
    const isDigit = k >= "0" && k <= "9";
    const allowed = isDigit || ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(k);
    if (!allowed) e.preventDefault();
  }

  function handleSubmit(): void {
    if (!isValid) return;
    const normalized = "+998" + digits;
    console.log("Отправляю номер:", normalized);
    alert("Отправлено: " + normalized);
  }

  const phonePlaceholder = "+998 __ ___ __ __";

  // texts per service
  const heroTexts = [
    // 0: Электрика
    {
      titleTop: "Проводим ремонт и диагностику",
      titleBottom: "устраняем неисправности",
      bullet1Top: "Мы не просто мастерская,",
      bullet1Bottom: "мы компания — специалисты по электрике",
      bullet2Top: "Проводим сложные работы и диагностику",
      bullet2Bottom: "без лишних накруток"
    },
    // 1: Сантехника
    {
      titleTop: "Устраняем протечки, засоры,",
      titleBottom: "проводим ремонт и замену оборудования",
      bullet1Top: "Гарантия на все работы,",
      bullet1Bottom: "мы точно исправим протечку",
      bullet2Top: "Работаем аккуратно и чисто",
      bullet2Bottom: "с полным соблюдением технологий"
    },
    // 2: Кондиционер
    {
      titleTop: "Ремонтируем кондиционеры",
      titleBottom: "в Чебоксарах или возвращаем деньги по договору",
      bullet1Top: "Мы не просто мастерская,",
      bullet1Bottom: "мы компания - изобретатель",
      bullet2Top: "Разрабатываем и ремонтируем",
      bullet2Bottom: "более 28 видов техники"
    }
  ];

  const activeTexts = heroTexts[activeIndex];

  const rightImageSrc =
    activeIndex === 0 ? "/Header/Elektrik.png" : activeIndex === 1 ? "/Header/Santexnik.png" : "/Header/Air.png";

  return (
    <div id="company" className="w-full h-auto flex flex-col">
      {/* верхнее меню (цвет/тень оставил как раньше) */}
      <div
        className="w-[1139px] h-[65px] flex items-center"
        style={{ background: "#F6F6F6", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
      >
        <nav className="flex w-full h-full">
          {tabs.map((t, i) => (
            <a
              key={t}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(i);
              }}
              aria-current={i === activeIndex ? "page" : undefined}
              className={`h-full flex items-center justify-center whitespace-nowrap text-sm font-semibold uppercase transition-all duration-150
                ${i === activeIndex ? "bg-[#02A653] text-white shadow-md" : "text-black hover:bg-[#02A653] hover:text-white hover:shadow-md"}`}
              style={{ flex: 1, lineHeight: "100%", letterSpacing: "-0.06em" }}
            >
              {t}
            </a>
          ))}
        </nav>
      </div>

      {/* основной блок */}
      <div className="w-full h-[706px] flex justify-between items-start relative">
        {/* === ЛЕВЫЙ КОНТЕЙНЕР С ГРАДИЕНТОМ СЛЕВА→ПРАВА === */}
        <div
          className="w-[886px] h-[672px] flex flex-col py-[110px] px-[51px] z-[3]"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 61%, rgba(255,255,255,0.58) 82%, rgba(255,255,255,0) 100%)"
          }}
        >
          <h1 className="text-[45px] leading-[120%] tracking-[-3%] w-[787px] h-[173px] mb-[32px]">
            <span className="font-extrabold">{activeTexts.titleTop}</span>
            <br />
            <span className="font-extrabold not-italic" style={{ fontWeight: 700 }}>
              {activeTexts.titleBottom}
            </span>
          </h1>

          <div className="w-auto h-auto flex gap-x-[47px] mb-[46px]">
            <div className="w-[314px] h-[54px] flex gap-x-[10px]">
              <img src="/Header/Tick.svg" alt="tick" className="w-[44px] h-[44px]" />
              <p className="text-[18px]">
                {activeTexts.bullet1Top}
                <br />
                <span className="font-bold">{activeTexts.bullet1Bottom}</span>
              </p>
            </div>

            <div className="w-[351px] h-[54px] flex gap-x-[10px]">
              <img src="/Header/Tick.svg" alt="tick" className="w-[44px] h-[44px]" />
              <p className="text-[18px] ">
                {activeTexts.bullet2Top}
                <br /> <span className="font-bold">{activeTexts.bullet2Bottom}</span>
              </p>
            </div>
          </div>

          {/* ВНУТРЕННИЙ СВЕТЛЫЙ БЛОК */}
          <div className="w-[625px] h-[147px] bg-[#ECECEC] flex flex-col gap-y-[14px] rounded-[15px] pt-[17px] pr-[18px] pl-[24px] pb-[30px]">
            <p className="text-xl mx-auto">Реанимируем технику даже удаленно!</p>

            <div className="w-full flex items-center justify-center gap-x-[16px]">
              <input
                type="tel"
                inputMode="tel"
                value={digits.length ? formatPhone(digits) : ""}
                onChange={handleChange}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                placeholder={phonePlaceholder}
                className="w-[294px] h-[58px] rounded-[39px] pl-[29px] text-base text-[18px] placeholder-[#999999] bg-white border border-gray-200 outline-none
                           focus:ring-2 focus:ring-[#02A653] focus:border-transparent"
                aria-label="Номер телефона"
              />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isValid}
                className={`w-[273px] h-[58px] rounded-[39px] bg-gradient-to-b from-[#05a859] to-[#02A653] text-white font-bold flex flex-col items-center justify-center shadow-lg
                           hover:opacity-95 transition ${!isValid ? "opacity-60 cursor-not-allowed" : ""}`}
                style={{ boxShadow: "0 8px 20px rgba(2,166,83,0.25)" }}
              >
                <span className="text-sm uppercase font-normal">Записаться на</span>
                <span className="text-sm uppercase leading-none">бесплатную диагностику</span>
              </button>
            </div>
          </div>
        </div>

        {/* правая картинка — прижата к правому краю, меняется по activeIndex */}
        <div className="absolute right-0 top-0 w-[654px] h-[656px] pointer-events-none">
          <img src={rightImageSrc} alt="side visual" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
