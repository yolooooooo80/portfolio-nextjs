"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Film grain noise */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
