"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "@/app/utils/axios";
import { FiUser, FiMail, FiShield, FiEdit3, FiSave } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
    const { t } = useTranslation();

    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const roleLabel = (role) => {
        const key = String(role || "student").toLowerCase();
        if (key === "admin") return t("accountProfile.role_admin");
        if (key === "student") return t("accountProfile.role_student");
        return role || t("accountProfile.role_student");
    };

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
            });
        } catch (err) {
            setError(err?.response?.data?.message || t("accountProfile.load_error"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const initials = useMemo(() => {
        const name = user?.name || t("accountProfile.default_user");
        return name
            .split(" ")
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }, [user, t]);

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const payload = {
                name: form.name,
                email: form.email,
            };

            const res = await axios.put("/user/update", payload);
            setMessage(res?.data?.message || t("accountProfile.update_success"));
            await fetchProfile();
        } catch (err) {
            setError(err?.response?.data?.message || t("accountProfile.update_error"));
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
                            {t("accountProfile.title")}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {t("accountProfile.subtitle")}
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
                                    {user?.name || t("accountProfile.default_user")}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {user?.email || "—"}
                                </p>

                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-sm">
                                    <FiShield />
                                    <span>{roleLabel(user?.role)}</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                    <span className="text-sm text-gray-600">{t("accountProfile.user_id")}</span>
                                    <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                                        {user?.id || user?._id || "-"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                    <span className="text-sm text-gray-600">{t("accountProfile.role")}</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {roleLabel(user?.role)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                    <span className="text-sm text-gray-600">{t("accountProfile.status")}</span>
                                    <span className="text-sm font-medium text-green-600">
                                        {t("accountProfile.active")}
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
                                        {t("accountProfile.edit_title")}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {t("accountProfile.edit_subtitle")}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("accountProfile.full_name")}
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm((prev) => ({ ...prev, name: e.target.value }))
                                            }
                                            className="w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                            placeholder={t("accountProfile.name_placeholder")}
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("accountProfile.email")}
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            value={form.email}
                                            onChange={(e) =>
                                                setForm((prev) => ({ ...prev, email: e.target.value }))
                                            }
                                            className="w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                            placeholder={t("accountProfile.email_placeholder")}
                                        />
                                    </div>
                                </div>

                                <p className="md:col-span-2 text-sm text-gray-600">
                                    {t("accountProfile.password_hint")}{" "}
                                    <Link
                                        href="/settings"
                                        className="font-medium text-orange-500 hover:text-orange-600"
                                    >
                                        {t("navbar.settings")}
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    {saving ? t("accountProfile.saving") : t("accountProfile.save")}
                                </button>

                                <button
                                    type="button"
                                    onClick={fetchProfile}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-700 text-sm font-medium hover:bg-gray-50"
                                >
                                    {t("accountProfile.refresh")}
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

