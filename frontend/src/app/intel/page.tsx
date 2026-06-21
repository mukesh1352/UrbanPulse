import ForecastChart from "@/components/charts/forecast-chart";
import TrendChart from "@/components/charts/trend-chart";
import PredictCard from "@/components/prediction/predict-card";

const cardClass =
  "relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/40 to-zinc-950 p-6 shadow-lg shadow-black/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/30";

export default function IntelPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="space-y-2 border-b border-zinc-800/60 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Intelligence Center
        </h1>

        <p className="text-sm text-zinc-400">
          Forecasts, trends, anomalies, and AI-assisted insights.
        </p>
      </div>

      {/* Forecast */}
      <div className={cardClass}>
        <ForecastChart />
      </div>

      {/* Trend + Hotspots */}
      <div className="grid gap-8 lg:grid-cols-2">

        {/* spans full width until a second panel joins it */}
        <div className={`${cardClass} lg:col-span-2`}>
          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Trend Analysis
            </h2>

            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              Historical event patterns and variations.
            </p>
          </div>

          <TrendChart />
        </div>

      </div>

      {/* Prediction */}
      <div className="grid gap-8 lg:grid-cols-2">

        {/* spans full width until Copilot rejoins it */}
        <div className={`${cardClass} lg:col-span-2`}>

          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Prediction Engine
            </h2>

            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              Forecast future incidents using ML models.
            </p>
          </div>

          <PredictCard />

        </div>

      </div>

    </div>
  );
}