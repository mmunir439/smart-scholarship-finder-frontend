"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function DashboardNavbar() {
    const { t } = useTranslation();

    return (
        <nav>
            <Link href="/" className="text-yellow-400">
                {t("dashboard.nav")}
            </Link>
        </nav>
    );
}