"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import GitHubStats from "@/components/GitHubStats";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <GitHubStats />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
