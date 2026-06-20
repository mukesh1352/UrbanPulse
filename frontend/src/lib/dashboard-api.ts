import { BASE_URL } from "./api";

export async function getSummary() {
  const res = await fetch(`${BASE_URL}/dashboard/summary`);
  return res.json();
}

export async function getEventCauses() {
  const res = await fetch(`${BASE_URL}/dashboard/event-causes`);
  return res.json();
}

export async function getHourly() {
  const res = await fetch(`${BASE_URL}/dashboard/hourly`);
  return res.json();
}

export async function getPriority() {
  const res = await fetch(`${BASE_URL}/dashboard/priority`);
  return res.json();
}

export async function getClusters() {
  const res = await fetch(`${BASE_URL}/dashboard/clusters`);
  return res.json();
}