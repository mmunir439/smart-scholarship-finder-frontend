"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

export default function PrivacyPage() {
  const { t } = useTranslation();

  const sections = useMemo(
    () => [
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
    ],
    [t],
  );

  const [active, setActive] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && window.scrollY >= el.offsetTop - 130) setActive(sec.id);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const navLinkClass = (id) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition ${
      active === id
        ? "border-l-4 border-blue-600 bg-blue-50 text-blue-700"
        : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      {/* Hero — blue navy header, same layout */}
      <section className="page-header relative overflow-hidden text-center">
        <div className="page-header-inner mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block rounded-full border border-blue-300/50 bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-100 sm:px-4 sm:text-sm">
              🛡️ {t("footer.privacy")}
            </span>
            <h1 className="mt-4 sm:mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t("privacy.title")}
            </h1>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base md:text-lg px-2">
              {t("privacy.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="pointer-events-none absolute left-3 top-5 h-12 w-12 sm:left-10 sm:top-10 sm:h-20 sm:w-20 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute bottom-5 right-3 h-10 w-10 sm:bottom-10 sm:right-10 sm:h-16 sm:w-16 rotate-45 rounded-full bg-white/10" />
      </section>

      {/* Layout: mobile nav full-width, then sidebar + content on lg */}
      <div className="edu-container py-8 sm:py-10 md:py-12 lg:py-14">
        {/* Mobile section picker — full width above content */}
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-black/5"
          >
            <span className="text-sm font-semibold text-gray-900 truncate pr-2">
              {sections.find((s) => s.id === active)?.label}
            </span>
            <span className={`shrink-0 text-gray-500 transition ${mobileMenuOpen ? "rotate-180" : ""}`}>▼</span>
          </button>
          {mobileMenuOpen && (
            <nav className="mt-2 max-h-64 overflow-y-auto rounded-xl bg-white p-2 shadow-md ring-1 ring-black/5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => { setActive(s.id); setMobileMenuOpen(false); }}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active === s.id ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:w-64 xl:w-72 shrink-0">
            <div className="sticky top-20 rounded-2xl bg-white p-4 shadow-md ring-1 ring-black/5 sm:p-5">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">{t("privacy.nav.overview")}</h3>
              <nav className="space-y-0.5 max-h-[calc(100vh-8rem)] overflow-y-auto">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} onClick={() => setActive(s.id)} className={navLinkClass(s.id)}>
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0 flex-1 space-y-5 sm:space-y-6">
            {sections.map((sec) => (
              <motion.section
                key={sec.id}
                id={sec.id}
                {...fadeUp}
                className="scroll-mt-24 sm:scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8"
              >
                <h2 className="mb-3 sm:mb-4 border-l-4 border-blue-600 pl-3 sm:pl-4 text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
                  {sec.label}
                </h2>

                <div className="space-y-3 sm:space-y-4 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                  {sec.id === "overview" && (
                    <>
                      <p>{t("privacy.overview")}</p>
                      <ul className="list-inside list-disc space-y-1.5 pl-2">
                        <li>Information we collect</li>
                        <li>How we use your data</li>
                        <li>Your privacy rights</li>
                        <li>Data security measures</li>
                      </ul>
                    </>
                  )}

                  {sec.id === "data-collected" && (
                    <>
                      <p className="whitespace-pre-line">{t("privacy.data_collected")}</p>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {[
                          { icon: "📧", title: "Account Information", desc: "Name, email, password (hashed)" },
                          { icon: "👤", title: "Profile Data", desc: "Academic records, preferences, applications" },
                          { icon: "📱", title: "Usage Data", desc: "IP address, browser type, pages visited" },
                        ].map((item) => (
                          <div key={item.title} className="rounded-2xl bg-slate-900 p-4 text-white shadow-md sm:p-5">
                            <div className="mb-2 text-xl sm:text-2xl text-blue-400">{item.icon}</div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">{item.title}</h4>
                            <p className="mt-1 text-xs text-gray-200 sm:text-sm">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {sec.id === "data-use" && (
                    <>
                      <p className="whitespace-pre-line">{t("privacy.data_use")}</p>
                      <ol className="list-inside list-decimal space-y-1.5 pl-2">
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
                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 sm:p-4">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                          🔒 Your data is encrypted and stored securely on MongoDB servers with regular backups.
                        </p>
                      </div>
                    </>
                  )}

                  {sec.id === "web-scraping" && (
                    <>
                      <p>{t("privacy.web_scraping")}</p>
                      <p>We respect robots.txt and scraping policies of third-party scholarship websites.</p>
                    </>
                  )}

                  {sec.id === "cookies" && (
                    <>
                      <p>{t("privacy.cookies")}</p>
                      <ul className="list-inside list-disc space-y-1.5 pl-2">
                        <li>Session cookies for authentication</li>
                        <li>Analytics cookies (optional)</li>
                        <li>Preference cookies for language and theme</li>
                      </ul>
                    </>
                  )}

                  {sec.id === "third-party" && (
                    <>
                      <p>{t("privacy.third_party")}</p>
                      <p>We do not share your data with third parties except as required by law.</p>
                    </>
                  )}

                  {sec.id === "rights" && (
                    <>
                      <p>{t("privacy.rights")}</p>
                      <ul className="list-inside list-disc space-y-1.5 pl-2">
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
                      <p>We may update this policy periodically. Changes will be posted on this page.</p>
                    </>
                  )}

                  {sec.id === "contact" && (
                    <>
                      <p>{t("privacy.contact")}</p>
                      <Link
                        href="/contact"
                        className="btn-primary mt-3 sm:mt-4 w-full sm:w-auto"
                      >
                        {t("footer.contact")}
                      </Link>
                    </>
                  )}
                </div>
              </motion.section>
            ))}
          </main>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="page-header px-4 py-10 text-center sm:px-6 sm:py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl px-2">
          <h2 className="text-lg font-semibold text-white sm:text-xl md:text-2xl">{t("privacy.title")}</h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-blue-100 md:text-base">{t("privacy.subtitle")}</p>
          <Link href="/contact" className="btn-primary mt-5 sm:mt-6 w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50">
            {t("footer.contact")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
