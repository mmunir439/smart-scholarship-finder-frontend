"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, User, LogOut, Settings, Grid, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import axios from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { removeToken } from "@/app/utils/token";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useScholarshipPreferences } from "@/hooks/useScholarshipPreferences";
import { stopSpeaking } from "@/app/utils/voiceAssistant";

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation();
  const { resetGuestDefaults: resetAccessibility } = useAccessibility();
  const { resetGuestDefaults: resetScholarshipPrefs } = useScholarshipPreferences();

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const menuRef = useRef();

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/getCurrentUser");
        if (!mounted) return;
        setUser(res.data || null);
        if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
      } catch {
        try {
          const stored = localStorage.getItem("user");
          if (stored && mounted) setUser(JSON.parse(stored));
        } catch {
          if (mounted) setUser(null);
        }
      } finally {
        if (mounted) setLoadingUser(false);
      }
    };
    fetchUser();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    try { removeToken(); localStorage.removeItem("user"); } catch {}
    stopSpeaking();
    resetAccessibility();
    resetScholarshipPrefs();
    setUser(null);
    setMenuOpen(false);
    router.push("/login");
  };

  const initials = (name) =>
    !name ? "U" : name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const navLinks = [
    { href: "/", label: t("navbar.home") },
    { href: "/scholarships", label: t("navbar.scholarships") },
    { href: "/how-it-works", label: t("navbar.how") },
    { href: "/about", label: t("footer.about") },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="edu-container">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <GraduationCap size={20} />
                </span>
                <span className="hidden text-lg font-bold sm:inline">
                  <span className="text-slate-900">{t("navbar.brand_smart")}</span>{" "}
                  <span className="text-blue-600">{t("navbar.brand_scholarship")}</span>
                </span>
              </Link>

              <div className="hidden items-center gap-1 md:flex">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="nav-link rounded-md px-3 py-2 hover:bg-slate-50">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 md:flex">
                <LanguageSwitcher />

                {!loadingUser && user ? (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setMenuOpen((v) => !v)}
                      className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-slate-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                        {initials(user.name)}
                      </div>
                      <span className="hidden text-sm font-medium text-slate-800 sm:block">{user.name}</span>
                    </button>

                    {menuOpen && (
                      <div className="absolute right-0 z-50 mt-1 w-56 rounded-xl border border-slate-200 bg-white py-1 shadow-[var(--shadow-lg)]">
                        <div className="border-b border-slate-100 px-4 py-3">
                          <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
                          <p className="truncate text-xs text-slate-500">{user.email}</p>
                        </div>
                        <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                          <User size={16} /> {t("navbar.profile")}
                        </Link>
                        <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                          <Grid size={16} /> {t("navbar.dashboard")}
                        </Link>
                        <Link href="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                          <Settings size={16} /> {t("navbar.settings")}
                        </Link>
                        <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                          <LogOut size={16} /> {t("navbar.logout")}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="nav-link">{t("navbar.login")}</Link>
                    <Link href="/register" className="btn-primary py-2">{t("navbar.register")}</Link>
                  </>
                )}
              </div>

              <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden" aria-label="Open menu">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 bg-white transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900" onClick={() => setOpen(false)}>
            <GraduationCap className="text-blue-600" size={22} />
            {t("navbar.brand_smart")}
          </Link>
          <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-slate-100"><X size={22} /></button>
        </div>
        <div className="px-4 py-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">
              {link.label}
            </Link>
          ))}
          <div className="mt-6 border-t border-slate-200 pt-6">
            {!loadingUser && user ? (
              <>
                <p className="mb-3 font-semibold text-slate-900">{user.name}</p>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="block py-2 text-slate-700">{t("navbar.dashboard")}</Link>
                <Link href="/settings" onClick={() => setOpen(false)} className="block py-2 text-slate-700">{t("navbar.settings")}</Link>
                <button onClick={() => { handleLogout(); setOpen(false); }} className="mt-2 text-red-600">{t("navbar.logout")}</button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setOpen(false)} className="btn-outline text-center">{t("navbar.login")}</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="btn-primary text-center">{t("navbar.register")}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
