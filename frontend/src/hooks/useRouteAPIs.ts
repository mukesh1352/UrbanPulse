export async function fetchRoutes(
  source: [number, number],
  destination: [number, number]
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"}/routes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        source,
        destination
      })
    }
  );

  return await res.json();
}