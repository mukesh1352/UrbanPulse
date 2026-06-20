import { BASE_URL } from "./api";

export async function getRoutes() {

  const response = await fetch(
    `${BASE_URL}/route`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch routes"
    );

  }

  return response.json();

}