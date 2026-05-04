"use client";

import Sidebar from "@/components/Usersidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Sidebar */}
            <div className="w-64 hidden md:block">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
                {children}
            </div>

        </div>
    );
}