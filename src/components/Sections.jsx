"use client";

import Link from "next/link";
import GetStartedLink from "@/components/GetStartedLink";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useScholarshipPreferences } from "@/hooks/useScholarshipPreferences";
import {
  fetchScholarships,
  getDegreeFilterLabel,
  getRegionFilterLabel,
  isScholarshipFilterActive,
} from "@/lib/scholarshipPreferences";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";

export default function Sections() {
  const { t } = useTranslation();
  const { preferences, loaded: prefsLoaded } = useScholarshipPreferences();
  const [scholarships, setScholarships] = useState([]);

  const topScholarships = scholarships.slice(0, 3);
  const isFiltered = isScholarshipFilterActive(preferences);
  const regionLabel = getRegionFilterLabel(preferences.studyRegion, t);
  const degreeLabel = getDegreeFilterLabel(preferences.preferredDegree, t);

  useEffect(() => {
    if (!prefsLoaded) return;
    fetchScholarships(preferences).then(setScholarships).catch(() => setScholarships([]));
  }, [preferences, prefsLoaded]);

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
      <div className="edu-container">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">{t("sections.featured")}</p>
            <h2 className="edu-section-title">{t("sections.title")}</h2>
          </div>
          <Link href="/scholarships" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
            {t("sections.view_all")} <ArrowRight size={16} />
          </Link>
        </div>

        {isFiltered && (
          <div className="filter-banner mb-6">
            {t("scholarships.filtered_by", { region: regionLabel, degree: degreeLabel })}{" "}
            <Link href="/settings" className="font-semibold underline">Change in settings</Link>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-3">
          {topScholarships.map((item) => (
            <div key={item._id} className="scholarship-card">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                {item.country} · {item.degreeLevel}
              </p>
              <h3 className="mb-2 line-clamp-2 text-base font-bold text-slate-900">{item.name}</h3>
              <p className="mb-4 line-clamp-2 text-sm text-slate-600">{item.source}</p>
              <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                <span className="flex items-center gap-1 text-slate-500">
                  <Calendar size={14} />
                  {item.deadline}
                </span>
                <Link href={item.link} target="_blank" className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700">
                  {t("sections.view")} <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="edu-container mt-14">
        <div className="rounded-2xl bg-blue-600 px-8 py-10 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{t("sections.cta_title")}</h2>
          <p className="mx-auto mt-3 max-w-lg text-blue-100">{t("sections.cta_desc")}</p>
          <GetStartedLink className="btn-primary mt-6 bg-white text-blue-600 hover:bg-blue-50">
            {t("sections.cta_btn")}
          </GetStartedLink>
        </div>
      </div>
    </section>
  );
}
