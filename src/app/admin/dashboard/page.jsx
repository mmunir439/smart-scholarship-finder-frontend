"use client";
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const countryData = {
  labels: ["USA", "UK", "Germany", "Canada", "Australia"],
  datasets: [{
    label: "Scholarships",
    data: [45, 30, 25, 20, 15],
    backgroundColor: ["#f97316", "#0b1d3a", "#3b82f6", "#10b981", "#8b5cf6"],
    borderRadius: 6,
  }],
};

const eligibilityData = {
  labels: ["Eligible", "Partially Eligible", "Not Eligible"],
  datasets: [{
    data: [60, 25, 15],
    backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
    borderWidth: 0,
  }],
};

export default function AdminDashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0b1d3a]">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of the scholarship system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <AdminStatsCard title="Total Scholarships" value="120" icon="🎓" color="orange" />
        <AdminStatsCard title="Total Users" value="340" icon="👥" color="blue" />
        <AdminStatsCard title="Applications Today" value="18" icon="📋" color="green" />
        <AdminStatsCard title="Scraping Errors" value="2" icon="⚠️" color="red" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Scholarships by Country</h3>
          <Bar data={countryData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Eligibility Distribution</h3>
          <div className="flex justify-center">
            <div style={{ width: 220 }}>
              <Doughnut data={eligibilityData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Scholarship Matches</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b">
              <th className="pb-2">Student</th>
              <th className="pb-2">Scholarship</th>
              <th className="pb-2">Country</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Muhammad Munir", scholarship: "Fulbright", country: "USA", status: "Eligible" },
              { name: "Diini Farah", scholarship: "DAAD", country: "Germany", status: "Partially Eligible" },
              { name: "Sara Ahmed", scholarship: "Chevening", country: "UK", status: "Not Eligible" },
            ].map((row, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 font-medium text-[#0b1d3a]">{row.name}</td>
                <td className="py-3 text-gray-600">{row.scholarship}</td>
                <td className="py-3 text-gray-600">{row.country}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    row.status === "Eligible"
                      ? "bg-green-100 text-green-700"
                      : row.status === "Partially Eligible"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}