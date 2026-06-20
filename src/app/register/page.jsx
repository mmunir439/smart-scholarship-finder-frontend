"use client";

import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { speak } from "../utils/voiceAssistant";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { AuthPage, AuthCard, AuthHeroPanel, AuthFormPanel } from "@/components/ui/AuthShell";
import { inputClass, labelClass } from "@/lib/styles";
import { useTranslation } from "react-i18next";
import { FiVolume2 } from "react-icons/fi";

export default function Register() {
  const { t } = useTranslation();
  const router = useRouter();

  const [successfulMessage, setSuccessfulMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    speak(t("register.create_title"));
  }, [t]);

  const handleVoiceHelp = () => {
    speak(
      `${t("register.create_desc")} ${t("register.feature1")}. ${t("register.feature2")}. ${t("register.feature3")}.`
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    if (!form.name.trim()) return t("register.error_name");
    if (!form.email.includes("@")) return t("register.error_email");
    if (form.password.length < 6) return t("register.error_password");
    if (form.password !== form.confirmPassword) return t("register.error_match");
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    try {
      setLoading(true);

      const payload = {
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
      };

      const res = await axios.post("/user/register", payload);
      const message = res.data.message || t("register.success");

      setSuccessfulMessage(message);
      toast.success(message);

      setTimeout(() => router.push("/login?success=registered"), 1500);
    } catch (err) {
      const { field, message } = err.response?.data || {};

      if (field) {
        setErrors((prev) => ({
          ...prev,
          [field]: message,
        }));
      } else {
        toast.error(message || t("register.failed"));
      }
    } finally {
      setLoading(false);
    }
  };

  const isMatch = form.password === form.confirmPassword;

  return (
    <>
      <Navbar />

      <AuthPage>
          <AuthCard>
            <AuthHeroPanel className="lg:hidden">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1 text-xs font-medium backdrop-blur">
                    {t("register.title")}
                  </p>
                  <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                    {t("register.create_title")}
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={handleVoiceHelp}
                  className="inline-flex items-center justify-center rounded-full bg-white/15 p-3 text-white transition hover:bg-white/25"
                  aria-label={t("register.voice_help")}
                  title={t("register.voice_help")}
                >
                  <FiVolume2 />
                </button>
              </div>

              <p className="mt-3 text-sm text-orange-100 sm:text-base">
                {t("register.create_desc")}
              </p>
            </AuthHeroPanel>

            <AuthHeroPanel className="hidden lg:flex">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                    {t("register.title")}
                  </p>
                  <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                    {t("register.create_title")}
                  </h1>
                  <p className="mt-4 max-w-md text-base text-orange-100 xl:text-lg">
                    {t("register.create_desc")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleVoiceHelp}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-white/15 p-3 text-white transition hover:bg-white/25"
                  aria-label={t("register.voice_help")}
                  title={t("register.voice_help")}
                >
                  <FiVolume2 />
                </button>
              </div>

              <div className="mt-10 space-y-3 text-sm text-orange-100">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  {t("register.feature1")}
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  {t("register.feature2")}
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  {t("register.feature3")}
                </div>
              </div>
            </AuthHeroPanel>

            <AuthFormPanel>
              <div className="mx-auto w-full max-w-md lg:max-w-xl">
                <div className="mb-8 text-center lg:text-left">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {t("register.title")}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    {t("register.subtitle")}
                  </p>
                </div>

                {successfulMessage && (
                  <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {successfulMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {t("register.name")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t("register.name_placeholder")}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:text-base"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {t("register.email")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t("register.email_placeholder")}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:text-base"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="relative">
                      <label className={labelClass}>
                        {t("register.password")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        placeholder={t("register.password_placeholder")}
                        className={`${inputClass} pr-20`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-10 rounded-lg px-2 py-1 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                      >
                        {showPassword ? t("register.hide") : t("register.show")}
                      </button>
                      {errors.password && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div className="relative">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {t("register.confirm_password")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder={t("register.confirm_password_placeholder")}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-10 rounded-lg px-2 py-1 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                      >
                        {showConfirmPassword ? t("register.hide") : t("register.show")}
                      </button>

                      {form.confirmPassword && (
                        <p
                          className={`mt-1.5 text-xs font-medium ${
                            isMatch ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {isMatch
                            ? t("register.passwords_match")
                            : t("register.passwords_mismatch")}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" disabled={loading || !isMatch} className="w-full" size="lg">
                    {loading ? t("register.loading") : t("register.button")}
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    {t("register.have_account")}{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-orange-500 hover:text-orange-600"
                    >
                      {t("register.login")}
                    </Link>
                  </p>
                </form>
              </div>
            </AuthFormPanel>
          </AuthCard>
      </AuthPage>

      <Footer />
    </>
  );
}