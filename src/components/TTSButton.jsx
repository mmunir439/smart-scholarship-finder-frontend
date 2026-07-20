"use client";

import { FiVolume2, FiPause, FiPlay } from "react-icons/fi";
import { useState } from "react";
import { speak, pauseSpeaking, resumeSpeaking, isSpeechSupported } from "@/app/utils/voiceAssistant";

export default function TTSButton({ text, label = "Listen", className = "" }) {
    const [state, setState] = useState("idle"); // idle | speaking | paused

    if (!isSpeechSupported()) return null; // hide button on unsupported browsers

    const handleClick = () => {
        console.log("TTSButton clicked", { state, text });
        if (state === "idle") {
            speak(text, "en-US", () => {
                console.log("TTS finished (onEnd)");
                setState("idle");
            });
            setState("speaking");
        } else if (state === "speaking") {
            pauseSpeaking();
            console.log("TTS paused");
            setState("paused");
        } else if (state === "paused") {
            resumeSpeaking();
            console.log("TTS resumed");
            setState("speaking");
        }
    };

    const icon = state === "speaking" ? <FiPause /> : state === "paused" ? <FiPlay /> : <FiVolume2 />;

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className}
            aria-label={label}
            aria-pressed={state === "speaking"}
        >
            {icon}
            <span className="ml-2">{label}</span>
        </button>
    );
}