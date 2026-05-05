"use client";

import React, { useEffect, useState } from "react";
import axios from "@/app/utils/axios";
import {
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiAlertCircle,
  FiArrowRight,
  FiRefreshCw,
  FiBarChart2,
} from "react-icons/fi";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalScholarships: 0,
    activeScholarships: 0,
    adminUsers: 0,
    studentUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersRes, scholarshipsRes] = await Promise.all([
        axios.get("/user"),
        axios.get("/scholarship/all"),
      ]);

      const users = usersRes?.data?.data ?? usersRes?.data?.users ?? [];
      const scholarships =
        scholarshipsRes?.data?.data ?? scholarshipsRes?.data?.scholarships ?? [];

      const adminCount = users.filter((u) => u.role === "admin").length;
      const studentCount = users.filter((u) => u.role === "student").length;
      const activeCount = scholarships.filter(
        (s) => !s.deadline || new Date(s.deadline) > new Date()
      ).length;

      setStats({
        totalUsers: users.length,
        totalScholarships: scholarships.length,
        activeScholarships: activeCount,
        adminUsers: adminCount,
        studentUsers: studentCount,
      });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, label, value, color, subtext }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition w-full min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            {loading ? "..." : value}
          </h3>
          {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-xl shrink-0 ${color}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ icon: Icon, title, description, link, color }) => (
    <Link href={link} className="block w-full">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition w-full">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <div className={`p-3 rounded-xl shrink-0 ${color}`}>
            <Icon size={20} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
          Go to {title} <FiArrowRight size={14} className="ml-2" />
        </div>
      </div>
    </Link>
  );

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's your system overview.
            </p>
          </div>

          <button
            onClick={fetchStats}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition w-full sm:w-auto"
          >
            <FiRefreshCw size={16} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-center gap-2">
            <FiAlertCircle /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <StatCard
            icon={FiUsers}
            label="Total Users"
            value={stats.totalUsers}
            color="bg-blue-100 text-blue-600"
            subtext={`${stats.adminUsers} admins, ${stats.studentUsers} students`}
          />
          <StatCard
            icon={FiAward}
            label="Total Scholarships"
            value={stats.totalScholarships}
            color="bg-purple-100 text-purple-600"
          />
          <StatCard
            icon={FiTrendingUp}
            label="Active Scholarships"
            value={stats.activeScholarships}
            color="bg-green-100 text-green-600"
            subtext="Not expired"
          />
          <StatCard
            icon={FiUsers}
            label="Admin Users"
            value={stats.adminUsers}
            color="bg-orange-100 text-orange-600"
          />
          <StatCard
            icon={FiUsers}
            label="Student Users"
            value={stats.studentUsers}
            color="bg-pink-100 text-pink-600"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <FiBarChart2 className="text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickActionCard
              icon={FiUsers}
              title="Users"
              description="Manage system users and permissions"
              link="/admin/users"
              color="bg-blue-100 text-blue-600"
            />
            <QuickActionCard
              icon={FiAward}
              title="Scholarships"
              description="Create and manage scholarship listings"
              link="/admin/scholarships"
              color="bg-purple-100 text-purple-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-6">
            <h3 className="font-semibold text-blue-900">System Status</h3>
            <p className="text-sm text-blue-700 mt-2">All systems operational ✓</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 sm:p-6">
            <h3 className="font-semibold text-green-900">Last Updated</h3>
            <p className="text-sm text-green-700 mt-2">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}