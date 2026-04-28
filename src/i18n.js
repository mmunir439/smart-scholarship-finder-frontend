"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ur from "./locales/ur.json";
import so from "./locales/so.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ur: { translation: ur },
    so: { translation: so },
  },
  lng:
    typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Save selected language
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lng);

    // RTL for Urdu
    document.documentElement.dir = lng === "ur" ? "rtl" : "ltr";
  }
});

export default i18n;
