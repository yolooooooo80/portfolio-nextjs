"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(".footer-big",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={ref}
      className="relative pt-24 pb-10 px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: "var(--black)", borderTop: "1px solid rgba(201,168,76,0.08)" }}
    >
      {/* Giant text */}
      <div
        className="footer-big font-black select-none pointer-events-none"
        style={{
          fontSize: "clamp(5rem, 18vw, 18rem)",
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(201,168,76,0.08)",
          lineHeight: 0.85,
          marginBottom: "-1rem",
        }}
      >
        YOUR.
      </div>

      <div className="relative z-10 mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <div
            className="font-black text-2xl mb-2"
            style={{ letterSpacing: "0.3em" }}
          >
            <span style={{ color: "var(--gold)" }}>Y</span>OUR
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            Available for new projects
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            Yogyakarta, Indonesia
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex gap-6">
            {["GitHub", "LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="#" className="nav-link">{s}</a>
            ))}
          </div>
          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            © 2025 Your Name. All rights reserved.
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollTop}
        className="absolute right-8 bottom-10 flex items-center gap-2 cursor-none"
        style={{ background: "none", border: "none", color: "var(--gold)" }}
        aria-label="Back to top"
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          Top
        </span>
        <ArrowUp size={14} />
      </button>
    </footer>
  );
}
