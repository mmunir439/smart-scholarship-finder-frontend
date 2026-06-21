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
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(sec.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const navLinkClass = (id) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition ${
      active === id
        ? "border-l-4 border-[#F5A623] bg-orange-50 text-orange-700"
        : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="bg-white text-gray-800">
      <Navbar />

      {/* Hero — matches About page */}
      <section className="relative overflow-hidden bg-[#0B1437] px-4 py-16 text-center text-white sm:px-6 sm:py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-orange-400 px-4 py-1 text-xs font-medium text-orange-400 sm:text-sm">
              🛡️ {t("footer.privacy")}
            </span>

            <h1 className="mt-5 text-3xl font-serif font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              {t("privacy.title")}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base md:text-lg">
              {t("privacy.subtitle")}
            </p>
          </motion.div>
        </div>

        <div className="absolute left-4 top-6 h-16 w-16 rounded-full bg-[#F5A623]/10 sm:left-10 sm:top-10 sm:h-20 sm:w-20" />
        <div className="absolute bottom-6 right-4 h-12 w-12 rotate-45 rounded-full bg-[#F5A623]/10 sm:bottom-10 sm:right-10 sm:h-16 sm:w-16" />
      </section>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:p-6">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                {t("privacy.nav.overview")}
              </h3>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} onClick={() => setActive(s.id)} className={navLinkClass(s.id)}>
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile nav */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-black/5"
            >
              <span className="text-sm font-semibold text-gray-900">
                {sections.find((s) => s.id === active)?.label}
              </span>
              <span className={`text-gray-500 transition ${mobileMenuOpen ? "rotate-180" : ""}`}>▼</span>
            </button>
            {mobileMenuOpen && (
              <nav className="mt-2 space-y-1 rounded-xl bg-white p-2 shadow-md ring-1 ring-black/5">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => {
                      setActive(s.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                      active === s.id ? "bg-orange-50 text-orange-700" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Content sections */}
          <main className="space-y-6 lg:col-span-3">
            {sections.map((sec) => (
              <motion.section
                key={sec.id}
                id={sec.id}
                {...fadeUp}
                className="scroll-mt-28 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
              >
                <h2 className="mb-4 border-l-4 border-[#F5A623] pl-4 text-xl font-bold text-gray-900 sm:text-2xl">
                  {sec.label}
                </h2>

                <div className="space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
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
                      <p className="whitespace-pre-line">{t("privacy.data_collected")}</p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        {[
                          { icon: "📧", title: "Account Information", desc: "Name, email, password (hashed)" },
                          { icon: "👤", title: "Profile Data", desc: "Academic records, preferences, applications" },
                          { icon: "📱", title: "Usage Data", desc: "IP address, browser type, pages visited" },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="rounded-2xl bg-[#0B1437] p-4 text-white shadow-md sm:p-5"
                          >
                            <div className="mb-2 text-2xl text-[#F5A623]">{item.icon}</div>
                            <h4 className="font-semibold text-white">{item.title}</h4>
                            <p className="mt-1 text-xs text-gray-200 sm:text-sm">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {sec.id === "data-use" && (
                    <>
                      <p className="whitespace-pre-line">{t("privacy.data_use")}</p>
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
                      <div className="rounded-lg border border-[#F5A623]/30 bg-[#F5A623]/10 p-4">
                        <p className="text-sm font-semibold text-gray-900">
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
                      <ul className="list-inside list-disc space-y-2 pl-2">
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
                      <p>We may update this policy periodically. Changes will be posted on this page.</p>
                    </>
                  )}

                  {sec.id === "contact" && (
                    <>
                      <p>{t("privacy.contact")}</p>
                      <Link
                        href="/contact"
                        className="mt-4 inline-flex rounded-md bg-[#F5A623] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:text-base"
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

      {/* CTA — matches About page bottom */}
      <section className="bg-[#0B1437] px-4 py-14 text-center text-white sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            {t("privacy.title")}
          </h2>
          <p className="mt-3 text-sm text-gray-300 sm:text-base">
            {t("privacy.subtitle")}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-md bg-[#F5A623] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:text-base"
          >
            {t("footer.contact")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
