"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ur from "./locales/ur.json";
import so from "./locales/so.json";
import { normalizeLang, langToDir } from "./lib/i18nLang";

const savedLang =
  typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en";
const initialLang = normalizeLang(savedLang);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ur: { translation: ur },
    so: { translation: so },
  },
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function applyDocumentLanguage(lng) {
  if (typeof window === "undefined") return;
  const code = normalizeLang(lng);
  localStorage.setItem("lang", code);
  document.documentElement.lang = code;
  document.documentElement.dir = langToDir(code);
}

i18n.on("languageChanged", applyDocumentLanguage);

if (typeof window !== "undefined") {
  applyDocumentLanguage(initialLang);
}

export default i18n;
