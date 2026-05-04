"use client";

import React, { useState, useEffect } from "react";
import axios from "@/app/utils/axios";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

import { Pie, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

// COLORS
const STATUS_COLORS = ["#1d9e75", "#ef9f27", "#e24b4a"];
const STATUS_BORDERS = ["#0f6e56", "#ba7517", "#a32d2d"];
const COUNTRY_COLORS = ["#3266ad", "#1d9e75", "#ef9f27", "#e24b4a"];
const DEGREE_COLORS = ["#3266ad", "#1d9e75", "#ef9f27"];
const DEGREE_BORDERS = ["#185fa5", "#0f6e56", "#ba7517"];

// COMPONENTS
function ChartCard({ title, subtitle, children, wide = false }) {
    return (
        <div className={`bg-white rounded-2xl p-5 shadow ${wide ? "md:col-span-2" : ""}`}>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-xs text-gray-400 mb-2">{subtitle}</p>
            {children}
        </div>
    );
}

function SkeletonCard({ wide = false }) {
    return (
        <div className={`bg-white p-5 rounded-xl ${wide ? "md:col-span-2" : ""}`}>
            <div className="h-40 bg-gray-100 animate-pulse rounded" />
        </div>
    );
}

// MAIN COMPONENT
export default function ChartsPage() {
    const [eligibleData, setEligibleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileMissing, setProfileMissing] = useState(false);
    const smallChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "bottom", labels: { boxWidth: 12, padding: 8 } },
            tooltip: { enabled: true },
        },
    };

    const smallBarOptions = {
        ...smallChartOptions,
        scales: {
            x: { ticks: { maxRotation: 0 } },
            y: { beginAtZero: true },
        },
    };
    const getEligible = async () => {
        try {
            setLoading(true);
            setError(null);
            setProfileMissing(false);

            const res = await axios.get("/eligible");
            setEligibleData(res.data || []);
        } catch (err) {
            const status = err?.response?.status;
            const message = err?.response?.data?.message || "";

            if (status === 404 || message.toLowerCase().includes("profile")) {
                setProfileMissing(true);
                setEligibleData([]);
            } else {
                setError("Failed to load data");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEligible();
    }, []);
    // ---------- add these derived datasets ----------
    const statusCounts = React.useMemo(() => {
        const counts = { Eligible: 0, Maybe: 0, "Not Eligible": 0 };
        eligibleData.forEach((it) => {
            const raw = (it.status || it.eligibility || (typeof it.eligible === "boolean" ? (it.eligible ? "eligible" : "not eligible") : "")).toString?.() || "";
            const key = raw.toLowerCase();
            if (key.includes("eligible") && !key.includes("not")) counts.Eligible++;
            else if (key.includes("maybe") || key.includes("pending")) counts.Maybe++;
            else counts["Not Eligible"]++;
        });
        return counts;
    }, [eligibleData]);

    const statusData = React.useMemo(() => ({
        labels: ["Eligible", "Maybe", "Not Eligible"],
        datasets: [{
            data: [statusCounts.Eligible, statusCounts.Maybe, statusCounts["Not Eligible"]],
            backgroundColor: STATUS_COLORS,
            borderColor: STATUS_BORDERS,
            borderWidth: 1,
        }],
    }), [statusCounts]);

    const countryData = React.useMemo(() => {
        const map = {};
        eligibleData.forEach((it) => {
            const c = (it.country || "Unknown").toString();
            map[c] = (map[c] || 0) + 1;
        });
        const labels = Object.keys(map);
        return {
            labels,
            datasets: [{
                label: "Countries",
                data: labels.map(l => map[l]),
                backgroundColor: labels.map((_, i) => COUNTRY_COLORS[i % COUNTRY_COLORS.length]),
            }],
        };
    }, [eligibleData]);

    const degreeData = React.useMemo(() => {
        const map = {};
        eligibleData.forEach((it) => {
            const d = (it.degreeLevel || it.degree || "Other").toString();
            map[d] = (map[d] || 0) + 1;
        });
        const labels = Object.keys(map);
        return {
            labels,
            datasets: [{
                data: labels.map(l => map[l]),
                backgroundColor: DEGREE_COLORS,
                borderColor: DEGREE_BORDERS,
            }],
        };
    }, [eligibleData]);
    // ---------- end derived datasets ----------
    return (
        <DashboardLayout>
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard wide />
                </div>
            )}

            {profileMissing && !loading && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-5 text-center">
                    <h2 className="font-semibold text-lg">Academic profile is missing</h2>
                    <p className="text-sm mt-1">
                        Please complete your academic profile to view eligibility charts.
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                        >
                            Enter Profile
                        </Link>
                    </p>
                </div>
            )}

            {error && (
                <div className="text-center text-red-500">
                    {error}
                </div>
            )}

            {!loading && !error && !profileMissing && eligibleData.length === 0 && (
                <div className="text-center text-gray-400">
                    No data found
                </div>
            )}

            {!loading && !error && !profileMissing && eligibleData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <ChartCard title="Eligibility" subtitle="Overview">
                        <div className="mx-auto w-full max-w-xs h-44 md:h-56">
                            <Pie data={statusData} options={smallChartOptions} />
                        </div>
                    </ChartCard>

                    <ChartCard title="Countries" subtitle="Distribution">
                        <div className="mx-auto w-full max-w-xs h-44 md:h-56">
                            <Bar data={countryData} options={smallBarOptions} />
                        </div>
                    </ChartCard>

                    <ChartCard title="Degree Level" subtitle="Breakdown" wide>
                        <div className="mx-auto w-full max-w-xs h-44 md:h-56">
                            <Doughnut data={degreeData} options={smallChartOptions} />
                        </div>
                    </ChartCard>
                </div>
            )}
        </DashboardLayout>
    );
}