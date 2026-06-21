"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import axios from "@/app/utils/axios";
import { removeToken } from "@/app/utils/token";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useScholarshipPreferences } from "@/hooks/useScholarshipPreferences";
import { stopSpeaking } from "@/app/utils/voiceAssistant";
import { Menu, X, LogOut, UserCircle2, GraduationCap, LayoutDashboard, Home, BarChart3, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navIcons = {
  "/dashboard": LayoutDashboard,
  "/": Home,
  "/eligiblebyChart": BarChart3,
  "/settings": Settings,
};

export default function Sidebar({ children }) {
  const { t } = useTranslation();
  const path = usePathname();
  const router = useRouter();
  const { resetGuestDefaults: resetAccessibility } = useAccessibility();
  const { resetGuestDefaults: resetScholarshipPrefs } = useScholarshipPreferences();

  const navItems = [
    { name: t("sidebar.dashboard"), href: "/dashboard" },
    { name: t("sidebar.home"), href: "/" },
    { name: t("sidebar.eligible"), href: "/eligiblebyChart" },
    { name: t("sidebar.settings"), href: "/settings" },
  ];

  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("user");
    stopSpeaking();
    resetAccessibility();
    resetScholarshipPrefs();
    setOpen(false);
    router.replace("/login");
  };

  useEffect(() => {
    axios.get("/user/getCurrentUser")
      .then((res) => setUser(res?.data?.user ?? res?.data ?? {}))
      .catch(() => setUser({}));
  }, []);

  const initials = useMemo(() => {
    if (!user?.name) return "U";
    return user.name.split(" ").filter(Boolean).map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  }, [user?.name]);

  return (
    <div className="page-bg min-h-screen">
      <button type="button" onClick={() => setOpen(true)} className="fixed left-4 top-4 z-[70] flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white md:hidden" aria-label="Open menu">
        <Menu size={20} />
      </button>

      {open && <button type="button" onClick={() => setOpen(false)} className="fixed inset-0 z-[60] bg-black/40 md:hidden" aria-label="Close overlay" />}

      <div className="flex min-h-screen">
        <aside className={`fixed left-0 top-0 z-[65] flex h-full w-64 flex-col bg-slate-900 text-white transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <div className="border-b border-slate-800 px-5 py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <GraduationCap size={18} />
              </span>
              <div>
                <p className="text-sm font-bold text-white">{t("sidebar.title")}</p>
                <p className="text-xs text-slate-400">{t("sidebar.subtitle")}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const active = path === item.href;
              const Icon = navIcons[item.href] || LayoutDashboard;
              return (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className={`sidebar-link ${active ? "sidebar-link-active" : "sidebar-link-inactive"}`}>
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-800 p-4">
            <div className="rounded-xl bg-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{initials}</div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{user?.name || "User"}</p>
                  <p className="truncate text-xs capitalize text-slate-400">{user?.role || "student"}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center justify-center gap-1 rounded-lg bg-slate-700 py-2 text-xs font-medium text-white hover:bg-slate-600">
                  <UserCircle2 size={14} /> {t("sidebar.profile")}
                </Link>
                <button type="button" onClick={handleLogout} className="flex items-center justify-center gap-1 rounded-lg bg-red-900/50 py-2 text-xs font-medium text-red-300 hover:bg-red-900">
                  <LogOut size={14} /> {t("sidebar.logout")}
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="w-full flex-1 md:ml-64">
          <div className="min-h-screen overflow-x-hidden">{children}</div>
        </main>
      </div>
    </div>
  );
}
