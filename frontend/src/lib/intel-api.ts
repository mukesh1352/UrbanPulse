import { BASE_URL } from "./api";

export async function getForecast() {
  const res = await fetch(`${BASE_URL}/forecast/`)
  return res.json();
}

export async function getHotspots() {
  const res = await fetch(`${BASE_URL}/hotspots/`);
  return res.json();
}

export async function getHourlyTrend() {
  const res = await fetch(`${BASE_URL}/trend/hourly/`);
  return res.json();
}

export async function getAnomalies() {
  const res = await fetch(`${BASE_URL}/anomalies/`)
  return res.json();
}