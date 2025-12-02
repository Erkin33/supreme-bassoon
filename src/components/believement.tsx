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
  return (
    <section
      className={
        // добавил overflow-x-hidden, остальное — как было
        "w-full bg-[#FFFFFF] py-14 px-[101px] overflow-x-hidden " +
        "max-[1024px]:px-8 max-[820px]:px-6 max-[650px]:px-4 max-[480px]:px-3 max-[650px]:pb-[0px]"
      }
    >
      <div className="max-w-[1140px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-end justify-between gap-6">
            <h2
              className={
                "text-5xl font-extrabold text-[#0B0B0B] leading-tight text-center " +
                "max-[1024px]:text-4xl max-[820px]:text-3xl max-[650px]:text-[22px] max-[650px]:text-center w-full"
              }
            >
              Мы ремонтируем и обслуживаем
              <br />
              все марки бытовой техники
            </h2>
          </div>

          <div className="mt-4 w-28 h-[3px] bg-[#02A653] rounded-full mx-auto"></div>
        </div>

        {/* Grid */}
        <div
          className={
            "mx-auto grid gap-6 items-center justify-center " +
            // 5 / 4 / 3 / 2 (<=650) columns — ниже 650px будет строго 2 в ряд
            "grid-cols-5 max-[1200px]:grid-cols-4 max-[1024px]:grid-cols-4 max-[820px]:grid-cols-3 max-[650px]:grid-cols-2 max-[480px]:grid-cols-2"
          }
          style={{ alignItems: "center" }}
        >
          {logos.map((src, i) => (
            <div
              key={i}
              className={
                "flex items-center justify-center rounded-lg transition-transform duration-200 ease-in-out " +
                "hover:scale-[1.03] hover:shadow-lg border border-transparent bg-white/0"
              }
              style={{
                // делаем карточки полностью адаптивными — ширина 100% ячейки, padding учитывает boxSizing
                width: "100%",
                boxSizing: "border-box",
                minHeight: 88,
                padding: "10px 12px",
              }}
            >
              <img
                src={src}
                alt={`logo-${i}`}
                draggable={false}
                style={{ userSelect: "none", maxWidth: "100%", maxHeight: "64px", width: "auto", height: "auto" }}
                className={
                  // убрал жесткие h-[...] классы, оставил адаптивное поведение через inline-стили выше
                  "object-contain"
                }
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center opacity-80 text-sm max-[650px]:text-xs">
          Более 1000 довольных клиентов доверили нам свою технику.
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1280px) {
          div[style*="alignItems"] {
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 22px;
          }
        }
        @media (max-width: 1200px) {
          div[style*="alignItems"] {
            gap: 18px;
          }
        }
        .hover\\:shadow-lg:hover {
          box-shadow: 0 10px 30px rgba(2, 166, 83, 0.08);
        }
      `}</style>
    </section>
  );
}
