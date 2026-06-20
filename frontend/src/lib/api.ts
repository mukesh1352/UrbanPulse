export const BASE_URL = "http://127.0.0.1:8000";

export async function getLiveStats() {
  const res = await fetch(
    `${BASE_URL}/live-insights/stats`
  );

  return res.json();
}

export async function getLiveInsights() {
  const res = await fetch(
    `${BASE_URL}/live-insights`
  );

  return res.json();
}

export async function getLiveHotspots() {
  const res = await fetch(
    `${BASE_URL}/live-insights/hotspots`
  );

  return res.json();
}