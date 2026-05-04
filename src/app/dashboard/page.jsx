"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTranslation } from "react-i18next";
import AcademicProfileCard from "@/components/Profile";
import axios from "@/app/utils/axios";
export default function Page() {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
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
    // ✅ Get academic/profile
    const getProfile = async () => {
        try {
            const res = await axios.get("/academic/profile");
            setProfile(res.data.data)
            console.log(res.data.data)
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
            setEligibleData(res.data || []);
            console.log(res.data)
        } catch (error) {
            console.log(error);
            setEligibleData([]); // fallback safety
        }
    };

    useEffect(() => {
        getUser();
        getProfile();
        getEligible();
    }, []);

    return (
        <DashboardLayout>

            {/* Greeting */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    Welcome back, {user?.name || "User"} 👋
                </h1>
                <p className="text-gray-500">{today}</p>

            </div>
            <AcademicProfileCard />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eligibleData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-xl transition"
                    >
                        {/* Title */}
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {item.name}
                        </h2>

                        {/* Country */}
                        <p className="text-sm text-gray-500 mb-1">
                            🌍 {item.country}
                        </p>

                        {/* Degree */}
                        <p className="text-sm text-gray-500 mb-1">
                            🎓 {item.degreeLevel}
                        </p>

                        {/* Deadline */}
                        <p className="text-sm text-gray-500 mb-3">
                            ⏰ Deadline: {item.deadline}
                        </p>

                        {/* Status Badge */}
                        <span className="inline-block text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 mb-3">
                            status: {item.status}
                        </span>
                        {/* Status minCGPA */}
                        <span className="inline-block text-xs px-3 py-1 rounded-full  text-yellow-700 mb-3">
                            Recuired ielts: {item.ielts}
                        </span>
                        {/* Status Badge */}
                        <span className="inline-block text-xs px-3 py-1 rounded-full  text-yellow-700 mb-3">
                            Required cgpa: {item.cgpa}
                        </span>

                        {/* Button */}
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            View Details
                        </a>
                    </div>
                ))}
            </div>

        </DashboardLayout>
    );
}