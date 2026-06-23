"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, MapPin, Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );

      gsap.fromTo(".contact-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );

      gsap.fromTo(".contact-info",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: ".contact-grid", start: "top 75%" } }
      );

      gsap.fromTo(".contact-form",
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: ".contact-grid", start: "top 75%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("your@email.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "0.875rem 1rem",
    fontSize: "0.85rem",
    color: "var(--white)",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-8 md:px-16 lg:px-24 relative"
      style={{ background: "rgba(14,14,14,0.95)" }}
    >
      <div className="gold-line mb-20" />

      <div className="max-w-6xl mx-auto">
        <div className="contact-label flex items-center gap-3 mb-8">
          <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          <span className="section-label">Get in Touch</span>
        </div>

        <h2
          className="contact-heading font-black leading-none mb-16"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
        >
          Let&apos;s Build<br />
          Something <span className="gold-gradient">Great.</span>
        </h2>

        <div className="contact-grid grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div className="contact-info flex flex-col gap-8">
            <p style={{ color: "var(--gray-light)", lineHeight: "1.8", fontSize: "1rem", maxWidth: "420px" }}>
              Have a project in mind, want to collaborate, or just want to say hi?
              My inbox is always open. I respond within 24 hours.
            </p>

            {/* Email copy */}
            <button
              onClick={copyEmail}
              className="flex items-center gap-4 group text-left cursor-none"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: "var(--gold)",
                  transition: "all 0.3s ease",
                }}
                className="group-hover:bg-gold group-hover:border-gold"
              >
                <Mail size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Email
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "0.95rem", color: "var(--white)" }}>your@email.com</span>
                  {copied
                    ? <Check size={14} style={{ color: "var(--gold)" }} />
                    : <Copy size={12} style={{ color: "var(--text-muted)" }} />
                  }
                </div>
              </div>
            </button>

            <div className="flex items-center gap-4">
              <div style={{ padding: "0.75rem", border: "1px solid rgba(201,168,76,0.2)", color: "var(--gold)" }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Based in
                </div>
                <span style={{ fontSize: "0.95rem", color: "var(--white)" }}>Yogyakarta, Indonesia</span>
              </div>
            </div>

            {/* Social links */}
            <div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "1rem" }}>
                Socials
              </div>
              <div className="flex gap-4">
                {["GitHub", "LinkedIn", "Instagram"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="nav-link"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form
            className="contact-form flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                Message
              </label>
              <textarea
                rows={6}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                style={{ ...inputStyle, resize: "none" }}
                onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = "rgba(201,168,76,0.4)"}
                onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.08)"}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary mt-2"
              style={{ justifyContent: "center", opacity: sending ? 0.7 : 1 }}
              disabled={sending}
            >
              {sending ? "Sending..." : <>Send Message <Send size={14} /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
