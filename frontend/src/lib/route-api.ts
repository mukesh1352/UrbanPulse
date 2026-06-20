export async function getRoutes() {

  const response = await fetch(
    "http://127.0.0.1:8000/route"
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch routes"
    );

  }

  return response.json();

}