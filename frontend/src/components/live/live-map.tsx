"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Map, {
  Marker,
  Popup,
  Source,
  Layer,
  NavigationControl,
} from "react-map-gl/maplibre";
import { useRouteStore } from "@/store/route-store";
import type { MapRef } from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

import { LiveEvent } from "@/types/live";
import { useLiveStore } from "@/store/live-store";

// ---- constants -------------------------------------------------

const HIGH_SEVERITY_THRESHOLD = 4;
const MARKER_SIZE_LARGE = 22;
const MARKER_SIZE_SMALL = 16;

// DBSCAN-style clustering commonly marks unclustered points with -1.
// Grouping those together produces one bounding box spanning the
// whole map, so they're excluded from the hotspot polygons below.
const NOISE_CLUSTER = -1;

// Stable empty-array reference so a missing route from the store
// (currently arrives as `undefined` until the store/fetch bug is
// fixed) never throws, and so we don't create a new [] every render
// and break memoization downstream.
const EMPTY_ROUTE: [number, number][] = [];

// Lightweight local GeoJSON types so we don't need `as any` and
// don't need to pull in @types/geojson just for this.

type PointFeatureCollection = {
  type: "FeatureCollection";
  features: {
    type: "Feature";
    properties: { weight: number; severity: number };
    geometry: { type: "Point"; coordinates: [number, number] };
  }[];
};

type PolygonFeature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
};

type LineStringFeature = {
  type: "Feature";
  geometry: { type: "LineString"; coordinates: [number, number][] };
};

// ---- pure helpers (hoisted out so they aren't recreated every render) ----

function getWeight(cause: LiveEvent["event_cause"]) {
  switch (cause) {
    case "accident":
      return 5;

    case "traffic_jam":
      return 4;

    case "lane_closed":
      return 3;

    case "concert":
    case "festival":
    case "cricket_match":
      return 2;

    default:
      return 1;
  }
}

function getColor(event: LiveEvent) {
  switch (event.event_cause) {
    case "accident":
    case "traffic_jam":
      return "#ef4444";

    case "lane_closed":
      return "#facc15";

    case "construction":
      return "#3b82f6";

    case "road_maintenance":
      return "#67e8f9";

    case "concert":
    case "festival":
    case "cricket_match":
      return "#a855f7";

    default:
      return "#22c55e";
  }
}

function getRing(event: LiveEvent) {
  if (
    event.event_cause === "accident" ||
    event.event_cause === "traffic_jam"
  ) {
    return "hotspot-ring";
  }

  if (
    event.event_cause === "concert" ||
    event.event_cause === "festival" ||
    event.event_cause === "cricket_match"
  ) {
    return "planned-ring";
  }

  return "";
}

function formatTimestamp(ts: string) {
  const date = new Date(ts);
  return Number.isNaN(date.getTime()) ? ts : date.toLocaleString();
}

// Route stores hold [lat, lon] pairs; GeoJSON wants [lon, lat].
// `route` should always be an array by the time it gets here (the
// selectors below fall back to EMPTY_ROUTE), but the ?? [] is kept
// as cheap insurance against any other caller passing undefined.
function toLineString(route: [number, number][] = []): LineStringFeature {
  return {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: route.map(
        ([lat, lon]): [number, number] => [lon, lat]
      ),
    },
  };
}

// A [lat, lon] pair from the store; guards against a present-but-malformed
// tuple (e.g. [] or [lat] with no lon) in addition to null/undefined.
function isValidPoint(point: unknown): point is [number, number] {
  return (
    Array.isArray(point) &&
    point.length === 2 &&
    Number.isFinite(point[0]) &&
    Number.isFinite(point[1])
  );
}

export default function LiveMap() {
  // Fall back to EMPTY_ROUTE so `.length`/`.map` below never throw,
  // even while the store is returning undefined (see useRouteEngine
  // ROUTE FETCH ERROR — setRoutes isn't wired up correctly there yet).
  const primaryRoute = useRouteStore((s) => s.primaryRoute) ?? EMPTY_ROUTE;
  const diversionRoute = useRouteStore((s) => s.diversionRoute) ?? EMPTY_ROUTE;
  const emergencyRoute = useRouteStore((s) => s.emergencyRoute) ?? EMPTY_ROUTE;
  const source = useRouteStore((s) => s.source);
  const destination = useRouteStore((s) => s.destination);

  const events = useLiveStore((s) => s.events);

  const [selected, setSelected] = useState<LiveEvent | null>(null);

  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Drop events with missing/invalid coordinates before they ever
  // reach the heatmap, polygons, or markers — bad data here used to
  // silently break Maplibre rendering.
  const validEvents = useMemo(
    () =>
      events.filter(
        (e) =>
          Number.isFinite(Number(e.latitude)) &&
          Number.isFinite(Number(e.longitude))
      ),
    [events]
  );

  // If the selected event falls out of the live feed (expired,
  // resolved, etc.), clear it instead of leaving a stale popup open.
  useEffect(() => {
    if (selected && !events.some((e) => e.id === selected.id)) {
      // Avoid synchronous setState within an effect to prevent
      // cascading renders — schedule the update asynchronously.
      setTimeout(() => setSelected(null), 0);
    }
  }, [events, selected]);

  // Fit the camera to wherever the live data and routes actually are,
  // instead of sitting on the hardcoded Bangalore fallback. Re-runs
  // whenever a new route comes in (or the live feed changes), so the
  // camera follows a freshly-calculated route instead of only fitting
  // once on first load.
  useEffect(() => {
    if (!mapLoaded) return;

    const points = [
      ...validEvents.map((e) => [Number(e.latitude), Number(e.longitude)]),
      ...primaryRoute,
      ...diversionRoute,
      ...emergencyRoute,
    ];

    if (points.length === 0) return;

    const lats = points.map((p) => p[0]);
    const lngs = points.map((p) => p[1]);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    mapRef.current?.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 64,
        duration: 800,
        maxZoom: 14,
      }
    );
  }, [mapLoaded, validEvents, primaryRoute, diversionRoute, emergencyRoute]);

  const heatmapData = useMemo<PointFeatureCollection>(
    () => ({
      type: "FeatureCollection",
      features: validEvents.map((e) => ({
        type: "Feature",
        properties: {
          weight: getWeight(e.event_cause),
          severity: e.severity_score,
        },
        geometry: {
          type: "Point",
          coordinates: [Number(e.longitude), Number(e.latitude)],
        },
      })),
    }),
    [validEvents]
  );

  const polygons = useMemo(() => {
    const groups: Record<number, LiveEvent[]> = {};

    validEvents.forEach((e) => {
      if (e.cluster === NOISE_CLUSTER || e.cluster == null) {
        return;
      }

      if (!groups[e.cluster]) {
        groups[e.cluster] = [];
      }

      groups[e.cluster].push(e);
    });

    return Object.entries(groups)
      .filter(([, arr]) => arr.length >= 3)
      .map(([cluster, arr]) => {
        const lats = arr.map((e) => Number(e.latitude));
        const lngs = arr.map((e) => Number(e.longitude));

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);

        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);

        return {
          cluster,
          polygon: [
            [minLng, minLat],
            [maxLng, minLat],
            [maxLng, maxLat],
            [minLng, maxLat],
            [minLng, minLat],
          ],
        };
      });
  }, [validEvents]);

  const primaryGeoJson = useMemo(() => toLineString(primaryRoute), [primaryRoute]);
  const diversionGeoJson = useMemo(() => toLineString(diversionRoute), [diversionRoute]);
  const emergencyGeoJson = useMemo(() => toLineString(emergencyRoute), [emergencyRoute]);

  return (
    <div className="h-full w-full rounded-xl overflow-hidden">
      <Map
        ref={mapRef}
        onLoad={() => setMapLoaded(true)}
        reuseMaps
        maxZoom={16}
        minZoom={9}
        // Fallback view shown before live data has loaded / fitBounds
        // has run — see the bounds-fitting effect above.
        initialViewState={{
          longitude: 77.5946,
          latitude: 12.9716,
          zoom: 11,
          pitch: 45,
          bearing: -15,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />

        {/* HEATMAP */}

        <Source id="heat" type="geojson" data={heatmapData as PointFeatureCollection}>
          <Layer
            id="heat-layer"
            type="heatmap"
            paint={{
              "heatmap-radius": 45,
              "heatmap-intensity": 1.7,
              "heatmap-opacity": 0.7,

              "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "weight"],
                1,
                0.2,
                5,
                1,
              ],
            }}
          />
        </Source>

        {/* HOTSPOT POLYGONS */}

        {polygons.map((poly) => (
          <Source
            key={poly.cluster}
            id={`cluster-${poly.cluster}`}
            type="geojson"
            data={
              {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [poly.polygon],
                },
              } as PolygonFeature
            }
          >
            <Layer
              id={`fill-${poly.cluster}`}
              type="fill"
              paint={{
                "fill-color": "#ef4444",
                "fill-opacity": 0.12,
              }}
            />

            <Layer
              id={`line-${poly.cluster}`}
              type="line"
              paint={{
                "line-color": "#ef4444",
                "line-width": 2,
              }}
            />
          </Source>
        ))}

        {/* PRIMARY ROUTE */}

        {primaryRoute.length > 0 && (
          <Source id="primary-route" type="geojson" data={primaryGeoJson as LineStringFeature}>
            <Layer
              id="primary-line"
              type="line"
              paint={{ "line-color": "#22c55e", "line-width": 5 }}
            />
          </Source>
        )}

        {/* DIVERSION ROUTE */}

        {diversionRoute.length > 0 && (
          <Source id="diversion-route" type="geojson" data={diversionGeoJson as LineStringFeature}>
            <Layer
              id="diversion-line"
              type="line"
              paint={{
                "line-color": "#3b82f6",
                "line-width": 4,
                "line-dasharray": [2, 2],
              }}
            />
          </Source>
        )}

        {/* EMERGENCY ROUTE */}

        {emergencyRoute.length > 0 && (
          <Source id="emergency-route" type="geojson" data={emergencyGeoJson as LineStringFeature}>
            <Layer
              id="emergency-line"
              type="line"
              paint={{ "line-color": "#ef4444", "line-width": 4 }}
            />
          </Source>
        )}

        {/* SOURCE */}

        {isValidPoint(source) && (
          <Marker longitude={source[1]} latitude={source[0]}>
            <div className="text-3xl">📍</div>
          </Marker>
        )}

        {/* DESTINATION */}

        {isValidPoint(destination) && (
          <Marker longitude={destination[1]} latitude={destination[0]}>
            <div className="text-3xl">🏁</div>
          </Marker>
        )}

        {/* MARKERS */}

        {validEvents.map((event) => {
          const ring = getRing(event);
          const isHighSeverity = event.severity_score >= HIGH_SEVERITY_THRESHOLD;
          const size = isHighSeverity ? MARKER_SIZE_LARGE : MARKER_SIZE_SMALL;

          return (
            <Marker
              key={event.id}
              longitude={Number(event.longitude)}
              latitude={Number(event.latitude)}
            >
              <button
                className="relative"
                aria-label={`${event.event_cause} — severity ${event.severity_score}`}
                onClick={() => setSelected(event)}
              >
                {ring && <div className={ring} />}

                <div
                  className="rounded-full border-2 border-white shadow-xl"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: getColor(event),
                  }}
                />
              </button>
            </Marker>
          );
        })}

        {/* POPUP */}

        {selected && (
          <Popup
            longitude={Number(selected.longitude)}
            latitude={Number(selected.latitude)}
            closeOnClick={false}
            onClose={() => setSelected(null)}
          >
            <div className="space-y-2 min-w-[200px]">
              <h2 className="text-lg font-bold">{selected.event_cause}</h2>

              <div className="flex justify-between">
                <span>Cluster</span>
                <span>{selected.cluster}</span>
              </div>

              <div className="flex justify-between">
                <span>Severity</span>
                <span className="text-red-500 font-bold">{selected.severity_score}</span>
              </div>

              <div className="flex justify-between">
                <span>Priority</span>
                <span>{selected.priority}</span>
              </div>

              <div className="flex justify-between">
                <span>Type</span>
                <span>{selected.event_type}</span>
              </div>

              <div className="flex justify-between">
                <span>Time</span>
                <span>{formatTimestamp(selected.timestamp)}</span>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}