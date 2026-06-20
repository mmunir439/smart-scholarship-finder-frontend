import { normalizeLang } from "@/lib/i18nLang";

/** Backend enum ↔ i18n codes for accessibility (English | Urdu | Somali) */

export const BACKEND_LANGUAGES = [
  { value: "English", i18n: "en", label: "English" },
  { value: "Urdu", i18n: "ur", label: "اردو" },
  { value: "Somali", i18n: "so", label: "Soomaali" },
];

const I18N_BY_BACKEND = {
  English: "en",
  Urdu: "ur",
  Somali: "so",
};

const BACKEND_BY_I18N = {
  en: "English",
  ur: "Urdu",
  so: "Somali",
};

export function normalizeBackendLanguage(language) {
  if (language === "Urdu" || language === "Somali") return language;
  return "English";
}

export function backendLanguageToI18n(language) {
  return I18N_BY_BACKEND[normalizeBackendLanguage(language)] ?? "en";
}

export function i18nToBackendLanguage(code) {
  const normalized = normalizeLang(code);
  return BACKEND_BY_I18N[normalized] ?? "English";
}

export function getSpeechLangTag(backendLanguage) {
  switch (normalizeBackendLanguage(backendLanguage)) {
    case "Urdu":
      return "ur-PK";
    case "Somali":
      return "so-SO";
    default:
      return "en-US";
  }
}
