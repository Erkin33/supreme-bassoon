"use client";
import React from "react";

const logos = [
  "/logos/a1.png.webp",
  "/logos/a2.png.webp",
  "/logos/a3.png.webp",
  "/logos/a4.png",
  "/logos/a5.png.webp",
  "/logos/a6.png.webp",
  "/logos/a8.png.webp",
  "/logos/a9.png.webp",
  "/logos/a11.png.webp",
  "/logos/a13.png.webp",
  "/logos/a14.png.webp",
  "/logos/a15.png.webp",
  "/logos/a17.png.webp",
  "/logos/a20.png.webp",
  "/logos/a23.png.webp",
  "/logos/b2-1.png.webp",
  "/logos/b3.png.webp",
  "/logos/b4.png.webp",
  "/logos/b5.png.webp",
  "/logos/b6.png.webp",
  "/logos/b7.png.webp",
  "/logos/b8.png.webp",
  "/logos/b9.png",
  "/logos/b10.png.webp",
  "/logos/b11.png.webp",
];

export default function Believe(): React.ReactElement {
  // карточка одного логотипа — фиксированные размеры
  const cardW = 140; // px
  const cardH = 80; // px

  return (
    <section className="w-full h-auto bg-[#FFFFFF]  pl-[101px] pr-[74px] pt-[54px] pb-[65px]">
      <div className="max-w-[1140px] mx-auto">
        {/* Заголовок */}
        <div className="text-left mb-8">
          <h2 className="text-5xl font-bold text-[#000000] mx-auto text-center mb-[15px]">
            Мы ремонтируем и обслуживаем
            <br />
            все марки бытовой техники
          </h2>
        </div>

        {/* Сетка логотипов */}
        <div
          className="grid gap-x-8 gap-y-6 justify-center items-center"
          style={{
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            alignItems: "center",
          }}
        >
          {logos.map((src, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-white rounded-[12px] shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
              style={{
                width: `${cardW}px`,
                height: `${cardH}px`,
              }}
            >
              <img
                src={src}
                alt={`logo-${i}`}
                className="max-w-[88%] max-h-[76%] object-contain"
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Адаптивные брейкпоинты (Tailwind не всегда позволяет задать точно такую сетку inline -> добавил style jsx) */}
      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 18px 16px;
            justify-items: center;
          }
        }
        @media (max-width: 820px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px 12px;
          }
        }
        @media (max-width: 480px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px 10px;
          }
        }
      `}</style>
    </section>
  );
}
