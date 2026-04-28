"use client";

import i18n from "i18next";

export default function LanguageSwitcher() {
  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      defaultValue={i18n.language}
      className="border rounded px-2 py-1 text-sm cursor-pointer"
    >
      <option value="en">EN</option>
      <option value="ur">UR</option>
      <option value="so">SO</option>
    </select>
  );
}
