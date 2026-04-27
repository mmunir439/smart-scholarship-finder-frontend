"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Stats from "@/components/Stats";
import Sections from "@/components/Sections";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <Hero />
      <Works />
      <Stats />
      <Sections />
      <Footer />
    </>
  );
}
