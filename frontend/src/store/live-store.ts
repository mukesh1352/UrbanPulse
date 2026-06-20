import { create } from "zustand";
import { LiveEvent } from "@/types/live";

interface LiveState {

  events: LiveEvent[];

  connected: boolean;

  addEvent: (
    event: LiveEvent
  ) => void;

  setConnected: (
    status: boolean
  ) => void;
}

export const useLiveStore = create<LiveState>((set) => ({

  events: [],

  connected: false,

  setConnected: (status) =>
    set({
      connected: status
    }),
    addEvent: (event) =>
  set((state) => {

    const exists =
      state.events.some(
        (e) => e.id === event.id
      );

    if (exists) {
      return state;
    }

    return {

      events: [
        event,
        ...state.events
      ].slice(0, 500)

    };

  })

}));