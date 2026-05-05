"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Scholarships", href: "/admin/scholarships", icon: BookOpen },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    setIsOpen(false);
    router.replace("/login");
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#07162d] text-white shadow-lg"
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-[#07162d] text-white flex flex-col border-r border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center">
                <Shield size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-orange-400 leading-tight">
                  Smart Scholarship
                </h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 transition"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "text-gray-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={18} className="shrink-0" />
                  <span className="truncate">{t(label)}</span>
                </div>

                <ChevronRight
                  size={16}
                  className={`shrink-0 transition-transform duration-200 ${
                    active
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-medium text-gray-200 bg-white/5 hover:bg-red-500/15 hover:text-red-300 border border-white/10 transition"
          >
            <LogOut size={18} />
            {t("Logout")}
          </button>
        </div>
      </aside>
    </>
  );
}