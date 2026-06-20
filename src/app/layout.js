"use client";
import "./globals.css";
import "../i18n";
import I18nHtmlSync from "@/components/I18nHtmlSync";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { ScholarshipPreferencesProvider } from "@/context/ScholarshipPreferencesContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Smart Scholarship Guidance System</title>
        <meta
          name="description"
          content="Intelligent scholarship guidance for Pakistani students — USA & Europe opportunities."
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-gray-900">
        <AccessibilityProvider>
          <ScholarshipPreferencesProvider>
            <I18nHtmlSync />
            {children}
          </ScholarshipPreferencesProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
