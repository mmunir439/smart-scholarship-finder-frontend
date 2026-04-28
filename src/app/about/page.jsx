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
            image: "/munir.jpeg",
        },
        {
            name: "Diini Isaq Farah",
            image: "/diini.png",
        },
    ];

    return (
        <div className="bg-white text-gray-800">
            <Navbar />

            {/* 🔵 HERO */}
            <section className="relative bg-[#0B1437] text-white py-20 px-6 md:px-12 text-center overflow-hidden">
                <motion.h1 {...fadeUp} className="text-3xl md:text-5xl font-serif mb-4">
                    {t("about.hero_title")}
                </motion.h1>

                <motion.p {...fadeUp} className="text-gray-300 max-w-2xl mx-auto">
                    {t("about.hero_desc")}
                </motion.p>

                <div className="absolute top-10 left-10 w-20 h-20 bg-[#F5A623]/10 rounded-full" />
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#F5A623]/10 rotate-45" />
            </section>

            {/* 🎯 MISSION */}
            <section className="grid md:grid-cols-2 gap-10 px-6 md:px-16 py-16">
                <motion.div
                    {...fadeUp}
                    className="border-l-4 border-[#F5A623] pl-6 italic text-xl font-serif"
                >
                    {t("about.mission_quote")}
                </motion.div>

                <motion.div {...fadeUp} className="space-y-4 text-gray-600">
                    <p>{t("about.mission_desc1")}</p>
                    <p>{t("about.mission_desc2")}</p>
                </motion.div>
            </section>

            {/* ❗ PROBLEM SECTION */}
            <section className="px-6 md:px-16 py-16 grid md:grid-cols-2 gap-6">
                {[
                    { icon: "🌐", text: t("about.problem1") },
                    { icon: "💸", text: t("about.problem2") },
                    { icon: "😕", text: t("about.problem3") },
                    { icon: "⏳", text: t("about.problem4") },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        {...fadeUp}
                        className="bg-[#0B1437] text-white p-6 rounded-xl hover:-translate-y-1 transition"
                    >
                        <div className="text-[#F5A623] text-2xl mb-2">{item.icon}</div>
                        <p>{item.text}</p>
                    </motion.div>
                ))}
            </section>

            {/* ⚙️ HOW IT WORKS */}
            <section className="px-6 md:px-16 py-16 text-center">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative">
                    {[t("about.step1"), t("about.step2"), t("about.step3")].map(
                        (step, i) => (
                            <motion.div key={i} {...fadeUp} className="flex-1">
                                <div className="w-10 h-10 bg-[#F5A623] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    {i + 1}
                                </div>
                                <p className="text-gray-700">{step}</p>
                            </motion.div>
                        )
                    )}
                </div>
            </section>

            {/* 👥 TEAM */}
            <div className="flex flex-col md:flex-row justify-center gap-6">
                {team.map((member, i) => (
                    <motion.div
                        key={i}
                        {...fadeUp}
                        className="bg-white shadow p-6 rounded-xl w-64 text-center"
                    >
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#F5A623]">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-500">
                            {t("about.team_role")}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* 💡 VALUES */}
            <section className="grid md:grid-cols-3 gap-6 px-6 md:px-16 py-16">
                {[t("about.value1"), t("about.value2"), t("about.value3")].map(
                    (value, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp}
                            className="border p-6 rounded-xl text-center"
                        >
                            <h3 className="font-semibold mb-2">{value}</h3>
                            <p className="text-sm text-gray-500">
                                {t("about.value_desc")}
                            </p>
                        </motion.div>
                    )
                )}
            </section>

            {/* 🚀 CTA */}
            <section className="bg-[#0B1437] text-white text-center py-12">
                <h2 className="text-xl mb-4">{t("about.cta_title")}</h2>

                <button className="bg-[#F5A623] px-6 py-3 rounded-md font-semibold hover:opacity-90">
                    {t("about.cta_btn")}
                </button>
            </section>

            <Footer />
        </div>
    );
}