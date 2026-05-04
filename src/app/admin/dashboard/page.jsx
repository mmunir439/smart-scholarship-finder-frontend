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

  // fetch counts: prefer a single /admin/stats endpoint if you have it,
  // otherwise fallback to fetching the collections and counting.
  const getStats = async () => {
    try {
      setLoading(true);
      // try single endpoint first (if implemented on backend)
      try {
        const res = await axios.get("/admin/stats");
        if (res?.data) {
          setStats({
            totalUsers: res.data.totalUsers ?? res.data.users ?? 0,
            totalProfiles: res.data.totalProfiles ?? res.data.profiles ?? 0,
            totalScholarships:
              res.data.totalScholarships ?? res.data.scholarships ?? 0,
          });
          return;
        }
      } catch (err) {
        // ignore - fallback to multiple requests
      }

      // fallback: fetch collections and count
      const [usersRes, scholarshipsRes, profilesRes] = await Promise.all([
        axios.get("/user/all").catch(() => ({ data: { data: [] } })),
        axios.get("/scholarship/all").catch(() => ({ data: { data: [] } })),
        // try common profile endpoints; if not present the catch will provide empty
        axios.get("/studentprofile/all").catch(() => ({ data: { data: [] } })),
      ]);

      setStats({
        totalUsers: usersRes?.data?.data?.length ?? 0,
        totalScholarships: scholarshipsRes?.data?.data?.length ?? 0,
        totalProfiles: profilesRes?.data?.data?.length ?? 0,
      });
    } catch (error) {
      console.error("Failed to load admin stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">{t("admin.loading") || "Loading..."}</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* CARD 1 */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border hover:shadow-md transition">
            <p className="text-gray-500 text-xs sm:text-sm">
              {t("admin.total_scholarships") || "Total Scholarships"}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mt-1">
              {stats.totalScholarships}
            </h2>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border hover:shadow-md transition">
            <p className="text-gray-500 text-xs sm:text-sm">
              {t("admin.users") || "Users"}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mt-1">
              {stats.totalUsers}
            </h2>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border hover:shadow-md transition">
            <p className="text-gray-500 text-xs sm:text-sm">
              {t("admin.profiles") || "Profiles"}
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