"use client";

import Sidebar from "@/components/Usersidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar>
                <div className="p-4 sm:p-6">
                    {children}
                </div>
            </Sidebar>
        </div>
    );
}