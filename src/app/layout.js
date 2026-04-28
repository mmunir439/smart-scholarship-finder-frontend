"use client";
import "./globals.css";
import "../i18n";
import LanguageSwitcher from "../components/LanguageSwitcher";
export default function RootLayout({ children }) {
  return (
    <html>
      <title>Smart Scholarhip Guidance System</title>
      <body>
        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}
