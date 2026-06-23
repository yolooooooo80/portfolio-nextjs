"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between"
        style={{
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.08)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => handleNav("#home")}
          className="text-lg font-black tracking-widest cursor-none select-none"
          style={{ color: "var(--white)", letterSpacing: "0.3em" }}
        >
          <span style={{ color: "var(--gold)" }}>Al</span>ex
          <span className="text-xs align-top ml-1" style={{ color: "var(--gold)" }}>®</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="nav-link bg-transparent border-0"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => handleNav("#contact")} className="btn-primary text-xs">
            Let&apos;s Talk
          </button>
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-none"
          aria-label="Menu"
        >
          <span
            style={{
              display: "block", width: "24px", height: "1px",
              background: menuOpen ? "var(--gold)" : "var(--white)",
              transform: menuOpen ? "rotate(45deg) translateY(3.5px)" : "none",
              transition: "all 0.3s ease",
            }}
          />
          <span
            style={{
              display: "block", width: "16px", height: "1px",
              background: "var(--white)",
              opacity: menuOpen ? 0 : 1,
              transition: "all 0.3s ease",
            }}
          />
          <span
            style={{
              display: "block", width: "24px", height: "1px",
              background: menuOpen ? "var(--gold)" : "var(--white)",
              transform: menuOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
              transition: "all 0.3s ease",
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: "rgba(10,10,10,0.97)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-2xl font-light tracking-widest uppercase cursor-none"
              style={{ color: "var(--white)", letterSpacing: "0.3em" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
