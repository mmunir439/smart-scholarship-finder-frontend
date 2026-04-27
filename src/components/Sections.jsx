"use client";
import Link from "next/link";
import axios from "@/app/utils/axios"
import { useEffect, useState } from "react";

export default function Sections() {
    const [scholarships, setScholarships] = useState([]);
    const topScholarships = scholarships.slice(0, 3);
    const getallAllScholarship = async () => {
        try {
            const res = await axios.get("/admin/scholarships"); // your API route
            setScholarships(res.data.scholarships || res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getallAllScholarship();
    }, []);
    return (
        <section className="bg-gray-50 py-20 space-y-24">

            {/* ================= FEATURED SCHOLARSHIPS ================= */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                <div className="flex justify-between items-center mb-12">
                    <div>
                        <p className="text-orange-500 text-sm font-semibold">
                            FEATURED OPPORTUNITIES
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#0b1d3a]">
                            Top scholarships this season
                        </h2>
                    </div>

                    <Link href={"/scholarships"} className="border px-5 py-2 rounded-md text-sm hover:bg-gray-100">
                        View all scholarships
                    </Link>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6">

                    {topScholarships.map((item, i) => (
                        <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border">

                            <div className="flex justify-between mb-4">
                                <p className="font-semibold">
                                    {item.country} <span className="text-gray-500 text-sm">Country</span>
                                </p>

                                <span className="bg-orange-100 text-orange-500 text-xs px-3 py-1 rounded-full">
                                    {item.degreeLevel}
                                </span>
                            </div>

                            <h3 className="font-semibold text-[#0b1d3a] mb-4">
                                {item.name}
                            </h3>

                            <div className="flex gap-3 text-xs text-gray-500 mb-6">
                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                    {item.degreeLevel}
                                </span>

                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                    {item.deadline}
                                </span>
                            </div>

                            <Link className="w-full border rounded-md py-2 text-sm hover:bg-gray-100" href={item.link} target="_blank">

                                View details

                            </Link>

                        </div>
                    ))}

                </div>
            </div>

            {/* ================= TESTIMONIALS ================= */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">

                <p className="text-orange-500 text-sm font-semibold mb-4">STORIES</p>

                <h2 className="text-3xl md:text-5xl font-bold text-[#0b1d3a] mb-12">
                    Pakistani students, global futures
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    {[
                        {
                            text: "ScholarPath matched me with the Fulbright in days...",
                            name: "Ayesha Khan",
                        },
                        {
                            text: "I never thought studying in Germany was within reach...",
                            name: "Hamza Ali",
                        },
                        {
                            text: "From a small town in Punjab to Oxford...",
                            name: "Sana Iqbal",
                        },
                    ].map((t, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition animate-float"
                            style={{ animationDelay: `${i * 0.4}s` }}
                        >
                            <p className="text-gray-600 mb-6">"{t.text}"</p>

                            <div className="flex items-center gap-3">
                                <div className="bg-[#0b1d3a] text-white w-10 h-10 flex items-center justify-center rounded-full text-sm">
                                    {t.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <p className="font-semibold">{t.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= CTA ================= */}
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-[#0b1d3a] text-white rounded-3xl py-16 px-6 md:px-12 text-center shadow-lg">

                    <h2 className="text-2xl md:text-4xl font-bold mb-4">
                        Start your scholarship journey today
                    </h2>

                    <p className="text-gray-300 mb-8 text-sm md:text-base">
                        Join thousands of Pakistani students unlocking world-class education abroad.
                    </p>

                    <Link
                        href="/register"
                        className="inline-block bg-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition transform hover:scale-105"
                    >
                        Register Now →
                    </Link>
                </div>
            </div>

            {/* ================= ANIMATION STYLE ================= */}
            <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

        </section>
    );
}