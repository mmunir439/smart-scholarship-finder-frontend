"use client";

import { useEffect, useState } from "react";
import axios from "@/app/utils/axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import {
    FiUser,
    FiLock,
    FiGlobe,
    FiBell,
    FiTrash2,
    FiSave,
    FiEye,
    FiEyeOff,
} from "react-icons/fi";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [profile, setProfile] = useState({
        name: "",
        profilePicture: "",
    });

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [accessibility, setAccessibility] = useState({
        language: "en",
        textToSpeech: false,
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        eligibilityAlerts: true,
    });

    const [showPassword, setShowPassword] = useState(false);

    const getSettings = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await axios.get("/user/settings");
            const data = res?.data?.data ?? {};

            setProfile({
                name: data?.name ?? "",
                profilePicture: data?.profilePicture ?? "",
            });

            setAccessibility({
                language: data?.language ?? "en",
                textToSpeech: Boolean(data?.textToSpeech),
            });

            setNotifications({
                emailNotifications: Boolean(data?.emailNotifications),
                eligibilityAlerts: Boolean(data?.eligibilityAlerts),
            });
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSettings();
    }, []);

    const handleProfileSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const res = await axios.put("/user/settings/profile", profile);
            setMessage(res?.data?.message || "Profile updated successfully");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const res = await axios.put("/user/settings/change-password", password);
            setMessage(res?.data?.message || "Password changed successfully");
            setPassword({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to change password");
        } finally {
            setSaving(false);
        }
    };

    const handleAccessibilitySave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const res = await axios.put("/user/settings/accessibility", accessibility);
            setMessage(res?.data?.message || "Accessibility updated successfully");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update accessibility");
        } finally {
            setSaving(false);
        }
    };

    const handleNotificationSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const res = await axios.put("/user/settings/notifications", notifications);
            setMessage(res?.data?.message || "Notifications updated successfully");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update notifications");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this account? This action cannot be undone."
        );
        if (!confirmDelete) return;

        try {
            setSaving(true);
            setMessage("");
            setError("");

            const res = await axios.delete("/user/settings/delete-account");
            setMessage(res?.data?.message || "Account deleted successfully");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to delete account");
        } finally {
            setSaving(false);
        }
    };

    const SectionCard = ({ icon: Icon, title, description, children }) => (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-5">
                <div className="p-3 rounded-xl bg-orange-50 text-orange-500">
                    <Icon size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
            </div>
            {children}
        </div>
    );

    const inputClass =
        "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

    return (
        <>
            <Navbar />

            <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden">
                <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Settings
                        </h1>
                        <p className="text-gray-600">
                            Manage profile, password, accessibility, and notifications.
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SectionCard
                            icon={FiUser}
                            title="Profile Settings"
                            description="Update your name and profile picture."
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        className={inputClass}
                                        value={profile.name}
                                        onChange={(e) =>
                                            setProfile((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Profile Picture URL
                                    </label>
                                    <input
                                        className={inputClass}
                                        value={profile.profilePicture}
                                        onChange={(e) =>
                                            setProfile((prev) => ({
                                                ...prev,
                                                profilePicture: e.target.value,
                                            }))
                                        }
                                        placeholder="https://..."
                                    />
                                </div>

                                <button
                                    onClick={handleProfileSave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    Save Profile
                                </button>
                            </div>
                        </SectionCard>

                        <SectionCard
                            icon={FiLock}
                            title="Change Password"
                            description="Use a strong password to protect your account."
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Old Password
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={inputClass}
                                        value={password.oldPassword}
                                        onChange={(e) =>
                                            setPassword((prev) => ({
                                                ...prev,
                                                oldPassword: e.target.value,
                                            }))
                                        }
                                        placeholder="Old password"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={inputClass}
                                        value={password.newPassword}
                                        onChange={(e) =>
                                            setPassword((prev) => ({
                                                ...prev,
                                                newPassword: e.target.value,
                                            }))
                                        }
                                        placeholder="New password"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={inputClass}
                                        value={password.confirmPassword}
                                        onChange={(e) =>
                                            setPassword((prev) => ({
                                                ...prev,
                                                confirmPassword: e.target.value,
                                            }))
                                        }
                                        placeholder="Confirm password"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                    {showPassword ? "Hide Passwords" : "Show Passwords"}
                                </button>

                                <button
                                    onClick={handlePasswordSave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    Change Password
                                </button>
                            </div>
                        </SectionCard>

                        <SectionCard
                            icon={FiGlobe}
                            title="Accessibility"
                            description="Set language and text-to-speech preferences."
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Language
                                    </label>
                                    <select
                                        className={inputClass}
                                        value={accessibility.language}
                                        onChange={(e) =>
                                            setAccessibility((prev) => ({
                                                ...prev,
                                                language: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="en">English</option>
                                        <option value="ur">Urdu</option>
                                        <option value="es">Spanish</option>
                                    </select>
                                </div>

                                <label className="flex items-center gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={accessibility.textToSpeech}
                                        onChange={(e) =>
                                            setAccessibility((prev) => ({
                                                ...prev,
                                                textToSpeech: e.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    Enable text-to-speech
                                </label>

                                <button
                                    onClick={handleAccessibilitySave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    Save Accessibility
                                </button>
                            </div>
                        </SectionCard>

                        <SectionCard
                            icon={FiBell}
                            title="Notifications"
                            description="Control email alerts and eligibility notifications."
                        >
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={notifications.emailNotifications}
                                        onChange={(e) =>
                                            setNotifications((prev) => ({
                                                ...prev,
                                                emailNotifications: e.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    Email notifications
                                </label>

                                <label className="flex items-center gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={notifications.eligibilityAlerts}
                                        onChange={(e) =>
                                            setNotifications((prev) => ({
                                                ...prev,
                                                eligibilityAlerts: e.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    Eligibility alerts
                                </label>

                                <button
                                    onClick={handleNotificationSave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    Save Notifications
                                </button>
                            </div>
                        </SectionCard>
                    </div>

                    <div className="bg-white border border-red-200 rounded-2xl shadow-sm p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                            <div className="p-3 rounded-xl bg-red-50 text-red-500">
                                <FiTrash2 size={20} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Danger Zone
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Permanently delete your account and all related data.
                                </p>

                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={saving || loading}
                                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-60"
                                >
                                    <FiTrash2 size={16} />
                                    Delete Account
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