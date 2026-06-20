import api from "@/app/utils/axios";
import { getToken } from "@/app/utils/token";
import i18n from "@/i18n";
import { normalizeLang } from "@/lib/i18nLang";
import {
  backendLanguageToI18n,
  i18nToBackendLanguage,
  normalizeBackendLanguage,
} from "@/lib/accessibilityLang";
import {
  GUEST_ACCESSIBILITY,
  setAccessibilityState,
} from "@/lib/accessibilityState";

export { GUEST_ACCESSIBILITY };

export async function fetchSettings() {
  const res = await api.get("/user/settings");
  return res?.data?.data ?? res?.data ?? {};
}

export async function updateAccessibility({ language, textToSpeech }) {
  const payload = {
    language: normalizeBackendLanguage(language),
    textToSpeech: Boolean(textToSpeech),
  };
  const res = await api.put("/user/settings/accessibility", payload);
  return res?.data;
}

export function parseAccessibilityFromSettings(data) {
  return {
    language: normalizeBackendLanguage(data?.language),
    textToSpeech: Boolean(data?.textToSpeech),
  };
}

export function applyAccessibilityLocally({ language, textToSpeech }) {
  setAccessibilityState({ language, textToSpeech });
  const i18nCode = backendLanguageToI18n(language);
  if (normalizeLang(i18n.language) !== i18nCode) {
    i18n.changeLanguage(i18nCode);
  }
}

export async function loadAndApplyAccessibilitySettings() {
  if (!getToken()) return null;

  try {
    const data = await fetchSettings();
    const prefs = parseAccessibilityFromSettings(data);
    applyAccessibilityLocally(prefs);
    return prefs;
  } catch {
    return null;
  }
}

export function applyGuestAccessibilityDefaults() {
  applyAccessibilityLocally(GUEST_ACCESSIBILITY);
}

export function i18nCodeToBackendLanguage(code) {
  return i18nToBackendLanguage(code);
}
