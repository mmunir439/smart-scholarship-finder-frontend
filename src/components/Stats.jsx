"use client";

import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

export default function Stats() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#0b1d3a] py-16 text-center text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-4xl text-orange-400">
            <CountUp end={500} duration={2} />+
          </h2>
          <p>{t("stats.scholarships")}</p>
        </div>

        <div>
          <h2 className="text-4xl text-orange-400">
            <CountUp end={10000} duration={2.5} />+
          </h2>
          <p>{t("stats.students")}</p>
        </div>

        <div>
          <h2 className="text-4xl text-orange-400">
            <CountUp end={50} duration={2} />+
          </h2>
          <p>{t("stats.countries")}</p>
        </div>

      </div>
    </section>
  );
}