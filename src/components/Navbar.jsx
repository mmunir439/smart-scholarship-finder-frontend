"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation(); // ✅ ADD
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow-sm">

        {/* Logo */}
        <div className="text-lg font-bold flex items-center gap-1">
          <span>🎓</span>
          <span className="text-gray-800">Smart</span>
          <span className="text-orange-500">Scholarship</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <li><Link href="/">{t("navbar.home")}</Link></li>
          <li><Link href="/scholarships">{t("navbar.scholarships")}</Link></li>
          <li><Link href="/how-it-works">{t("navbar.how")}</Link></li>
          <li><Link href="/login">{t("navbar.login")}</Link></li>
          <li>
            <Link
              href="/register"
              className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600"
            >
              {t("navbar.register")}
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >

        {/* Top */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="text-lg font-bold flex items-center gap-1">
            🎓 <span className="text-gray-800">Smart</span>
            <span className="text-orange-500">Scholarship</span>
          </div>

          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-5 px-6 py-6 text-gray-700 text-sm">
          <Link href="/" onClick={() => setOpen(false)}>
            {t("navbar.home")}
          </Link>

          <Link href="/scholarships" onClick={() => setOpen(false)}>
            {t("navbar.scholarships")}
          </Link>

          <Link href="/dashboard" onClick={() => setOpen(false)}>
            {t("navbar.dashboard")}
          </Link>

          <Link href="/how-it-works" onClick={() => setOpen(false)}>
            {t("navbar.how")}
          </Link>

          <Link href="/login" onClick={() => setOpen(false)}>
            {t("navbar.login")}
          </Link>
        </div>

        {/* Register Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="block text-center bg-orange-500 text-white py-3 rounded-md font-semibold"
          >
            {t("navbar.register")}
          </Link>
        </div>
      </div>
    </>
  );
}