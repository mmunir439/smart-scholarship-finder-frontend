// ...existing code...
/**
 * voiceAssistant utils - TTS control with explicit pause/resume behavior
 */

let utterance = null;
let isPaused = false;
let isSpeaking = false;

export const isSpeechSupported = () => {
    return typeof window !== "undefined" && "speechSynthesis" in window;
};

const safeSynthesis = () => (isSpeechSupported() ? window.speechSynthesis : null);

export const speak = (text, lang = "en-US", onEnd) => {
    const synth = safeSynthesis();
    if (!synth) return;
    // If user explicitly paused, don't start a new utterance until resumed
    if (isPaused) return;

    // If currently speaking, cancel and start fresh
    try { synth.cancel(); } catch (e) { }

    utterance = new SpeechSynthesisUtterance(text);
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
    // Only pause if currently speaking and not already paused
    if (synth.speaking && !synth.paused) {
        try { synth.pause(); } catch (e) { }
        isPaused = true;
    }
};

export const resumeSpeaking = () => {
    const synth = safeSynthesis();
    if (!synth) return;
    // Only resume if paused
    if (synth.paused) {
        try { synth.resume(); } catch (e) { }
        isPaused = false;
    }
};

export const stopSpeaking = () => {
    const synth = safeSynthesis();
    if (!synth) return;
    try { synth.cancel(); } catch (e) { }
    utterance = null;
    isPaused = false;
    isSpeaking = false;
};

export const getTTSStatus = () => ({
    supported: isSpeechSupported(),
    isSpeaking,
    isPaused,
});