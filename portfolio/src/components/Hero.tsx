"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MousePointer2 } from "lucide-react";
import { FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  "Laravel","•",
  "Next.js","•",
  "HTML5","•",
  "JavaScript","•",
  "TypeScript","•",
  "Java","•",
  "Python","•",
  "PHP","•",
  "React","•",
  "GSAP","•",
  "Figma","•",
  "C++","•",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Background grid lines
    tl.fromTo(bgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    // Title chars reveal
    const titleText = titleRef.current;
    if (titleText) {
      const lines = titleText.querySelectorAll(".line");
      tl.fromTo(lines,
        { y: "110%", skewY: 3 },
        { y: "0%", skewY: 0, duration: 1.1, stagger: 0.15, ease: "power4.out" },
        "-=1"
      );
    }

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.3"
    );

    // Parallax scroll
    gsap.to(titleRef.current, {
      yPercent: -25,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });
  }, []);

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col"
      style={{ background: "var(--black)" }}
    >
      {/* Background grid */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      >
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />

        {/* Gold glow orbs */}
        <div style={{
          position: "absolute", top: "20%", right: "10%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "20%", left: "5%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* Main content */}
    <div className="flex-1 flex flex-col justify-center items-center text-center px-8 md:px-16 lg:px-24 pt-28 pb-16">
        <div className="flex items-center gap-3 mb-10">
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
         <span className="section-label">TERSEDIA UNTUK PROJECT — 2025</span>
        </div>

        {/* Main headline */}
        <h1
          ref={titleRef}
          className="font-black leading-none"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            letterSpacing: "-0.03em",
          }}
        >
        <div style={{ overflow: "hidden" }}>
  <div
    className="line"
    style={{
      transform: "translateY(110%)",
      fontSize: "clamp(2.8rem,7vw,6rem)",
    }}
  >
    Alexander William
  </div>
</div>

<div style={{ overflow: "hidden" }}>
  <div
    className="line flex items-center justify-center gap-4"
    style={{ transform: "translateY(110%)" }}
  >
    <span
      style={{
        color: "var(--gold)",
        fontSize: "0.25em",
        letterSpacing: "0.4em",
      }}
    >
      
    </span>

    <span
      style={{
        WebkitTextStroke: "2px var(--gold)",
        color: "transparent",
        fontStyle: "italic",
        fontWeight: 200,
      }}
    >
      Edrik Cornelis
    </span>
  </div>
</div>
        </h1>

        {/* Subtitle row */}
        <div className="mt-10 flex flex-col items-center justify-center gap-8">
          <p
            ref={subtitleRef}
            className="max-w-3xl mx-auto"
            style={{
              color: "var(--gray-light)",
              fontSize: "1rem",
              lineHeight: "1.7",
              opacity: 0,
            }}
          >
           Frontend Developer dan Fullstack Developer yang
berfokus membangun website modern, cepat,
responsif, dan memiliki pengalaman pengguna
yang menarik menggunakan teknologi terkini.
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="flex flex-row justify-center items-center gap-4"
            style={{ opacity: 0 }}
          >
            <button onClick={scrollToWork} className="btn-primary">
              Project <ArrowRight size={14} />
            </button>
            <button onClick={scrollToAbout} className="btn-outline">
              About Me
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="mt-16 pt-8 flex justify-center items-center gap-16 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
           { num: "2+", label: "Tahun Pengalaman" },
  { num: "15+", label: "Project Selesai" },
  { num: "∞", label: "Baris Kode" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-black"
                style={{ fontSize: "2rem", color: "var(--gold)", lineHeight: 1 }}
              >
                {stat.num}
              </div>
              <div
                className="mt-1"
                style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--gray-light)", textTransform: "uppercase" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div
        className="marquee-wrapper py-4"
        style={{ borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}
      >
        <div className="marquee-inner">
          {marqueeItems.concat(marqueeItems).map((item, i) => (
            <span
              key={i}
              className="mx-4"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: item === "•" ? "var(--gold)" : "var(--gray-light)",
                fontWeight: item === "•" ? 700 : 400,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 right-8 flex items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase" }}>
          Scroll
        </span>
        <MousePointer2 size={12} style={{ color: "var(--gold)" }} />
      </div>
    </section>
  );
}
