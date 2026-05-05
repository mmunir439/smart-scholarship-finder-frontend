"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "@/app/utils/axios";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
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
        sessionStorage.clear();
        router.push("/login");
    };

    const getUser = async () => {
        try {
            const res = await axios.get("/user/getCurrentUser");
            setUser(res?.data || {});
        } catch (error) {
            console.log(error);
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen">
                {/* Mobile hamburger button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden fixed z-50 top-4 left-4 bg-white/90 text-slate-800 p-2 rounded shadow"
                    aria-label="Toggle menu"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Mobile overlay backdrop */}
                {open && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setOpen(false)}
                        aria-hidden
                    />
                )}

                {/* Sidebar - Desktop fixed, Mobile overlay */}
                <aside
                    className={`bg-[#0b1d3a] text-white w-64 p-5 space-y-6 fixed top-0 left-0 h-full z-40 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                >
                    {/* Logo */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-orange-400">SSG System</h1>
                        <button
                            onClick={() => setOpen(false)}
                            className="md:hidden p-1 hover:bg-white/10 rounded"
                            aria-label="Close menu"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                            >
                                <div
                                    className={`p-3 rounded-lg cursor-pointer transition ${path === item.href
                                        ? "bg-white/10 border-l-4 border-orange-400 text-orange-400"
                                        : "hover:bg-white/5 text-gray-300"
                                        }`}
                                >
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </nav>

                    {/* User Section - Bottom */}
                    <div className="absolute bottom-6 left-5 right-5 space-y-3">
                        {/* User Info Card */}
                        <div className="bg-white/10 p-3 rounded-lg flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                {getInitials(user?.name)}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold truncate">{user?.name || "User"}</p>
                                <p className="text-xs text-gray-300 truncate">
                                    {user?.role || "student"}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button className="flex-1 text-xs py-2 px-3 rounded bg-white/10 hover:bg-white/20 transition">
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 text-xs py-2 px-3 rounded bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-red-200 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 md:ml-64 w-full">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    );
}