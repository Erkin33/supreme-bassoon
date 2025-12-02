// components/info.tsx
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
      className="relative left-1/2 transform -translate-x-1/2"
      style={{
        bottom: "130px",
        zIndex: 50,
        width: "100%", // учитывает паддинги 72px слева/справа
        maxWidth: "1140px",
        pointerEvents: "auto",
      }}
    >
      <div className="w-full h-[218px] px-[72px] flex justify-between items-center rounded-[109px] bg-[#FFFFFF] shadow-xl/20">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="flex flex-col items-start"
            style={{
              width: `${block.boxWidth}px`,
              height: `${block.boxHeight}px`,
            }}
          >
            <img
              src={block.img}
              alt=""
              style={{
                width: `${block.iconWidth}px`,
                height: `${block.iconHeight}px`,
              }}
              className="mb-[11px]"
            />

            <p className="text-[17px] w-full leading-[1.18]">
              <span className="">{block.title}</span>
              <span className="block font-bold">{block.highlight}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
