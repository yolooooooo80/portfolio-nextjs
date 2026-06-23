"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Code2, Palette, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "GSAP", "Framer Motion", "Node.js", "Prisma",
  "PostgreSQL", "GraphQL", "Figma", "Docker",
];

const highlights = [
  { icon: Code2, title: "Clean Code", desc: "Obsessed with readability, performance, and maintainability." },
  { icon: Palette, title: "Design-Driven", desc: "Bridging the gap between beautiful design and robust engineering." },
  { icon: Zap, title: "Performance First", desc: "Every millisecond matters. Core Web Vitals are non-negotiable." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-label",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );

      gsap.fromTo(".about-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

      gsap.fromTo(".about-para",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: textRef.current, start: "top 75%" }
        }
      );

      gsap.fromTo(".highlight-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: "top 75%" }
        }
      );

      gsap.fromTo(".skill-tag",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.4, stagger: 0.06,
          scrollTrigger: { trigger: skillsRef.current, start: "top 80%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-8 md:px-16 lg:px-24 relative"
      style={{ background: "var(--black)" }}
    >
      {/* Top divider */}
      <div className="gold-line mb-20" />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="about-label flex items-center gap-3 mb-8">
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          <span className="section-label">Who I Am</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: Text */}
          <div ref={textRef}>
            <h2
              className="about-heading font-black leading-none mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              A Developer<br />
              Who Thinks<br />
              <span className="gold-gradient">In Systems.</span>
            </h2>

            <p
              className="about-para mb-6"
              style={{ color: "var(--gray-light)", lineHeight: "1.8", fontSize: "1rem" }}
            >
              I'm a frontend engineer with a deep passion for crafting interfaces
              that are as beautiful as they are performant. Every project I take
              on starts with understanding the user, then working backwards to
              the most elegant technical solution.
            </p>

            <p
              className="about-para mb-10"
              style={{ color: "var(--gray-light)", lineHeight: "1.8", fontSize: "1rem" }}
            >
              Currently studying Computer Science while building production-grade
              applications. My work spans landing pages, SaaS dashboards, and
              interactive experiences — always pushing the boundary of what
              the browser can do.
            </p>

            <button className="btn-primary about-para">
              <Download size={14} />
              Download CV
            </button>
          </div>

          {/* Right: Highlights + Skills */}
          <div>
            {/* Highlight cards */}
            <div ref={cardsRef} className="flex flex-col gap-4 mb-10">
              {highlights.map((h) => (
                <div key={h.title} className="highlight-card experience-card">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 p-2"
                      style={{ border: "1px solid rgba(201,168,76,0.2)", color: "var(--gold)" }}
                    >
                      <h.icon size={18} />
                    </div>
                    <div>
                      <div
                        className="font-semibold mb-1"
                        style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
                      >
                        {h.title}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--gray-light)", lineHeight: "1.6" }}>
                        {h.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div ref={skillsRef}>
              <div
                className="mb-4 section-label"
                style={{ color: "var(--text-muted)" }}
              >
                Technical Arsenal
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
