"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation(); // ✅

  const sections = [
    { id: "overview", label: t("privacy.nav.overview") },
    { id: "data-collected", label: t("privacy.nav.data_collected") },
    { id: "data-use", label: t("privacy.nav.data_use") },
    { id: "data-storage", label: t("privacy.nav.data_storage") },
    { id: "web-scraping", label: t("privacy.nav.web_scraping") },
    { id: "cookies", label: t("privacy.nav.cookies") },
    { id: "third-party", label: t("privacy.nav.third_party") },
    { id: "rights", label: t("privacy.nav.rights") },
    { id: "changes", label: t("privacy.nav.changes") },
    { id: "contact", label: t("privacy.nav.contact") },
  ];

  const [active, setActive] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sec.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO */}
      <div className="px-6 md:px-16 py-12">
        <h1 className="text-4xl font-serif mb-2">
          {t("privacy.title")}
        </h1>
        <p className="text-gray-500">
          {t("privacy.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-10 gap-6 px-6 md:px-16 pb-20">

        {/* SIDEBAR */}
        <div className="md:col-span-3 hidden md:block">
          <div className="sticky top-10 space-y-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block pl-3 py-2 border-l-4 ${active === s.id
                    ? "border-[#F5A623]"
                    : "border-transparent"
                  }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:col-span-7 space-y-10">

          <Section id="overview" title={t("privacy.overview_title")}>
            {t("privacy.overview")}
          </Section>

          <Section id="data-collected" title={t("privacy.data_collected_title")}>
            {t("privacy.data_collected")}
          </Section>

          <Section id="data-use" title={t("privacy.data_use_title")}>
            {t("privacy.data_use")}
          </Section>

          <Section id="data-storage" title={t("privacy.data_storage_title")}>
            {t("privacy.data_storage")}
          </Section>

          <Section id="web-scraping" title={t("privacy.web_scraping_title")}>
            {t("privacy.web_scraping")}
          </Section>

          <Section id="cookies" title={t("privacy.cookies_title")}>
            {t("privacy.cookies")}
          </Section>

          <Section id="third-party" title={t("privacy.third_party_title")}>
            {t("privacy.third_party")}
          </Section>

          <Section id="rights" title={t("privacy.rights_title")}>
            {t("privacy.rights")}
          </Section>

          <Section id="changes" title={t("privacy.changes_title")}>
            {t("privacy.changes")}
          </Section>

          <Section id="contact" title={t("privacy.contact_title")}>
            {t("privacy.contact")}
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="border-b pb-6">
      <h2 className="text-2xl font-serif mb-3">{title}</h2>
      <p className="text-gray-600 whitespace-pre-line">{children}</p>
    </section>
  );
}