"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/axios";
import { setToken, setUser } from "../utils/token";
import Link from "next/link";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
export default function Login() {
  const { t } = useTranslation(); // ✅ ADD THIS
  const [loginError, setLoginError] = useState("");
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLoginError(""); // ✅ reset error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error(t("login.error_required"));
    }

    try {
      setLoading(true);

      const res = await api.post("/user/login", form);

      setToken(res.data.token);
      setUser(res.data.user);

      const role = res.data.user.role;

      toast.success("Login successful"); // ✅ will show

      setTimeout(() => {
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      }, 1000);

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

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold text-[#0b1d3a] mb-2">
            {t("login.title")}
          </h2>

          <p className="text-gray-500 mb-6">
            {t("login.subtitle")}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginError && (
              <p className="text-red-600 text-sm mb-4 text-center">
                {loginError}
              </p>)}
            <div>

              <label className="text-sm">{t("login.email")}</label>
              <input
                name="email"
                placeholder={t("login.email_placeholder")}
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="relative">
              <label className="text-sm">{t("login.password")}</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("login.password_placeholder")}
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-sm text-gray-500"
              >
                {showPassword ? t("login.hide") : t("login.show")}
              </span>
            </div>

            <button
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${loading
                ? "bg-gray-400"
                : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {loading ? t("login.loading") : t("login.button")}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            {t("login.new_here")}{" "}
            <Link href="/register" className="font-medium text-[#0b1d3a]">
              {t("login.create_account")}
            </Link>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}