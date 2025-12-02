// можно сохранить как src/lib/sendPhone.ts или вставить прямо в компонент
export async function sendPhonePayload(payload: {
  phone: string;
  name?: string;
}) {
  // collect client-side info
  const href = typeof window !== "undefined" ? window.location.href : "";
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const title = typeof document !== "undefined" ? document.title : "";
  const referrer = typeof document !== "undefined" ? document.referrer : "";
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const language = typeof navigator !== "undefined" ? navigator.language || "" : "";
  const timezone = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";
  const screenSize = typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "";

  const clientTimestamp = new Date().toISOString();

  // try to get geolocation with timeout
  const geolocation = await new Promise<{ lat?: number; lon?: number; accuracy?: number } | null>((resolve) => {
    if (!("geolocation" in navigator)) return resolve(null);
    let resolved = false;
    const onSuccess = (pos: GeolocationPosition) => {
      if (resolved) return;
      resolved = true;
      resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude, accuracy: pos.coords.accuracy });
    };
    const onErr = () => {
      if (resolved) return;
      resolved = true;
      resolve(null);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onErr, { enableHighAccuracy: false, maximumAge: 1000 * 60 * 5, timeout: 4000 });
    // fallback timeout 4s (in case callback never fires)
    setTimeout(() => {
      if (!resolved) { resolved = true; resolve(null); }
    }, 4500);
  });

  const body = {
    phone: payload.phone,
    name: payload.name,
    path,
    href,
    title,
    referrer,
    userAgent,
    language,
    timezone,
    screen: screenSize,
    clientTimestamp,
    geolocation,
  };

  const resp = await fetch("/api/send-phone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return resp;
}
