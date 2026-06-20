"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/app/utils/axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import i18n from "@/i18n";
import { normalizeLang } from "@/lib/i18nLang";
import { useTranslation } from "react-i18next";
import {
    FiUser,
    FiLock,
    FiGlobe,
    FiBell,
    FiTrash2,
    FiSave,
    FiEye,
    FiEyeOff,
    FiBookOpen,
    FiTarget,
} from "react-icons/fi";

const PREFERENCES_KEY = "scholarshipPreferences";

const defaultPreferences = {
    studyRegion: "both",
    preferredDegree: "all",
};

function readPreferences() {
    try {
        const stored = localStorage.getItem(PREFERENCES_KEY);
        return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
    } catch {
        return defaultPreferences;
    }
}

async function fetchSettingsData() {
    let data = {};

    try {
        const res = await axios.get("/user/settings");
        data = res?.data?.data ?? res?.data ?? {};
    } catch {
        try {
            const userRes = await axios.get("/user/getCurrentUser");
            const user = userRes?.data?.user ?? userRes?.data ?? {};
            data = {
                name: user?.name ?? "",
                profilePicture: user?.profilePicture ?? "",
            };
        } catch {
            data = {};
        }
    }

    if (typeof data !== "object" || data === null) {
        data = {};
    }

    const prefs = readPreferences();

    return {
        profile: {
            name: String(data?.name ?? ""),
            profilePicture: String(data?.profilePicture ?? ""),
        },
        accessibility: {
            language: normalizeLang(data?.language ?? localStorage.getItem("lang") ?? "en"),
            textToSpeech: data?.textToSpeech ?? localStorage.getItem("textToSpeech") !== "false",
        },
        notifications: {
            emailNotifications: data?.emailNotifications ?? true,
            eligibilityAlerts: data?.eligibilityAlerts ?? true,
            deadlineReminders: data?.deadlineReminders ?? prefs.deadlineReminders ?? true,
        },
        preferences: prefs,
    };
}

function SectionCard({ icon: Icon, title, description, children }) {
    return (
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
}

const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

function applyAccessibilityPrefs(data, applyLanguage = false) {
    localStorage.setItem("textToSpeech", String(data.textToSpeech));
    if (applyLanguage) {
        const lang = normalizeLang(data.language);
        if (normalizeLang(i18n.language) !== lang) {
            i18n.changeLanguage(lang);
        }
    }
}

export default function SettingsPage() {
    const { t } = useTranslation();

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
        textToSpeech: true,
    });

    const [preferences, setPreferences] = useState(defaultPreferences);

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        eligibilityAlerts: true,
        deadlineReminders: true,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let cancelled = false;

        fetchSettingsData()
            .then((result) => {
                if (cancelled) return;

                setProfile(result.profile);
                setAccessibility(result.accessibility);
                applyAccessibilityPrefs(result.accessibility, false);
                setNotifications(result.notifications);
                setPreferences(result.preferences);
            })
            .catch(() => {
                if (!cancelled) {
                    setError("Failed to load settings");
                    setPreferences(readPreferences());
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleProfileSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const res = await axios.put("/user/settings/profile", profile);
            setMessage(res?.data?.message || t("settingsPage.profile_success"));
        } catch (err) {
            setError(err?.response?.data?.message || t("settingsPage.profile_error"));
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
            setMessage(res?.data?.message || t("settingsPage.password_success"));
            setPassword({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setError(err?.response?.data?.message || t("settingsPage.password_error"));
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
            applyAccessibilityPrefs(accessibility, true);
            setMessage(res?.data?.message || t("settingsPage.accessibility_success"));
        } catch (err) {
            applyAccessibilityPrefs(accessibility, true);
            setError(err?.response?.data?.message || t("settingsPage.accessibility_error"));
        } finally {
            setSaving(false);
        }
    };

    const handlePreferencesSave = () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            localStorage.setItem(
                PREFERENCES_KEY,
                JSON.stringify({
                    ...preferences,
                    deadlineReminders: notifications.deadlineReminders,
                }),
            );
            setMessage(t("settingsPage.preferences_success"));
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
            localStorage.setItem(
                PREFERENCES_KEY,
                JSON.stringify({
                    ...preferences,
                    deadlineReminders: notifications.deadlineReminders,
                }),
            );
            setMessage(res?.data?.message || t("settingsPage.notifications_success"));
        } catch (err) {
            localStorage.setItem(
                PREFERENCES_KEY,
                JSON.stringify({
                    ...preferences,
                    deadlineReminders: notifications.deadlineReminders,
                }),
            );
            setError(err?.response?.data?.message || t("settingsPage.notifications_error"));
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm(t("settingsPage.delete_confirm"))) return;

        try {
            setSaving(true);
            setMessage("");
            setError("");

            const res = await axios.delete("/user/settings/delete-account");
            setMessage(res?.data?.message || t("settingsPage.delete_success"));
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem(PREFERENCES_KEY);
            localStorage.removeItem("textToSpeech");
            window.location.href = "/login";
        } catch (err) {
            setError(err?.response?.data?.message || t("settingsPage.delete_error"));
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden">
                <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {t("settingsPage.title")}
                        </h1>
                        <p className="text-gray-600">{t("settingsPage.subtitle")}</p>
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
                            title={t("settingsPage.profile_title")}
                            description={t("settingsPage.profile_desc")}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("settingsPage.full_name")}
                                    </label>
                                    <input
                                        className={inputClass}
                                        value={profile.name}
                                        onChange={(e) =>
                                            setProfile((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                        placeholder={t("settingsPage.name_placeholder")}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("settingsPage.picture_url")}
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
                                        placeholder={t("settingsPage.picture_placeholder")}
                                    />
                                </div>

                                <button
                                    onClick={handleProfileSave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    {t("settingsPage.save_profile")}
                                </button>
                            </div>
                        </SectionCard>

                        <SectionCard
                            icon={FiLock}
                            title={t("settingsPage.password_title")}
                            description={t("settingsPage.password_desc")}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("settingsPage.old_password")}
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
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("settingsPage.new_password")}
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
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("settingsPage.confirm_password")}
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
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                    {showPassword
                                        ? t("settingsPage.hide_passwords")
                                        : t("settingsPage.show_passwords")}
                                </button>

                                <button
                                    onClick={handlePasswordSave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    {t("settingsPage.change_password")}
                                </button>
                            </div>
                        </SectionCard>

                        <SectionCard
                            icon={FiGlobe}
                            title={t("settingsPage.accessibility_title")}
                            description={t("settingsPage.accessibility_desc")}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("settingsPage.language")}
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
                                        <option value="en">{t("settingsPage.lang_en")}</option>
                                        <option value="ur">{t("settingsPage.lang_ur")}</option>
                                        <option value="so">{t("settingsPage.lang_so")}</option>
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
                                    {t("settingsPage.tts")}
                                </label>

                                <button
                                    onClick={handleAccessibilitySave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    {t("settingsPage.save_accessibility")}
                                </button>
                            </div>
                        </SectionCard>

                        <SectionCard
                            icon={FiTarget}
                            title={t("settingsPage.preferences_title")}
                            description={t("settingsPage.preferences_desc")}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("settingsPage.study_region")}
                                    </label>
                                    <select
                                        className={inputClass}
                                        value={preferences.studyRegion}
                                        onChange={(e) =>
                                            setPreferences((prev) => ({
                                                ...prev,
                                                studyRegion: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="both">{t("settingsPage.region_both")}</option>
                                        <option value="usa">{t("settingsPage.region_usa")}</option>
                                        <option value="europe">{t("settingsPage.region_europe")}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("settingsPage.preferred_degree")}
                                    </label>
                                    <select
                                        className={inputClass}
                                        value={preferences.preferredDegree}
                                        onChange={(e) =>
                                            setPreferences((prev) => ({
                                                ...prev,
                                                preferredDegree: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="all">{t("settingsPage.degree_all")}</option>
                                        <option value="bachelor">{t("settingsPage.degree_bachelor")}</option>
                                        <option value="master">{t("settingsPage.degree_master")}</option>
                                        <option value="phd">{t("settingsPage.degree_phd")}</option>
                                    </select>
                                </div>

                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700"
                                >
                                    <FiBookOpen size={16} />
                                    {t("settingsPage.academic_profile_link")}
                                </Link>

                                <button
                                    onClick={handlePreferencesSave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    {t("settingsPage.save_preferences")}
                                </button>
                            </div>
                        </SectionCard>

                        <SectionCard
                            icon={FiBell}
                            title={t("settingsPage.notifications_title")}
                            description={t("settingsPage.notifications_desc")}
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
                                    {t("settingsPage.email_notifications")}
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
                                    {t("settingsPage.eligibility_alerts")}
                                </label>

                                <label className="flex items-center gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={notifications.deadlineReminders}
                                        onChange={(e) =>
                                            setNotifications((prev) => ({
                                                ...prev,
                                                deadlineReminders: e.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    {t("settingsPage.deadline_reminders")}
                                </label>

                                <button
                                    onClick={handleNotificationSave}
                                    disabled={saving || loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                                >
                                    <FiSave size={16} />
                                    {t("settingsPage.save_notifications")}
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
                                    {t("settingsPage.danger_title")}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {t("settingsPage.danger_desc")}
                                </p>

                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={saving || loading}
                                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-60"
                                >
                                    <FiTrash2 size={16} />
                                    {t("settingsPage.delete_account")}
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
