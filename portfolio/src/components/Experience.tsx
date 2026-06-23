"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "2025 — Present",
    role: "Fullstack Developer",
    company: "Freelance / Client Work",
    location: "Remote",
    type: "Contract",
    desc: "Delivered end-to-end web solutions for clients across various industries. Built scalable applications using Next.js, Supabase, and modern deployment pipelines on Vercel.",
    tags: ["Next.js", "Supabase", "Vercel", "TypeScript"],
  },
  {
    period: "2025",
    role: "Software Engineering Academy",
    company: "COMPFEST17 — UI Indonesia",
    location: "Jakarta, Indonesia",
    type: "Intensive Program",
    desc: "Selected among top 0.5% (20 of 4,000 applicants) for an elite software engineering academy. Awarded 'Best Case Study Team' for the SEA Catering project built with Next.js and Stripe.",
    tags: ["Next.js", "Stripe", "Supabase", "JWT"],
  },
  {
    period: "2025",
    role: "Laboratory Assistant",
    company: "FILKOM — Universitas Brawijaya",
    location: "Malang, Indonesia",
    type: "Part-time",
    desc: "Mentored students through Systems Analysis and Design coursework. Led lab sessions, coordinated teams, and evaluated project submissions with consistent academic rigor.",
    tags: ["Teaching", "System Design", "UML", "Leadership"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );

      gsap.fromTo(".exp-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );

      gsap.fromTo(".exp-item",
        { opacity: 0, y: 50, x: -20 },
        {
          opacity: 1, y: 0, x: 0, duration: 0.8, stagger: 0.2,
          scrollTrigger: { trigger: ".exp-list", start: "top 75%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-8 md:px-16 lg:px-24"
      style={{ background: "rgba(16,16,16,0.5)" }}
    >
      <div className="gold-line mb-20" />

      <div className="max-w-6xl mx-auto">
        <div className="exp-label flex items-center gap-3 mb-8">
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          <span className="section-label">Career Path</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16">
          <h2
            className="exp-heading font-black leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
          >
            Where I&apos;ve<br />
            <span className="gold-gradient">Been.</span>
          </h2>
          <p
            className="max-w-xs"
            style={{ color: "var(--gray-light)", fontSize: "0.9rem", lineHeight: "1.7", paddingTop: "0.5rem" }}
          >
            Real-world experience shaping how I think about software, teams, and delivery.
          </p>
        </div>

        <div className="exp-list flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <div key={i} className="exp-item experience-card group">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Period */}
                <div
                  className="flex-shrink-0 w-full md:w-36"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--gold)", textTransform: "uppercase", paddingTop: "0.15rem" }}
                >
                  {exp.period}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3
                        className="font-bold mb-1"
                        style={{ fontSize: "1rem", letterSpacing: "0.02em" }}
                      >
                        {exp.role}
                      </h3>
                      <div style={{ fontSize: "0.8rem", color: "var(--gray-light)" }}>
                        {exp.company} — {exp.location}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
                        padding: "0.25rem 0.6rem", border: "1px solid rgba(201,168,76,0.2)",
                        color: "var(--gold)", whiteSpace: "nowrap", flexShrink: 0,
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  <p className="mb-4" style={{ fontSize: "0.85rem", color: "var(--gray-light)", lineHeight: "1.7" }}>
                    {exp.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "0.2rem 0.6rem", background: "rgba(255,255,255,0.04)",
                          color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
