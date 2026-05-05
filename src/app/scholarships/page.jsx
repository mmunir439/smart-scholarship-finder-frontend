"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "@/app/utils/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function ScholarshipsPage() {
    const { t } = useTranslation();
    const [scholarships, setScholarships] = useState([]);
    const [visible, setVisible] = useState(8);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const visibleScholarships = scholarships.slice(0, visible);

    // Remove duplicate useEffect - only keep one
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get("/scholarship/all");
                const data = res.data.data || res.data.scholarships || [];
                setScholarships(Array.isArray(data) ? data : []);
                setError(null);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
                setError(error.response?.data?.message || "Failed to load scholarships");
                toast.error("Failed to load scholarships");
                setScholarships([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* HEADER */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                        {t("scholarships.title")}
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
                        {t("scholarships.subtitle")}
                    </p>
                </div>
            </div>

            {/* MAIN */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                {/* TOP BAR */}
                <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-600 sm:text-base">
                        <span className="font-semibold text-gray-900">{scholarships.length}</span>{" "}
                        {t("scholarships.found")}
                    </p>
                </div>

                {/* LOADING STATE */}
                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500" />
                    </div>
                )}

                {/* ERROR STATE */}
                {error && !loading && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* CARDS */}
                {!loading && scholarships.length > 0 && visibleScholarships.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {visibleScholarships.map((item, i) => (
                            <div
                                key={item._id || i}
                                className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-3 flex items-start justify-between gap-3">
                                    <p className="text-xs font-medium uppercase tracking-wide text-orange-600">
                                        {item.country || "N/A"} • {item.degreeLevel || "N/A"}
                                    </p>
                                </div>

                                <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg">
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
                        <p className="text-sm text-gray-500">No scholarships found.</p>
                    </div>
                ) : null}

                {/* LOAD MORE */}
                {!loading && visible < scholarships.length && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={() => setVisible((prev) => prev + 8)}
                            className="w-full rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 active:scale-[0.99] sm:w-auto"
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