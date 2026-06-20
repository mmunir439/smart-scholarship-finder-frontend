import { getSpeechLangTag, normalizeBackendLanguage } from "./accessibilityLang";

export const GUEST_ACCESSIBILITY = {
  language: "English",
  textToSpeech: false,
};

let state = { ...GUEST_ACCESSIBILITY };

export function setAccessibilityState({ language, textToSpeech }) {
  state = {
    language: normalizeBackendLanguage(language),
    textToSpeech: Boolean(textToSpeech),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("textToSpeech", String(state.textToSpeech));
  }
}

export function getAccessibilityState() {
  return { ...state };
}

export function isTTSEnabled() {
  return state.textToSpeech;
}

export function getSpeechLangTagForTTS() {
  return getSpeechLangTag(state.language);
}
