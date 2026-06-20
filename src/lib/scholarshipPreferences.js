import api from "@/app/utils/axios";
import { fetchSettings } from "@/lib/accessibilityApi";

/** Backend enum values (case-sensitive) */
export const STUDY_REGIONS = ["USA & Europe", "USA only", "Europe only"];
export const PREFERRED_DEGREES = ["All", "Bachelor", "Master", "PhD"];

export const DEFAULT_PREFERENCES = {
  studyRegion: "USA & Europe",
  preferredDegree: "All",
};

const LEGACY_REGION = {
  both: "USA & Europe",
  usa: "USA only",
  europe: "Europe only",
};

const LEGACY_DEGREE = {
  all: "All",
  bachelor: "Bachelor",
  master: "Master",
  phd: "PhD",
};

export function normalizeStudyRegion(value) {
  if (STUDY_REGIONS.includes(value)) return value;
  if (LEGACY_REGION[value]) return LEGACY_REGION[value];
  return DEFAULT_PREFERENCES.studyRegion;
}

export function normalizePreferredDegree(value) {
  if (PREFERRED_DEGREES.includes(value)) return value;
  const lower = String(value || "").toLowerCase();
  if (LEGACY_DEGREE[lower]) return LEGACY_DEGREE[lower];
  if (value === "Bachelor" || value === "Master" || value === "PhD") return value;
  return DEFAULT_PREFERENCES.preferredDegree;
}

export function parseScholarshipGuidanceFromSettings(data) {
  return {
    studyRegion: normalizeStudyRegion(data?.studyRegion),
    preferredDegree: normalizePreferredDegree(data?.preferredDegree),
  };
}

export function scholarshipQueryParams(preferences = DEFAULT_PREFERENCES) {
  return {
    studyRegion: normalizeStudyRegion(preferences.studyRegion),
    preferredDegree: normalizePreferredDegree(preferences.preferredDegree),
  };
}

export function isScholarshipFilterActive(preferences = DEFAULT_PREFERENCES) {
  const studyRegion = normalizeStudyRegion(preferences.studyRegion);
  const preferredDegree = normalizePreferredDegree(preferences.preferredDegree);
  return studyRegion !== "USA & Europe" || preferredDegree !== "All";
}

export function getRegionFilterLabel(studyRegion, t) {
  const normalized = normalizeStudyRegion(studyRegion);
  if (normalized === "USA only") return t("settingsPage.region_usa");
  if (normalized === "Europe only") return t("settingsPage.region_europe");
  return t("settingsPage.region_both");
}

export function getDegreeFilterLabel(preferredDegree, t) {
  const normalized = normalizePreferredDegree(preferredDegree);
  if (normalized === "All") return t("settingsPage.degree_all");
  if (normalized === "Bachelor") return t("settingsPage.degree_bachelor");
  if (normalized === "Master") return t("settingsPage.degree_master");
  if (normalized === "PhD") return t("settingsPage.degree_phd");
  return normalized;
}

export async function loadScholarshipGuidanceFromServer() {
  const data = await fetchSettings();
  return parseScholarshipGuidanceFromSettings(data);
}

export async function updateScholarshipGuidance(preferences) {
  const payload = scholarshipQueryParams(preferences);
  const res = await api.put("/user/settings/scholarship-guidance", payload);
  return res?.data;
}

export async function fetchScholarships(preferences = DEFAULT_PREFERENCES) {
  const res = await api.get("/scholarship/all", {
    params: scholarshipQueryParams(preferences),
  });
  const data = res?.data?.data ?? res?.data?.scholarships ?? res?.data ?? [];
  return Array.isArray(data) ? data : [];
}

export async function fetchEligibleScholarships(preferences = DEFAULT_PREFERENCES) {
  const res = await api.get("/eligible", {
    params: scholarshipQueryParams(preferences),
  });
  if (Array.isArray(res.data)) return res.data;
  return res?.data?.results ?? res?.data?.data ?? [];
}

export function dispatchPreferencesChanged(preferences) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("scholarshipPreferencesChanged", { detail: preferences }),
  );
}
