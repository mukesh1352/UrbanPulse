"use client";

import { useEffect } from "react";
import { useRouteStore } from "@/store/route-store";

export default function useRouteEngine() {

  const source =
    useRouteStore(
      s => s.source
    );

  const destination =
    useRouteStore(
      s => s.destination
    );

  const setRoutes =
    useRouteStore(
      s => s.setRoutes
    );

  useEffect(() => {

    if (
      !source ||
      !destination
    )
      return;

    async function fetchRoutes() {

      try {

        const response =
          await fetch(
            "http://127.0.0.1:8000/route",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                start: source,

                goal: destination

              })

            }
          );

        const routes =
          await response.json();
        console.log("Routes Response:",routes);

        setRoutes(

          routes.primary_route,

          routes.diversion_route,

          routes.emergency_route,

          routes.primary_distance,

          routes.diversion_distance,

          routes.emergency_distance,

          routes.primary_eta,

          routes.diversion_eta,

          routes.emergency_eta
        );
      console.log(
  "AFTER SET",
  useRouteStore.getState()
);

      }

      catch (err) {

        console.error(err);

      }

    }

    fetchRoutes();

  }, [

    source,
    destination,
    setRoutes

  ]);

}