"use client";
import React, { useState } from "react";

export default function HeroBanners(): React.ReactElement {
  const tabs = ["Электрика", "Сантехника", "Кондиционер"];
  const [activeIndex, setActiveIndex] = useState<number>(2);

  const [digits, setDigits] = useState<string>("");
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

  const heroTexts = [
    {
      titleTop: "Проводим ремонт и диагностику",
      titleBottom: "устраняем неисправности",
      bullet1Top: "Мы не просто мастерская,",
      bullet1Bottom: "мы компания — специалисты по электрике",
      bullet2Top: "Проводим сложные работы и диагностику",
      bullet2Bottom: "без лишних накруток"
    },
    {
      titleTop: "Устраняем протечки, засоры,",
      titleBottom: "проводим ремонт и замену оборудования",
      bullet1Top: "Гарантия на все работы,",
      bullet1Bottom: "мы точно исправим протечку",
      bullet2Top: "Работаем аккуратно и чисто",
      bullet2Bottom: "с полным соблюдением технологий"
    },
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
    <section id="company" className="w-full flex justify-center">
      {/* Outer fixed-width wrapper (keeps everything aligned) */}
      <div className="w-full max-w-[1140px] px-4 box-border">
        {/* TABS: fixed height, fixed placement */}
        <div
          className="w-full h-[65px] bg-[#F6F6F6] shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center
                     max-[768px]:h-[56px] max-[768px]:px-2"
        >
          <nav className="w-full mx-auto flex" aria-label="services tabs">
            {/* Desktop: 3 equal tabs. Mobile: fixed-size buttons that scroll horizontally */}
            <div className="w-full flex">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setActiveIndex(i)}
                  className={`flex-1 h-[65px] flex items-center justify-center text-sm font-semibold uppercase transition
                              ${i === activeIndex ? "bg-[#02A653] text-white shadow-md" : "text-black hover:bg-[#02A653] hover:text-white"}
                              max-[768px]:flex-none max-[768px]:h-[44px] max-[768px]:px-3 max-[768px]:mr-2`}
                  aria-current={i === activeIndex ? "page" : undefined}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* HERO GRID: two columns fixed on desktop; one column fixed layout on mobile */}
        <div className="mt-6 grid grid-cols-2 gap-6 relative
                        max-[768px]:grid-cols-1 max-[768px]:gap-4">
          {/* LEFT: fixed size container on desktop, full width on mobile */}
          <div
            className="col-span-1 w-[886px] h-[672px] bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.92)_61%,rgba(255,255,255,0.58)_82%,rgba(255,255,255,0)_100%)]
                       px-[51px] py-[110px] z-10
                       max-[768px]:w-full max-[768px]:h-auto max-[768px]:px-6 max-[768px]:py-6"
          >
            {/* Title with fixed block width so it doesn't reflow */}
            <h1 className="text-[45px] leading-[120%] tracking-[-3%] w-[787px] h-[173px] mb-[32px]
                           max-[768px]:w-full max-[768px]:h-auto max-[768px]:text-2xl max-[768px]:mb-4">
              <span className="font-extrabold">{activeTexts.titleTop}</span>
              <br />
              <span className="font-extrabold" style={{ fontWeight: 700 }}>
                {activeTexts.titleBottom}
              </span>
            </h1>

            {/* Bullets — fixed boxes so they keep shape */}
            <div className="flex gap-x-[47px] mb-[46px] max-[768px]:flex-col max-[768px]:gap-y-3">
              <div className="w-[314px] min-h-[54px] flex gap-x-[10px] items-start max-[768px]:w-full">
                <img src="/Header/Tick.svg" alt="tick" className="w-[44px] h-[44px]" />
                <p className="text-[18px] leading-tight">
                  {activeTexts.bullet1Top}
                  <br />
                  <span className="font-bold">{activeTexts.bullet1Bottom}</span>
                </p>
              </div>

              <div className="w-[351px] min-h-[54px] flex gap-x-[10px] items-start max-[768px]:w-full">
                <img src="/Header/Tick.svg" alt="tick" className="w-[44px] h-[44px]" />
                <p className="text-[18px] leading-tight">
                  {activeTexts.bullet2Top}
                  <br />
                  <span className="font-bold">{activeTexts.bullet2Bottom}</span>
                </p>
              </div>
            </div>

            {/* Light box (fixed size on desktop, full width mobile) */}
            <div className="w-[625px] h-[147px] bg-[#ECECEC] rounded-[15px] flex flex-col gap-y-[14px] p-[17px_18px_30px_24px]
                            max-[768px]:w-full max-[768px]:h-auto max-[768px]:p-4">
              <p className="text-xl text-center max-[768px]:text-base">Реанимируем технику даже удаленно!</p>

              <div className="flex items-center justify-center gap-x-[16px] max-[768px]:flex-col">
                <input
                  type="tel"
                  inputMode="tel"
                  value={digits.length ? formatPhone(digits) : ""}
                  onChange={handleChange}
                  onPaste={handlePaste}
                  onKeyDown={handleKeyDown}
                  placeholder={phonePlaceholder}
                  className="w-[294px] h-[58px] rounded-[39px] pl-[29px] text-[18px] placeholder-[#999999] bg-white border border-gray-200 outline-none
                             focus:ring-2 focus:ring-[#02A653] focus:border-transparent
                             max-[768px]:w-full max-[768px]:h-12 max-[768px]:pl-4 max-[768px]:rounded-lg max-[768px]:mb-[20px]"
                  aria-label="Номер телефона"
                />

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className={`w-[273px] h-[58px] rounded-[39px] bg-gradient-to-b from-[#05a859] to-[#02A653] text-white font-bold flex flex-col items-center justify-center shadow-lg
                             hover:opacity-95 transition ${!isValid ? "opacity-60 cursor-not-allowed" : ""}
                             max-[768px]:w-full max-[768px]:h-12 max-[768px]:rounded-lg`}
                  style={{ boxShadow: "0 8px 20px rgba(2,166,83,0.25)" }}
                >
                  <span className="text-sm uppercase leading-none">Записаться на</span>
                  <span className="text-sm uppercase leading-none">бесплатную диагностику</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: fixed visual box on desktop (absolute via grid area), on mobile placed below with fixed width */}
          <div className="col-span-1 flex items-start justify-end">
            <div className="relative w-[654px] h-[656px] pointer-events-none
                            max-[768px]:w-full max-[768px]:h-auto max-[768px]:pointer-events-auto max-[768px]:flex max-[768px]:justify-center">
              <img
                src={rightImageSrc}
                alt="side visual"
                className="w-full h-full object-cover max-[768px]:w-[360px] max-[768px]:h-auto max-[768px]:object-cover max-[768px]:relative max-[768px]:top-[-39px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
