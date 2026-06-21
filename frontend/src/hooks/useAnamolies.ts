"use client";

import { useEffect } from "react";
import { useAnomalyStore } from "@/store/anamoly-store";

export default function useAnomalies() {

  const setAnomalies =
    useAnomalyStore(
      s => s.setAnomalies
    );

  useEffect(() => {

    async function load() {

      try {

        const response =
          await fetch(
            '${process.env.NEXT_PUBLIC_API_URL ?? http://127.0.0.1:8000}/anomalies/',
          );

        const data =
          await response.json();

        setAnomalies(data);

      } catch (err) {

        console.error(
          "Failed loading anomalies",
          err
        );

      }

    }

    load();

  }, []);

}