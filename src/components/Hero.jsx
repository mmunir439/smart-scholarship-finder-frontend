"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="bg-[#0b1d3a] text-white px-4 sm:px-6 lg:px-10 py-12 sm:py-20">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1">
                    <div className="inline-block border border-orange-400 text-orange-400 text-xs px-3 py-1 rounded-full mb-4">
                        ✨ {t("hero.badge")}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                        {t("hero.title")}
                        <span className="text-orange-500 block">{t("hero.highlight")}</span>
                    </h1>

                    <p className="text-gray-300 mb-6 text-sm sm:text-base">
                        {t("hero.desc")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center w-full sm:w-auto bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-md font-semibold text-sm transition-colors"
                        >
                            {t("hero.start")} →
                        </Link>

                        <Link
                            href="/scholarships"
                            className="inline-flex items-center justify-center w-full sm:w-auto border border-gray-500 px-5 py-3 rounded-md hover:border-white text-sm transition-colors"
                        >
                            {t("hero.browse")}
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="text-yellow-400">★★★★★</span>
                        <span>{t("hero.trust")}</span>
                    </div>

                    <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        <div>
                            <div className="text-2xl font-bold text-orange-500">500+</div>
                            <div className="text-xs text-gray-400 mt-1">{t("hero.stat_scholarships")}</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-500">10K+</div>
                            <div className="text-xs text-gray-400 mt-1">{t("hero.stat_students")}</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-500">50+</div>
                            <div className="text-xs text-gray-400 mt-1">{t("hero.stat_countries")}</div>
                        </div>
                    </div>
                </div>

                <div className="order-1 md:order-2 flex justify-center md:justify-end">
                    <div className="w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                            src="/munir.png"
                            alt="Student with scholarship"
                            width={800}
                            height={480}
                            className="w-full h-[420px] sm:h-[480px] object-cover object-top"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
