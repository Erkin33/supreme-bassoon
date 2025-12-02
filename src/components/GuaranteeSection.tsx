"use client";
import React from "react";

export default function GuaranteeSection(): React.ReactElement {
  return (
    <section className="w-full flex justify-center bg-transparent relative">
      <div className="max-w-[1140px] w-full">
        {/* контейнер для карточки + зелёного блока */}
        <div className="relative pt-[24px]">
          {/* Зелёный блок снизу (под карточкой) */}
          <div
            className={
              "w-full rounded-[24px] mt-[-46px] bg-[#02A653] text-white overflow-hidden " +
              // mobile overrides
              "max-[650px]:mt-[-20px] " +
              "max-[650px]:rounded-[16px] " +
              "max-[650px]:px-4 " +
              "max-[650px]:pt-[36px] max-[650px]:pb-[28px]"
            }
            style={{ paddingTop: "86px", paddingBottom: "56px", boxShadow: "" }}
          >
            <div className="max-w-[1040px] mx-auto px-[36px] max-[650px]:px-0">
              {/* Заголовок зеленого блока */}
              <div className="mb-[40px] max-[650px]:mb-5">
                <h3
                  className={
                    "text-[42px] leading-[120%] " +
                    "max-[650px]:text-[20px] max-[650px]:leading-[1.15] max-[650px]:text-center"
                  }
                >
                  Техника заработает, как новая - даем{" "}
                  <span className="font-extrabold">гарантию до 12 месяцев</span>
                </h3>
              </div>

              {/* Три колонки с иконками и текстом */}
              <div
                className={
                  "flex flex-row justify-between md:items-start " +
                  // mobile: stack into 2 rows: 2 items in first row, 1 centered in 2nd
                  "max-[650px]:grid max-[650px]:grid-cols-2 max-[650px]:gap-3 max-[650px]:items-start max-[650px]:justify-items-center"
                }
              >
                {/* item 1 */}
                <div
                  className={
                    "flex-1 pr-6 " +
                    "max-[650px]:pr-0 max-[650px]:flex max-[650px]:flex-col max-[650px]:items-center max-[650px]:text-center max-[650px]:w-full"
                  }
                >
                  <div className="flex flex-col items-start gap-y-4 max-[650px]:items-center">
                    <img
                      src="/Guarantee/Icon1.svg"
                      alt="icon1"
                      className={
                        "w-[62.07px] h-[62px] " +
                        "max-[650px]:w-[44px] max-[650px]:h-[44px] max-[650px]:mb-1"
                      }
                    />
                    <div>
                      <p
                        className={
                          "text-[19px] leading-[130%] tracking-[-2%] opacity-90 w-[382px] " +
                          "max-[650px]:text-[14px] max-[650px]:w-full max-[650px]:px-2 max-[650px]:leading-[1.25]"
                        }
                      >
                        С 2016 года мы запаяли более 15 миллионов компонентов приборов и произвели более 2 000 изделий (собственные разработки)
                      </p>
                    </div>
                  </div>
                </div>

                {/* item 2 */}
                <div
                  className={
                    "flex-1 pr-6 " +
                    "max-[650px]:pr-0 max-[650px]:flex max-[650px]:flex-col max-[650px]:items-center max-[650px]:text-center max-[650px]:w-full"
                  }
                >
                  <div className="flex flex-col items-start gap-y-4 max-[650px]:items-center">
                    <img
                      src="/Guarantee/Icon2.svg"
                      alt="icon2"
                      className={
                        "w-[63.14px] h-[62.47px] " +
                        "max-[650px]:w-[44px] max-[650px]:h-[44px] max-[650px]:mb-1"
                      }
                    />
                    <div>
                      <p
                        className={
                          "text-[19px] leading-[130%] tracking-[-2%] opacity-90 w-[264px] " +
                          "max-[650px]:text-[14px] max-[650px]:w-full max-[650px]:px-2 max-[650px]:leading-[1.25]"
                        }
                      >
                        Этот опыт позволяет нам ремонтировать даже сложные неисправности приборов
                      </p>
                    </div>
                  </div>
                </div>

                {/* item 3 */}
                <div
                  className={
                    "flex-1 " +
                    // на мобилке делаем третий элемент занимать full-width под первыми двумя
                    "max-[650px]:col-span-2 max-[650px]:flex max-[650px]:flex-col max-[650px]:items-center max-[650px]:text-center max-[650px]:mt-1"
                  }
                >
                  <div className="flex flex-col items-start gap-y-[7px] max-[650px]:items-center">
                    <img
                      src="/Guarantee/Icon3.svg"
                      alt="icon3"
                      className={
                        "w-[50.7px] h-[68.69px] " +
                        "max-[650px]:w-[48px] max-[650px]:h-[52px] max-[650px]:mb-1"
                      }
                    />
                    <div>
                      <p
                        className={
                          "text-[19px] leading-[130%] tracking-[-2%] opacity-90 w-[219px] " +
                          "max-[650px]:text-[14px] max-[650px]:w-full max-[650px]:px-2 max-[650px]:leading-[1.25]"
                        }
                      >
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
