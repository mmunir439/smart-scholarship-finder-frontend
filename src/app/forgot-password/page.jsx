"use client";

import { useState } from "react";
import Link from "next/link";
import api from "../utils/axios";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { AuthPage, AuthCard, AuthHeroPanel, AuthFormPanel } from "@/components/ui/AuthShell";
import { inputClass, labelClass } from "@/lib/styles";
import { validateEmail } from "@/lib/validatePassword";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateEmail(email, t);
    if (validationError) {
      setError(validationError);
      return toast.error(validationError);
    }

    try {
      setLoading(true);

      const res = await api.post("/user/forgot-password", {
        email: email.trim().toLowerCase(),
      });

      setSent(true);
      toast.success(res?.data?.message || t("forgotPassword.success"));
    } catch (err) {
      const message = err?.response?.data?.message || t("forgotPassword.error");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <AuthPage>
        <AuthCard>
          <AuthHeroPanel className="hidden lg:flex">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                {t("forgotPassword.badge")}
              </p>
              <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                {t("forgotPassword.hero_title")}
              </h1>
              <p className="mt-4 max-w-md text-base text-orange-100 xl:text-lg">
                {t("forgotPassword.hero_desc")}
              </p>
            </div>
          </AuthHeroPanel>

          <AuthFormPanel>
            <div className="mx-auto w-full max-w-md lg:max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {t("forgotPassword.title")}
              </h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                {sent ? t("forgotPassword.sent_desc") : t("forgotPassword.subtitle")}
              </p>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {sent ? (
                <div className="mt-8 space-y-6">
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {t("forgotPassword.check_inbox", { email: email.trim().toLowerCase() })}
                  </div>
                  <Link
                    href="/login"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    {t("forgotPassword.back_login")}
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label className={labelClass}>{t("forgotPassword.email")}</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder={t("forgotPassword.email_placeholder")}
                      className={inputClass}
                      autoComplete="email"
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full" size="lg">
                    {loading ? t("forgotPassword.sending") : t("forgotPassword.button")}
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    {t("forgotPassword.remember")}{" "}
                    <Link href="/login" className="font-semibold text-orange-500 hover:text-orange-600">
                      {t("forgotPassword.sign_in")}
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </AuthFormPanel>
        </AuthCard>
      </AuthPage>
      <Footer />
    </>
  );
}
