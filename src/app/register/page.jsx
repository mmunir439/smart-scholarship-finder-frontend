"use client";

import { useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
export default function Register() {
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
    if (!form.name) return "Name is required";
    if (!form.email.includes("@")) return "Invalid email";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    try {
      setLoading(true);

      await axios.post("/user/register", form);

      toast.success("Account created successfully 🎉");

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       <Navbar/>
     
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-[#0b1d3a] mb-2">
          Create your account
        </h2>

        <p className="text-gray-500 mb-6">
          Start matching with scholarships in minutes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm">Full name</label>
            <input
              name="name"
              placeholder="Diini Isaq Farah"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
              }`}
          >
            {loading ? "Creating account..." : "Get started free"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#0b1d3a]">
            Log in
          </Link>
        </p>
      </div>
    </div>
      <Footer/>
    </>
  );
}