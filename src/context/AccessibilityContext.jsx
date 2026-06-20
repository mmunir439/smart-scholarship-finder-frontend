"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getToken } from "@/app/utils/token";
import {
  applyAccessibilityLocally,
  applyGuestAccessibilityDefaults,
  fetchSettings,
  GUEST_ACCESSIBILITY,
  parseAccessibilityFromSettings,
  updateAccessibility,
} from "@/lib/accessibilityApi";
import { backendLanguageToI18n, normalizeBackendLanguage } from "@/lib/accessibilityLang";

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [accessibility, setAccessibility] = useState(GUEST_ACCESSIBILITY);
  const [loaded, setLoaded] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const applyAndSetState = useCallback((prefs) => {
    applyAccessibilityLocally(prefs);
    setAccessibility({
      language: normalizeBackendLanguage(prefs.language),
      textToSpeech: Boolean(prefs.textToSpeech),
    });
  }, []);

  const loadFromServer = useCallback(async () => {
    if (!getToken()) {
      setLoaded(true);
      return null;
    }

    try {
      const data = await fetchSettings();
      const prefs = parseAccessibilityFromSettings(data);
      applyAndSetState(prefs);
      return prefs;
    } catch {
      return null;
    } finally {
      setLoaded(true);
    }
  }, [applyAndSetState]);

  const resetGuestDefaults = useCallback(() => {
    applyGuestAccessibilityDefaults();
    setAccessibility(GUEST_ACCESSIBILITY);
  }, []);

  const updateAndSync = useCallback(
    async (next) => {
      const normalized = {
        language: normalizeBackendLanguage(next.language),
        textToSpeech: Boolean(next.textToSpeech),
      };
      const previous = accessibility;

      applyAndSetState(normalized);

      if (!getToken()) {
        return normalized;
      }

      try {
        setSyncing(true);
        await updateAccessibility(normalized);
        return normalized;
      } catch (err) {
        applyAndSetState(previous);
        throw err;
      } finally {
        setSyncing(false);
      }
    },
    [accessibility, applyAndSetState],
  );

  useEffect(() => {
    loadFromServer();
  }, [loadFromServer]);

  const value = useMemo(
    () => ({
      accessibility,
      i18nCode: backendLanguageToI18n(accessibility.language),
      loaded,
      syncing,
      loadFromServer,
      resetGuestDefaults,
      updateAndSync,
    }),
    [
      accessibility,
      loaded,
      syncing,
      loadFromServer,
      resetGuestDefaults,
      updateAndSync,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return ctx;
}
