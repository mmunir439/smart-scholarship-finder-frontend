"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES, normalizeLang } from "@/lib/i18nLang";

export default function LanguageSwitcher({ className = "" }) {
  const { i18n: i18nInstance } = useTranslation();
  const [lang, setLang] = useState(() => normalizeLang(i18nInstance.language));

  useEffect(() => {
    setLang(normalizeLang(i18nInstance.language));
    const onChange = (lng) => setLang(normalizeLang(lng));
    i18nInstance.on("languageChanged", onChange);
    return () => i18nInstance.off("languageChanged", onChange);
  }, [i18nInstance]);

  const handleChange = (e) => {
    const next = e.target.value;
    i18nInstance.changeLanguage(next);
    setLang(next);
  };

  return (
    <select
      value={lang}
      onChange={handleChange}
      aria-label="Select language"
      className={`cursor-pointer rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm outline-none transition hover:border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${className}`}
    >
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
