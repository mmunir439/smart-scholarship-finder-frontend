"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
};

export default function AboutPage() {
    const { t } = useTranslation();

    const team = [
        {
            name: "Muhammad Munir",
            image: "/munir.png",
        },
        {
            name: "Diini Isaq Farah",
            image: "/diini.png",
        },
    ];

    const problems = [
        { icon: "🌐", text: t("about.problem1") },
        { icon: "💸", text: t("about.problem2") },
        { icon: "😕", text: t("about.problem3") },
        { icon: "⏳", text: t("about.problem4") },
    ];

    const steps = [t("about.step1"), t("about.step2"), t("about.step3")];
    const values = [t("about.value1"), t("about.value2"), t("about.value3")];

    return (
        <div className="bg-white text-gray-800">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden bg-[#0B1437] px-4 py-16 text-center text-white sm:px-6 sm:py-20 md:px-10 lg:px-16">
                <div className="mx-auto max-w-4xl">
                    <motion.h1
                        {...fadeUp}
                        className="text-3xl font-serif font-bold leading-tight sm:text-4xl md:text-5xl"
                    >
                        {t("about.hero_title")}
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base md:text-lg"
                    >
                        {t("about.hero_desc")}
                    </motion.p>
                </div>

                <div className="absolute left-4 top-6 h-16 w-16 rounded-full bg-[#F5A623]/10 sm:left-10 sm:top-10 sm:h-20 sm:w-20" />
                <div className="absolute bottom-6 right-4 h-12 w-12 rotate-45 rounded-full bg-[#F5A623]/10 sm:bottom-10 sm:right-10 sm:h-16 sm:w-16" />
            </section>

            {/* MISSION */}
            <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:px-10 lg:px-16 lg:py-16">
                <motion.div
                    {...fadeUp}
                    className="border-l-4 border-[#F5A623] pl-4 text-lg italic font-serif leading-relaxed text-gray-900 sm:pl-6 sm:text-xl"
                >
                    {t("about.mission_quote")}
                </motion.div>

                <motion.div
                    {...fadeUp}
                    className="space-y-4 text-sm leading-7 text-gray-600 sm:text-base"
                >
                    <p>{t("about.mission_desc1")}</p>
                    <p>{t("about.mission_desc2")}</p>
                </motion.div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-10 lg:px-16 lg:py-16">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {problems.map((item, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp}
                            className="rounded-2xl bg-[#0B1437] p-5 text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
                        >
                            <div className="mb-3 text-2xl text-[#F5A623] sm:text-3xl">{item.icon}</div>
                            <p className="text-sm leading-6 text-gray-100 sm:text-base">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 md:px-10 lg:px-16 lg:py-16">
                <div className="grid gap-8 md:grid-cols-3 md:gap-6">
                    {steps.map((step, i) => (
                        <motion.div key={i} {...fadeUp} className="relative">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5A623] text-sm font-bold text-white shadow-md sm:h-14 sm:w-14 sm:text-base">
                                {i + 1}
                            </div>
                            <p className="mx-auto max-w-sm text-sm leading-6 text-gray-700 sm:text-base">
                                {step}
                            </p>

                            {i < steps.length - 1 && (
                                <div className="absolute right-0 top-6 hidden h-px w-full bg-gray-200 md:block" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TEAM */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-10 lg:px-16 lg:py-16">
                <div className="grid gap-6 sm:grid-cols-2 lg:justify-items-center">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp}
                            className="w-full rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg sm:max-w-sm"
                        >
                            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-[#F5A623] sm:h-24 sm:w-24">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                                {member.name}
                            </h3>
                            <p className="text-sm text-gray-500">{t("about.team_role")}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* VALUES */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-10 lg:px-16 lg:py-16">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp}
                            className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-7"
                        >
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                                {value}
                            </h3>
                            <p className="text-sm leading-6 text-gray-500 sm:text-base">
                                {t("about.value_desc")}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#0B1437] px-4 py-14 text-center text-white sm:px-6 md:px-10 lg:px-16">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                        {t("about.cta_title")}
                    </h2>

                    <button className="mt-6 rounded-md bg-[#F5A623] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:text-base">
                        {t("about.cta_btn")}
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}