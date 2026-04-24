"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
const sections = [
  { id: "overview", label: "Overview" },
  { id: "data-collected", label: "Information We Collect" },
  { id: "data-use", label: "How We Use Your Info" },
  { id: "data-storage", label: "Data Storage" },
  { id: "web-scraping", label: "Web Scraping" },
  { id: "cookies", label: "Cookies" },
  { id: "third-party", label: "Third Party" },
  { id: "rights", label: "Your Rights" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sec.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      {/* HERO */}
      <div className="px-6 md:px-16 py-12">
        <h1 className="text-4xl font-serif mb-2">Privacy Policy</h1>
        <p className="text-gray-500">
          Last updated: June 2025 • International Islamic University Islamabad
        </p>
        <div className="w-20 h-[2px] bg-[#F5A623] mt-4" />
      </div>

      {/* LAYOUT */}
      <div className="grid md:grid-cols-10 gap-6 px-6 md:px-16 pb-20">

        {/* SIDEBAR */}
        <div className="md:col-span-3 hidden md:block">
          <div className="sticky top-10 space-y-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block pl-3 py-2 border-l-4 ${active === s.id
                  ? "border-[#F5A623] text-[#0B1437]"
                  : "border-transparent text-gray-500"
                  }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm whitespace-nowrap"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* CONTENT */}
        <div className="md:col-span-7 space-y-10">

          <Section id="overview" title="Overview">
            ScholarPath is a student project developed at IIUI. We are committed to protecting your personal information and being transparent.
          </Section>

          <Section id="data-collected" title="Information We Collect">
            • Name, email, password (encrypted)<br />
            • Academic profile data<br />
            • Usage data within platform
          </Section>

          <Section id="data-use" title="How We Use Your Information">
            • Match scholarships<br />
            • Improve UX<br />
            <span className="text-[#F5A623] font-semibold">
              We do NOT sell your data
            </span>
          </Section>

          <Section id="data-storage" title="Data Storage & Security">
            MongoDB, bcrypt encryption, JWT sessions, secure cloud hosting.
          </Section>

          <Section id="web-scraping" title="Web Scraping">
            Public scholarship data only. No personal data scraping.
          </Section>

          <Section id="cookies" title="Cookies">
            Minimal authentication cookies only.
          </Section>

          <Section id="third-party" title="Third Party Services">
            Vercel, MongoDB Atlas. No ads or tracking tools.
          </Section>

          <Section id="rights" title="Your Rights">
            Request deletion anytime via email.
          </Section>

          <Section id="changes" title="Changes">
            Policy may update. Users notified via email.
          </Section>

          <Section id="contact" title="Contact Us">
            scholarpath.iiui@gmail.com<br />
            Faculty of Computing, IIUI
          </Section>

        </div>
      </div>
      <Footer />
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="border-b pb-6">
      <h2 className="text-2xl font-serif mb-3">{title}</h2>
      <p className="text-gray-600">{children}</p>
    </section>
  );
}