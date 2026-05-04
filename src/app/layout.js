"use client";
import "./globals.css";
import "../i18n";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Smart Scholarhip Guidance System</title>
      </head>
      <body className="bg-orange-50 text-gray-900">{children}</body>
    </html>
  );
}
