"use client";

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/api";

export default function PredictCard() {

  const [hour, setHour] = useState(12);
  const [eventType, setEventType] = useState("planned");
  const [eventCause, setEventCause] = useState("construction");
  const [cluster, setCluster] = useState(0);
  const [severity, setSeverity] = useState(3);

  const [priority, setPriority] = useState("");
  const [confidence, setConfidence] = useState(0);

  async function predict() {

    const res = await axios.post(
      `${BASE_URL}/predict`,
      {
        hour,
        day_of_week: 3,
        month: 6,
        weekend: 0,
        duration_minutes: 60,

        event_type: eventType,
        event_cause: eventCause,

        cluster,
        severity_score: severity,

        requires_road_closure: 0,
        is_closed: 0,
        is_resolved: 0,
      }
    );

    setPriority(res.data.priority);
    setConfidence(res.data.confidence);
  }

  return (
    <div className="space-y-5">

      <h1 className="text-2xl font-bold text-white">
        Priority Prediction
      </h1>

      {/* Hour */}
      <div>
        <label className="text-zinc-400">
          Hour
        </label>

        <input
          type="number"
          min={0}
          max={23}
          value={hour}
          onChange={(e)=>setHour(Number(e.target.value))}
          className="w-full p-3 rounded bg-zinc-800"
        />
      </div>

      {/* Event Type */}
      <div>
        <label className="text-zinc-400">
          Event Type
        </label>

        <select
          value={eventType}
          onChange={(e)=>setEventType(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800"
        >
          <option>planned</option>
          <option>unplanned</option>
        </select>
      </div>

      {/* Event Cause */}
      <div>
        <label className="text-zinc-400">
          Event Cause
        </label>

        <select
          value={eventCause}
          onChange={(e)=>setEventCause(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800"
        >
          <option>construction</option>
          <option>accident</option>
          <option>water_logging</option>
          <option>vehicle_breakdown</option>
          <option>tree_fall</option>
        </select>
      </div>

      {/* Cluster */}
      <div>
        <label className="text-zinc-400">
          Cluster
        </label>

        <input
          type="number"
          value={cluster}
          onChange={(e)=>setCluster(Number(e.target.value))}
          className="w-full p-3 rounded bg-zinc-800"
        />
      </div>

      {/* Severity */}
      <div>
        <label className="text-zinc-400">
          Severity
        </label>

        <input
          type="range"
          min={1}
          max={5}
          value={severity}
          onChange={(e)=>setSeverity(Number(e.target.value))}
          className="w-full"
        />

        <div className="text-white mt-2">
          {severity}
        </div>
      </div>
      <button
  onClick={predict}
  className="bg-blue-600 px-5 py-3 rounded-xl text-white w-full"
>
  Predict Priority
</button>

      {priority && (

        <div className="bg-zinc-900 rounded-xl p-5">

          <h1 className="text-3xl text-white font-bold">
            {priority}
          </h1>

          <p className="text-zinc-400 mt-2">
            Confidence: {(confidence*100).toFixed(2)}%
          </p>

        </div>

      )}

    </div>
  );
}