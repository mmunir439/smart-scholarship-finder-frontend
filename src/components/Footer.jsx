"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-[#0b1d3a] text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
                    {/* LEFT */}
                    <div className="md:w-1/3">
                        <div className="flex items-center justify-between md:justify-start gap-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="text-2xl">🎓</span>
                                <span>
                                    Smart<span className="text-orange-500">Scholarhship</span>
                                </span>
                            </h2>
                        </div>

                        <p className="text-gray-300 mt-4 leading-relaxed">
                            {t("footer.desc")}
                        </p>

                        <div className="flex items-center gap-3 mt-6">
                            <a aria-label="Facebook" href="https://www.facebook.com/profile.php?id=100085467492304" className="w-9 h-9 flex items-center justify-center bg-white/6 rounded hover:bg-white/10 transition text-white">
                                <FaFacebookF />
                            </a>
                            <a aria-label="Twitter" href="https://x.com/Muhamad_munir76" className="w-9 h-9 flex items-center justify-center bg-white/6 rounded hover:bg-white/10 transition text-white">
                                <FaTwitter />
                            </a>
                            <a aria-label="Instagram" href="https://www.instagram.com/muhammadmunir6551/" className="w-9 h-9 flex items-center justify-center bg-white/6 rounded hover:bg-white/10 transition text-white">
                                <FaInstagram />
                            </a>
                            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/munirdev" className="w-9 h-9 flex items-center justify-center bg-white/6 rounded hover:bg-white/10 transition text-white">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* LINKS (responsive grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:w-2/3 gap-8">
                        <div>
                            <h3 className="text-orange-500 font-semibold mb-4">
                                {t("footer.explore")}
                            </h3>
                            <ul className="space-y-2">
                                <li><Link href="/scholarships" className="text-gray-200 hover:text-white transition">{t("footer.scholarships")}</Link></li>
                                <li><Link href="/how-it-works" className="text-gray-200 hover:text-white transition">{t("footer.how")}</Link></li>
                                <li><Link href="/register" className="text-gray-200 hover:text-white transition">{t("footer.start")}</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-orange-500 font-semibold mb-4">
                                {t("footer.company")}
                            </h3>
                            <ul className="space-y-2">
                                <li><Link href="/about" className="text-gray-200 hover:text-white transition">{t("footer.about")}</Link></li>
                                <li><Link href="/contact" className="text-gray-200 hover:text-white transition">{t("footer.contact")}</Link></li>
                                <li><Link href="/privacy" className="text-gray-200 hover:text-white transition">{t("footer.privacy")}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
                    <div className="text-center sm:text-left">
                        {t("footer.copy")}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/terms" className="hover:text-white transition">Conditions</Link>
                        <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}