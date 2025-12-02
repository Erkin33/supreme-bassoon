"use client";
import React, { useEffect, useRef, useState } from "react";
import { sendPhonePayload } from "@/lib/sendPhone";
const Images = [
  { src: "/Footer/TG.svg", width: "42.23px", height: "42.23px", href: "#" },
  { src: "/Footer/Watsapp.svg", width: "59.44px", height: "61px", href: "#" },
  { src: "/Footer/VK.svg", width: "56.31px", height: "43.64px", href: "#" },
  { src: "/Footer/YT.svg", width: "54.9px", height: "32.38px", href: "#" }
];

export default function Footer(): React.ReactElement {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const ymapsScriptId = "ymaps-api";

  // ------------ PHONE INPUT (UZB: +998 XX XXX XX XX) ------------
  const [digits, setDigits] = useState<string>(""); // max 9 digits
  const isValid = digits.length === 9;

  function formatPhoneUZ(digs: string): string {
    const p1 = digs.slice(0, 2); // код оператора
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

  function handleChangePhone(e: React.ChangeEvent<HTMLInputElement>) {
    let only = e.target.value.replace(/[^\d]/g, "");
    // remove leading country code if pasted
    if (only.startsWith("998")) only = only.slice(3);
    only = only.slice(0, 9);
    setDigits(only);
  }

  function handlePastePhone(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    let txt = e.clipboardData.getData("text") ?? "";
    let only = txt.replace(/\D/g, "");
    if (only.startsWith("998")) only = only.slice(3);
    setDigits(only.slice(0, 9));
  }

  function handleKeyDownPhone(e: React.KeyboardEvent<HTMLInputElement>) {
    const k = e.key;
    const isDigit = k >= "0" && k <= "9";
    const allowed = isDigit || ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(k);
    if (!allowed) e.preventDefault();
  }

  async function handleSubmit(): Promise<void> {
  if (!isValid) return;
  const normalized = "+998" + digits;

  try {
    // disable UI if нужно (spinner) — здесь простая реализация
    const res = await sendPhonePayload({ phone: normalized /*, name: optional*/ });
    const json = await res.json();
    if (res.ok && json.ok) {
      alert("Спасибо! Номер отправлен. Ожидайте звонка.");
      setDigits("");
    } else {
      console.error("send failed", json);
      alert("Ошибка отправки, попробуйте ещё раз.");
    }
  } catch (err) {
    console.error(err);
    alert("Ошибка сети. Попробуйте позже.");
  }
}


  // ------------ YANDEX MAP (Ташкент, Яшнабадский район) ------------
  useEffect(() => {
    const initMap = () => {
      const w = window as any;
      if (!w.ymaps || !mapRef.current) return;

      try {
        // Координаты поставлены на центр Ташкента (Яшнабадский район можно уточнить)
        const map = new w.ymaps.Map(
          mapRef.current,
          {
            center: [41.2995, 69.2401],
            zoom: 13,
            controls: []
          },
          { suppressMapOpenBlock: true }
        );

        map.behaviors.disable("scrollZoom");

        const placemark = new w.ymaps.Placemark(
          [41.2995, 69.2401],
          {
            hintContent: "NTK Прибор — Ташкент",
            balloonContent: "г. Ташкент, Яшнабадский район"
          },
          {
            iconLayout: "default#image",
            iconImageSize: [28, 40],
            iconImageOffset: [-14, -40]
          }
        );

        map.geoObjects.add(placemark);

        (mapRef.current as any).__ymap = map;
      } catch {}
    };

    if ((window as any).ymaps) {
      (window as any).ymaps.ready(initMap);
    } else if (!document.getElementById(ymapsScriptId)) {
      const script = document.createElement("script");
      script.id = ymapsScriptId;
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.onload = () => (window as any).ymaps.ready(initMap);
      document.head.appendChild(script);
    }

    return () => {
      if (mapRef.current && (mapRef.current as any).__ymap) {
        try {
          (mapRef.current as any).__ymap.destroy();
        } catch {}
      }
    };
  }, []);

  // ------------ UI ------------
  return (
    <div
      className={
        // сохраняем десктоп-стили; добавляем только мобильные overrides для красоты
        "w-full h-[659px] rounded-[95px] px-[72px] pt-[57px] pb-[49px] flex flex-col " +
        "max-[900px]:px-6 max-[650px]:h-auto max-[650px]:px-5 max-[650px]:pt-6 max-[650px]:pb-6 max-[768px]:mb-[30px]"
      }
    >
      <div
        id="contacts"
        className={
          "w-full h-[366px] flex justify-between items-start " +
          // mobile: stack and center
          "max-[950px]:gap-8 max-[650px]:flex-col max-[650px]:h-auto max-[650px]:items-center max-[650px]:text-center "
        }
      >
        {/* LEFT */}
        <div
          className={
            "w-[424px] h-full flex flex-col " +
            // mobile override: full width, center contents
            "max-[950px]:w-1/2 max-[650px]:w-full max-[650px]:h-auto max-[650px]:items-center"
          }
        >
          <h2
            className={
              "text-5xl font-bold mb-[32px] " +
              // mobile: centered headline, smaller size
              "max-[950px]:text-4xl max-[650px]:text-2xl max-[650px]:mb-4"
            }
          >
            Наши контакты:
          </h2>

          <div
            className={
              "text-xl  w-[370px] " +
              // mobile: fluid, centered, smaller text
              "max-[950px]:w-[360px] max-[650px]:w-full max-[650px]:h-auto max-[650px]:text-base"
            }
          >
            <p className="mb-[20px] font-bold text-lg max-[650px]:text-base">Будем рады видеть Вас в нашем офисе:</p>

            <p className="mb-[20px] max-[650px]:mx-auto">
              г. Ташкент, Яшнабадский район
              <br />
              ПН - ПТ с 08:00 до 17:00
            </p>

            <div className="mt-1 max-[650px]:mx-auto">
              <div className="font-semibold">+7-927-843-51-44</div>
              <div className="mt-1">remont@ntkpribor.ru</div>
            </div>
          </div>

          <div
            className={
              "w-[273.09px] mt-[10px] gap-x-[22.52px] h-[61px] flex justify-between items-center " +
              // mobile: full width, center icons and add spacing
              "max-[950px]:w-[220px] max-[650px]:w-full max-[650px]:mt-4 max-[650px]:justify-center max-[650px]:gap-x-6"
            }
          >
            {Images.map((img, index) => (
              <a
                key={index}
                href={img.href}
                className={
                  // keep inline widths on desktop; mobile override to uniform size
                  "block " + "max-[650px]:w-[48px] max-[650px]:h-[48px]"
                }
                style={{ width: img.width, height: img.height }}
                aria-label={`social-${index}`}
              >
                <img src={img.src} alt="" className="w-full h-full" />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT MAP */}
        <div
          className={
            "w-[479px] h-[260px] my-auto relative rounded-[20px] overflow-hidden bg-[#f6f7f8] shadow-sm " +
            // mobile: full width under contacts, increased visual prominence
            "max-[950px]:w-3/5 max-[650px]:w-full max-[650px]:h-[240px] max-[650px]:mt-3"
          }
        >
          <div
            ref={mapRef}
            className="w-full h-full"
            style={{ filter: "grayscale(0.4) brightness(0.98) contrast(0.95)" }}
          />
          <div className="absolute left-[8%] top-[6%] bg-white/95 rounded-md px-3 py-2 text-sm shadow-md flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#374151] rounded-full" />
            <div className="font-semibold text-sm">NTK Прибор — Ташкент</div>
            <div className="text-xs text-gray-500 ml-2">пн–пт 08:00–17:00</div>
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM FORM ---------- */}
      <div
        className={
          "w-[752px] h-[158px] rounded-[19px] bg-[#02A653] mx-auto mt-[29px] px-[37px] pt-[25px] pb-[35px] flex flex-col items-center " +
          // mobile: full width + inner padding and stacked layout
          "max-[950px]:w-[90%] max-[650px]:w-full max-[650px]:mt-6 max-[650px]:px-6 max-[650px]:py-5 max-[768px]:h-[200px]"
        }
      >
        <p
          className={
            "text-xl font-bold mx-auto text-center text-white " +
            "max-[650px]:text-[16px]"
          }
        >
          Оставьте свой номер и получите консультацию мастера:
        </p>

        <div
          className={
            "flex gap-x-[28px] w-full h-[58px] mt-[10px] items-center justify-center " +
            // mobile: stack input + button vertically with gap
            "max-[650px]:flex-col max-[650px]:h-auto max-[650px]:gap-3"
          }
        >
          {/* INPUT */}
          <input
            type="tel"
            inputMode="tel"
            value={digits ? formatPhoneUZ(digits) : ""}
            onChange={handleChangePhone}
            onPaste={handlePastePhone}
            onKeyDown={handleKeyDownPhone}
            placeholder="+998 __ ___ __ __"
            className={
              "w-[326px] h-[58px] rounded-[39px] pl-[29px] text-[18px] bg-white/10 outline-none " +
              "border border-transparent focus:ring-2 focus:ring-white text-white placeholder-[#E6E6E6] " +
              // mobile: full width
              "max-[650px]:w-full max-[650px]:h-[50px] max-[650px]:pl-4"
            }
            style={{
              background: "rgba(255,255,255,0.08)"
            }}
          />

          {/* BUTTON */}
          <button
            disabled={!isValid}
            onClick={handleSubmit}
            className={
              `w-[326px] h-[58px] text-[#02A653] bg-white rounded-[39px] font-extrabold text-lg flex justify-center items-center ${!isValid ? "opacity-60 cursor-not-allowed" : ""}` +
              // mobile: full width and smaller height
              " max-[650px]:w-full max-[650px]:h-[50px]"
            }
          >
            ОСТАВИТЬ ЗАЯВКУ
          </button>
        </div>
      </div>
    </div>
  );
}
