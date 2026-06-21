"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetStartedLink from "@/components/GetStartedLink";
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
            image: "/diinislam.png",
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
        <div className="page-bg">
            <Navbar />

            <section className="page-header text-center">
                <div className="page-header-inner mx-auto max-w-4xl">
                    <motion.h1 {...fadeUp} className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                        {t("about.hero_title")}
                    </motion.h1>
                    <motion.p {...fadeUp} className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
                        {t("about.hero_desc")}
                    </motion.p>
                </div>
            </section>

            <section className="edu-container grid gap-8 py-14 md:grid-cols-2 lg:py-16">
                <motion.div {...fadeUp} className="border-l-4 border-blue-600 pl-6 text-lg italic leading-relaxed text-slate-900 sm:text-xl">
                    {t("about.mission_quote")}
                </motion.div>
                <motion.div {...fadeUp} className="space-y-4 text-base leading-7 text-slate-600">
                    <p>{t("about.mission_desc1")}</p>
                    <p>{t("about.mission_desc2")}</p>
                </motion.div>
            </section>

            <section className="edu-container py-14 lg:py-16">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {problems.map((item, i) => (
                        <motion.div key={i} {...fadeUp} className="rounded-2xl bg-blue-600 p-6 text-white">
                            <div className="mb-3 text-3xl">{item.icon}</div>
                            <p className="text-sm leading-6 text-blue-100 sm:text-base">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="edu-container py-14 text-center lg:py-16">
                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((step, i) => (
                        <motion.div key={i} {...fadeUp} className="edu-card p-6">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                {i + 1}
                            </div>
                            <p className="text-sm leading-6 text-slate-600 sm:text-base">{step}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="edu-container py-14 lg:py-16">
                <div className="grid gap-6 sm:grid-cols-2 lg:justify-items-center">
                    {team.map((member, i) => (
                        <motion.div key={i} {...fadeUp} className="edu-card-hover w-full p-6 text-center sm:max-w-sm">
                            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-blue-200">
                                <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                            <p className="text-sm text-slate-500">{t("about.team_role")}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="edu-container py-14 lg:py-16">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {values.map((value, i) => (
                        <motion.div key={i} {...fadeUp} className="edu-card-hover p-7 text-center">
                            <h3 className="mb-2 text-xl font-bold text-slate-900">{value}</h3>
                            <p className="text-sm leading-6 text-slate-500 sm:text-base">{t("about.value_desc")}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="page-header text-center">
                <div className="page-header-inner mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">{t("about.cta_title")}</h2>
                    <GetStartedLink className="btn-primary mt-6">{t("about.cta_btn")}</GetStartedLink>
                </div>
            </section>

            <Footer />
        </div>
    );
}