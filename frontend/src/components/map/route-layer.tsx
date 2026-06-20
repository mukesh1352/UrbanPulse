"use client";

import { Source, Layer } from "react-map-gl/maplibre";
import { useRouteStore } from "@/store/route-store";

export default function RouteLayer() {

  const primaryRoute =
    useRouteStore(
      s => s.primaryRoute
    );

  const diversionRoute =
    useRouteStore(
      s => s.diversionRoute
    );

  const emergencyRoute =
    useRouteStore(
      s => s.emergencyRoute
    );

  const makeGeoJson = (
    coords: number[][]
  ) => ({

    type: "Feature",

    geometry: {

      type: "LineString",

      coordinates:
        coords.map(
          p => [
            p[1],
            p[0]
          ]
        )

    }

  });

  return (
    <>

      {/* PRIMARY ROUTE */}

      {

        primaryRoute.length > 1 && (

          <Source
            id="primary-route"
            type="geojson"
            data={makeGeoJson(
              primaryRoute
            )}
          >

            <Layer
              id="primary-line"
              type="line"
              paint={{

                "line-color":
                  "#22c55e",

                "line-width":
                  8

              }}
            />

          </Source>

        )

      }

      {/* DIVERSION */}

      {

        diversionRoute.length > 1 && (

          <Source
            id="diversion-route"
            type="geojson"
            data={makeGeoJson(
              diversionRoute
            )}
          >

            <Layer
              id="diversion-line"
              type="line"
              paint={{

                "line-color":
                  "#3b82f6",

                "line-width":
                  6,

                "line-dasharray":
                  [2, 2]

              }}
            />

          </Source>

        )

      }

      {/* EMERGENCY */}

      {

        emergencyRoute.length > 1 && (

          <Source
            id="emergency-route"
            type="geojson"
            data={makeGeoJson(
              emergencyRoute
            )}
          >

            <Layer
              id="emergency-line"
              type="line"
              paint={{

                "line-color":
                  "#f97316",

                "line-width":
                  5,

                "line-dasharray":
                  [1, 1]

              }}
            />

          </Source>

        )

      }

    </>
  );

}