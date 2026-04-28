"use client";

import Link from "next/link";
import axios from "@/app/utils/axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Sections() {
    const { t } = useTranslation();
    const [scholarships, setScholarships] = useState([]);

    const topScholarships = scholarships.slice(0, 3);

    useEffect(() => {
        axios.get("/admin/scholarships").then(res =>
            setScholarships(res.data.scholarships || res.data.data)
        );
    }, []);

    return (
        <section className="bg-gray-50 py-20 space-y-24">

            {/* FEATURED */}
            <div className="max-w-7xl mx-auto px-6">

                <p>{t("sections.featured")}</p>
                <h2>{t("sections.title")}</h2>

                <Link href="/scholarships">
                    {t("sections.view_all")}
                </Link>

                {topScholarships.map((item) => (
                    <div key={item._id}>
                        <h3>{item.name}</h3>
                        <Link href={item.link}>{t("sections.view")}</Link>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center">
                <h2>{t("sections.cta_title")}</h2>
                <p>{t("sections.cta_desc")}</p>
                <Link href="/register">{t("sections.cta_btn")}</Link>
            </div>

        </section>
    );
}