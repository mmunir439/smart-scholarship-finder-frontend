"use client";

import Link from "next/link";
import GetStartedLink from "@/components/GetStartedLink";
import axios from "@/app/utils/axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Sections() {
    const { t } = useTranslation();
    const [scholarships, setScholarships] = useState([]);

    const topScholarships = scholarships.slice(0, 3);

    useEffect(() => {
        axios.get("/scholarship/all").then((res) =>
            setScholarships(res.data.scholarships || res.data.data)
        );
    }, []);

    return (
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 space-y-24">

            {/* FEATURED */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                {/* LABEL */}
                <p className="text-orange-500 text-sm font-semibold tracking-widest mb-2">
                    {t("sections.featured")}
                </p>

                {/* TITLE */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0b1d3a]">
                        {t("sections.title")}
                    </h2>

                    <Link
                        href="/scholarships"
                        className="text-orange-500 font-medium hover:underline"
                    >
                        {t("sections.view_all")}
                    </Link>
                </div>

                {/* CARDS */}
                <div className="grid md:grid-cols-3 gap-6">

                    {topScholarships.map((item) => (
                        <div
                            key={item._id}
                            className="edu-card p-5 hover:-translate-y-0.5"
                        >

                            <p className="text-xs text-gray-500 mb-1">
                                {item.country} • {item.degreeLevel}
                            </p>

                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                {item.name}
                            </h3>

                            <p className="text-sm text-gray-500 mb-3">
                                {item.source}
                            </p>

                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>
                                    {t("sections.deadline")}: {item.deadline}
                                </span>

                                <Link
                                    href={item.link}
                                    target="_blank"
                                    className="text-orange-500 hover:underline"
                                >
                                    {t("sections.view")}
                                </Link>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

            {/* CTA */}
            <div className="text-center px-6">
                <h2 className="text-3xl font-bold text-[#0b1d3a] mb-3">
                    {t("sections.cta_title")}
                </h2>

                <p className="text-gray-500 mb-6">
                    {t("sections.cta_desc")}
                </p>

                <GetStartedLink
                    className="inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600"
                >
                    {t("sections.cta_btn")}
                </GetStartedLink>
            </div>

        </section>
    );
}