"use client";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, GitFork, Users, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const githubData = {
  username: "yolooooooo80",
  name: "alex",
  repos: 28,
  followers: 1,
  avatar: "https://avatars.githubusercontent.com/u/187585690?v=4",
  pinnedRepos: [
    { name: "modul-9", lang: "Java", color: "#b07219", stars: 0, forks: 0 },
    { name: "modul-subprogram", lang: "Java", color: "#b07219", stars: 0, forks: 0 },
    { name: "UTS-PAD", lang: "Python", color: "#3572A5", stars: 0, forks: 0 },
  ],
};

const contribWeeks = Array.from({ length: 52 }, (_, wi) =>
  Array.from({ length: 7 }, (_, di) => {
    const rand = Math.random();
    const active = rand > 0.55;
    const intensity = active ? Math.floor(Math.random() * 4) + 1 : 0;
    return intensity;
  })
);

const intensityColor = (v: number) => {
  if (v === 0) return "rgba(255,255,255,0.05)";
  if (v === 1) return "rgba(201,168,76,0.2)";
  if (v === 2) return "rgba(201,168,76,0.45)";
  if (v === 3) return "rgba(201,168,76,0.7)";
  return "rgba(201,168,76,0.95)";
};

export default function GitHubStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gh-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(".gh-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: ".gh-grid", start: "top 78%" } }
      );
      gsap.fromTo(".contrib-cell",
        { opacity: 0, scale: 0 },
        {
          opacity: 1, scale: 1, duration: 0.3, stagger: 0.002,
          ease: "power2.out",
          scrollTrigger: { trigger: ".contrib-wrap", start: "top 80%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-8 md:px-16 lg:px-24"
      style={{ background: "var(--black)" }}
    >
      <div className="gold-line mb-20" />

      <div className="max-w-6xl mx-auto">
        <div className="gh-label flex items-center gap-3 mb-8 justify-center">
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          <span className="section-label">Statistik GitHub</span>
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
        </div>

        <h2
          className="font-black leading-none mb-4 text-center"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
        >
          Aktivitas <span className="gold-gradient">Kode.</span>
        </h2>

        <a
          href={`https://github.com/${githubData.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mb-14"
          style={{ color: "var(--gold)", fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none", cursor: "none" }}
        >
          <GithubIcon size={14} />
          @{githubData.username}
        </a>

        {/* Stats cards */}
        <div className="gh-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: BookOpen, label: "Repositori", value: githubData.repos },
            { icon: Users, label: "Followers", value: githubData.followers },
            { icon: Star, label: "Stars Diterima", value: "0" },
            { icon: GitFork, label: "Kontribusi", value: "150+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="gh-card experience-card text-center"
              style={{ padding: "2rem 1rem" }}
            >
              <stat.icon size={22} style={{ color: "var(--gold)", margin: "0 auto 0.75rem" }} />
              <div className="font-black" style={{ fontSize: "2rem", color: "var(--white)", lineHeight: 1, marginBottom: "0.4rem" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Contribution graph */}
        <div className="contrib-wrap" style={{ overflowX: "auto", paddingBottom: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", textAlign: "center" }}>
              Kontribusi — 2024 / 2025
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(52, 12px)`,
              gridTemplateRows: `repeat(7, 12px)`,
              gap: "3px",
              width: "fit-content",
              margin: "0 auto",
            }}
          >
            {contribWeeks.map((week, wi) =>
              week.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  className="contrib-cell"
                  title={`${day > 0 ? day * 2 : 0} kontribusi`}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "2px",
                    background: intensityColor(day),
                    gridColumn: wi + 1,
                    gridRow: di + 1,
                    transition: "transform 0.2s ease",
                    cursor: "none",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.4)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>Kurang</span>
            {[0, 1, 2, 3, 4].map(v => (
              <div key={v} style={{ width: "12px", height: "12px", borderRadius: "2px", background: intensityColor(v) }} />
            ))}
            <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>Lebih</span>
          </div>
        </div>

        {/* Pinned repos */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {githubData.pinnedRepos.map((repo) => (
            <a
              key={repo.name}
              href={`https://github.com/${githubData.username}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-card experience-card"
              style={{ textDecoration: "none", cursor: "none" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} style={{ color: "var(--gold)" }} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--white)" }}>{repo.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: repo.color }} />
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{repo.lang}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={11} style={{ color: "var(--text-muted)" }} />
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{repo.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork size={11} style={{ color: "var(--text-muted)" }} />
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{repo.forks}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
