"use client";

import { useAnomalyStore } from "@/store/anamoly-store";

export default function AnomalyTable() {

  const anomalies =
    useAnomalyStore(
      s => s.anomalies
    );

  return (

    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h1 className="text-xl font-bold text-white mb-5">

        Anomaly Detection

      </h1>

      <table className="w-full">

        <thead>

          <tr className="text-zinc-400">

            <th>Hour</th>

            <th>Cluster</th>

            <th>Severity</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {

            anomalies.map(

              (a, index) => (

                <tr
                  key={index}
                  className="border-t border-zinc-800"
                >

                  <td className="py-3">
                    {a.hour}
                  </td>

                  <td>
                    {a.cluster}
                  </td>

                  <td>

                    <span className="text-red-400 font-bold">

                      {a.severity_score}

                    </span>

                  </td>

                  <td>

                    <span className="rounded-xl bg-red-500/20 px-3 py-1 text-red-400">

                      Anomaly

                    </span>

                  </td>

                </tr>

              )

            )

          }

        </tbody>

      </table>

    </div>

  );

}