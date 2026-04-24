"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}