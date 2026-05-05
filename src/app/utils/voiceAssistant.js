export const speak = (text, lang = "en-US") => {
  if (!window.speechSynthesis) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = lang;
  msg.rate = 1;
  msg.pitch = 1;

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(msg);
};
