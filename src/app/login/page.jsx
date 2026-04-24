"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/axios";
import { setToken, setUser } from "../utils/token";
import Link from "next/link";
import toast from "react-hot-toast";
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const res = await api.post("/user/login", form);

      // ✅ store token in sessionStorage
      setToken(res.data.token);

      // ✅ store user info in sessionStorage
      setUser(res.data.user);

      const role = res.data.user.role;

      toast.success("Login successful 🎉");

      setTimeout(() => {
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      }, 1200);

    } catch (err) {
      toast.error("Invalid email or password");
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
            Welcome back
          </h2>

          <p className="text-gray-500 mb-6">
            Log in to continue your scholarship journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm">Email</label>
              <input
                name="email"
                placeholder="diini439@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="relative">
              <label className="text-sm">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${loading
                ? "bg-gray-400"
                : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            New here?{" "}
            <Link href="/register" className="font-medium text-[#0b1d3a]">
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}