"use client";

import { useEffect, useState } from "react";
import axios from "@/app/utils/axios";
import { useTranslation } from "react-i18next";

export default function AdminDashboardPage() {
  const { t } = useTranslation();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProfiles: 0,
    totalScholarships: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6">

      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        {t("admin.dashboard")}
      </h1>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">{t("admin.loading")}</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {/* CARD 1 */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border hover:shadow-md transition">
            <p className="text-gray-500 text-xs sm:text-sm">
              {t("admin.total_scholarships")}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mt-1">
              {stats.totalScholarships}
            </h2>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border hover:shadow-md transition">
            <p className="text-gray-500 text-xs sm:text-sm">
              {t("admin.users")}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mt-1">
              {stats.totalUsers}
            </h2>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border hover:shadow-md transition">
            <p className="text-gray-500 text-xs sm:text-sm">
              {t("admin.profiles")}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mt-1">
              {stats.totalProfiles}
            </h2>
          </div>

        </div>
      )}
    </div>
  );
}