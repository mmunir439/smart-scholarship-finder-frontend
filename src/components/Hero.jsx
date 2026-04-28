"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="bg-[#0b1d3a] text-white px-10 py-20">

            <p>{t("hero.badge")}</p>

            <h1>
                {t("hero.title")}
                <span className="text-orange-500 block">
                    {t("hero.highlight")}
                </span>
            </h1>

            <p>{t("hero.desc")}</p>

            <Link href="/register">{t("hero.start")}</Link>
            <Link href="/scholarships">{t("hero.browse")}</Link>

            <p>{t("hero.trust")}</p>

        </section>
    );
}