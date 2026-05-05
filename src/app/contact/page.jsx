"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import axios from "@/app/utils/axios";
import toast from "react-hot-toast";

export default function ContactPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subjects = [
    t("contact.subject1"),
    t("contact.subject2"),
    t("contact.subject3"),
    t("contact.subject4"),
  ];

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";
    if (form.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post("/contact", form);
      toast.success(res.data?.message || "Message sent successfully");
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50">
        {/* HERO */}
        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold text-orange-700 sm:text-sm">
                {t("contact.title")}
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {t("contact.subtitle")}
              </h1>
              <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base lg:text-lg">
                Send a message, ask a question, or request support. We’ll reply as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MAIN */}
        <main className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-5 lg:px-8">
          {/* FORM */}
          <section className="lg:col-span-3">
            <div className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-black/5 sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    {t("contact.send")}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Fill out the form below and we’ll get back to you.
                  </p>
                </div>
              </div>

              {success ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-700">
                  {t("contact.success")}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        {t("contact.name")}
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                        placeholder={t("contact.name")}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        {t("contact.email")}
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                        placeholder={t("contact.email")}
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      {t("contact.subject")}
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    >
                      {subjects.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      {t("contact.message")}
                    </label>
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      placeholder={t("contact.message")}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-400 sm:text-base"
                  >
                    {loading ? t("contact.sending") : t("contact.send")}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className="space-y-5 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl bg-[#0B1437] p-5 text-white shadow-lg">
                <p className="text-sm font-medium text-orange-300">📧 {t("contact.email_info")}</p>
              </div>
              <div className="rounded-2xl bg-[#0B1437] p-5 text-white shadow-lg">
                <p className="text-sm font-medium text-orange-300">🏛️ {t("contact.location")}</p>
              </div>
              <div className="rounded-2xl bg-[#0B1437] p-5 text-white shadow-lg">
                <p className="text-sm font-medium text-orange-300">⏰ {t("contact.time")}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-black/5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">FAQ</h3>
              <div className="mt-4 space-y-3">
                <details className="rounded-xl border border-slate-200 p-4">
                  <summary className="cursor-pointer font-medium text-slate-800">{t("contact.faq1_q")}</summary>
                  <p className="mt-2 text-sm text-slate-600">{t("contact.faq1_a")}</p>
                </details>
                <details className="rounded-xl border border-slate-200 p-4">
                  <summary className="cursor-pointer font-medium text-slate-800">{t("contact.faq2_q")}</summary>
                  <p className="mt-2 text-sm text-slate-600">{t("contact.faq2_a")}</p>
                </details>
                <details className="rounded-xl border border-slate-200 p-4">
                  <summary className="cursor-pointer font-medium text-slate-800">{t("contact.faq3_q")}</summary>
                  <p className="mt-2 text-sm text-slate-600">{t("contact.faq3_a")}</p>
                </details>
              </div>
            </div>
          </aside>
        </main>

        {/* MAP */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl bg-[#0B1437] p-6 text-center text-white shadow-xl sm:p-10">
              <p className="text-sm text-orange-300 sm:text-base">📍 {t("contact.map")}</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}