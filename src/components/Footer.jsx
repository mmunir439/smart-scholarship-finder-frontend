"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-[#0b1d3a] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                <div className="grid md:grid-cols-3 gap-10 mb-10">

                    {/* LEFT */}
                    <div>
                        <h2 className="text-lg font-bold mb-3">
                            🎓 Scholar<span className="text-orange-500">Path</span>
                        </h2>

                        <p className="text-gray-300 mb-6">
                            {t("footer.desc")}
                        </p>
                    </div>

                    {/* EXPLORE */}
                    <div>
                        <h3 className="text-orange-500 font-semibold mb-4">
                            {t("footer.explore")}
                        </h3>
                        <ul className="space-y-2">
                            <li><Link href="/scholarships">{t("footer.scholarships")}</Link></li>
                            <li><Link href="/how-it-works">{t("footer.how")}</Link></li>
                            <li><Link href="/register">{t("footer.start")}</Link></li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="text-orange-500 font-semibold mb-4">
                            {t("footer.company")}
                        </h3>
                        <ul className="space-y-2">
                            <li><Link href="/about">{t("footer.about")}</Link></li>
                            <li><Link href="/contact">{t("footer.contact")}</Link></li>
                            <li><Link href="/privacy">{t("footer.privacy")}</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="text-center text-gray-400 text-sm">
                    {t("footer.copy")}
                </div>
            </div>
        </footer>
    );
}