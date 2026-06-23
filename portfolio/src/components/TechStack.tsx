"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SVG logos inline — no external deps needed
const techs = [
  {
    name: "Laravel",
    color: "#FF2D20",
    svg: `<svg viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M49.626 11.564a.809.809 0 01.028.209v10.972a.8.8 0 01-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 01-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 010 39.25V6.334c0-.072.01-.142.028-.209.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.022.055-.047.088-.065h.001l9.61-5.533a.802.802 0 01.8 0l9.61 5.533h.002c.032.018.059.043.088.065.026.02.055.037.078.06.028.028.048.06.071.093.018.024.04.045.055.071.023.04.036.082.052.124.008.023.022.044.028.067zm-1.574 10.718V13.12l-3.862 2.225-5.347 3.073v9.162l9.209-5.302zm-10.01 17.218v-9.162l-5.275 3.025-15.053 8.63v9.256l20.328-11.75zM1.602 7.719v31.53l20.328 11.75v-9.256l-10.626-6.102-.002-.001-.002-.002c-.031-.018-.057-.042-.086-.064-.025-.019-.053-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.030-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-.002-21.481L4.035 9.944 1.602 7.719zm8.81-5.994L1.602 7.719l8.81 5.994 8.81-5.994-8.81-5.994zm5.034 27.55l5.348-3.073V6.977l-3.863 2.225-5.348 3.073v19.222l3.863-2.225zM39.938 6.364l-8.81 5.994 8.81 5.994 8.809-5.994-8.809-5.994zm-9.608 13.526l-5.348-3.073-3.863-2.225v9.162l5.348 3.073 3.863 2.225v-9.162zM20.42 1.602l-8.809 5.994 8.81 5.994 8.808-5.994L20.42 1.602z" fill="#FF2D20"/></svg>`,
  },
  {
    name: "Next.js",
    color: "#fff",
    svg: `<svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="m" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black"/></mask><g mask="url(#m)"><circle cx="90" cy="90" r="90" fill="black"/><path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#g1)"/><rect x="115" y="54" width="12" height="72" fill="url(#g2)"/><defs><linearGradient id="g1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="g2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></g></svg>`,
  },
  {
    name: "HTML5",
    color: "#E34F26",
    svg: `<svg viewBox="0 0 452 520" xmlns="http://www.w3.org/2000/svg"><path d="M41.4 0L0 452 226 520l225.6-68L410.4 0H41.4zm326.6 410L226 480 84 410l-11-116h72l5.8 64L226 394l75.2-36 8-88H152l-5.4-58h176L334 120H118l-5.4-58h251l-10.6 142-71.4 256z" fill="#E34F26"/></svg>`,
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    svg: `<svg viewBox="0 0 630 630" xmlns="http://www.w3.org/2000/svg"><rect width="630" height="630" fill="#f7df1e"/><path d="M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.19 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 37.93 30.45 19.3 0 31.45-7.55 31.45-36.95V288.85h57.2V491.4c0 60.86-35.67 88.5-87.77 88.5-47.06 0-74.3-24.34-88.2-53.5z"/></svg>`,
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" rx="50" fill="#3178c6"/><path d="M87.3 334.5v-25.5H222v-246H87.3v-25.5h283.3v25.5H235.6v246h134.7v25.5H87.3z" fill="white"/><path d="M261.7 334.5v-176.2H222v176.2h39.7zm85.7-124.5c-6.2-11.8-19.3-18.1-38.5-18.1-21.5 0-37.1 9.6-37.1 24.6 0 12.7 8 21.7 30.5 27.6l18.8 5c18.3 4.9 26.3 11.5 26.3 23.3 0 13.3-12.4 22.1-31.9 22.1-16.4 0-28.2-6.3-35.2-18.9l-13.4 7.8c9.1 16.3 26.3 25.2 48.6 25.2 27.5 0 45.1-13.6 45.1-33.6 0-16.8-9.9-26.6-33.5-32.8l-18.8-4.9c-16.7-4.4-23.2-10.3-23.2-21.5 0-12.2 11.5-20.4 29.5-20.4 14.2 0 24.6 5.4 30.3 15.3l12.5-7.7z" fill="white"/></svg>`,
  },
  {
    name: "Python",
    color: "#3776AB",
    svg: `<svg viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pa" x1="12.959%" x2="79.639%" y1="12.039%" y2="78.201%"><stop offset="0%" stop-color="#387EB8"/><stop offset="100%" stop-color="#366994"/></linearGradient><linearGradient id="pb" x1="19.128%" x2="90.742%" y1="20.579%" y2="88.429%"><stop offset="0%" stop-color="#FFE052"/><stop offset="100%" stop-color="#FFC331"/></linearGradient></defs><path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#pa)"/><path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#pb)"/></svg>`,
  },
  {
    name: "Java",
    color: "#ED8B00",
    svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M20.58 30.77s-1.8.96.67 1.28c2.44.35 3.68.3 6.38-.34 0 0 .7.45 1.7.84C25.45 34.1 17.14 33.8 20.58 30.77zM19.77 27.01s-2.02 1.3.6 1.5c2.25.18 5.76.2 8.07-.67 0 0 .5.53 1.28.83C25.12 30.1 16.7 29.7 19.77 27.01z" fill="#0074BD"/><path d="M27.5 21.88c1.56 1.73-.41 3.28-.41 3.28s3.95-1.78 2.13-4.06c-1.7-2.11-3.01-3.16 4.06-6.78.01 0-11.12 2.4-5.78 7.56z" fill="#EA2D2E"/><path d="M35.7 33.86s1.33 1-.9 1.8c-3.26 1.13-13.57 1.47-16.42.05-.63-.25.56-.62 1.07-.74.56-.13.81-.1.81-.1-.93-.62-6.08 1.2-2.6 1.72 9.42 1.4 17.17-.62 17.04-2.73zM21.03 23.77s-4.28.93-1.52 1.27c1.17.14 3.51.1 5.7-.05 1.78-.12 3.58-.38 3.58-.38s-.63.25-1.08.52c-4.37 1.06-12.8.57-10.38-.5 2.06-1 3.7-.86 3.7-.86zM33.07 29.5c4.44-2.12 2.38-4.16 1.1-3.9-.33.08-.46.14-.46.14s.1-.17.3-.24c2.24-.73 3.96 2.13-.03 4.03-.02.01-.02 0-.91-.03zM27.87 6s2.45 2.26-2.32 5.74c-3.83 2.77-.87 4.36 0 6.16-2.24-1.85-3.87-3.48-2.77-5.02C24.36 10.64 28.79 9.62 27.87 6z" fill="#0074BD"/><path d="M22.28 41.98c4.27.25 10.81-.14 10.97-2 0 0-.46 1.08-3.52 1.94-3.47.97-7.75.85-10.29.23-.03 0-.01.1.84-.17z" fill="#0074BD"/></svg>`,
  },
  {
    name: "PHP",
    color: "#777BB4",
    svg: `<svg viewBox="0 0 256 135" xmlns="http://www.w3.org/2000/svg"><ellipse cx="128" cy="67.3" rx="128" ry="67.3" fill="#8892BF"/><path d="M38.9 45h24.7l4.7 23.9L81 45h22.4l-13.3 70.3H67.8l5.2-27.1-13.5 27.1H47l-3.1-27.1-5.2 27.1H16.6L38.9 45zm88.2 0h47.1c10.2 0 17.4 2.7 21.5 8.2 4.2 5.4 5.3 13.4 3.5 23.9-1.8 10.6-5.8 18.6-11.9 24.2-6.1 5.5-14.4 8.3-24.8 8.3H152l-3.1 15.7h-22.2L127.1 45zm24.2 43.8h7.6c5.3 0 8.8-1.4 10.6-4.3 1.7-2.9 2.9-7 3.4-12.5.5-5.4.2-8.8-1-10.2-1.2-1.4-4.1-2.1-8.7-2.1h-7.8l-4.1 19.1z" fill="white"/></svg>`,
  },
  {
    name: "Figma",
    color: "#F24E1E",
    svg: `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><path d="M100 150c0-27.6 22.4-50 50-50s50 22.4 50 50-22.4 50-50 50-50-22.4-50-50z" fill="#1ABCFE"/><path d="M0 250c0-27.6 22.4-50 50-50h50v50c0 27.6-22.4 50-50 50S0 277.6 0 250z" fill="#0ACF83"/><path d="M100 0v100H50C22.4 100 0 77.6 0 50S22.4 0 50 0h50z" fill="#FF7262"/><path d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" fill="#F24E1E"/><path d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" fill="#FF7262"/></svg>`,
  },
  {
    name: "C++",
    color: "#00599C",
    svg: `<svg viewBox="0 0 306 344" xmlns="http://www.w3.org/2000/svg"><path d="M302.107 258.262c2.401-4.159 3.893-8.845 3.893-13.053V98.791c0-4.208-1.49-8.895-3.893-13.052L153 172.175l149.107 86.087z" fill="#00599C"/><path d="M17.5 83.588C13.5 78.146 9 72.247 9 66.786v236.428C9 319.8 18.2 329 29.5 329c3.3 0 6.7-.861 9.6-2.583l257.606-148.683-149.107-86.087L17.5 83.588z" fill="#004482"/><path d="M296.607 82.082L39 7.583C36.1 5.861 32.7 5 29.5 5 18.2 5 9 14.2 9 25.5v7.286l288.007 166.32V95.135c0-5.19-1.507-9.65-4.4-13.053z" fill="#659AD2"/><path d="M207.81 172.175H202v-10h5.81v-10h10v10H224v10h-6.19v10h-10v-10zM243.81 172.175H238v-10h5.81v-10h10v10H260v10h-6.19v10h-10v-10z" fill="white"/><path d="M185 130.175c-23.2 0-42 18.8-42 42s18.8 42 42 42c14.6 0 27.4-7.4 34.8-18.8l-16.2-9.4c-4 6.4-10.8 10.2-18.6 10.2-12.4 0-22-9.6-22-22s9.6-22 22-22c8 0 14.8 3.8 18.8 10.4l16.2-9.2c-7.4-11.6-20.2-19.2-35-19.2z" fill="white"/></svg>`,
  },
  {
    name: "React",
    color: "#61DAFB",
    svg: `<svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg"><circle r="2.05" fill="#61dafb"/><g stroke="#61dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tech-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(".tech-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
      gsap.fromTo(".tech-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tech-grid", start: "top 78%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-8 md:px-16 lg:px-24"
      
    >
      <div className="gold-line mb-20" />

      <div className="max-w-6xl mx-auto">
        <div className="tech-label flex items-center gap-3 mb-8 justify-center">
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          <span className="section-label">Keahlian Teknologi</span>
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
        </div>

        <h2
          className="tech-heading font-black leading-none mb-16 text-center"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
        >
          Tech <span className="gold-gradient">Stack.</span>
        </h2>

        <div className="tech-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="tech-card group"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                padding: "1.5rem 1rem",
                background: "rgba(26,26,26,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "all 0.4s ease",
                cursor: "none",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(201,168,76,0.35)";
                el.style.background = "rgba(30,28,20,0.9)";
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 8px 30px rgba(201,168,76,0.08)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.background = "rgba(26,26,26,0.8)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div
                style={{ width: "40px", height: "40px", filter: "grayscale(100%) brightness(1.2)" }}
                dangerouslySetInnerHTML={{ __html: tech.svg }}
              />
              <span style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                textAlign: "center",
              }}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
