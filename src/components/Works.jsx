"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import GetStartedLink from "@/components/GetStartedLink";

export default function Works() {
    const { t } = useTranslation();

    const steps = [
        {
            icon: "👤",
            title: t("works.step1_title"),
            desc: t("works.step1_desc"),
            number: 1,
        },
        {
            icon: "✨",
            title: t("works.step2_title"),
            desc: t("works.step2_desc"),
            number: 2,
        },
        {
            icon: "✈️",
            title: t("works.step3_title"),
            desc: t("works.step3_desc"),
            number: 3,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <div className="mx-auto max-w-7xl">
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center sm:mb-16"
                >
                    <p className="mb-3 text-sm font-semibold tracking-widest text-orange-500 sm:mb-4">
                        {t("works.label")}
                    </p>

                    <h2 className="mb-4 text-3xl font-bold text-[#0b1d3a] sm:text-4xl lg:text-5xl">
                        {t("works.title")}
                    </h2>

                    <p className="mx-auto max-w-2xl text-sm text-gray-500 sm:text-base">
                        {t("works.subtitle")}
                    </p>
                </motion.div>

                {/* STEPS GRID */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
                >
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.number}
                            variants={itemVariants}
                            className="flex flex-col items-center text-center"
                        >
                            {/* ICON BOX */}
                            <div className="relative mb-6 sm:mb-8">
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0b1d3a] text-3xl shadow-md sm:h-24 sm:w-24 sm:text-4xl">
                                    {step.icon}
                                </div>

                                {/* NUMBER BADGE */}
                                <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-lg sm:h-8 sm:w-8 sm:text-sm">
                                    {step.number}
                                </div>
                            </div>

                            {/* TEXT */}
                            <h3 className="mb-2 text-lg font-semibold text-[#0b1d3a] sm:mb-3 sm:text-xl">
                                {step.title}
                            </h3>

                            <p className="text-sm text-gray-500 sm:text-base">{step.desc}</p>

                            {/* CONNECTOR LINE (hidden on mobile, visible on md+) */}
                            {idx < steps.length - 1 && (
                                <div className="absolute -right-4 top-12 hidden h-0.5 w-8 bg-gradient-to-r from-orange-400 to-transparent lg:block xl:-right-5 xl:w-12" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* BOTTOM CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12 flex flex-col items-center gap-4 sm:mt-16"
                >
                    <p className="text-center text-sm text-gray-600 sm:text-base">
                        {t("works.cta_text")}
                    </p>

                    <GetStartedLink
                        className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 sm:px-8 sm:text-base"
                    >
                        {t("works.cta_btn")} →
                    </GetStartedLink>
                </motion.div>
            </div>
        </section>
    );
}