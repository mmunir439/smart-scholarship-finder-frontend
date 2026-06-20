"use client";

import Link from "next/link";
import GetStartedLink from "@/components/GetStartedLink";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useScholarshipPreferences } from "@/hooks/useScholarshipPreferences";
import {
    fetchScholarships,
    getDegreeFilterLabel,
    getRegionFilterLabel,
    isScholarshipFilterActive,
} from "@/lib/scholarshipPreferences";

export default function Sections() {
    const { t } = useTranslation();
    const { preferences, loaded: prefsLoaded } = useScholarshipPreferences();
    const [scholarships, setScholarships] = useState([]);

    const topScholarships = scholarships.slice(0, 3);
    const isFiltered = isScholarshipFilterActive(preferences);
    const regionLabel = getRegionFilterLabel(preferences.studyRegion, t);
    const degreeLabel = getDegreeFilterLabel(preferences.preferredDegree, t);

    useEffect(() => {
        if (!prefsLoaded) return;

        fetchScholarships(preferences)
            .then(setScholarships)
            .catch(() => setScholarships([]));
    }, [preferences, prefsLoaded]);

    return (
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 space-y-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <p className="text-orange-500 text-sm font-semibold tracking-widest mb-2">
                    {t("sections.featured")}
                </p>

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

                {isFiltered && (
                    <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
                        {t("scholarships.filtered_by", {
                            region: regionLabel,
                            degree: degreeLabel,
                        })}{" "}
                        <Link href="/settings" className="font-semibold underline hover:text-orange-700">
                            {t("scholarships.change_in_settings")}
                        </Link>
                    </div>
                )}

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
