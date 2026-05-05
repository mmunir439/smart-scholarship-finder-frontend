"use client";

import Sidebar from "@/components/Usersidebar";

export default function DashboardLayout({ children, hideNavbar = false }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar hideNavbar={hideNavbar}>
                <div className="p-4 sm:p-6">
                    {children}
                </div>
            </Sidebar>
        </div>
    );
}