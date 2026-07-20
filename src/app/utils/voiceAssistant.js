"use client";

/**
 * Central Text-to-Speech utility.
 * Single source of truth — do not create a second copy of this file.
 */

let currentUtterance = null;
let isPaused = false;
let isSpeaking = false;

export const isSpeechSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

const getSynth = () => (isSpeechSupported() ? window.speechSynthesis : null);

/**
 * Speak the given text. Always interrupts whatever was playing before.
 */
export const speak = (text, lang = "en-US", onEnd) => {
  const synth = getSynth();
  if (!synth || !text) return;

  try {
    synth.cancel();
  } catch (e) {}

  isPaused = false;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onstart = () => {
    isSpeaking = true;
    isPaused = false;
  };

  utterance.onend = () => {
    isSpeaking = false;
    isPaused = false;
    currentUtterance = null;
    if (typeof onEnd === "function") onEnd();
  };

  utterance.onerror = () => {
    isSpeaking = false;
    isPaused = false;
    currentUtterance = null;
  };

  currentUtterance = utterance;
  synth.speak(utterance);
};

export const pauseSpeaking = () => {
  const synth = getSynth();
  if (!synth) return;
  if (synth.speaking && !synth.paused) {
    try {
      synth.pause();
    } catch (e) {}
    isPaused = true;
  }
};

export const resumeSpeaking = () => {
  const synth = getSynth();
  if (!synth) return;
  if (synth.paused) {
    try {
      synth.resume();
    } catch (e) {}
    isPaused = false;
  }
};

export const stopSpeaking = () => {
  const synth = getSynth();
  if (!synth) return;
  try {
    synth.cancel();
  } catch (e) {}
  currentUtterance = null;
  isPaused = false;
  isSpeaking = false;
};

export const getTTSStatus = () => ({
  supported: isSpeechSupported(),
  isSpeaking,
  isPaused,
});
