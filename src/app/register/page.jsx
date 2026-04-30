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
  const [successfulMessage, setSuccessfulMessage] = useState();
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


    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));


  };

  const validate = () => {
    if (!form.name) return "Name is required";
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

      const res = await axios.post("/user/register", form);
      setSuccessfulMessage(res.data.message);
      console.log(res.data)
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
    <> <Navbar />


      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-2xl shadow-lg">

          {/* Title & subtitle stay the same */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {successfulMessage && (
              <p className="text-green-600 text-sm">{successfulMessage}</p>
            )}

            {/* 2-column grid for inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Name */}
              <div>
                <label className="text-sm">
                  {t("register.name")} <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("register.name_placeholder")}
                  className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm">
                  {t("register.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("register.email_placeholder")}
                  className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="text-sm">
                  {t("register.password")} <span className="text-red-500">*</span>
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder={t("register.password_placeholder")}
                  className="w-full mt-1 p-3 border rounded-lg bg-gray-50 pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="text-sm">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full mt-1 p-3 border rounded-lg bg-gray-50 pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-8 text-sm text-gray-500"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
                {form.confirmPassword && (
                  <p className={`text-xs mt-1 ${isMatch ? "text-green-500" : "text-red-500"}`}>
                    {isMatch ? "Passwords match" : "Passwords do not match"}
                  </p>
                )}
              </div>

            </div>{/* end grid */}

            {/* Submit — full width, outside grid */}
            <button
              disabled={loading || !isMatch}
              className={`w-full py-3 rounded-lg font-semibold text-white mt-2 ${loading || !isMatch
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {loading ? "Loading..." : t("register.button")}
            </button>

          </form>
        </div>
      </div>
      <Footer />
    </>


  );
}
