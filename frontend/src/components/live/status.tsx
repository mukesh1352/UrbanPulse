"use client";

import { useLiveStore } from "@/store/live-store";

export default function Status() {

  const connected = useLiveStore(
    s => s.connected
  );

  return (

    <div
      className="
      rounded-xl
      border border-zinc-800
      bg-zinc-900
      px-4 py-3
      flex items-center gap-3
      "
    >

      <div
        className={
          connected

          ? "w-3 h-3 rounded-full bg-green-500"

          : "w-3 h-3 rounded-full bg-red-500"
        }
      />

      <div className="text-white">

        {

          connected

          ? "Connected"

          : "Disconnected"

        }

      </div>

    </div>

  );

}