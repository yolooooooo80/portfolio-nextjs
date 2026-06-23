"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01", title: "INDOJAVATRIP", category: "Web",
    desc: "Landing page tour & travel dengan hero imersif, animasi scroll halus, dan alur pemesanan yang dioptimalkan untuk konversi.",
    tags: ["Next.js", "GSAP", "Tailwind"], year: "2025",
  },
  {
    id: "02", title: "Platform EduTech", category: "Web",
    desc: "Antarmuka e-learning dengan ruang video langsung, pelacakan kemajuan, dan rekomendasi kursus adaptif.",
    tags: ["React", "WebRTC", "Supabase"], year: "2025",
  },
  {
    id: "03", title: "SEA Catering", category: "Web",
    desc: "Platform katering full-stack dengan pembayaran Stripe, autentikasi JWT, dan dashboard manajemen pesanan real-time.",
    tags: ["Next.js", "Stripe", "PostgreSQL"], year: "2025",
  },
  {
    id: "04", title: "Cleanscape VR", category: "Lainnya",
    desc: "Simulasi WebVR fasilitas pengolahan air limbah industri, dibangun dengan A-Frame dan fotogrametri 360°.",
    tags: ["A-Frame", "React", "Three.js"], year: "2025",
  },
  {
    id: "05", title: "CalTrack", category: "Mobile",
    desc: "Pelacak nutrisi berbasis AI dengan pengenalan makanan kamera dan target harian yang dipersonalisasi.",
    tags: ["Flutter", "Gemini AI", "Firebase"], year: "2024",
  },
  {
    id: "06", title: "GatotKota", category: "Web",
    desc: "Platform teknologi sipil untuk melaporkan masalah infrastruktur publik dengan pemetaan real-time menggunakan Leaflet.",
    tags: ["Next.js", "Leaflet", "Tailwind"], year: "2025",
  },
];

const filters = ["Semua", "Web", "Mobile", "Lainnya"];
const filterMap: Record<string, string> = { "Semua": "All", "Web": "Web", "Mobile": "Mobile", "Lainnya": "Lainnya" };

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filtered = activeFilter === "Semua" ? projects : projects.filter(p => p.category === filterMap[activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".work-label", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
      gsap.fromTo(".work-heading", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(".project-card-item",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
    );
  }, [activeFilter]);

  return (
    <section id="work" ref={sectionRef} className="py-32 px-8 md:px-16 lg:px-24" style={{ background: "var(--black)" }}>
      <div className="gold-line mb-20" />

      <div className="max-w-6xl mx-auto">
        <div className="work-label flex items-center gap-3 mb-8 justify-center">
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          <span className="section-label">Portofolio</span>
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
        </div>

        <div className="flex flex-col items-center gap-6 mb-14">
          <h2 className="work-heading font-black leading-none text-center"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            Proyek <span className="gold-gradient">Terpilih.</span>
          </h2>
          <div className="flex gap-2 flex-wrap justify-center">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} className="cursor-none"
                style={{
                  padding: "0.4rem 1rem", fontSize: "0.65rem", letterSpacing: "0.15em",
                  textTransform: "uppercase", border: "1px solid",
                  borderColor: activeFilter === f ? "var(--gold)" : "rgba(255,255,255,0.1)",
                  color: activeFilter === f ? "var(--gold)" : "var(--gray-light)",
                  background: activeFilter === f ? "rgba(201,168,76,0.08)" : "transparent",
                  transition: "all 0.3s ease",
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <div key={project.id} className="project-card-item project-card group" style={{ height: "340px", cursor: "none" }} data-hover>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, #111 0%, #1a1a1a 50%, #0f0f0f 100%)",
                backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }} />
              <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                fontSize: "8rem", fontWeight: 900, color: "rgba(255,255,255,0.02)", letterSpacing: "-0.05em",
              }} className="group-hover:opacity-0 transition-opacity duration-500">
                {project.id}
              </div>
              <div style={{
                position: "absolute", top: 0, right: 0, width: "60px", height: "60px",
                background: "linear-gradient(225deg, rgba(201,168,76,0.15), transparent)", transition: "all 0.4s ease",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)", zIndex: 1,
              }} />
              <div style={{ position: "absolute", inset: 0, zIndex: 2, padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>
                  {project.category} — {project.year}
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold" style={{ fontSize: "1.1rem", letterSpacing: "0.02em", lineHeight: "1.2" }}>{project.title}</h3>
                  <ArrowUpRight size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "0.1rem" }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--gray-light)", lineHeight: "1.5", marginBottom: "1rem" }}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-400">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
                      padding: "0.2rem 0.5rem", background: "rgba(201,168,76,0.1)",
                      color: "var(--gold)", border: "1px solid rgba(201,168,76,0.2)",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
