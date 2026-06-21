"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import GetStartedLink from "@/components/GetStartedLink";
import { ArrowRight, BookOpen, Globe, Users } from "lucide-react";

export default function Hero() {
  const { t } = useTranslation();

  const stats = [
    { icon: BookOpen, value: "500+", label: t("hero.stat_scholarships") },
    { icon: Users, value: "10K+", label: t("hero.stat_students") },
    { icon: Globe, value: "50+", label: t("hero.stat_countries") },
  ];

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="edu-container grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-2 md:py-20 lg:gap-16">
        {/* Text — dark on white for maximum readability */}
        <div>
          <span className="edu-badge mb-5">{t("hero.badge")}</span>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            {t("hero.title")}{" "}
            <span className="text-blue-600">{t("hero.highlight")}</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
            {t("hero.desc")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GetStartedLink className="btn-primary px-6 py-3 text-base">
              {t("hero.start")}
              <ArrowRight size={18} />
            </GetStartedLink>
            <Link href="/scholarships" className="btn-outline px-6 py-3 text-base">
              {t("hero.browse")}
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-500">★★★★★ {t("hero.trust")}</p>
        </div>

        {/* Image */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-[var(--shadow-lg)]">
              <Image
                src="/munir.jpeg"
                alt="Student with scholarship"
                width={800}
                height={480}
                className="h-[340px] w-full object-cover object-top sm:h-[420px]"
                priority
              />
            </div>
            <div className="absolute -bottom-4 left-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              🎓 {t("hero.ai_badge")}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="edu-container grid grid-cols-1 gap-6 py-8 sm:grid-cols-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Icon size={22} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-sm text-slate-600">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
