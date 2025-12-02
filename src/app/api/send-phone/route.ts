// src/app/api/send-phone/route.ts
import { NextResponse } from "next/server";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID;

function esc(s: string) {
  return String(s ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export async function POST(req: Request) {
  if (!TELEGRAM_TOKEN || !TARGET_CHAT_ID) {
    return NextResponse.json({ ok: false, message: "Server misconfigured" }, { status: 500 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!phone || !/^\+?\d{9,16}$/.test(phone.replace(/\s+/g, ""))) {
    return NextResponse.json({ ok: false, message: "Invalid phone" }, { status: 400 });
  }

  // optional fields from client
  const name = body.name ? String(body.name).trim() : "";
  const pagePath = body.path ? String(body.path) : "";
  const pageUrl = body.href ? String(body.href) : "";
  const title = body.title ? String(body.title) : "";
  const referrer = body.referrer ? String(body.referrer) : "";
  const ua = body.userAgent ? String(body.userAgent) : "";
  const language = body.language ? String(body.language) : "";
  const timezone = body.timezone ? String(body.timezone) : "";
  const screen = body.screen ? String(body.screen) : "";
  const clientTs = body.clientTimestamp ? String(body.clientTimestamp) : "";
  const geo = body.geolocation ? body.geolocation : null; // expect object {lat, lon, accuracy}

  // server info
  const serverTs = new Date().toISOString();

  // Try to get real visitor IP (behind proxies)
  // Note: in serverless or Vercel, check headers accordingly
  const ip = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || req.headers.get("x-vercel-proxy-ip") || "unknown").split(",")[0].trim();

  // Build message lines
  const parts: string[] = [];
  parts.push("<b>Новая заявка с сайта</b>");
  parts.push(`Номер: <b>${esc(phone)}</b>`);
  if (name) parts.push(`Имя: ${esc(name)}`);
  if (title) parts.push(`Заголовок страницы: ${esc(title)}`);
  if (pagePath) parts.push(`Страница (path): ${esc(pagePath)}`);
  if (pageUrl) parts.push(`URL: ${esc(pageUrl)}`);
  if (referrer) parts.push(`Referer: ${esc(referrer)}`);
  if (timezone) parts.push(`Таймзона клиента: ${esc(timezone)}`);
  if (language) parts.push(`Язык клиента: ${esc(language)}`);
  if (screen) parts.push(`Размер экрана: ${esc(screen)}`);
  if (clientTs) parts.push(`Время (клиент): ${esc(clientTs)}`);
  parts.push(`Время (сервер): ${esc(serverTs)}`);
  parts.push(`IP: ${esc(ip)}`);
  if (ua) parts.push(`User-Agent: ${esc(ua)}`);
  if (geo && typeof geo === "object") {
    const lat = String(geo.lat ?? "");
    const lon = String(geo.lon ?? "");
    const acc = String(geo.accuracy ?? "");
    if (lat && lon) {
      parts.push(`Геолокация (lat,lon): ${esc(lat)}, ${esc(lon)} (точность: ${esc(acc)}м)`);
      // optionally add link to map
      parts.push(`Map: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + "," + lon)}`);
    }
  }

  const text = parts.join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TARGET_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: false,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error("Telegram error:", data);
      return NextResponse.json({ ok: false, message: "Telegram API error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Send error:", err);
    return NextResponse.json({ ok: false, message: "Internal error" }, { status: 500 });
  }
}
