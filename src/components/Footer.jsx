"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import GetStartedLink from "@/components/GetStartedLink";
import { useTranslation } from "react-i18next";
import { GraduationCap, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=100085467492304", label: "Facebook" },
    { icon: FaTwitter, href: "https://x.com/Muhamad_munir76", label: "Twitter" },
    { icon: FaInstagram, href: "https://www.instagram.com/muhammadmunir6551/", label: "Instagram" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/munirdev", label: "LinkedIn" },
  ];

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900 text-white">
      <div className="edu-container py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                <GraduationCap size={20} />
              </span>
              <h2 className="text-xl font-bold text-white">
                Smart<span className="text-blue-400">Scholarship</span>
              </h2>
            </div>

            <p className="mt-4 max-w-md leading-relaxed text-slate-300">
              {t("footer.desc")}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
              <Mail size={16} className="text-blue-400" />
              scholarhispguidance.iiui@gmail.com
            </div>

            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  aria-label={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition hover:bg-blue-600 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {t("footer.explore")}
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/scholarships" className="text-slate-300 hover:text-white">{t("footer.scholarships")}</Link></li>
                <li><Link href="/how-it-works" className="text-slate-300 hover:text-white">{t("footer.how")}</Link></li>
                <li><GetStartedLink className="text-slate-300 hover:text-white">{t("footer.start")}</GetStartedLink></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {t("footer.company")}
              </h3>
              <ul className="space-y-2.5">
                <li><Link href="/about" className="text-slate-300 hover:text-white">{t("footer.about")}</Link></li>
                <li><Link href="/contact" className="text-slate-300 hover:text-white">{t("footer.contact")}</Link></li>
                <li><Link href="/privacy" className="text-slate-300 hover:text-white">{t("footer.privacy")}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-8 text-sm text-slate-400 sm:flex-row">
          <p>{t("footer.copy")}</p>
          <Link href="/privacy" className="hover:text-white">{t("footer.privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
