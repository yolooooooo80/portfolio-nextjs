"use client";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";


const navLinks = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Proyek", href: "#work" },
  { label: "Kontak", href: "#contact" },
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
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24"
        style={{
          padding: scrolled ? "1rem 0" : "1.5rem 0",
          paddingLeft: "clamp(2rem, 5vw, 6rem)",
          paddingRight: "clamp(2rem, 5vw, 6rem)",
          background: scrolled ? "rgba(10,10,10,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.07)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNav("#home")}
            className="font-black tracking-widest cursor-none select-none"
            style={{ fontSize: "1.1rem", color: "var(--white)", letterSpacing: "0.35em" }}
          >
            <span style={{ color: "var(--gold)" }}>A</span>WEC
            <span className="text-xs align-top ml-0.5" style={{ color: "var(--gold)" }}>®</span>
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

          {/* CTA + Socials */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-3">
              {[
                { icon: GithubIcon, href: "https://github.com/yolooooooo80" },
                { icon: InstagramIcon, href: "https://instagram.com/" },
                { icon: LinkedinIcon, href: "https://linkedin.com/in/" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)", transition: "color 0.3s ease", cursor: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />
            <button onClick={() => handleNav("#contact")} className="btn-primary" style={{ padding: "0.6rem 1.25rem" }}>
              Hubungi
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-none"
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block",
                width: i === 1 ? (menuOpen ? "0" : "16px") : "24px",
                height: "1px",
                background: menuOpen && i !== 1 ? "var(--gold)" : "var(--white)",
                transform: menuOpen ? (i === 0 ? "rotate(45deg) translateY(3.5px)" : i === 2 ? "rotate(-45deg) translateY(-3.5px)" : "none") : "none",
                opacity: i === 1 && menuOpen ? 0 : 1,
                transition: "all 0.3s ease",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: "rgba(10,10,10,0.97)" }}>
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => handleNav(link.href)}
              className="text-2xl font-light uppercase cursor-none"
              style={{ color: "var(--white)", letterSpacing: "0.3em" }}>
              {link.label}
            </button>
          ))}
          <div className="flex gap-6 mt-4">
            {[GithubIcon, InstagramIcon, LinkedinIcon].map((Icon, i) => (
              <span key={i} style={{ color: "var(--gold)" }}><Icon size={20} /></span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
