export const BASE_URL = "/api";

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