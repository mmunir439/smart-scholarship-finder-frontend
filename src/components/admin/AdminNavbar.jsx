"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "@/app/utils/axios";
import { useTranslation } from "react-i18next";
import { FiShield, FiUser } from "react-icons/fi";

export default function AdminNavbar() {
    const { t } = useTranslation();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const res = await axios.get("/user/getCurrentUser");
            setUser(res.data?.user ?? res.data ?? null);
        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const initials = useMemo(() => {
        const name = user?.name || "Admin";
        return name
            .split(" ")
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }, [user]);

    return (
        <header className="bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
                <h2 className="text-sm font-medium text-gray-500">Admin Panel</h2>
                <p className="text-lg font-semibold text-gray-900">
                    {loading ? "Loading..." : `Welcome, ${user?.name || "Admin"}`}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-50 border border-orange-100">
                    <FiShield className="text-orange-500" />
                    <span className="text-sm font-medium text-orange-700 capitalize">
                        {loading ? "..." : user?.role || "admin"}
                    </span>
                </div>

                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                    {loading ? <FiUser /> : initials}
                </div>

                <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                        {loading ? "Loading..." : t(user?.name || "Admin")}
                    </p>
                    <p className="text-xs text-gray-500">
                        {user?.email || "admin@smartscholarship.com"}
                    </p>
                </div>
            </div>
        </header>
    );
}