"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import axios from "@/app/utils/axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Menu, X, LogOut, UserCircle2 } from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Home", href: "/" },
    { name: "Eligible Scholarships", href: "/eligiblebyChart" },
    { name: "Settings", href: "/settings" },
];

export default function Sidebar({ children }) {
    const path = usePathname();
    const router = useRouter();
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();
        setOpen(false);
        router.replace("/login");
    };

    const getUser = async () => {
        try {
            const res = await axios.get("/user/getCurrentUser");
            setUser(res?.data?.user ?? res?.data ?? {});
        } catch (error) {
            console.log(error);
            setUser({});
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .filter(Boolean)
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    useEffect(() => {
        getUser();
    }, []);

    const initials = useMemo(() => getInitials(user?.name), [user?.name]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Mobile hamburger button */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-4 left-4 z-[70] inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0b1d3a] text-white shadow-lg"
                aria-label="Open menu"
            >
                <Menu size={22} />
            </button>

            {/* Overlay */}
            {open && (
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="md:hidden fixed inset-0 z-[60] bg-black/50"
                    aria-label="Close menu overlay"
                />
            )}

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 z-[65] h-full w-64 sm:w-72 bg-[#0b1d3a] text-white flex flex-col shadow-2xl border-r border-white/10 transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                >
                    {/* Header */}
                    <div className="px-5 py-5 border-b border-white/10">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-orange-400">
                                    SSG System
                                </h1>
                                <p className="text-xs text-gray-400">Student Panel</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10"
                                aria-label="Close sidebar"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const active = path === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active
                                            ? "bg-white/10 border-l-4 border-orange-400 text-orange-400"
                                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="px-4 pb-5 pt-4 border-t border-white/10">
                        <div className="bg-white/10 rounded-2xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-orange-400 text-black rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                    {initials}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate">
                                        {user?.name || "User"}
                                    </p>
                                    <p className="text-xs text-gray-300 truncate">
                                        {user?.role || "student"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-2 text-sm transition"
                                >
                                    <UserCircle2 size={16} />
                                    Profile
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 px-3 py-2 text-sm text-red-300 hover:text-red-200 transition"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full md:ml-64 lg:ml-72">
                    <div className="w-full min-h-screen overflow-x-hidden">
                        {children}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}