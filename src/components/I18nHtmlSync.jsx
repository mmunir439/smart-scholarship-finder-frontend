"use client";

import { useEffect } from "react";
import i18n from "@/i18n";
import { normalizeLang, langToDir } from "@/lib/i18nLang";

function applyDocumentLanguage(lng) {
  if (typeof document === "undefined") return;
  const code = normalizeLang(lng);
  document.documentElement.lang = code;
  document.documentElement.dir = langToDir(code);
}

export default function I18nHtmlSync() {
  useEffect(() => {
    applyDocumentLanguage(i18n.language);
    const handler = (lng) => applyDocumentLanguage(lng);
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, []);

  return null;
}
