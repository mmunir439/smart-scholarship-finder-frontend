export function isTTSEnabled() {
  if (typeof window === "undefined") return true;
  try {
    const stored = localStorage.getItem("textToSpeech");
    if (stored === null) return true;
    return stored === "true";
  } catch {
    return true;
  }
}

export const speak = (text, lang = "en-US") => {
  if (!window.speechSynthesis) return;
  if (!isTTSEnabled()) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = lang;
  msg.rate = 1;
  msg.pitch = 1;

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(msg);
};
