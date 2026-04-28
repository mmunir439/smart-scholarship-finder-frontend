"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import {
    CountryChart,
    DegreeChart,
    EligibilityChart,
} from "@/components/dashboard/Charts";
import { useTranslation } from "react-i18next";
import AcademicProfileCard from "@/components/AcademicProfileCard";
import axios from "@/app/utils/axios";

export default function Page() {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [eligibleData, setEligibleData] = useState([]);
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    // ✅ Get User
    const getUser = async () => {
        try {
            const res = await axios.get("/user/getCurrentUser");
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = eligibleData.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    // ✅ Get Eligible Scholarships
    const getEligible = async () => {
        try {
            const res = await axios.get("/eligible");

            // 🔥 FIXED HERE
            setEligibleData(res.data.data || []);
        } catch (error) {
            console.log(error);
            setEligibleData([]); // fallback safety
        }
    };

    useEffect(() => {
        getUser();
        getEligible();
    }, []);

    // ✅ Safe counts
    const eligibleCount = eligibleData.filter(
        (e) => e.status === "Eligible"
    ).length;

    const notEligibleCount = eligibleData.filter(
        (e) => e.status === "Not Eligible"
    ).length;

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="bg-white border-b px-6 py-4 mb-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">t("Dashboard")</h2>
            </div>

            {/* Greeting */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                   Welcome back, {user?.name || "User"} 👋
                </h1>
                <p className="text-gray-500">{today}</p>
            </div>

            <AcademicProfileCard />

            {/* ✅ Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <StatsCard title="Eligible" value={eligibleCount} />
                <StatsCard title="Not Eligible" value={notEligibleCount} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <CountryChart data={eligibleData} />
                <EligibilityChart data={eligibleData} />
                <DegreeChart data={eligibleData} />
            </div>

            {/* ✅ Scholarships List */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h2 className="text-lg font-semibold mb-4">
                    Your Scholarships
                </h2>

                {eligibleData.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                        No scholarships found.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {paginatedData.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border p-3 rounded-md hover:shadow-sm transition"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {item?.scholarship?.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {item?.scholarship?.country} •{" "}
                                        {item?.scholarship?.degreeLevel}
                                    </p>
                                </div>

                                {/* Status Badge */}
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${item.status === "Eligible"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </div>
                        ))}
                        <div className="flex justify-center mt-6 gap-2 flex-wrap">
                            {Array.from(
                                { length: Math.ceil(eligibleData.length / itemsPerPage) },
                                (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded ${currentPage === i + 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                )}
            </div>
        </DashboardLayout>
    );
}