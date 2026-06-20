import fs from "fs";
import path from "path";

let eventsCache: any[] | null = null;
let centersCache: any[] | null = null;

export function getClusterCenters() {
  if (centersCache) return centersCache;
  try {
    const filePath = path.join(process.cwd(), "src/data/cluster_centers.csv");
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n").filter(Boolean);
    const headers = lines[0].split(",");
    
    centersCache = lines.slice(1).map(line => {
      const parts = line.split(",");
      const obj: any = {};
      headers.forEach((h, i) => {
        const val = parts[i]?.trim();
        obj[h.trim()] = isNaN(Number(val)) ? val : Number(val);
      });
      return obj;
    });
    return centersCache || [];
  } catch (err) {
    console.error("Error reading cluster centers:", err);
    return [];
  }
}

export function getTrafficEvents() {
  if (eventsCache) return eventsCache;
  try {
    const filePath = path.join(process.cwd(), "src/data/traffic_events_clustered.csv");
    const content = fs.readFileSync(filePath, "utf-8");
    
    const parsed: any[] = [];
    const lines = content.split("\n").filter(Boolean);
    const headers = lines[0].split(",").map(h => h.trim());
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const row: string[] = [];
      let current = "";
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      row.push(current.trim());
      
      const obj: any = {};
      headers.forEach((h, idx) => {
        const val = row[idx];
        if (val === undefined || val === "") {
          obj[h] = null;
        } else if (!isNaN(Number(val)) && val !== "") {
          obj[h] = Number(val);
        } else {
          if (val === "True") {
            obj[h] = true;
          } else if (val === "False") {
            obj[h] = false;
          } else {
            obj[h] = val;
          }
        }
      });
      parsed.push(obj);
    }
    eventsCache = parsed;
    return eventsCache;
  } catch (err) {
    console.error("Error reading traffic events:", err);
    return [];
  }
}
