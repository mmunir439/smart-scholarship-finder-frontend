"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation(); // ✅ ADD

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log(form);
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 py-16">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-2">
            {t("contact.title")}
          </h1>
          <p className="text-gray-500">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {/* MAIN */}
        <div className="grid md:grid-cols-5 gap-10">

          {/* FORM */}
          <div className="md:col-span-3">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  placeholder={t("contact.name")}
                  className="w-full border p-3 rounded"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder={t("contact.email")}
                  className="w-full border p-3 rounded"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <select
                  className="w-full border p-3 rounded"
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                >
                  <option>{t("contact.subject1")}</option>
                  <option>{t("contact.subject2")}</option>
                  <option>{t("contact.subject3")}</option>
                  <option>{t("contact.subject4")}</option>
                </select>

                <textarea
                  rows={5}
                  placeholder={t("contact.message")}
                  className="w-full border p-3 rounded"
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />

                <button className="w-full bg-[#F5A623] py-3 text-white rounded">
                  {loading ? t("contact.sending") : t("contact.send")}
                </button>

              </form>
            ) : (
              <div className="text-green-600 text-center text-lg">
                {t("contact.success")}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="md:col-span-2 space-y-4">

            <div className="bg-[#0B1437] text-white p-5 rounded">
              📧 {t("contact.email_info")}
            </div>

            <div className="bg-[#0B1437] text-white p-5 rounded">
              🏛️ {t("contact.location")}
            </div>

            <div className="bg-[#0B1437] text-white p-5 rounded">
              ⏰ {t("contact.time")}
            </div>

            {/* FAQ */}
            <div className="mt-6 space-y-3">
              <details className="border p-3 rounded">
                <summary>{t("contact.faq1_q")}</summary>
                {t("contact.faq1_a")}
              </details>

              <details className="border p-3 rounded">
                <summary>{t("contact.faq2_q")}</summary>
                {t("contact.faq2_a")}
              </details>

              <details className="border p-3 rounded">
                <summary>{t("contact.faq3_q")}</summary>
                {t("contact.faq3_a")}
              </details>
            </div>

          </div>
        </div>

        {/* MAP */}
        <div className="mt-16 bg-[#0B1437] text-white p-10 text-center rounded">
          📍 {t("contact.map")}
        </div>

      </div>

      <Footer />
    </>
  );
}