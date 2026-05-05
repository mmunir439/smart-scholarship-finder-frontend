"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../utils/axios";
import { setToken, setUser } from "../utils/token";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();

  const [loginError, setLoginError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error(t("login.error_required"));
    }

    try {
      setLoading(true);

      const res = await api.post("/user/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      setToken(res.data.token);
      setUser(res.data.user);

      toast.success("Login successful");

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      }, 800);
    } catch (err) {
      const message = err.response?.data?.message || "Invalid email or password";
      setLoginError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100">
        <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-7xl items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:grid-cols-2">
            {/* Left side */}
            <div className="hidden bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
              <div>
                <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                  {t("login.title")}
                </p>
                <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                  Welcome back to your scholarship dashboard.
                </h1>
                <p className="mt-4 max-w-md text-base text-orange-100 xl:text-lg">
                  Sign in securely to manage your account, profile, and applications with a modern experience.
                </p>
              </div>

              <div className="mt-10 space-y-3 text-sm text-orange-100">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  Clean and responsive layout
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  Secure authentication flow
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  Fast access to dashboard
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="mx-auto flex w-full max-w-md flex-col justify-center lg:max-w-xl">
                <div className="mb-8 text-center lg:text-left">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {t("login.title")}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    {t("login.subtitle")}
                  </p>
                </div>

                {loginError && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      {t("login.email")}
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder={t("login.email_placeholder")}
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:text-base"
                    />
                  </div>

                  <div className="relative">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      {t("login.password")}
                    </label>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("login.password_placeholder")}
                      value={form.password}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-10 rounded-lg px-2 py-1 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      {showPassword ? t("login.hide") : t("login.show")}
                    </button>
                  </div>

                  <div className="flex items-center justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-orange-500 hover:text-orange-600"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition sm:text-base ${loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-orange-500 hover:bg-orange-600 active:scale-[0.99]"
                      }`}
                  >
                    {loading ? t("login.loading") : t("login.button")}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    {t("login.new_here")}{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-orange-500 hover:text-orange-600"
                    >
                      {t("login.create_account")}
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}