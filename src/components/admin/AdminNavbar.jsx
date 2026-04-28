"use client";
import react from "react"
import { useState, useEffect } from "react";
import axios from "@/app/utils/axios"
import { useTranslation } from "react-i18next";
export default function AdminNavbar() {
    const { t } = useTranslation();

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
    return (
        <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
            <h2 className="text-sm text-gray-500 font-medium">Admin Panel</h2>
            <div className="flex items-center gap-3">
                {t("user.name")}
            </div>
        </header>
    );
}