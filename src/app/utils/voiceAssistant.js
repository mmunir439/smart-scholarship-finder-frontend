import {
  getSpeechLangTagForTTS,
  isTTSEnabled,
} from "@/lib/accessibilityState";

export { isTTSEnabled };

export const isSpeechSupported = () => {
  return typeof window !== "undefined" && "speechSynthesis" in window;
};

const safeSynthesis = () => (isSpeechSupported() ? window.speechSynthesis : null);

let utterance = null;
let isPaused = false;
let isSpeaking = false;

function resolveSpeechLang(lang) {
  if (lang) return lang;
  return getSpeechLangTagForTTS();
}

export const speak = (text, lang, onEnd) => {
  const synth = safeSynthesis();
  if (!synth || !isTTSEnabled()) return;
  if (isPaused) return;

  try {
    synth.cancel();
  } catch {
    /* ignore */
  }

  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = resolveSpeechLang(lang);
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onstart = () => {
    isSpeaking = true;
    isPaused = false;
  };

  utterance.onend = () => {
    isSpeaking = false;
    isPaused = false;
    utterance = null;
    if (typeof onEnd === "function") onEnd();
  };

  utterance.onerror = () => {
    isSpeaking = false;
    isPaused = false;
    utterance = null;
  };

  synth.speak(utterance);
};

export const pauseSpeaking = () => {
  const synth = safeSynthesis();
  if (!synth) return;
  if (synth.speaking && !synth.paused) {
    try {
      synth.pause();
    } catch {
      /* ignore */
    }
    isPaused = true;
  }
};

export const resumeSpeaking = () => {
  const synth = safeSynthesis();
  if (!synth) return;
  if (synth.paused) {
    try {
      synth.resume();
    } catch {
      /* ignore */
    }
    isPaused = false;
  }
};

export const stopSpeaking = () => {
  const synth = safeSynthesis();
  if (!synth) return;
  try {
    synth.cancel();
  } catch {
    /* ignore */
  }
  utterance = null;
  isPaused = false;
  isSpeaking = false;
};

export const getTTSStatus = () => ({
  supported: isSpeechSupported(),
  isSpeaking,
  isPaused,
});
