import { create } from "zustand";
import { Anomaly } from "@/types/anamoly";

interface AnomalyState {
  anomalies: Anomaly[];
  setAnomalies: (anomalies: Anomaly[]) => void;
}

export const useAnomalyStore = create<AnomalyState>((set) => ({
  anomalies: [],

  setAnomalies: (anomalies) =>
    set({
      anomalies
    })
}));