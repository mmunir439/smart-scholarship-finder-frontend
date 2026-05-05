"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "@/app/utils/axios";
import { FiUser, FiMail, FiShield, FiEdit3, FiSave, FiLock } from "react-icons/fi";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await axios.get("/user/getCurrentUser");
            const data = res?.data?.user ?? res?.data ?? null;

            setUser(data);
            setForm({
                name: data?.name || "",
                email: data?.email || "",
                password: "",
            });
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const initials = useMemo(() => {
        const name = user?.name || "User";
        return name
            .split(" ")
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }, [user]);

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const payload = {
                name: form.name,
                email: form.email,
            };

            if (form.password.trim()) {
                payload.password = form.password;
            }

            const res = await axios.put("/user/update", payload);
            setMessage(res?.data?.message || "Profile updated successfully");
            setForm((prev) => ({ ...prev, password: "" }));
            await fetchProfile();
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="w-full min-h-screen bg-gray-50">
                <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            My Profile
                        </h1>
                        <p className="text-gray-600 mt-1">
                            View and update your account information.
                        </p>
                    </div>

                    {message && (
                        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 text-sm">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
                                    {loading ? "..." : initials}
                                </div>

                                <h2 className="text-xl font-semibold text-gray-900">
                                    {user?.name || "User"}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {user?.email || "no-email@example.com"}
                                </p>

                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-sm">
                                    <FiShield />
                                    <span className="capitalize">{user?.role || "student"}</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                    <span className="text-sm text-gray-600">User ID</span>
                                    <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                                        {user?.id || user?._id || "-"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                    <span className="text-sm text-gray-600">Role</span>
                                    <span className="text-sm font-medium text-gray-900 capitalize">
                                        {user?.role || "student"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                    <span className="text-sm text-gray-600">Status</span>
                                    <span className="text-sm font-medium text-green-600">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Edit Form */}
                        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-orange-50 text-orange-500">
                                    <FiEdit3 size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Edit Profile
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Update your name, email, and password.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm((prev) => ({ ...prev, name: e.target.value }))
                                            }
                                            className="w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            value={form.email}
                                            onChange={(e) =>
                                                setForm((prev) => ({ ...prev, email: e.target.value }))
                                            }
                                            className="w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="password"
                                            value={form.password}
                                            onChange={(e) =>
                                                setForm((prev) => ({ ...prev, password: e.target.value }))
                                            }
                                            className="w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                            placeholder="Leave blank to keep current password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>

                                <button
                                    type="button"
                                    onClick={fetchProfile}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-700 text-sm font-medium hover:bg-gray-50"
                                >
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}