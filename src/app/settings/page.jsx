"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/app/utils/axios";
import toast from "react-hot-toast";
import { validatePasswordChange } from "@/lib/validatePassword";
import {
    parseNotificationsFromSettings,
    updateNotificationSettings,
} from "@/lib/notificationsApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useScholarshipPreferences } from "@/hooks/useScholarshipPreferences";
import { BACKEND_LANGUAGES } from "@/lib/accessibilityLang";
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

const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

async function fetchSettingsData() {
    let data = {};

    try {
        const res = await axios.get("/user/settings");
        data = res?.data ?? {};
    } catch {
        try {
            const userRes = await axios.get("/user/getCurrentUser");
            const user = userRes?.data?.user ?? userRes?.data ?? {};
            data = {
                name: user?.name ?? "",
            };
        } catch {
            data = {};
        }
    }

    if (typeof data !== "object" || data === null) {
        data = {};
    }

    const notifications = parseNotificationsFromSettings(data);

    return {
        profile: {
            name: String(data?.data?.name ?? data?.name ?? ""),
        },
        notifications,
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

export default function SettingsPage() {
    const { t } = useTranslation();
    const { accessibility, updateAndSync, syncing: accessibilitySyncing, loaded: accessibilityLoaded } =
        useAccessibility();
    const {
        preferences,
        setPreferences,
        saveGuidance,
        syncing: preferencesSyncing,
    } = useScholarshipPreferences();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [profile, setProfile] = useState({
        name: "",
    });

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        eligibilityAlerts: true,
        deadlineReminders: true,
    });

    const [showPassword, setShowPassword] = useState(false);

    const passwordsMatch =
        password.newPassword === password.confirmPassword &&
        password.confirmPassword.length > 0;

    useEffect(() => {
        let cancelled = false;

        fetchSettingsData()
            .then((result) => {
                if (cancelled) return;

                setProfile(result.profile);
                setNotifications(result.notifications);
            })
            .catch(() => {
                if (!cancelled) {
                    setError("Failed to load settings");
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
        setMessage("");
        setError("");

        const validationError = validatePasswordChange({ ...password, t });
        if (validationError) {
            setError(validationError);
            toast.error(validationError);
            return;
        }

        try {
            setSaving(true);

            const res = await axios.put("/user/settings/change-password", {
                oldPassword: password.oldPassword,
                newPassword: password.newPassword,
                confirmPassword: password.confirmPassword,
            });
            const successMsg = res?.data?.message || t("settingsPage.password_success");
            setMessage(successMsg);
            toast.success(successMsg);
            setPassword({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            const errMsg = err?.response?.data?.message || t("settingsPage.password_error");
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setSaving(false);
        }
    };

    const handleAccessibilityLanguageChange = async (language) => {
        setMessage("");
        setError("");
        try {
            await updateAndSync({
                language,
                textToSpeech: accessibility.textToSpeech,
            });
            setMessage(t("settingsPage.accessibility_success"));
            toast.success(t("settingsPage.accessibility_success"));
        } catch (err) {
            const errMsg = err?.response?.data?.message || t("settingsPage.accessibility_error");
            setError(errMsg);
            toast.error(errMsg);
        }
    };

    const handleAccessibilityTTSChange = async (textToSpeech) => {
        setMessage("");
        setError("");
        try {
            await updateAndSync({
                language: accessibility.language,
                textToSpeech,
            });
            setMessage(t("settingsPage.accessibility_success"));
            toast.success(t("settingsPage.accessibility_success"));
        } catch (err) {
            const errMsg = err?.response?.data?.message || t("settingsPage.accessibility_error");
            setError(errMsg);
            toast.error(errMsg);
        }
    };

    const handlePreferencesSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            await saveGuidance(preferences);
            setMessage(t("settingsPage.preferences_success"));
            toast.success(t("settingsPage.preferences_success"));
        } catch (err) {
            const errMsg =
                err?.response?.data?.message || "Failed to save scholarship preferences";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setSaving(false);
        }
    };

    const handleStudyRegionChange = (studyRegion) => {
        setPreferences((prev) => ({ ...prev, studyRegion }));
    };

    const handlePreferredDegreeChange = (preferredDegree) => {
        setPreferences((prev) => ({ ...prev, preferredDegree }));
    };

    const handleNotificationSave = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const res = await updateNotificationSettings(notifications);
            const successMsg = res?.message || t("settingsPage.notifications_success");
            setMessage(successMsg);
            toast.success(successMsg);
        } catch (err) {
            const errMsg =
                err?.response?.data?.message || t("settingsPage.notifications_error");
            setError(errMsg);
            toast.error(errMsg);
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

                                <button
                                    onClick={handleProfileSave}
                                    disabled={saving || loading}
                                    className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60"
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

                                {password.confirmPassword && (
                                    <p
                                        className={`text-xs ${passwordsMatch ? "text-green-600" : "text-red-500"}`}
                                    >
                                        {passwordsMatch
                                            ? t("register.passwords_match")
                                            : t("register.passwords_mismatch")}
                                    </p>
                                )}

                                <div className="flex items-center justify-between gap-3">
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
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm font-medium text-orange-500 hover:text-orange-600"
                                    >
                                        {t("login.forgot_password")}
                                    </Link>
                                </div>

                                <button
                                    onClick={handlePasswordSave}
                                    disabled={saving || loading}
                                    className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60"
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
                                        disabled={loading || accessibilitySyncing || !accessibilityLoaded}
                                        onChange={(e) =>
                                            handleAccessibilityLanguageChange(e.target.value)
                                        }
                                    >
                                        {BACKEND_LANGUAGES.map(({ value, label }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <label className="flex items-center gap-3 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={accessibility.textToSpeech}
                                        disabled={loading || accessibilitySyncing || !accessibilityLoaded}
                                        onChange={(e) =>
                                            handleAccessibilityTTSChange(e.target.checked)
                                        }
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    {t("settingsPage.tts")}
                                </label>

                                {accessibilitySyncing && (
                                    <p className="text-xs text-gray-500">
                                        {t("settingsPage.accessibility_saving")}
                                    </p>
                                )}
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
                                        onChange={(e) => handleStudyRegionChange(e.target.value)}
                                    >
                                        <option value="USA & Europe">{t("settingsPage.region_both")}</option>
                                        <option value="USA only">{t("settingsPage.region_usa")}</option>
                                        <option value="Europe only">{t("settingsPage.region_europe")}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("settingsPage.preferred_degree")}
                                    </label>
                                    <select
                                        className={inputClass}
                                        value={preferences.preferredDegree}
                                        onChange={(e) => handlePreferredDegreeChange(e.target.value)}
                                    >
                                        <option value="All">{t("settingsPage.degree_all")}</option>
                                        <option value="Bachelor">{t("settingsPage.degree_bachelor")}</option>
                                        <option value="Master">{t("settingsPage.degree_master")}</option>
                                        <option value="PhD">{t("settingsPage.degree_phd")}</option>
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
                                    disabled={saving || loading || preferencesSyncing}
                                    className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60"
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
                                    className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60"
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
