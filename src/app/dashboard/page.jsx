"use client";

import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTranslation } from "react-i18next";
import AcademicProfileCard from "@/components/Profile";
import axios from "@/app/utils/axios";
import {
    FiCalendar,
    FiExternalLink,
    FiGlobe,
    FiAward,
    FiFileText,
    FiRefreshCw,
} from "react-icons/fi";

export default function Page() {
    const { t } = useTranslation();

    const [user, setUser] = useState({});
    const [profile, setProfile] = useState(null);
    const [eligibleData, setEligibleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const today = useMemo(
        () =>
            new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        [],
    );

    const getUser = async () => {
        try {
            const res = await axios.get("/user/getCurrentUser");
            setUser(res.data || {});
        } catch (error) {
            console.log(error);
        }
    };

    const getProfile = async () => {
        try {
            const res = await axios.get("/academic/profile");
            setProfile(res.data?.data ?? null);
        } catch (error) {
            setProfile(null);
        }
    };

    const getEligible = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await axios.get("/eligible");
            setEligibleData(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log(error);
            setEligibleData([]);
            setError("Failed to load scholarships");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
        getProfile();
        getEligible();
    }, []);

    const totalScholarships = eligibleData.length;
    const activeScholarships = eligibleData.filter((item) => item?.status === "active").length;
    const uniqueCountries = new Set(
        eligibleData.map((item) => item?.country).filter(Boolean),
    ).size;

    const totalPages = Math.max(1, Math.ceil(totalScholarships / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = eligibleData.slice(startIndex, startIndex + itemsPerPage);

    const handleRefresh = async () => {
        await getProfile();
        await getEligible();
        setCurrentPage(1);
    };

    return (
        <DashboardLayout hideNavbar={true}>
            <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
                    {/* Hero */}
                    <div className="rounded-3xl bg-[#07162d] text-white p-6 sm:p-8 shadow-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,0,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_35%)]" />
                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-orange-300 text-sm font-medium">
                                    {today}
                                </p>
                                <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                                    Welcome back, {user?.name || "User"} 👋
                                </h1>
                                <p className="mt-3 text-sm sm:text-base text-slate-300">
                                    Track your academic profile and explore scholarships matched to your eligibility.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleRefresh}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white hover:bg-white/15 transition border border-white/10 w-full sm:w-auto"
                            >
                                <FiRefreshCw />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-gray-500">Eligible Scholarships</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                        {loading ? "..." : totalScholarships}
                                    </h3>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <FiAward size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-gray-500">Active Scholarships</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                        {loading ? "..." : activeScholarships}
                                    </h3>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <FiCalendar size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-gray-500">Countries</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                        {loading ? "..." : uniqueCountries}
                                    </h3>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <FiGlobe size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-gray-500">Profile Status</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                        {profile ? "Completed" : "Pending"}
                                    </h3>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                    <FiFileText size={22} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Profile card */}
                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-6">
                        <AcademicProfileCard
                            onProfileDeleted={() => {
                                setProfile(null);
                                setEligibleData([]);
                            }}
                            onProfileSaved={async () => {
                                await getProfile();
                                await getEligible();
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    {/* Scholarships section */}
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Recommended Scholarships
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Scholarships matched to your current profile.
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse"
                                >
                                    <div className="h-5 w-3/4 rounded bg-gray-200 mb-4" />
                                    <div className="h-4 w-1/2 rounded bg-gray-200 mb-2" />
                                    <div className="h-4 w-2/3 rounded bg-gray-200 mb-2" />
                                    <div className="h-4 w-1/3 rounded bg-gray-200 mb-4" />
                                    <div className="h-10 rounded-xl bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    ) : paginatedData.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                {paginatedData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                                    {item.name}
                                                </h2>
                                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                                                    <FiGlobe size={14} />
                                                    {item.country || "N/A"}
                                                </p>
                                            </div>

                                            <span
                                                className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${item.status === "active"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-yellow-50 text-yellow-700"
                                                    }`}
                                            >
                                                {item.status || "unknown"}
                                            </span>
                                        </div>

                                        <div className="mt-5 space-y-3 text-sm text-gray-600">
                                            <div className="flex items-center justify-between gap-3">
                                                <span>Degree</span>
                                                <span className="font-medium text-gray-900">
                                                    {item.degreeLevel || "-"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span>Deadline</span>
                                                <span className="font-medium text-gray-900">
                                                    {item.deadline || "-"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span>IELTS</span>
                                                <span className="font-medium text-gray-900">
                                                    {item.ielts ?? "-"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span>CGPA</span>
                                                <span className="font-medium text-gray-900">
                                                    {item.cgpa ?? item.minCGPA ?? "-"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#07162d] px-4 py-3 text-sm font-medium text-white hover:bg-[#0b2447] transition"
                                            >
                                                View Details <FiExternalLink />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                                <p className="text-sm text-gray-500">
                                    Showing {startIndex + 1} to{" "}
                                    {Math.min(startIndex + itemsPerPage, totalScholarships)} of{" "}
                                    {totalScholarships}
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Prev
                                    </button>

                                    <span className="px-3 py-2 text-sm font-medium text-gray-700">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                                        }
                                        disabled={currentPage === totalPages}
                                        className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
                            <h3 className="text-lg font-semibold text-gray-900">
                                No scholarships found
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Complete your academic profile to see eligible scholarships here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}