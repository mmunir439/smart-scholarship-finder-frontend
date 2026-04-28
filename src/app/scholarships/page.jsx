"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "@/app/utils/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ScholarshipsPage() {
    const { t } = useTranslation(); // ✅ ADD

    const [scholarships, setScholarships] = useState([]);
    const [visible, setVisible] = useState(8);

    const visibleScholarships = scholarships.slice(0, visible);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/admin/scholarships");
                setScholarships(res.data.data || res.data.scholarships || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* HEADER */}
            <div className="bg-[#0b1d3a] text-white px-6 md:px-12 py-10">
                <h1 className="text-3xl font-bold mb-2">
                    {t("scholarships.title")}
                </h1>
                <p className="text-sm text-gray-300">
                    {t("scholarships.subtitle")}
                </p>
            </div>

            {/* MAIN */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-gray-600">
                        {scholarships.length} {t("scholarships.found")}
                    </p>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

                    {visibleScholarships.map((item, i) => (
                        <div
                            key={item._id || i}
                            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
                        >

                            <div className="flex justify-between mb-2">
                                <p className="text-xs text-gray-500">
                                    {item.country} • {item.degreeLevel}
                                </p>
                            </div>

                            <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2">
                                {item.name}
                            </h3>

                            <p className="text-sm text-gray-500 mb-3">
                                {item.source}
                            </p>

                            <div className="text-xs text-gray-500 flex justify-between items-center">
                                <span>{t("scholarships.deadline")}: {item.deadline}</span>

                                <Link
                                    className="text-orange-500 hover:underline"
                                    href={item.link}
                                    target="_blank"
                                >
                                    {t("scholarships.view")}
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

                {/* LOAD MORE */}
                {visible < scholarships.length && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setVisible((prev) => prev + 8)}
                            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
                        >
                            {t("scholarships.load_more")}
                        </button>
                    </div>
                )}

            </div>

            <Footer />
        </div>
    );
}