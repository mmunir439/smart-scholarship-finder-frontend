"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useScholarshipPreferences } from "@/hooks/useScholarshipPreferences";
import {
    fetchScholarships,
    getDegreeFilterLabel,
    getRegionFilterLabel,
    isScholarshipFilterActive,
} from "@/lib/scholarshipPreferences";

export default function ScholarshipsPage() {
    const { t } = useTranslation();
    const { preferences, loaded: prefsLoaded } = useScholarshipPreferences();
    const [scholarships, setScholarships] = useState([]);
    const [visible, setVisible] = useState(8);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setVisible(8);
    }, [preferences.studyRegion, preferences.preferredDegree]);

    useEffect(() => {
        if (!prefsLoaded) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchScholarships(preferences);
                setScholarships(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching scholarships:", err);
                setError(err.response?.data?.message || "Failed to load scholarships");
                toast.error("Failed to load scholarships");
                setScholarships([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [preferences, prefsLoaded]);

    const isFiltered = isScholarshipFilterActive(preferences);
    const regionLabel = getRegionFilterLabel(preferences.studyRegion, t);
    const degreeLabel = getDegreeFilterLabel(preferences.preferredDegree, t);
    const visibleScholarships = scholarships.slice(0, visible);

    return (
        <div className="page-bg min-h-screen">
            <Navbar />

            <div className="page-header">
                <div className="page-header-inner">
                    <p className="section-label text-blue-200">{t("navbar.scholarships")}</p>
                    <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        {t("scholarships.title")}
                    </h1>
                    <p className="mt-3 max-w-2xl text-base text-slate-300">
                        {t("scholarships.subtitle")}
                    </p>
                </div>
            </div>

            <main className="edu-container py-8 sm:py-10">
                <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-600 sm:text-base">
                        <span className="font-semibold text-gray-900">{scholarships.length}</span>{" "}
                        {t("scholarships.found")}
                    </p>
                </div>

                {isFiltered && !loading && (
                    <div className="filter-banner mb-6">
                        {t("scholarships.filtered_by", {
                            region: regionLabel,
                            degree: degreeLabel,
                        })}{" "}
                        <Link href="/settings" className="font-semibold underline hover:text-orange-700">
                            {t("scholarships.change_in_settings")}
                        </Link>
                    </div>
                )}

                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500" />
                    </div>
                )}

                {error && !loading && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
                        {error}
                    </div>
                )}

                {!loading && scholarships.length > 0 && visibleScholarships.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {visibleScholarships.map((item, i) => (
                            <div
                                key={item._id || i}
                                className="scholarship-card group"
                            >
                                <div className="mb-3 flex items-start justify-between gap-3">
                                    <p className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                                        {item.country || "N/A"} • {item.degreeLevel || "N/A"}
                                    </p>
                                </div>

                                <h3 className="mb-2 line-clamp-2 text-base font-bold text-slate-900 sm:text-lg">
                                    {item.name}
                                </h3>

                                <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                                    {item.source || "Unknown source"}
                                </p>

                                <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                                    <span>
                                        {t("scholarships.deadline")}:{" "}
                                        <span className="font-medium text-gray-700">
                                            {item.deadline || "N/A"}
                                        </span>
                                    </span>

                                    {item.link ? (
                                        <Link
                                            className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {t("scholarships.view")}
                                        </Link>
                                    ) : (
                                        <span className="text-gray-400">No link</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : !loading && scholarships.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
                        <p className="text-sm text-gray-500">
                            {isFiltered
                                ? t("scholarships.no_matches_preference")
                                : t("scholarships.empty")}
                        </p>
                        {isFiltered && (
                            <Link
                                href="/settings"
                                className="mt-3 inline-block text-sm font-medium text-orange-600 hover:text-orange-700"
                            >
                                {t("scholarships.change_in_settings")}
                            </Link>
                        )}
                    </div>
                ) : null}

                {!loading && visible < scholarships.length && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={() => setVisible((prev) => prev + 8)}
                            className="btn-primary w-full sm:w-auto"
                        >
                            {t("scholarships.load_more")}
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
