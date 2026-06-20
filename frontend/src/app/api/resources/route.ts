import { NextResponse } from "next/server";

const POLICE_STATIONS = [
  { name: "Shivajinagar PS", lat: 12.9833, lon: 77.6033, available: 20 },
  { name: "Ashok Nagar PS", lat: 12.9727, lon: 77.6115, available: 15 },
  { name: "Ulsoor PS", lat: 12.9784, lon: 77.6245, available: 18 },
  { name: "Cubbon Park PS", lat: 12.9756, lon: 77.5929, available: 12 }
];

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const latitude = Number(searchParams.get("latitude"));
    const longitude = Number(searchParams.get("longitude"));
    const required_police = Number(searchParams.get("police_needed")) || 1;
    
    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
    }

    const stations = POLICE_STATIONS.map(station => {
      const distance = haversineDistance(latitude, longitude, station.lat, station.lon);
      return {
        ...station,
        distance: Number(distance.toFixed(2))
      };
    }).sort((a, b) => a.distance - b.distance);

    let remaining = required_police;
    const deployment: any[] = [];

    for (const station of stations) {
      if (remaining <= 0) break;
      const send = Math.min(remaining, station.available);
      
      deployment.push({
        station: station.name,
        send,
        distance: station.distance
      });
      remaining -= send;
    }

    return NextResponse.json(deployment);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
