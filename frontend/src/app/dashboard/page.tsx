import KpiCards from "@/components/cards/kpi-cards";
import EventCausesChart from "@/components/charts/event-causes-chart";
import HourlyChart from "@/components/charts/hourly-chart";
import PriorityChart from "@/components/charts/priority-chart";
import ClusterTable from "@/components/tables/cluster-table";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-white">
        Dashboard
      </h1>

      <KpiCards />

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-white mb-4">
            Event Causes
          </h2>

          <EventCausesChart />
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-white mb-4">
            Hourly Distribution
          </h2>

          <HourlyChart />
        </div>

      </div>

      <div className="bg-zinc-900 rounded-xl p-6">
        <h2 className="text-white mb-4">
          Priority Distribution
        </h2>

        <PriorityChart />
      </div>

      <div className="bg-zinc-900 rounded-xl p-6">
        <h2 className="text-white mb-4">
          Cluster Statistics
        </h2>

        <ClusterTable />
      </div>

    </div>
  );
}