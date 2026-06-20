import ForecastChart from "@/components/charts/forecast-chart";
import TrendChart from "@/components/charts/trend-chart";
import HotspotTable from "@/components/tables/hotspot-table";
import AnomalyTable from "@/components/tables/anomaly-table";
import PredictCard from "@/components/prediction/predict-card";
import Copilot from "@/components/copilot/copilot";

export default function IntelPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Intelligence Center
        </h1>

        <p className="text-sm text-zinc-400">
          Forecasts, trends, anomalies, and AI-assisted insights.
        </p>
      </div>

      {/* Forecast */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg transition-all hover:border-zinc-700">
        <ForecastChart />
      </div>

      {/* Trend + Hotspots */}
      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg transition-all hover:border-zinc-700">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Trend Analysis
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Historical event patterns and variations.
            </p>
          </div>

          <TrendChart />
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg transition-all hover:border-zinc-700">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Hotspot Zones
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Most active locations requiring attention.
            </p>
          </div>

          <HotspotTable />
        </div>

      </div>

      {/* Anomaly Detection */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg transition-all hover:border-zinc-700">

        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Anomaly Detection
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Identify unusual traffic and incident patterns.
          </p>
        </div>

        <AnomalyTable />

      </div>

      {/* Prediction + Copilot */}
      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg transition-all hover:border-zinc-700">

          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Prediction Engine
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Forecast future incidents using ML models.
            </p>
          </div>

          <PredictCard />

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg transition-all hover:border-zinc-700">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">AI Copilot</h2>

            <p className="mt-1 text-sm text-zinc-400">
              Ask questions and get guided insights.
            </p>
          </div>

          <Copilot />
        </div>

      </div>

    </div>
  );
}