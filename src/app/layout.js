"use client";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "../i18n";
import I18nHtmlSync from "@/components/I18nHtmlSync";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { ScholarshipPreferencesProvider } from "@/context/ScholarshipPreferencesContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

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
      <body className={`${plusJakarta.variable} min-h-screen page-bg font-sans text-slate-800 antialiased`}>
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
