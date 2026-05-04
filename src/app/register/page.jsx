"use client";

import { useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

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
    if (!form.name.trim()) return "Name is required";
    if (!form.email.includes("@")) return "Valid email required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
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
      setSuccessfulMessage(res.data.message);
      toast.success(res.data.message);

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

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100">
        <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-7xl items-center px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:grid-cols-2">
            {/* Top info for mobile */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white lg:hidden">
              <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1 text-xs font-medium backdrop-blur">
                {t("register.title")}
              </p>
              <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                Create your account in a clean, simple step.
              </h1>
              <p className="mt-3 text-sm text-orange-100 sm:text-base">
                Join the smart scholarship guiding platform and start managing your profile with a secure and modern registration flow.
              </p>
            </div>

            {/* Left side */}
            <div className="hidden bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
              <div>
                <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                  {t("register.title")}
                </p>
                <h1 className="max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
                  Create your account in a clean, simple step.
                </h1>
                <p className="mt-4 max-w-md text-base text-orange-100 xl:text-lg">
                  Join the smart scholarship guiding platform and start managing your profile with a secure and modern registration flow.
                </p>
              </div>

              <div className="mt-10 space-y-3 text-sm text-orange-100">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  Fast and responsive sign up
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  Secure password validation
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  Smooth login redirect
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="mx-auto w-full max-w-md lg:max-w-xl">
                <div className="mb-8 text-center lg:text-left">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {t("register.title")}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    Fill in your details to create an account.
                  </p>
                </div>

                {successfulMessage && (
                  <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {successfulMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Name */}
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
                      {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Email */}
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
                      {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {t("register.password")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        placeholder={t("register.password_placeholder")}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-10 rounded-lg px-2 py-1 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                      {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-10 rounded-lg px-2 py-1 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>

                      {form.confirmPassword && (
                        <p className={`mt-1.5 text-xs font-medium ${isMatch ? "text-green-600" : "text-red-500"}`}>
                          {isMatch ? "Passwords match" : "Passwords do not match"}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    disabled={loading || !isMatch}
                    className={`flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition sm:text-base ${
                      loading || !isMatch
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-orange-500 hover:bg-orange-600 active:scale-[0.99]"
                    }`}
                  >
                    {loading ? "Loading..." : t("register.button")}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-orange-500 hover:text-orange-600">
                      Login
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