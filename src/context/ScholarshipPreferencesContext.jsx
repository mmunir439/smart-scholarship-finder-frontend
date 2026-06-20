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
  DEFAULT_PREFERENCES,
  dispatchPreferencesChanged,
  loadScholarshipGuidanceFromServer,
  normalizePreferredDegree,
  normalizeStudyRegion,
  updateScholarshipGuidance,
} from "@/lib/scholarshipPreferences";

const ScholarshipPreferencesContext = createContext(null);

export function ScholarshipPreferencesProvider({ children }) {
  const [preferences, setPreferencesState] = useState(DEFAULT_PREFERENCES);
  const [loaded, setLoaded] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const applyPreferences = useCallback((prefs) => {
    const normalized = {
      studyRegion: normalizeStudyRegion(prefs.studyRegion),
      preferredDegree: normalizePreferredDegree(prefs.preferredDegree),
    };
    setPreferencesState(normalized);
    dispatchPreferencesChanged(normalized);
    return normalized;
  }, []);

  const loadFromServer = useCallback(async () => {
    if (!getToken()) {
      applyPreferences(DEFAULT_PREFERENCES);
      setLoaded(true);
      return DEFAULT_PREFERENCES;
    }

    try {
      const prefs = await loadScholarshipGuidanceFromServer();
      applyPreferences(prefs);
      return prefs;
    } catch {
      applyPreferences(DEFAULT_PREFERENCES);
      return DEFAULT_PREFERENCES;
    } finally {
      setLoaded(true);
    }
  }, [applyPreferences]);

  const resetGuestDefaults = useCallback(() => {
    applyPreferences(DEFAULT_PREFERENCES);
  }, [applyPreferences]);

  const setPreferences = useCallback(
    (updater) => {
      setPreferencesState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        return {
          studyRegion: normalizeStudyRegion(next.studyRegion),
          preferredDegree: normalizePreferredDegree(next.preferredDegree),
        };
      });
    },
    [],
  );

  const saveGuidance = useCallback(
    async (prefs) => {
      const toSave = {
        studyRegion: normalizeStudyRegion((prefs ?? preferences).studyRegion),
        preferredDegree: normalizePreferredDegree(
          (prefs ?? preferences).preferredDegree,
        ),
      };

      if (!getToken()) {
        applyPreferences(toSave);
        return toSave;
      }

      try {
        setSyncing(true);
        await updateScholarshipGuidance(toSave);
        applyPreferences(toSave);
        return toSave;
      } finally {
        setSyncing(false);
      }
    },
    [applyPreferences, preferences],
  );

  useEffect(() => {
    loadFromServer();
  }, [loadFromServer]);

  const value = useMemo(
    () => ({
      preferences,
      setPreferences,
      loaded,
      syncing,
      loadFromServer,
      resetGuestDefaults,
      saveGuidance,
    }),
    [
      preferences,
      loaded,
      syncing,
      loadFromServer,
      resetGuestDefaults,
      saveGuidance,
      setPreferences,
    ],
  );

  return (
    <ScholarshipPreferencesContext.Provider value={value}>
      {children}
    </ScholarshipPreferencesContext.Provider>
  );
}

export function useScholarshipPreferences() {
  const ctx = useContext(ScholarshipPreferencesContext);
  if (!ctx) {
    throw new Error(
      "useScholarshipPreferences must be used within ScholarshipPreferencesProvider",
    );
  }
  return ctx;
}
