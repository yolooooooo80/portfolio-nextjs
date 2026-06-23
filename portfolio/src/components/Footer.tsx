"use client";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/yolooooooo80" },
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/in/" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(".footer-big",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, []);

  return (
    <footer ref={ref} className="relative pt-24 pb-10 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "var(--black)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>

      <div className="footer-big font-black select-none pointer-events-none text-center"
        style={{
          fontSize: "clamp(4rem, 15vw, 16rem)", letterSpacing: "-0.05em",
          color: "transparent", WebkitTextStroke: "1px rgba(201,168,76,0.07)",
          lineHeight: 0.85, marginBottom: "0",
        }}>
        AWEC.
      </div>

      <div className="relative z-10 mt-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="font-black text-2xl mb-2" style={{ letterSpacing: "0.3em" }}>
            <span style={{ color: "var(--gold)" }}>A</span>WEC
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>Tersedia untuk proyek baru</div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Yogyakarta, Indonesia</div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5"
                style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.7rem", letterSpacing: "0.1em", transition: "color 0.3s ease", cursor: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                <s.icon size={14} />
                <span className="hidden sm:inline">{s.label}</span>
              </a>
            ))}
          </div>
          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            © 2025 Alexander William Edrik Cornelis.
          </div>
        </div>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-8 bottom-10 flex items-center gap-2 cursor-none"
        style={{ background: "none", border: "none", color: "var(--gold)" }}>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>Atas</span>
        <ArrowUp size={14} />
      </button>
    </footer>
  );
}
