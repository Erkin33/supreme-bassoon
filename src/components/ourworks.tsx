"use client";
import React, { useEffect, useState } from "react";

type WorkItem = {
  id: string;
  title: string;
  image: string;
  problem: string;
  solution: string;
  iconProblem: string;
  iconSolution: string;
};

const items: WorkItem[] = [
  {
    id: "cond",
    title: "Починка кондиционера",
    image: "/OurWorks/Air-repaire.webp",
    problem: "Поступил вызов: необычный шум и снижение эффективности работы внутреннего блока.",
    solution: "Проведена диагностика, выявлена неисправность — выполнены работы по восстановлению работоспособности.",
    iconProblem: "/OurWorks/Question.svg",
    iconSolution: "/OurWorks/Light.svg"
  },
  {
    id: "light",
    title: "Починка света",
    image: "/OurWorks/Light-repaire.jpg",
    problem: "Поступил вызов: частые перебои в освещении или полное отсутствие света.",
    solution: "Проведена диагностика электросети, устранены неисправные участки и восстановлена стабильная работа освещения.",
    iconProblem: "/OurWorks/Question.svg",
    iconSolution: "/OurWorks/Light.svg"
  },
  {
    id: "mixer",
    title: "Починка смесителя",
    image: "/OurWorks/Smestitel.jpg",
    problem: "Поступил вызов: протечка или некорректная работа смесителя.",
    solution: "Выполнена диагностика, заменены изношенные детали и проверена герметичность подключения.",
    iconProblem: "/OurWorks/Question.svg",
    iconSolution: "/OurWorks/Light.svg"
  },
  {
    id: "sink",
    title: "Подключение умывальника к канализации",
    image: "/OurWorks/umvalnik.jpg",
    problem: "Поступил вызов: требуется корректное подключение умывальника к системе канализации.",
    solution: "Выполнено качественное подключение с проверкой на протечки и соответствием санитарным нормам.",
    iconProblem: "/OurWorks/Question.svg",
    iconSolution: "/OurWorks/Light.svg"
  }
];

export default function OurWorks(): React.ReactElement {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxSrc(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section id="our-works" className="w-full bg-white py-12 px-6 lg:px-16">
        <h3 className="font-bold text-3xl lg:text-4xl text-center mb-10">
          Примеры работ наших инженеров
        </h3>

        <div className="max-w-[1200px] mx-auto space-y-12">
          {items.map((it, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div key={it.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* IMAGE column */}
                <div className={`${isEven ? "lg:order-1" : "lg:order-2"} relative rounded-lg overflow-hidden shadow-lg group`}>
                  <div className="w-full h-[320px] lg:h-[260px] bg-gray-100">
                    <div
                      className="w-full h-full relative cursor-pointer"
                      onClick={() => setLightboxSrc(it.image)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setLightboxSrc(it.image);
                      }}
                    >
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:brightness-75"
                        draggable={false}
                      />

                      {/* Lupa appears only on hover */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-20 h-20 md:w-24 md:h-24">
                          <svg viewBox="0 0 121 119" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
                            <path d="M107.083 118.996C105.485 118.823 104.354 117.843 103.245 116.803C101.067 114.76 98.9238 112.68 96.807 110.571C92.6219 106.399 88.4053 102.257 84.2293 98.0755C79.9303 93.7713 75.5501 89.5442 71.4605 85.0344C70.9486 84.4702 70.4852 83.8615 70.01 83.2645C69.2494 82.3076 68.7873 81.225 68.9497 79.9918C69.1473 78.4877 68.3239 77.4862 67.3971 76.5109C67.096 76.1941 66.8263 76.4468 66.5815 76.596C65.4649 77.2754 64.3796 78.0098 63.2433 78.6552C58.71 81.2263 53.8912 83.0302 48.7347 83.8444C46.2933 84.2293 43.8165 84.0696 41.3541 84.0814C38.8917 84.0932 36.4306 84.1259 33.9996 83.5787C28.9636 82.445 24.1658 80.7249 19.8026 77.9208C16.7066 75.931 13.9379 73.5406 11.3891 70.8897C8.26165 67.6379 5.73642 63.979 3.85265 59.8777C2.09454 56.0486 0.858762 52.0703 0.349526 47.8786C0.227781 46.8876 0.116509 45.894 0 44.9017C0 43.0258 0 41.1486 0 39.2726C0.0680726 38.6469 0.145309 38.0211 0.204218 37.3941C0.699053 32.1381 2.27389 27.1989 4.7101 22.5425C7.06384 18.0418 10.1441 14.0858 13.9392 10.6887C19.0014 6.15664 24.8268 3.04756 31.3592 1.23054C33.527 0.629671 35.7381 0.278836 37.9635 0C39.9704 0 41.9785 0 43.9853 0C44.797 0.192436 45.6361 0.144 46.4543 0.180654C50.8423 0.378326 54.9398 1.67694 58.9207 3.39316C63.1347 5.21017 66.9926 7.60449 70.3831 10.728C70.9552 11.2555 71.2654 11.7661 71.2366 12.5738C71.1751 14.2298 71.2039 15.8884 71.2248 17.547C71.2314 18.1217 71.0455 18.3665 70.4329 18.3586C68.4705 18.3298 66.5069 18.339 64.5433 18.356C64.1165 18.36 63.7958 18.2016 63.4829 17.9397C61.1985 16.0324 58.7702 14.3463 56.0669 13.0725C51.6631 10.9976 47.0656 9.9543 42.167 9.93729C35.2446 9.91372 29.0212 11.9192 23.4301 15.908C18.4896 19.4334 14.8254 24.0191 12.4704 29.6325C10.5382 34.2353 9.70558 39.0475 10.0211 44.0089C10.512 51.7247 13.3763 58.456 18.733 64.0956C23.1447 68.7389 28.4242 71.8728 34.6385 73.4346C38.1717 74.3235 41.7586 74.3968 45.356 74.0787C53.0586 73.3966 59.5779 70.1462 65.0067 64.7148C69.3306 60.3895 72.1674 55.1977 73.5733 49.2361C73.7461 48.5017 73.8469 48.4506 74.5787 48.9468C76.634 50.341 78.8608 50.718 81.2485 50.0765C81.7905 49.9312 82.2958 49.6511 82.8194 49.4364C83.5119 49.151 83.7855 49.3461 83.6533 50.0922C83.4282 51.3594 83.0433 52.59 82.682 53.8245C81.5352 57.7386 79.9015 61.4368 77.7284 64.8915C77.6001 65.0944 77.4836 65.3038 77.3619 65.5107C77.1904 65.8013 77.1301 66.0186 77.5896 66.1011C77.9575 66.1678 78.29 66.3904 78.5322 66.6653C79.1435 67.3539 79.9368 67.4939 80.7851 67.5018C82.0287 67.5136 83.2933 67.4521 84.4152 68.1145C85.3997 68.6944 86.1864 69.5283 87.0072 70.3059C94.1457 77.0752 101.079 84.0526 107.996 91.0457C111.522 94.6117 115.033 98.1934 118.462 101.856C119.454 102.917 120.265 104.033 120.435 105.516C120.435 106.39 120.435 107.261 120.435 108.135C120.215 109.431 119.677 110.571 118.804 111.562C117.277 113.295 115.653 114.925 113.942 116.476C112.558 117.73 111.054 118.703 109.177 119C108.48 118.996 107.781 118.996 107.083 118.996Z" fill="white" fillOpacity="0.6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TEXT column */}
                <div className={`${isEven ? "lg:order-2" : "lg:order-1"} flex items-center`}>
                  <div className="w-full h-[320px] lg:h-[260px] flex flex-col justify-center gap-6 px-2">
                    {/* green pill heading — full width, centered */}
                    <div className="w-full">
                      <div className="w-full bg-[#02A653] text-white rounded-full px-6 py-3 font-semibold text-sm lg:text-base shadow-sm text-center">
                        {it.title}
                      </div>
                    </div>

                    {/* problem */}
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-sm">
                        <img src={it.iconProblem} alt="problem" className="w-10 h-10 object-contain" />
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold">Проблема:</p>
                        <p className="text-sm text-gray-700 mt-2">{it.problem}</p>
                      </div>
                    </div>

                    {/* solution */}
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-sm">
                        <img src={it.iconSolution} alt="solution" className="w-10 h-10 object-contain" />
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold">Решение:</p>
                        <p className="text-sm text-gray-700 mt-2">{it.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setLightboxSrc(null)}>
          <div className="relative max-w-[95vw] max-h-[95vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightboxSrc(null)} className="absolute top-4 right-4 z-50 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-800 shadow" aria-label="Закрыть">×</button>
            <img src={lightboxSrc} alt="preview" className="max-w-full max-h-[90vh] object-contain rounded" />
          </div>
        </div>
      )}
    </>
  );
}
