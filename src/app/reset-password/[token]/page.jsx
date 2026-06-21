"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/utils/axios";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { AuthPage, AuthCard, AuthHeroPanel, AuthFormPanel } from "@/components/ui/AuthShell";
import { inputClass, labelClass } from "@/lib/styles";
import { validateResetPassword } from "@/lib/validatePassword";
import { useTranslation } from "react-i18next";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const token = typeof params?.token === "string" ? params.token : "";

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [tokenValid, setTokenValid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isMatch =
    form.newPassword === form.confirmPassword && form.confirmPassword.length > 0;

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      return;
    }

    let cancelled = false;

    api
      .get(`/user/reset-password/${encodeURIComponent(token)}`)
      .then(() => {
        if (!cancelled) setTokenValid(true);
      })
      .catch((err) => {
        if (!cancelled) {
          setTokenValid(false);
          setError(err?.response?.data?.message || "Invalid or expired reset link.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateResetPassword(form, t);
    if (validationError) {
      setError(validationError);
      return toast.error(validationError);
    }

    try {
      setLoading(true);

      const res = await api.post(`/user/reset-password/${encodeURIComponent(token)}`, {
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      toast.success(res?.data?.message || t("resetPassword.success"));
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      const message = err?.response?.data?.message || t("resetPassword.error");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (!token || tokenValid === false) {
      return (
        <div className="mx-auto w-full max-w-md lg:max-w-xl">
          <h2 className="text-2xl font-bold text-gray-900">{t("resetPassword.title")}</h2>
          <p className="mt-2 text-sm text-red-600">
            {error || t("resetPassword.invalid_token")}
          </p>
          <Link
            href="/forgot-password"
            className="mt-6 inline-flex rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            {t("resetPassword.request_new")}
          </Link>
        </div>
      );
    }

    if (tokenValid === null) {
      return (
        <div className="mx-auto w-full max-w-md py-12 text-center text-gray-500 lg:max-w-xl">
          {t("resetPassword.validating")}
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-md lg:max-w-xl">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {t("resetPassword.title")}
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">{t("resetPassword.subtitle")}</p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className={labelClass}>{t("resetPassword.new_password")}</label>
            <div className="relative">
              <input
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={form.newPassword}
                onChange={handleChange}
                placeholder={t("resetPassword.password_placeholder")}
                className={`${inputClass} pr-20`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? t("login.hide") : t("login.show")}
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>{t("resetPassword.confirm_password")}</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder={t("resetPassword.confirm_placeholder")}
                className={`${inputClass} pr-20`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? t("login.hide") : t("login.show")}
              </button>
            </div>
            {form.confirmPassword && (
              <p className={`mt-1.5 text-xs ${isMatch ? "text-green-600" : "text-red-500"}`}>
                {isMatch ? t("register.passwords_match") : t("register.passwords_mismatch")}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? t("resetPassword.loading") : t("resetPassword.button")}
          </Button>

          <p className="text-center text-sm text-gray-600">
            <Link href="/login" className="font-semibold text-orange-500 hover:text-orange-600">
              {t("resetPassword.back_login")}
            </Link>
          </p>
        </form>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <AuthPage>
        <AuthCard>
          <AuthHeroPanel className="hidden lg:flex">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                {t("resetPassword.badge")}
              </p>
              <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                {t("resetPassword.hero_title")}
              </h1>
              <p className="mt-4 max-w-md text-base text-blue-100 xl:text-lg">
                {t("resetPassword.hero_desc")}
              </p>
            </div>
          </AuthHeroPanel>

          <AuthFormPanel>{renderContent()}</AuthFormPanel>
        </AuthCard>
      </AuthPage>
      <Footer />
    </>
  );
}
