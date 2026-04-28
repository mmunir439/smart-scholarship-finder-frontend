"use client";

import { useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation(); // ✅ ADD
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name) return t("register.error_name");
    if (!form.email.includes("@")) return t("register.error_email");
    if (form.password.length < 6) return t("register.error_password");
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    try {
      setLoading(true);

      await axios.post("/user/register", form);

      toast.success(t("register.success"));

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err) {
      toast.error(t("register.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold text-[#0b1d3a] mb-2">
            {t("register.title")}
          </h2>

          <p className="text-gray-500 mb-6">
            {t("register.subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm">{t("register.name")}</label>
              <input
                name="name"
                placeholder={t("register.name_placeholder")}
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm">{t("register.email")}</label>
              <input
                name="email"
                placeholder={t("register.email_placeholder")}
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm">{t("register.password")}</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("register.password_placeholder")}
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-sm text-gray-500"
              >
                {showPassword ? t("register.hide") : t("register.show")}
              </span>
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {loading ? t("register.loading") : t("register.button")}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            {t("register.have_account")}{" "}
            <Link href="/login" className="font-medium text-[#0b1d3a]">
              {t("register.login")}
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}