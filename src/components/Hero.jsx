"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="bg-[#0b1d3a] text-white px-4 sm:px-6 lg:px-10 py-12 sm:py-20">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* LEFT - Text Content */}
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

                    {/* Stats Row */}
                    <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        <div>
                            <div className="text-2xl font-bold text-orange-500">500+</div>
                            <div className="text-xs text-gray-400 mt-1">Scholarships Listed</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-500">10K+</div>
                            <div className="text-xs text-gray-400 mt-1">Students Helped</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-500">50+</div>
                            <div className="text-xs text-gray-400 mt-1">Countries</div>
                        </div>
                    </div>
                </div>

                {/* RIGHT - Clean Student Image Only */}
                <div className="order-1 md:order-2 flex justify-center md:justify-end">
                    <div className="relative w-full max-w-lg">

                        {/* Decorative glow behind image */}
                        <div className="absolute -inset-2 bg-orange-500 opacity-10 blur-2xl rounded-3xl" />

                        {/* Main Student Image */}
                        <Image
                            src="/munir.png"        // ✅ just /filename.png — no /public/ in the path
                            alt="Student with scholarship"
                            width={800}
                            height={480}
                            className="relative w-full h-[420px] sm:h-[480px] object-cover object-top rounded-2xl shadow-2xl"
                            priority                // ✅ loads image immediately (good for hero)
                        />

                        {/* Subtle gradient at bottom for polish */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0b1d3a] to-transparent rounded-b-2xl" />

                        {/* Small floating badge - minimal, not a card */}
                        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                            🎓 AI-Powered Matching
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}