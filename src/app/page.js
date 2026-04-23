"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Stats from "@/components/Stats";
import Sections from "@/components/Sections";
export default function Home() {
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
