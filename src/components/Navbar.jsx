"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, User, LogOut, Settings, Grid } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import axios from "@/app/utils/axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false); // mobile menu
  const [menuOpen, setMenuOpen] = useState(false); // profile dropdown
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const menuRef = useRef();
  const mobileRef = useRef();

  // load user (attempt API then localStorage)
  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/getCurrentUser");
        if (!mounted) return;
        setUser(res.data || null);
        if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
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
    return () => {
      mounted = false;
    };
  }, []);

  // click outside to close dropdowns
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        /* keep mobile open until close button clicked intentionally */
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // close mobile menu on route change (router push)
  useEffect(() => {
    const handleRouteChange = () => setOpen(false);
    // Next.js app router doesn't provide events like next/router here; keep simple: close on mount/unmount
    return () => {
      handleRouteChange();
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {}
    setUser(null);
    setMenuOpen(false);
    router.push("/login");
  };

  const initials = (name) =>
    !name ? "U" : name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <>
      <nav className="w-full bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                <span className="text-2xl">🎓</span>
                <span className="hidden sm:inline">
                  <span className="text-gray-800">Smart</span>
                  <span className="text-orange-500">Scholarship</span>
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
                <Link href="/" className="hover:text-orange-600">{t("navbar.home")}</Link>
                <Link href="/scholarships" className="hover:text-orange-600">{t("navbar.scholarships")}</Link>
                <Link href="/how-it-works" className="hover:text-orange-600">{t("navbar.how")}</Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Desktop actions */}
              <div className="hidden md:flex items-center gap-3">
                <LanguageSwitcher />

                {!loadingUser && user ? (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setMenuOpen((v) => !v)}
                      aria-haspopup="true"
                      aria-expanded={menuOpen}
                      className="flex items-center gap-3 rounded-full px-2 py-1 hover:bg-gray-50 focus:outline-none"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                        {initials(user.name)}
                      </div>
                      <div className="hidden sm:flex flex-col text-left">
                        <span className="text-sm font-medium text-gray-900 leading-none">{user.name}</span>
                        <span className="text-xs text-gray-500 leading-none">{user.role}</span>
                      </div>
                      <svg className="hidden sm:block h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {menuOpen && (
                      <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                        <div className="px-4 py-3 border-b">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-700 font-semibold text-lg">
                              {initials(user.name)}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col px-2 py-2">
                          <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <User size={16} /> Profile
                          </Link>

                          <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Grid size={16} /> Dashboard
                          </Link>

                          <Link href="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Settings size={16} /> Settings
                          </Link>

                          <button onClick={handleLogout} className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-50">
                            <LogOut size={16} /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="text-sm text-gray-700 hover:text-orange-600">{t("navbar.login")}</Link>
                    <Link href="/register" className="ml-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">{t("navbar.register")}</Link>
                  </>
                )}
              </div>

              {/* Mobile hamburger */}
              <div className="md:hidden">
                <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2">
                  <Menu size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile slideover */}
      <div
        ref={mobileRef}
        className={`fixed inset-0 z-50 transform bg-white transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            🎓 <span className="text-orange-500">Smart Scholarship</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 overflow-y-auto">
          <nav className="flex flex-col gap-4 text-gray-700">
            <Link href="/" onClick={() => setOpen(false)} className="py-2">Home</Link>
            <Link href="/scholarships" onClick={() => setOpen(false)} className="py-2">Scholarships</Link>
            <Link href="/how-it-works" onClick={() => setOpen(false)} className="py-2">How it works</Link>
          </nav>

          <div className="mt-6 border-t pt-6">
            {!loadingUser && user ? (
              <>
                <div className="flex items-center gap-3 rounded-md bg-orange-50 p-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-700 font-semibold">{initials(user.name)}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Link href="/profile" onClick={() => setOpen(false)} className="py-2">Profile</Link>
                  <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} onClick={() => setOpen(false)} className="py-2">Dashboard</Link>
                  <Link href="/settings" onClick={() => setOpen(false)} className="py-2">Settings</Link>
                  <button onClick={() => { handleLogout(); setOpen(false); }} className="mt-2 text-left text-red-600">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="block py-2">Login</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="mt-4 block w-full rounded-md bg-orange-500 px-4 py-2 text-center text-white font-semibold">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}