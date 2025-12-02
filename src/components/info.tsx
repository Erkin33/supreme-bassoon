// components/info.tsx
import React from "react";

const blocks = [
  {
    img: "/Hero/GroupItem1.svg",
    title: "Используем комплектующие",
    highlight: "из Европы, Китая, США",
    iconWidth: 41,
    iconHeight: 48,
    boxWidth: 213,
    boxHeight: 120,
  },
  {
    img: "/Hero/GroupItem2.svg",
    title: "Диагностику проводят несколько мастеров:",
    highlight: "100% точный диагноз",
    iconWidth: 41,
    iconHeight: 48,
    boxWidth: 193,
    boxHeight: 109,
  },
  {
    img: "/Hero/GroupItem3.svg",
    title: "Не накручиваем стоимость",
    highlight: "все по делу",
    iconWidth: 41,
    iconHeight: 48,
    boxWidth: 192,
    boxHeight: 100,
  },
  {
    img: "/Hero/GroupItem4.svg",
    title: "Даем гарантию на работы до",
    highlight: "12 месяцев",
    iconWidth: 41,
    iconHeight: 48,
    boxWidth: 191,
    boxHeight: 120,
  },
];

export default function Info() {
  return (
    <div
      /* десктопный wrapper — не трогаем поведение, но строго переопределяем для <=650px */
      className={
        "relative left-1/2 transform -translate-x-1/2 " +
        "max-[650px]:static max-[650px]:transform-none max-[650px]:left-auto max-[650px]:-translate-x-0 " +
        "max-[650px]:w-full max-[650px]:px-4 max-[786px]:hidden"
      }
      style={{
        bottom: "100px",
        zIndex: 50,
        width: "100%", // учитывает паддинги 72px слева/справа
        maxWidth: "1140px",
        pointerEvents: "auto",
      }}
    >
      <div
        /* десктопный контейнер — оставлен, но добавлены жёсткие мобайл-переопределения через tailwind */
        className={
          "w-full h-[218px] px-[72px] flex justify-between items-center rounded-[109px] bg-[#FFFFFF] shadow-xl/20 " +
          "max-[650px]:grid max-[650px]:grid-cols-2 max-[650px]:gap-3 max-[650px]:p-3 max-[650px]:h-auto max-[650px]:rounded-[20px] max-[650px]:place-items-stretch"
        }
      >
        {blocks.map((block, index) => (
          <div
            key={index}
            /* Для десктопа сохраняем старые inline-стили. Для мобильного переопределяем через tailwind. */
            className={
              "flex flex-col items-start " +
              "max-[650px]:items-center max-[650px]:text-center max-[650px]:justify-center max-[650px]:w-full max-[650px]:min-h-[96px] max-[650px]:px-2 max-[650px]:py-3"
            }
            /* inline width/height будут работать на десктопе; на мобилке tailwind-классы задают w-full/min-h */
            style={{
              width: `${block.boxWidth}px`,
              height: `${block.boxHeight}px`,
            }}
          >
            <img
              src={block.img}
              alt=""
              /* Для десктопа используем размеры из блока, для мобилки — жёсткие, чтобы иконки были одинаковые */
              className={
                "mb-[11px] " +
                "max-[650px]:mb-2 max-[650px]:w-[34px] max-[650px]:h-[40px] max-[650px]:object-contain"
              }
              style={{
                width: `${block.iconWidth}px`,
                height: `${block.iconHeight}px`,
              }}
            />

            <p
              className={
                "text-[17px] w-full leading-[1.18] " +
                "max-[650px]:text-[13px] max-[650px]:leading-[1.15] max-[650px]:px-1"
              }
            >
              <span className="block">{block.title}</span>
              <span className="block font-bold max-[650px]:text-[14px]">
                {block.highlight}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
