"use client";
import React from "react";

export default function GuaranteeSection(): React.ReactElement {
  return (
    <section className="w-full flex justify-center bg-transparent relative">
      <div className="max-w-[1140px] w-full ">
        {/* контейнер для карточки + зелёного блока */}
        <div className="relative pt-[24px]">
          {/* Зелёный блок снизу (под карточкой) */}
          <div
            className="w-full rounded-[24px] mt-[-46px] bg-[#02A653] text-white overflow-hidden"
            style={{ paddingTop:  "86px", paddingBottom: "56px", boxShadow: "" }}
          >
            <div className="max-w-[1040px] mx-auto px-[36px]">
              {/* Заголовок зеленого блока */}
              <div className="mb-[40px]">
                <h3 className="text-[42px]  leading-[120%]">
                  Техника заработает, как новая - даем 
                  <span className="font-extrabold"> гарантию до 12 месяцев</span>
                </h3>
              </div>

              {/* Три колонки с иконками и текстом */}
              <div className="flex flex-row justify-between md:items-start">
                {/* item 1 */}
                <div className="flex-1 pr-6">
                  <div className="flex flex-col items-start gap-y-4">
                    <img src="/Guarantee/Icon1.svg" alt="icon1" className="w-[62.07px] h-[62px]" />
                    <div>
                      <p className="text-[19px] leading-[130%] tracking-[-2%] opacity-90 w-[382px]">
                        С 2016 года мы запаяли более 15 миллионов компонентов приборов и произвели более 2 000 изделий (собственные разработки)
                      </p>
                    </div>
                  </div>
                </div>

                {/* item 2 */}
                <div className="flex-1 pr-6">
                  <div className="flex flex-col items-start gap-y-4">
                    <img src="/Guarantee/Icon2.svg" alt="icon2" className="w-[63.14px] h-[62.47px]" />
                    <div>
                      <p className="text-[19px] leading-[130%] tracking-[-2%] opacity-90 w-[264px]">
                        Этот опыт позволяет нам ремонтировать даже сложные неисправности приборов
                      </p>
                    </div>
                  </div>
                </div>

                {/* item 3 */}
                <div className="flex-1">
                  <div className="flex flex-col items-start gap-y-[7px]">
                    <img src="/Guarantee/Icon3.svg" alt="icon3" className="w-[50.7px] h-[68.69px]" />
                    <div>
                      <p className="text-[19px] leading-[130%] tracking-[-2%] opacity-90 w-[219px]">
                        Даем гарантию на работы до 12 месяцев
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ниже: если нужно — оставим свободное пространство */}
        </div>
      </div>
    </section>
  );
}
