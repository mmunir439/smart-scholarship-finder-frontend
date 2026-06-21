"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutDashboard, BookOpen, Users, LogOut, Menu, X, Shield } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Scholarships", href: "/admin/scholarships", icon: BookOpen },
  { label: "Users", href: "/admin/users", icon: Users },
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
      <button type="button" onClick={() => setIsOpen(true)} className="fixed left-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white md:hidden" aria-label="Open sidebar">
        <Menu size={20} />
      </button>

      {isOpen && <button type="button" onClick={() => setIsOpen(false)} className="fixed inset-0 z-40 bg-black/40 md:hidden" aria-label="Close overlay" />}

      <aside className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-slate-900 text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <Shield size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Admin Panel</p>
              <p className="text-xs text-slate-400">Smart Scholarship</p>
            </div>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 hover:bg-slate-800 md:hidden"><X size={18} /></button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setIsOpen(false)} className={`sidebar-link ${active ? "sidebar-link-active" : "sidebar-link-inactive"}`}>
                <Icon size={18} />
                {t(label)}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <button type="button" onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-slate-300 hover:bg-red-900/40 hover:text-red-300">
            <LogOut size={16} /> {t("Logout")}
          </button>
        </div>
      </aside>
    </>
  );
}
