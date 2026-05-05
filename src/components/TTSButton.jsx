// src/components/TTSButton.jsx
"use client";

import { useEffect, useState } from "react";
import {
    speak,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    isSpeechSupported,
} from "@/app/utils/voiceAssistant";

export default function TTSButton({ text, lang = "en-US" }) {
    const [status, setStatus] = useState("idle"); // idle | speaking | paused

    // ✅ Stop speech when user leaves the page
    useEffect(() => {
        return () => stopSpeaking();
    }, []);

    // ✅ Browser doesn't support TTS
    if (!isSpeechSupported()) {
        return (
            <p className="text-xs text-gray-400 mt-1">
                🔇 Voice not supported in this browser
            </p>
        );
    }

    const handleSpeak = () => {
        speak(text, lang);
        setStatus("speaking");

        // Auto reset to idle when speech finishes
        window.speechSynthesis.addEventListener(
            "end",
            () => setStatus("idle"),
            { once: true }
        );
    };

    const handlePause = () => {
        pauseSpeaking();
        setStatus("paused");
    };

    const handleResume = () => {
        resumeSpeaking();
        setStatus("speaking");
    };

    const handleStop = () => {
        stopSpeaking();
        setStatus("idle");
    };

    return (
        <div className="flex items-center gap-2 mt-2">
            {status === "idle" && (
                <button
                    onClick={handleSpeak}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg transition"
                >
                    🔊 Listen
                </button>
            )}

            {status === "speaking" && (
                <>
                    <button
                        onClick={handlePause}
                        className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
                    >
                        ⏸ Pause
                    </button>
                    <button
                        onClick={handleStop}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
                    >
                        ⏹ Stop
                    </button>
                </>
            )}

            {status === "paused" && (
                <>
                    <button
                        onClick={handleResume}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5 rounded-lg transition"
                    >
                        ▶ Resume
                    </button>
                    <button
                        onClick={handleStop}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
                    >
                        ⏹ Stop
                    </button>
                </>
            )}
        </div>
    );
}