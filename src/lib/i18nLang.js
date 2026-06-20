/** Supported app language codes (synced with backend accessibility) */
export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
  { code: "so", label: "Soomaali" },
];

export function normalizeLang(lng) {
  const code = (lng || "en").split("-")[0].toLowerCase();
  if (code === "ur") return "ur";
  if (code === "so") return "so";
  return "en";
}

export function langToDir(code) {
  return code === "ur" ? "rtl" : "ltr";
}
