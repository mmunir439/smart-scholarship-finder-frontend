"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { LANGUAGES, normalizeLang } from "@/lib/i18nLang";
import { backendLanguageToI18n } from "@/lib/accessibilityLang";
import { i18nCodeToBackendLanguage } from "@/lib/accessibilityApi";
import { useAccessibility } from "@/context/AccessibilityContext";

export default function LanguageSwitcher({ className = "" }) {
  const { i18n: i18nInstance, t } = useTranslation();
  const { accessibility, updateAndSync, syncing } = useAccessibility();
  const [lang, setLang] = useState(() => normalizeLang(i18nInstance.language));

  useEffect(() => {
    setLang(normalizeLang(i18nInstance.language));
    const onChange = (lng) => setLang(normalizeLang(lng));
    i18nInstance.on("languageChanged", onChange);
    return () => i18nInstance.off("languageChanged", onChange);
  }, [i18nInstance]);

  useEffect(() => {
    setLang(normalizeLang(backendLanguageToI18n(accessibility.language)));
  }, [accessibility.language]);

  const handleChange = async (e) => {
    const nextCode = e.target.value;
    const previousCode = lang;
    setLang(nextCode);

    try {
      await updateAndSync({
        language: i18nCodeToBackendLanguage(nextCode),
        textToSpeech: accessibility.textToSpeech,
      });
    } catch (err) {
      setLang(previousCode);
      toast.error(
        err?.response?.data?.message || t("settingsPage.accessibility_error"),
      );
    }
  };

  return (
    <select
      value={lang}
      onChange={handleChange}
      disabled={syncing}
      aria-label="Select language"
      className={`input-edu cursor-pointer px-2.5 py-1.5 text-sm font-medium disabled:opacity-60 ${className}`}
    >
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
