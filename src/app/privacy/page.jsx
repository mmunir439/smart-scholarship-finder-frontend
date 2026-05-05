"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import Link from "next/link"
export default function PrivacyPage() {
  const { t } = useTranslation();

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("privacy.title")}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
              {t("privacy.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-4 xl:gap-8">
          {/* SIDEBAR - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                {t("privacy.nav.overview")}
              </h3>
              <nav className="space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActive(s.id)}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${active === s.id
                      ? "border-l-4 border-orange-500 bg-orange-50 text-orange-700"
                      : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* SIDEBAR - Mobile */}
          <div className="mb-6 flex flex-col gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 sm:px-5"
            >
              <span className="text-sm font-semibold text-gray-900">
                {sections.find((s) => s.id === active)?.label || "Navigation"}
              </span>
              <span className={`transition ${mobileMenuOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {mobileMenuOpen && (
              <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                <nav className="space-y-1 p-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={() => {
                        setActive(s.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${active === s.id
                        ? "bg-orange-50 text-orange-700"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>

          {/* CONTENT */}
          <main className="lg:col-span-3 space-y-6 sm:space-y-8">
            {sections.map((sec, idx) => (
              <motion.section
                key={sec.id}
                id={sec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6 lg:p-8"
              >
                <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                  {sec.label}
                </h2>

                <div className="space-y-4 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                  {sec.id === "overview" && (
                    <>
                      <p>{t("privacy.overview")}</p>
                      <ul className="list-inside list-disc space-y-2 pl-2">
                        <li>Information we collect</li>
                        <li>How we use your data</li>
                        <li>Your privacy rights</li>
                        <li>Data security measures</li>
                      </ul>
                    </>
                  )}

                  {sec.id === "data-collected" && (
                    <>
                      <p>{t("privacy.data_collected")}</p>
                      <div className="mt-4 space-y-3">
                        <div className="rounded-lg bg-orange-50 p-3 sm:p-4">
                          <h4 className="font-semibold text-gray-900">📧 Account Information</h4>
                          <p className="mt-1 text-xs sm:text-sm">Name, email, password (hashed)</p>
                        </div>
                        <div className="rounded-lg bg-orange-50 p-3 sm:p-4">
                          <h4 className="font-semibold text-gray-900">👤 Profile Data</h4>
                          <p className="mt-1 text-xs sm:text-sm">Academic records, preferences, applications</p>
                        </div>
                        <div className="rounded-lg bg-orange-50 p-3 sm:p-4">
                          <h4 className="font-semibold text-gray-900">📱 Usage Data</h4>
                          <p className="mt-1 text-xs sm:text-sm">IP address, browser type, pages visited</p>
                        </div>
                      </div>
                    </>
                  )}

                  {sec.id === "data-use" && (
                    <>
                      <p>{t("privacy.data_use")}</p>
                      <ol className="list-inside list-decimal space-y-2 pl-2">
                        <li>Provide scholarship recommendations</li>
                        <li>Send notifications and updates</li>
                        <li>Improve platform experience</li>
                        <li>Analyze usage patterns</li>
                        <li>Comply with legal requirements</li>
                      </ol>
                    </>
                  )}

                  {sec.id === "data-storage" && (
                    <>
                      <p>{t("privacy.data_storage")}</p>
                      <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 sm:p-4">
                        <p className="text-xs font-semibold text-yellow-900 sm:text-sm">
                          🔒 Your data is encrypted and stored securely on MongoDB servers with regular backups.
                        </p>
                      </div>
                    </>
                  )}

                  {sec.id === "web-scraping" && (
                    <>
                      <p>{t("privacy.web_scraping")}</p>
                      <p className="mt-3">
                        We respect robots.txt and scraping policies of third-party scholarship websites.
                      </p>
                    </>
                  )}

                  {sec.id === "cookies" && (
                    <>
                      <p>{t("privacy.cookies")}</p>
                      <ul className="list-inside list-disc space-y-2 pl-2">
                        <li>Session cookies for authentication</li>
                        <li>Analytics cookies (optional)</li>
                        <li>Preference cookies for language/theme</li>
                      </ul>
                    </>
                  )}

                  {sec.id === "third-party" && (
                    <>
                      <p>{t("privacy.third_party")}</p>
                      <p className="mt-3">We do not share your data with third parties except as required by law.</p>
                    </>
                  )}

                  {sec.id === "rights" && (
                    <>
                      <p>{t("privacy.rights")}</p>
                      <ul className="list-inside list-disc space-y-2 pl-2">
                        <li>Right to access your data</li>
                        <li>Right to correct inaccurate data</li>
                        <li>Right to delete your account</li>
                        <li>Right to data portability</li>
                        <li>Right to opt-out of communications</li>
                      </ul>
                    </>
                  )}

                  {sec.id === "changes" && (
                    <>
                      <p>{t("privacy.changes")}</p>
                      <p className="mt-3">
                        We may update this policy periodically. Changes will be posted on this page.
                      </p>
                    </>
                  )}

                  {sec.id === "contact" && (
                    <>
                      <p>{t("privacy.contact")}</p>
                      <div className="mt-4 space-y-2 rounded-lg bg-blue-50 p-3 sm:p-4">
                        <Link href={"/contact"}>Contact </Link>
                      </div>
                    </>
                  )}
                </div>
              </motion.section>
            ))}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}