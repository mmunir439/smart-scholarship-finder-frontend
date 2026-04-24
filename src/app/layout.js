"use client";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Smart Scholarhip Guidance System</title>
      <body>{children}</body>
    </html>
  );
}
