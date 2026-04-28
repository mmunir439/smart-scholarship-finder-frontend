"use client";

import i18n from "i18next";

export default function LanguageSwitcher() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("ur")}>UR</button>
      <button onClick={() => i18n.changeLanguage("so")}>SO</button>
    </div>
  );
}
