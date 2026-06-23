"use client";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/yolooooooo80", user: "@yolooooooo80" },
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/", user: "@yourinstagram" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/in/", user: "Alexander Cornelis" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(".about-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
      gsap.fromTo(".about-para",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: ".about-text", start: "top 75%" } }
      );
      gsap.fromTo(".social-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, scrollTrigger: { trigger: ".socials-grid", start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-8 md:px-16 lg:px-24"
      style={{ background: "var(--black)" }}
    >
      <div className="gold-line mb-20" />

      <div className="max-w-6xl mx-auto">
        {/* Label — centered */}
        <div className="about-label flex items-center gap-3 mb-8 justify-center">
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          <span className="section-label">Tentang Saya</span>
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div className="about-text">
            <h2
              className="about-heading font-black leading-none mb-8 text-center lg:text-left"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Developer yang<br />
              Berpikir dalam<br />
              <span className="gold-gradient">Sistem.</span>
            </h2>

            <p className="about-para mb-5" style={{ color: "var(--gray-light)", lineHeight: "1.8", fontSize: "0.95rem" }}>
              Saya adalah seorang frontend engineer dengan passion mendalam dalam membangun
              antarmuka yang seindah performa-nya. Setiap proyek yang saya kerjakan dimulai
              dengan memahami pengguna, lalu mundur ke solusi teknis yang paling elegan.
            </p>

            <p className="about-para mb-10" style={{ color: "var(--gray-light)", lineHeight: "1.8", fontSize: "0.95rem" }}>
              Saat ini sedang menempuh studi Ilmu Komputer sambil membangun aplikasi
              tingkat produksi. Pekerjaan saya mencakup landing page, dashboard SaaS,
              dan pengalaman interaktif — selalu mendorong batas kemampuan browser.
            </p>

            <div className="about-para flex justify-center lg:justify-start">
              <button className="btn-primary">
                <Download size={14} />
                Unduh CV
              </button>
            </div>
          </div>

          {/* Right: Socials */}
          <div>
            <div
              className="mb-6 section-label text-center lg:text-left"
              style={{ color: "var(--text-muted)" }}
            >
              Temukan Saya Di
            </div>

            <div className="socials-grid flex flex-col gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card experience-card flex items-center gap-5"
                  style={{ textDecoration: "none", cursor: "none" }}
                >
                  <div
                    style={{
                      width: "44px", height: "44px", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "var(--gold)",
                    }}
                  >
                    <s.icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--white)", marginBottom: "0.2rem" }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.user}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "var(--gold)", opacity: 0.5, fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                    ↗
                  </div>
                </a>
              ))}
            </div>

            {/* Small info box */}
            <div
              className="mt-8 p-5"
              style={{ border: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.04)" }}
            >
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                Status Saat Ini
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--gray-light)", lineHeight: "1.6" }}>
                Mahasiswa Ilmu Komputer — Yogyakarta, Indonesia.<br />
                Tersedia untuk <strong style={{ color: "var(--white)" }}>freelance</strong> &amp; <strong style={{ color: "var(--white)" }}>kolaborasi proyek</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
