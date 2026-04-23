"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Find Scholarships", href: "/find" },
    { name: "Saved", href: "/dashboard/saved" },
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
];

export default function DashboardLayout({ children }) {
    const path = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside
                className={`bg-[#0b1d3a] text-white w-64 p-5 space-y-6 fixed top-0 left-0 h-full z-50 transition-transform
  ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <h1 className="text-xl font-bold text-gold">ScholarPath</h1>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <div
                                className={`p-3 rounded-lg cursor-pointer ${path === item.href
                                    ? "bg-white/10 border-l-4 border-gold"
                                    : "hover:bg-white/5"
                                    }`}
                            >
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-6">
                    <p className="text-sm">Muhammad</p>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 w-full">
                <button className="md:hidden mb-4" onClick={() => setOpen(!open)}>
                    <Menu />
                </button>

                {children}
            </main>

            <div className="fixed bottom-6 left-6 bg-white shadow px-4 py-2 rounded-full text-sm">
                🎧 Voice Guide
            </div>

            <div className="fixed bottom-6 right-6 bg-gold text-white px-4 py-2 rounded-full text-sm">
                EN | اردو
            </div>
        </div>
    );
}