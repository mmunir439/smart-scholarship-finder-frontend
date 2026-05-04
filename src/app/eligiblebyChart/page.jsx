"use client";

import React, { useState, useEffect } from "react";
import axios from "@/app/utils/axios";
import DashboardLayout from "@/components/layout/DashboardLayout";

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

    const getEligible = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/eligible");
            setEligibleData(res.data || []);
        } catch (err) {
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEligible();
    }, []);

    // COUNTS
    const eligibleCount = eligibleData.filter(i => i.status === "Eligible").length;
    const partialCount = eligibleData.filter(i => i.status === "Partially Eligible").length;
    const notEligibleCount = eligibleData.filter(i => i.status === "Not Eligible").length;

    const statusData = {
        labels: ["Eligible", "Partial", "Not Eligible"],
        datasets: [{
            data: [eligibleCount, partialCount, notEligibleCount],
            backgroundColor: STATUS_COLORS,
            borderColor: STATUS_BORDERS,
        }]
    };

    const countryMap = {};
    eligibleData.forEach(i => {
        countryMap[i.country] = (countryMap[i.country] || 0) + 1;
    });

    const countryData = {
        labels: Object.keys(countryMap),
        datasets: [{
            data: Object.values(countryMap),
            backgroundColor: COUNTRY_COLORS,
        }]
    };

    const degreeMap = {};
    eligibleData.forEach(i => {
        degreeMap[i.degreeLevel] = (degreeMap[i.degreeLevel] || 0) + 1;
    });

    const degreeData = {
        labels: Object.keys(degreeMap),
        datasets: [{
            data: Object.values(degreeMap),
            backgroundColor: DEGREE_COLORS,
            borderColor: DEGREE_BORDERS,
        }]
    };

    return (
        <DashboardLayout>

            {/* LOADING */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard wide />
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div className="text-center text-red-500">
                    {error}
                </div>
            )}

            {/* EMPTY */}
            {!loading && !error && eligibleData.length === 0 && (
                <div className="text-center text-gray-400">
                    No data found
                </div>
            )}

            {/* MAIN CONTENT */}
            {!loading && !error && eligibleData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <ChartCard title="Eligibility" subtitle="Overview">
                        <Pie data={statusData} />
                    </ChartCard>

                    <ChartCard title="Countries" subtitle="Distribution">
                        <Bar data={countryData} />
                    </ChartCard>

                    <ChartCard title="Degree Level" subtitle="Breakdown" wide>
                        <Doughnut data={degreeData} />
                    </ChartCard>

                </div>
            )}

        </DashboardLayout>
    );
}