"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import GetStartedLink from "@/components/GetStartedLink";
import { ArrowRight, UserPlus, Search, Plane } from "lucide-react";

export default function Works() {
  const { t } = useTranslation();

  const steps = [
    { icon: UserPlus, title: t("works.step1_title"), desc: t("works.step1_desc"), number: 1 },
    { icon: Search, title: t("works.step2_title"), desc: t("works.step2_desc"), number: 2 },
    { icon: Plane, title: t("works.step3_title"), desc: t("works.step3_desc"), number: 3 },
  ];

  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
      <div className="edu-container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-label">{t("works.label")}</p>
          <h2 className="edu-section-title">{t("works.title")}</h2>
          <p className="edu-section-subtitle mt-3">{t("works.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="edu-card-hover p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <step.icon size={26} />
              </div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-600">
                Step {step.number}
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-slate-600">{t("works.cta_text")}</p>
          <GetStartedLink className="btn-primary">
            {t("works.cta_btn")} <ArrowRight size={18} />
          </GetStartedLink>
        </div>
      </div>
    </section>
  );
}
