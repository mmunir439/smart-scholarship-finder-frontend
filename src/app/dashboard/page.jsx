"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTranslation } from "react-i18next";
import AcademicProfileCard from "@/components/Profile";
import axios from "@/app/utils/axios";
import { speak } from "../utils/voiceAssistant";
import { useScholarshipPreferences } from "@/hooks/useScholarshipPreferences";
import {
    fetchEligibleScholarships,
    getDegreeFilterLabel,
    getRegionFilterLabel,
    isScholarshipFilterActive,
} from "@/lib/scholarshipPreferences";

import {
    FiCalendar,
    FiExternalLink,
    FiGlobe,
    FiAward,
    FiFileText,
    FiRefreshCw,
    FiVolume2,
} from "react-icons/fi";

export default function Page() {
    const { t } = useTranslation();
    const { preferences, loaded: prefsLoaded } = useScholarshipPreferences();

    const [user, setUser] = useState({});
    const [profile, setProfile] = useState(null);
    const [eligibleData, setEligibleData] = useState([]);
    const [ttsText, setTtsText] = useState(""); // optional, if needed later
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

            const list = await fetchEligibleScholarships(preferences);

            setEligibleData(list);
            setTtsText("");
        } catch (error) {
            console.log(error);
            setEligibleData([]);
            setError(t("dashboard.profile_error"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
        getProfile();
    }, []);

    useEffect(() => {
        if (!prefsLoaded) return;
        getEligible();
    }, [preferences.studyRegion, preferences.preferredDegree, prefsLoaded]);

    const isFiltered = isScholarshipFilterActive(preferences);
    const regionLabel = getRegionFilterLabel(preferences.studyRegion, t);
    const degreeLabel = getDegreeFilterLabel(preferences.preferredDegree, t);

    const safeEligibleData = Array.isArray(eligibleData) ? eligibleData : [];

    useEffect(() => {
        setCurrentPage(1);
    }, [preferences.studyRegion, preferences.preferredDegree]);

    const totalScholarships = safeEligibleData.length;
    const activeScholarships = safeEligibleData.filter((item) =>
        String(item?.status || "").toLowerCase().includes("eligible")
    ).length;
    const uniqueCountries = new Set(
        safeEligibleData.map((item) => item?.country).filter(Boolean),
    ).size;

    const totalPages = Math.max(1, Math.ceil(totalScholarships / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = safeEligibleData.slice(startIndex, startIndex + itemsPerPage);

    const handleRefresh = async () => {
        await getProfile();
        await getEligible();
        setCurrentPage(1);
    };
    const handleEligibility = (status, name = "this scholarship") => {
        if (!status) return;
        speak(t("dashboard.voice_eligible", { status, name }));
    };
    const handleSpeakSummary = () => {
        if (ttsText && ttsText.trim()) {
            speak(ttsText);
            return;
        }

        if (!safeEligibleData.length) {
            speak(t("dashboard.voice_summary_empty"));
            return;
        }

        const count = safeEligibleData.length;
        speak(t("dashboard.voice_summary_count", { count }));
    };

    return (
        <DashboardLayout hideNavbar={true}>
            <div className="w-full min-h-screen page-bg">
                <div className="edu-container space-y-6 py-6">
                    {/* Hero */}
                    <div className="page-header relative overflow-hidden rounded-2xl p-6 sm:p-8">
                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-sm font-medium text-blue-200">{today}</p>
                                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                                    {t("dashboard.welcome", { name: user?.name || "User" })} 👋
                                </h1>
                                <p className="mt-2 text-sm text-blue-100 sm:text-base">
                                    {t("dashboard.subtitle")}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={handleRefresh}
                                    className="btn-ghost-light w-full sm:w-auto"
                                >
                                    <FiRefreshCw />
                                    {t("dashboard.refresh")}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSpeakSummary}
                                    disabled={loading}
                                    className="btn-ghost-light px-3"
                                    aria-label="Speak summary"
                                    title={ttsText ? "Read recommendations" : "Read summary"}
                                >
                                    <FiVolume2 />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="stat-card">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-gray-500">{t("dashboard.eligible_scholarships")}</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                        {loading ? "..." : totalScholarships}
                                    </h3>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <FiAward size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-gray-500">{t("dashboard.active_scholarships")}</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                        {loading ? "..." : activeScholarships}
                                    </h3>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <FiCalendar size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-gray-500">{t("dashboard.countries")}</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                                        {loading ? "..." : uniqueCountries}
                                    </h3>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <FiGlobe size={22} />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-gray-500">{t("dashboard.profile_status")}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mt-2">
                                        {profile ? t("dashboard.completed") : t("dashboard.pending")}
                                    </h3>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                    <FiFileText size={22} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {isFiltered && !loading && (
                        <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
                            {t("scholarships.filtered_by", {
                                region: regionLabel,
                                degree: degreeLabel,
                            })}{" "}
                            <Link href="/settings" className="font-semibold underline hover:text-orange-700">
                                {t("scholarships.change_in_settings")}
                            </Link>
                        </div>
                    )}

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
                                {t("dashboard.recommended")}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {t("dashboard.recommended_desc")}
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

                                            <div className="flex items-center gap-2 shrink-0">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${item.status === "Eligible"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : item.status === "Partially Eligible"
                                                            ? "bg-yellow-50 text-yellow-700"
                                                            : "bg-red-50 text-red-700"
                                                        }`}
                                                >
                                                    {item.status || "unknown"}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => handleEligibility(item.status, item.name)}
                                                    className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
                                                    aria-label={`Listen to eligibility for ${item.name}`}
                                                    title="Voice assist"
                                                >
                                                    <FiVolume2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-5 space-y-3 text-sm text-gray-600">
                                            <div className="flex items-center justify-between gap-3">
                                                <span>{t("dashboard.degree")}</span>
                                                <span className="font-medium text-gray-900">
                                                    {item.degreeLevel || "-"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span>{t("dashboard.deadline")}</span>
                                                <span className="font-medium text-gray-900">
                                                    {item.deadline || "-"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span>{t("dashboard.ielts")}</span>
                                                <span className="font-medium text-gray-900">
                                                    {item.ielts ?? "-"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <span>{t("dashboard.cgpa")}</span>
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
                                                className="btn-secondary w-full"
                                            >
                                                {t("dashboard.view_details")} <FiExternalLink />
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
                                        {t("dashboard.prev")}
                                    </button>

                                    <span className="px-3 py-2 text-sm font-medium text-gray-700">
                                        {t("dashboard.page", { current: currentPage, total: totalPages })}
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
                                {t("dashboard.no_results_title")}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                {t("dashboard.no_results_desc")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}