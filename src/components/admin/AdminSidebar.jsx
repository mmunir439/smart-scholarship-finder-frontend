"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Settings,
    LogOut,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Scholarships", href: "/admin/scholarships", icon: BookOpen },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const [user, setUser] = useState({});
    const getUser = async () => {
        try {
            const res = await axios.get("/user/getUser");
            setUser(res.data)
            console.log("full response:", res.data);

            // ✅ correct access
            console.log(`user role: ${res.data.role}`);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-[#0b1d3a] text-white flex flex-col">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-white/10">
                <h1 className="text-lg font-bold text-orange-400">🎓 ScholarFinder</h1>
                <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-4 py-6 space-y-1">

                {navItems.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${active
                                ? "bg-orange-500 text-white"
                                : "text-gray-300 hover:bg-white/10"
                                }`}
                        >
                            <Icon size={18} />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="px-4 pb-6">
                <button className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm text-gray-300 hover:bg-white/10 transition">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}