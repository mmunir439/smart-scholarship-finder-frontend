"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "@/app/utils/axios";
import { useTranslation } from "react-i18next";
import { FiShield, FiUser } from "react-icons/fi";

export default function AdminNavbar() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/user/getCurrentUser")
      .then((res) => setUser(res.data?.user ?? res.data ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const initials = useMemo(() => {
    const name = user?.name || "Admin";
    return name.split(" ").filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  }, [user]);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Admin Panel</p>
        <p className="text-lg font-bold text-slate-900">
          {loading ? "Loading..." : `Welcome, ${user?.name || "Admin"}`}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 ring-1 ring-blue-100">
          <FiShield className="text-blue-600" />
          <span className="text-sm font-semibold capitalize text-blue-800">
            {loading ? "..." : user?.role || "admin"}
          </span>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {loading ? <FiUser /> : initials}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-slate-900">{loading ? "..." : user?.name || "Admin"}</p>
          <p className="text-xs text-slate-500">{user?.email || "admin@smartscholarship.com"}</p>
        </div>
      </div>
    </header>
  );
}
