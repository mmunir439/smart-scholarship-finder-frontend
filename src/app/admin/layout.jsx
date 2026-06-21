"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="page-bg flex min-h-screen">
      <AdminSidebar />
      <div className="ml-0 flex flex-1 flex-col md:ml-64">
        <AdminNavbar />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
