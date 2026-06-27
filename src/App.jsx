import { useState, useEffect, useRef } from "react";
import { applySEO } from "./seo.js";
import { CASE_STUDIES, INDUSTRIES, getCaseStudy, getRelated } from "./caseStudies.js";
import IntakePage from "./IntakePage.jsx";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  white:       "var(--c-white)",
  cream:       "var(--c-cream)",
  creamDark:   "var(--c-cream-dark)",
  ink:         "var(--c-ink)",
  inkSoft:     "var(--c-ink-soft)",
  inkMid:      "var(--c-ink-mid)",
  muted:       "var(--c-muted)",
  mutedLight:  "var(--c-muted-light)",
  border:      "var(--c-border)",
  borderMid:   "var(--c-border-mid)",
  orange:      "#E8870A",
  orangeLight: "#F5A535",
  orangePale:  "var(--c-orange-pale)",
  orangeBorder:"rgba(232,135,10,0.25)",
  black:       "var(--c-black)",
  // Always-light text that sits on the orange/dark accent (never inverts)
  onAccent:    "#FFFFFF",
  // Intentional dark contrast bands (footer/CTA) that stay dark in both themes
  inkBg:       "var(--c-ink-bg)",
};

const FONT_DISPLAY = "'DM Serif Display', Georgia, serif";
const FONT_BODY    = "'Inter', system-ui, sans-serif";

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ─── THEME HOOK ───────────────────────────────────────────────────────────────
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  // Fall back to the value the inline boot script already applied, then OS pref
  const current = document.documentElement.dataset.theme;
  if (current === "light" || current === "dark") return current;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem("theme", theme); } catch (e) { /* ignore */ }
  }, [theme]);
  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));
  return { theme, toggleTheme };
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "none", border: `1px solid ${C.border}`,
        width: 38, height: 38, borderRadius: 8, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: C.inkMid, flexShrink: 0, transition: "color 0.2s, border-color 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.color = C.orange; e.currentTarget.style.borderColor = C.orange; }}
      onMouseLeave={e => { e.currentTarget.style.color = C.inkMid; e.currentTarget.style.borderColor = C.border; }}
    >
      {isDark ? (
        // Sun
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Badge({ children }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 500,
      letterSpacing: "0.08em", textTransform: "uppercase",
      padding: "4px 12px", borderRadius: 2,
      color: C.orange, background: C.orangePale,
      border: `1px solid ${C.orangeBorder}`,
    }}>{children}</span>
  );
}

function Label({ children }) {
  return (
    <p style={{
      fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
      color: C.orange, marginBottom: 12, fontWeight: 500,
    }}>{children}</p>
  );
}

function Heading({ children, size = "2.4rem", color = C.ink, style: s = {} }) {
  return (
    <h2 style={{
      fontFamily: FONT_DISPLAY,
      fontSize: `clamp(1.5rem, 4vw, ${size})`,
      color, lineHeight: 1.18, ...s,
    }}>{children}</h2>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", disabled = false, full = false }) {
  const pad = size === "sm" ? "8px 18px" : size === "lg" ? "14px 32px" : "11px 26px";
  const styles = {
    primary: { background: C.orange,   color: C.onAccent,  border: "none" },
    ghost:   { background: "none",     color: C.orange, border: `1.5px solid ${C.orange}` },
    dark:    { background: C.inkBg,    color: C.onAccent,  border: "none" },
    outline: { background: "none",     color: C.inkMid, border: `1.5px solid ${C.borderMid}` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...styles[variant], padding: pad, borderRadius: 4,
      fontSize: size === "sm" ? 12 : 14, fontWeight: 500,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: FONT_BODY, letterSpacing: "0.03em",
      opacity: disabled ? 0.4 : 1, transition: "opacity 0.2s",
      width: full ? "100%" : "auto",
    }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.opacity = "0.82")}
      onMouseLeave={e => !disabled && (e.currentTarget.style.opacity = "1")}
    >{children}</button>
  );
}

function Dot() {
  return <div style={{ width: 5, height: 5, background: C.orange, flexShrink: 0, marginTop: 7 }} />;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const links = ["About", "Services", "CaseStudies", "Demo", "Intake", "Contact"];
  const label = (k) => (k === "CaseStudies" ? "Case Studies" : k);
  const isActive = (k) => page === k || (k === "CaseStudies" && page === "CaseStudyDetail");
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const navigate = (p) => { setPage(p); setMenuOpen(false); };

  return (
    <nav ref={menuRef} style={{
      position: "sticky", top: 0, zIndex: 100,
      background: C.white, borderBottom: `1px solid ${C.border}`,
      padding: "0 1.25rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <button onClick={() => navigate("Home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <img src="/logo.svg" alt="Avantgarde Consulting Group" style={{ height: 38, width: "auto", display: "block" }} />
        </button>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
            {links.map(l => (
              <button key={l} onClick={() => navigate(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: FONT_BODY, fontSize: 13,
                color: isActive(l) ? C.orange : C.muted,
                fontWeight: isActive(l) ? 500 : 400,
                letterSpacing: "0.06em", textTransform: "uppercase",
                borderBottom: `2px solid ${isActive(l) ? C.orange : "transparent"}`,
                paddingBottom: 2, transition: "color 0.2s", whiteSpace: "nowrap",
              }}>{label(l)}</button>
            ))}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <Btn onClick={() => navigate("Contact")} size="sm">Book a Call</Btn>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: "none", border: `1px solid ${C.border}`,
            padding: "8px 10px", borderRadius: 4, cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 4,
          }} aria-label="Toggle menu">
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 20, height: 2, background: menuOpen ? C.orange : C.inkMid,
                transition: "background 0.2s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4px, 4px)"
                  : i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                  : "scaleX(0)"
                  : "none",
              }} />
            ))}
          </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{
          borderTop: `1px solid ${C.border}`,
          padding: "1rem 0 1.25rem",
          display: "flex", flexDirection: "column", gap: 2,
        }}>
          {links.map(l => (
            <button key={l} onClick={() => navigate(l)} style={{
              background: isActive(l) ? C.orangePale : "none",
              border: "none", cursor: "pointer",
              fontFamily: FONT_BODY, fontSize: 14,
              color: isActive(l) ? C.orange : C.inkMid,
              fontWeight: isActive(l) ? 500 : 400,
              padding: "12px 1rem", textAlign: "left",
              borderLeft: `3px solid ${isActive(l) ? C.orange : "transparent"}`,
            }}>{label(l)}</button>
          ))}
          <div style={{ padding: "8px 1rem 0" }}>
            <Btn onClick={() => navigate("Contact")} full>Book a Call</Btn>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: C.black, color: C.onAccent, padding: "3.5rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? "2rem" : "2.5rem",
          marginBottom: "2.5rem",
        }}>
          <div>
            <img src="/logo-dark.svg" alt="Avantgarde Consulting Group"
              style={{ height: 40, width: "auto", display: "block", marginBottom: 16 }} />
            <p style={{ fontSize: 14, color: "#9A9A9E", lineHeight: 1.85, maxWidth: 280, marginBottom: 14 }}>
              AI governance, intelligent automation, and cloud advisory for organisations ready to operate smarter.
            </p>
            <p style={{ fontSize: 11, color: C.orange, letterSpacing: "0.18em", textTransform: "uppercase" }}>Modern infrastructure. Human impact.</p>
          </div>

          {isMobile ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {[
                { label: "Pages",    items: ["Home", "About", "Services", "Case Studies", "Demo", "Contact"] },
                { label: "Services", items: ["AI Governance", "Workflow Automation", "Power Platform", "Cloud Advisory"] },
              ].map(col => (
                <div key={col.label}>
                  <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.orange, marginBottom: 12 }}>{col.label}</p>
                  {col.items.map(item => (
                    <p key={item} onClick={() => col.label === "Pages" && setPage(item === "Case Studies" ? "CaseStudies" : item)} style={{
                      fontSize: 13, color: "#9A9A9E", marginBottom: 9, lineHeight: 1.5,
                      cursor: col.label === "Pages" ? "pointer" : "default",
                    }}>{item}</p>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            [
              { label: "Pages",    items: ["Home", "About", "Services", "Case Studies", "Demo", "Contact"] },
              { label: "Services", items: ["AI Governance", "Workflow Automation", "Power Platform", "Cloud Advisory"] },
              { label: "Sectors",  items: ["Professional Services", "Education & Training", "Healthcare", "E-commerce"] },
            ].map(col => (
              <div key={col.label}>
                <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.orange, marginBottom: 14 }}>{col.label}</p>
                {col.items.map(item => (
                  <p key={item} onClick={() => col.label === "Pages" && setPage(item === "Case Studies" ? "CaseStudies" : item)} style={{
                    fontSize: 13, color: "#9A9A9E", marginBottom: 10, lineHeight: 1.5,
                    cursor: col.label === "Pages" ? "pointer" : "default",
                  }}
                    onMouseEnter={e => col.label === "Pages" && (e.target.style.color = C.onAccent)}
                    onMouseLeave={e => col.label === "Pages" && (e.target.style.color = "#9A9A9E")}
                  >{item}</p>
                ))}
              </div>
            ))
          )}
        </div>
        <div style={{ height: 1, background: "#222", marginBottom: "1.5rem" }} />
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: 6 }}>
          <p style={{ fontSize: 12, color: "#444" }}>© 2026 Avantgarde Consulting Group LLC · CAGE: 8YUV5 · DUNS: 117944537</p>
          <p style={{ fontSize: 12, color: "#444" }}>info@meetavantgarde.com · (844) 311-3117</p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const isMobile = useIsMobile();

  const problems = [
    { icon: "⚡", label: "Manual data entry eating hours",         fix: "Automated" },
    { icon: "📋", label: "Compliance docs built from scratch",     fix: "Systematized" },
    { icon: "📧", label: "Follow-ups falling through the cracks", fix: "Triggered" },
    { icon: "📊", label: "Reports assembled by hand every month", fix: "Generated" },
  ];
  const sectors = [
    { icon: "⚖️", name: "Professional Services",
      desc: "Law firms, consultancies, and financial advisors spending billable hours on admin that machines should handle.",
      wins: ["Client onboarding automation", "Auto-drafted invoices & billing", "Contract signature tracking", "Lead qualification workflows"] },
    { icon: "🎓", name: "Education & Training",
      desc: "Training organisations drowning in enrollment, scheduling, and certificate admin instead of delivering learning.",
      wins: ["Enrollment → cohort assignment", "Personalised welcome sequences", "Auto-issued completion certificates", "At-risk learner early alerts"] },
  ];
  const stats = [
    { num: "15+", label: "Years enterprise IT experience" },
    { num: "6",   label: "Active technical certifications" },
    { num: "12+", label: "Hours saved per client per week" },
    { num: "48h", label: "Free audit turnaround" },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ background: C.cream, padding: isMobile ? "3.5rem 1.25rem 3rem" : "6rem 2rem 5rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{
          maxWidth: 1080, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
          gap: isMobile ? "2.5rem" : "4rem",
          alignItems: "center",
        }}>
          <div>
            <Badge>AI Governance · Automation · Cloud Advisory</Badge>
            <h1 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: isMobile ? "2.2rem" : "clamp(2.6rem, 5vw, 4rem)",
              lineHeight: 1.15, color: C.ink, margin: "18px 0 18px",
            }}>
              Your business runs on humans doing things{" "}
              <span style={{ color: C.orange, fontStyle: "italic" }}>machines should do.</span>
            </h1>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9, marginBottom: 30, maxWidth: 500 }}>
              We design and deploy AI-powered automation for professional service firms and educational organisations — so your team focuses on work only humans can do.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn onClick={() => setPage("Demo")} size="lg" full={isMobile}>See it in action</Btn>
              {!isMobile && <Btn onClick={() => setPage("Services")} variant="ghost" size="lg">Explore services</Btn>}
              {isMobile && <Btn onClick={() => setPage("Services")} variant="ghost" size="lg" full>Explore services</Btn>}
            </div>
          </div>

          {/* Problem → Solution cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {problems.map((p, i) => (
              <div key={i} style={{
                background: C.white, border: `1px solid ${C.border}`, borderRadius: 8,
                padding: "13px 16px", display: "flex",
                alignItems: "center", justifyContent: "space-between", gap: 8,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{p.icon}</span>
                  <span style={{ fontSize: 12, color: C.inkMid, lineHeight: 1.4 }}>{p.label}</span>
                </div>
                <Badge>{p.fix} ✓</Badge>
              </div>
            ))}
            <div style={{
              background: C.orange, borderRadius: 8,
              padding: "14px 18px", display: "flex",
              alignItems: "center", justifyContent: "space-between", marginTop: 4,
            }}>
              <span style={{ fontSize: 13, color: C.onAccent, fontWeight: 500 }}>Average time saved per week</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: C.onAccent }}>12+ hrs</span>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS STRIP */}
      <section style={{ background: C.creamDark, borderBottom: `1px solid ${C.border}`, padding: "0.9rem 1.25rem", overflowX: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", whiteSpace: "nowrap", justifyContent: isMobile ? "flex-start" : "center", minWidth: "max-content", margin: "0 auto" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.mutedLight }}>Credentials</span>
          {["15+ Yrs Enterprise IT", "AWS Certified", "Azure 70-533", "Security+", "ITIL 4", "PL-900", "M.Ed · M.S. IT"].map(c => (
            <span key={c} style={{ fontSize: 12, color: C.muted }}>· {c}</span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{
          maxWidth: 1080, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
        }}>
          {stats.map((s, i) => (
            <div key={s.num} style={{
              padding: isMobile ? "1.75rem 1rem" : "2.5rem 1.5rem",
              textAlign: "center",
              borderRight: (!isMobile && i < 3) || (isMobile && i % 2 === 0) ? `1px solid ${C.border}` : "none",
              borderBottom: isMobile && i < 2 ? `1px solid ${C.border}` : "none",
            }}>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "2rem" : "2.6rem", color: C.orange, marginBottom: 6 }}>{s.num}</p>
              <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section style={{ padding: isMobile ? "3.5rem 1.25rem" : "5.5rem 2rem", background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Who we work with</Label>
          <Heading size="2.8rem" style={{ marginBottom: 12 }}>We specialise, not generalise.</Heading>
          <p style={{ fontSize: 15, color: C.muted, marginBottom: 36, maxWidth: 520, lineHeight: 1.85 }}>
            Two sectors. Deep fluency in both. We understand your workflows before you explain them.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
            {sectors.map(s => (
              <div key={s.name} style={{
                border: `1px solid ${C.border}`, borderRadius: 12,
                padding: isMobile ? "1.75rem" : "2.5rem", background: C.cream,
                borderTop: `3px solid ${C.orange}`,
              }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: C.ink, marginBottom: 10 }}>{s.name}</h3>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 22 }}>
                  {s.wins.map(w => (
                    <div key={w} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Dot />
                      <span style={{ fontSize: 13, color: C.inkMid }}>{w}</span>
                    </div>
                  ))}
                </div>
                <Btn onClick={() => setPage("Services")} variant="ghost" size="sm" full={isMobile}>See how →</Btn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: isMobile ? "3.5rem 1.25rem" : "5.5rem 2rem", background: C.creamDark, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>How it works</Label>
          <Heading style={{ marginBottom: 36 }}>From first call to running system.</Heading>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 14,
          }}>
            {[
              { step: "Discover", desc: "We map your workflows, identify bottlenecks, and quantify the time cost." },
              { step: "Design",   desc: "We architect the automation — what triggers what, where data flows." },
              { step: "Build",    desc: "We build and test in staging before anything touches your live operations." },
              { step: "Support",  desc: "Retainer options to maintain and expand as your needs evolve." },
            ].map((s, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 10, padding: "1.5rem", border: `1px solid ${C.border}` }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: C.orangePale, border: `1px solid ${C.orangeBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: C.orange, fontWeight: 600, marginBottom: 14,
                }}>{i + 1}</div>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", color: C.ink, marginBottom: 8 }}>{s.step}</p>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: isMobile ? "3.5rem 1.25rem" : "5.5rem 2rem", background: C.inkBg, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Heading size="2.6rem" color={C.onAccent} style={{ marginBottom: 18 }}>
            Not sure where automation fits in your business?
          </Heading>
          <p style={{ fontSize: 15, color: "#9A9A9E", lineHeight: 1.9, marginBottom: 32 }}>
            Start with a free workflow audit. Tell us what your team does manually every week — we'll tell you what's automatable and what it's costing you.
          </p>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center" }}>
            <Btn onClick={() => setPage("Demo")} size="lg" full={isMobile}>Get a free audit</Btn>
            <Btn onClick={() => setPage("Demo")} variant="outline" size="lg" full={isMobile}>Watch a demo</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  const isMobile = useIsMobile();

  const certs = [
    { cert: "Amazon Web Services", body: "Cloud infrastructure & advisory" },
    { cert: "Microsoft Azure", body: "Cloud architecture & governance" },
    { cert: "Microsoft 365", body: "Productivity & collaboration" },
    { cert: "Power Platform", body: "Apps, Automate & SharePoint" },
    { cert: "n8n & Power Automate", body: "Workflow automation builds" },
    { cert: "AI Governance", body: "NIST AI RMF · EU AI Act" },
  ];
  const values = [
    { title: "Precision over volume",      desc: "We work with a focused client roster so every engagement gets full attention — not a junior associate." },
    { title: "Honest about fit",           desc: "If automation isn't the right answer for your problem, we'll tell you that in the first call. No upsell for its own sake." },
    { title: "Compliance is non-optional", desc: "In professional services and education, data handling matters. We build with GDPR and security best practices baked in from day one." },
    { title: "We transfer knowledge",      desc: "Every build comes with documentation. You should understand what we built and why — not be dependent on us to change a single field." },
  ];

  const pad = isMobile ? "3rem 1.25rem" : "5.5rem 2rem 4.5rem";

  return (
    <div style={{ background: C.white }}>
      {/* HERO */}
      <section style={{ padding: pad, background: C.cream, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "4rem", alignItems: "start" }}>
          <div>
            <Label>About</Label>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "2rem" : "clamp(2rem, 4vw, 3.2rem)", color: C.ink, lineHeight: 1.18, marginBottom: 22 }}>
              Built by someone who's worked inside the complexity.
            </h1>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9, marginBottom: 14 }}>
              Avantgarde Consulting Group is led by <strong style={{ color: C.inkSoft, fontWeight: 500 }}>Akisha D. Anthony</strong> — an enterprise IT strategist with over 15 years of experience spanning cloud infrastructure, digital transformation, and AI governance.
            </p>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9, marginBottom: 14 }}>
              Before founding Avantgarde, Akisha spent years working inside some of the most compliance-heavy, operationally complex environments in enterprise IT — which means she understands both the technical architecture and the organisational reality of making change actually stick.
            </p>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9 }}>
              Holding dual master's degrees in Instructional Design and Information Technology, she bridges the gap between human-centred design and enterprise infrastructure in a way few consultants can.
            </p>
          </div>

          {/* Founder card */}
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "2rem", borderTop: `3px solid ${C.orange}` }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: C.orangePale, border: `1px solid ${C.orangeBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: FONT_DISPLAY, fontSize: 26, color: C.orange, marginBottom: 18,
            }}>A</div>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: C.ink, marginBottom: 4 }}>Akisha D. Anthony</p>
            <p style={{ fontSize: 13, color: C.orange, marginBottom: 20, fontWeight: 500 }}>Founder & Principal Consultant</p>
            {[
              ["Degree",   "M.Ed. Instructional Design — George Mason University"],
              ["Degree",   "M.S. Information Technology — UMUC"],
              ["Based",    "Lisbon, Portugal · Dallas, TX, USA"],
              ["Focus",    "AI Governance · Automation · Cloud Advisory"],
            ].map(([label, val], i) => (
              <div key={i} style={{ display: "flex", gap: 12, fontSize: 13, borderTop: `1px solid ${C.border}`, padding: "11px 0", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                <span style={{ color: C.mutedLight, minWidth: 70, flexShrink: 0 }}>{label}</span>
                <span style={{ color: C.inkMid, lineHeight: 1.55 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "4.5rem 2rem", background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Certifications & credentials</Label>
          <Heading style={{ marginBottom: 32 }}>The credentials behind the work.</Heading>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 14 }}>
            {certs.map(c => (
              <div key={c.cert} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "1.25rem", background: C.cream }}>
                <div style={{ width: 6, height: 6, background: C.orange, borderRadius: "50%", marginBottom: 10 }} />
                <p style={{ fontWeight: 500, fontSize: 13, color: C.ink, marginBottom: 5 }}>{c.cert}</p>
                <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "4.5rem 2rem", background: C.creamDark, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>How we work</Label>
          <Heading style={{ marginBottom: 32 }}>The principles behind every engagement.</Heading>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            {values.map(v => (
              <div key={v.title} style={{ background: C.white, borderRadius: 10, padding: "1.5rem", border: `1px solid ${C.border}` }}>
                <p style={{ fontWeight: 500, fontSize: 15, color: C.ink, marginBottom: 8 }}>{v.title}</p>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY PROFILE */}
      <section style={{ padding: isMobile ? "2rem 1.25rem" : "2.5rem 2rem", background: C.inkBg }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 20 }}>
          <div>
            <Label>Company profile</Label>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[["CAGE", "8YUV5"], ["DUNS", "117944537"], ["SIC", "7373"], ["NAICS", "541511 · 541512"]].map(([k, v]) => (
                <div key={k}>
                  <p style={{ fontSize: 10, color: "#555", marginBottom: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>{k}</p>
                  <p style={{ fontSize: 13, color: "#C8C8CC" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <Btn onClick={() => setPage("Contact")} full={isMobile}>Work with us →</Btn>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  const [sector, setSector] = useState("All");
  const isMobile = useIsMobile();
  const sectors = ["All", "Professional Services", "Education & Training"];

  const services = [
    { title: "AI Governance & Compliance", icon: "🛡️", tag: "Strategy", sector: "All", featured: true,
      desc: "Build AI risk frameworks that satisfy regulators, auditors, and clients — before they come asking.",
      deliverables: ["AI risk assessment report", "NIST AI RMF implementation roadmap", "EU AI Act readiness review", "AI policy documentation & controls"],
      price: "From $2,500" },
    { title: "Workflow Automation", icon: "⚡", tag: "Build", sector: "All",
      desc: "End-to-end automation using n8n and Power Automate — from intake to output, no manual steps in between.",
      deliverables: ["Current state workflow mapping", "Automation architecture design", "Full build + testing", "Handover with complete documentation"],
      price: "From $1,250" },
    { title: "Client Onboarding Automation", icon: "🤝", tag: "Professional Services", sector: "Professional Services",
      desc: "Replace the 12-email back-and-forth of onboarding a new client with a single intake flow.",
      deliverables: ["Intake portal build", "Document checklist automation", "Personalised welcome sequence", "CRM auto-population"],
      price: "From $1,500" },
    { title: "Invoice & Billing Automation", icon: "📄", tag: "Professional Services", sector: "Professional Services",
      desc: "From time-tracking to sent invoice — automatically. Eliminate the month-end bottleneck.",
      deliverables: ["Time tracker integration", "Auto-drafted invoices", "Approval workflow", "Scheduled client delivery"],
      price: "From $1,250" },
    { title: "Learner Enrollment System", icon: "🎓", tag: "Education & Training", sector: "Education & Training",
      desc: "An enrollment-to-completion pipeline that places learners, sends the right content, and alerts you when someone falls behind.",
      deliverables: ["Enrollment form + cohort assignment", "Welcome & orientation sequence", "Progress milestone triggers", "At-risk learner alerts"],
      price: "From $1,800" },
    { title: "Certificate Issuance Automation", icon: "🏅", tag: "Education & Training", sector: "Education & Training",
      desc: "Completion triggers a branded certificate generated and delivered in seconds — no delays, no human error.",
      deliverables: ["Completion trigger setup", "Branded certificate template", "Auto-delivery workflow", "Completion registry log"],
      price: "From $950" },
    { title: "Power Platform Development", icon: "🔧", tag: "Build", sector: "All",
      desc: "Custom Power Apps, Power Automate flows, and SharePoint integrations for Microsoft-ecosystem organisations.",
      deliverables: ["Requirements workshop", "Custom Power App build", "Power Automate flows", "SharePoint integration"],
      price: "From $2,000" },
    { title: "Cloud & IT Advisory", icon: "☁️", tag: "Strategy", sector: "All",
      desc: "Strategic guidance for organisations moving to or optimising Azure, AWS, and Microsoft 365.",
      deliverables: ["Cloud readiness assessment", "Migration strategy", "Architecture review", "Governance framework"],
      price: "From $1,500" },
  ];
  const filtered = sector === "All" ? services : services.filter(s => s.sector === sector || s.sector === "All");

  return (
    <div style={{ background: C.white }}>
      <section style={{ padding: isMobile ? "3rem 1.25rem 2rem" : "4.5rem 2rem 3rem", background: C.cream, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Services</Label>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "2rem" : "clamp(2rem, 4vw, 3.2rem)", color: C.ink, marginBottom: 14 }}>What we build and deliver.</h1>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, maxWidth: 520, marginBottom: 28 }}>
            Every engagement is scoped to your actual problem. Filter by your sector below.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {sectors.map(s => (
              <button key={s} onClick={() => setSector(s)} style={{
                padding: "8px 18px", fontSize: 12, cursor: "pointer",
                fontFamily: FONT_BODY, letterSpacing: "0.06em", textTransform: "uppercase",
                borderRadius: 20,
                border: `1.5px solid ${sector === s ? C.orange : C.borderMid}`,
                background: sector === s ? C.orangePale : "none",
                color: sector === s ? C.orange : C.muted,
                transition: "all 0.2s",
              }}>{s}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? "2rem 1.25rem 3.5rem" : "3rem 2rem 5rem" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
          {filtered.map(s => (
            <div key={s.title} style={{
              border: `1px solid ${s.featured ? C.orange : C.border}`,
              borderRadius: 12, padding: "1.75rem",
              background: C.cream, display: "flex", flexDirection: "column",
              position: "relative", borderTop: `3px solid ${s.featured ? C.orange : C.border}`,
            }}>
              {s.featured && (
                <div style={{
                  position: "absolute", top: -1, right: 16,
                  background: C.orange, color: C.onAccent,
                  fontSize: 10, fontWeight: 600, padding: "3px 12px",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>Most requested</div>
              )}
              <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: C.ink, lineHeight: 1.3 }}>{s.title}</h3>
                <Badge>{s.tag}</Badge>
              </div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, marginBottom: 16, flexGrow: 1 }}>{s.desc}</p>
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.orange, marginBottom: 8 }}>What's included</p>
                {s.deliverables.map(d => (
                  <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
                    <Dot />
                    <span style={{ fontSize: 12, color: C.inkMid, lineHeight: 1.5 }}>{d}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: C.ink }}>{s.price}</span>
                <Btn onClick={() => setPage("Contact")} size="sm">Enquire →</Btn>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: isMobile ? "3rem 1.25rem" : "4rem 2rem", background: C.creamDark, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ maxWidth: 520 }}>
            <Label>Ongoing support</Label>
            <Heading style={{ marginBottom: 12 }}>Need a long-term automation partner?</Heading>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85 }}>
              All services are available on monthly retainer — for organisations that want continuous improvement, not one-off builds.
            </p>
          </div>
          <Btn onClick={() => setPage("Contact")} size="lg" full={isMobile}>Discuss a retainer</Btn>
        </div>
      </section>
    </div>
  );
}

// ─── DEMO ─────────────────────────────────────────────────────────────────────
function DemoPage({ setPage }) {
  const isMobile = useIsMobile();
  const [activeDemo, setActiveDemo] = useState(0);
  const [demoStep, setDemoStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [auditData, setAuditData] = useState({ name: "", email: "", sector: "", workflow: "", hours: "" });
  const [submitted, setSubmitted] = useState(false);

  const demos = [
    { title: "Client onboarding", sector: "Professional Services",
      desc: "A new client submits an intake form. Watch every downstream action trigger automatically.",
      steps: [
        { label: "Client submits intake form",    icon: "📋", detail: "Name, email, service type, and company size captured" },
        { label: "CRM record created",            icon: "💾", detail: "Contact added to pipeline with correct stage and tags" },
        { label: "Welcome email sent",            icon: "📧", detail: "Personalised with client name and onboarding next steps" },
        { label: "Document checklist dispatched", icon: "📁", detail: "Tailored list generated based on selected service type" },
        { label: "Discovery call booked",         icon: "📅", detail: "Calendar invite created and sent to both parties" },
        { label: "Internal notification sent",    icon: "🔔", detail: "Slack or Teams message to assigned consultant" },
      ]},
    { title: "Learner enrollment", sector: "Education & Training",
      desc: "A learner registers. Every step to getting them into class happens automatically.",
      steps: [
        { label: "Learner submits registration",  icon: "✍️", detail: "Name, email, and programme selection captured" },
        { label: "Cohort assigned automatically", icon: "👥", detail: "Placed based on start date and remaining capacity" },
        { label: "Welcome sequence begins",       icon: "📬", detail: "Day 0, Day 3, Day 7 personalised emails sent" },
        { label: "LMS access provisioned",        icon: "🔑", detail: "Login credentials generated and delivered instantly" },
        { label: "Progress tracking activated",   icon: "📊", detail: "Dashboard monitors milestone completion in real time" },
        { label: "At-risk flag triggered",        icon: "⚠️", detail: "Advisor alerted if no login within 5 days" },
      ]},
    { title: "Invoice generation", sector: "Professional Services",
      desc: "Month-end arrives. Time tracked becomes invoice sent — automatically.",
      steps: [
        { label: "Month-end trigger fires",       icon: "🗓️", detail: "Scheduled automation activates on the 1st" },
        { label: "Time entries pulled",           icon: "⏱️", detail: "All billable hours grouped by client and project" },
        { label: "Invoice auto-drafted",          icon: "📄", detail: "Line items, hours, totals calculated and formatted" },
        { label: "Sent for one-click approval",   icon: "👁️", detail: "Consultant reviews — no rebuilding from scratch" },
        { label: "Invoice delivered to client",   icon: "📤", detail: "Emailed with PDF and payment link" },
        { label: "Follow-up if unpaid",           icon: "🔁", detail: "Reminder sequence starts after 7 days" },
      ]},
  ];

  const runDemo = () => {
    setRunning(true); setDemoStep(0);
    let s = 0;
    const iv = setInterval(() => {
      s++; setDemoStep(s);
      if (s >= demos[activeDemo].steps.length) { clearInterval(iv); setRunning(false); }
    }, 850);
  };
  const resetDemo  = () => { setDemoStep(-1); setRunning(false); };
  const switchDemo = (i) => { setActiveDemo(i); setDemoStep(-1); setRunning(false); };
  const handleAudit = (f, v) => setAuditData(p => ({ ...p, [f]: v }));

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 6,
    background: C.white, border: `1px solid ${C.border}`,
    color: C.ink, fontSize: 14, fontFamily: FONT_BODY, outline: "none",
  };

  return (
    <div style={{ background: C.white }}>
      <section style={{ padding: isMobile ? "3rem 1.25rem 2rem" : "4.5rem 2rem 3rem", background: C.cream, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Demo</Label>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "2rem" : "clamp(2rem, 4vw, 3.2rem)", color: C.ink, marginBottom: 14 }}>See automation in action.</h1>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, maxWidth: 520 }}>
            Pick a workflow, press run, and watch each step trigger automatically.
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? "2rem 1.25rem" : "3.5rem 2rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {/* Demo selector */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {demos.map((d, i) => (
              <button key={i} onClick={() => switchDemo(i)} style={{
                padding: "9px 18px", fontSize: 13, cursor: "pointer",
                fontFamily: FONT_BODY, borderRadius: 6, flex: isMobile ? "1 1 auto" : "0 0 auto",
                border: `1.5px solid ${activeDemo === i ? C.orange : C.border}`,
                background: activeDemo === i ? C.orangePale : C.white,
                color: activeDemo === i ? C.orange : C.muted,
                transition: "all 0.2s",
              }}>{d.title}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: 20, alignItems: "start" }}>
            {/* Info panel */}
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.75rem", background: C.cream }}>
              <Badge>{demos[activeDemo].sector}</Badge>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.35rem", color: C.ink, margin: "14px 0 10px" }}>{demos[activeDemo].title}</h2>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, marginBottom: 22 }}>{demos[activeDemo].desc}</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={runDemo} disabled={running} style={{
                  background: running ? C.borderMid : C.orange,
                  color: running ? C.muted : C.onAccent,
                  border: "none", padding: "11px 20px", borderRadius: 6,
                  fontSize: 13, fontWeight: 600, cursor: running ? "not-allowed" : "pointer",
                  fontFamily: FONT_BODY, flex: 1,
                }}>{running ? "Running…" : "▶  Run automation"}</button>
                <button onClick={resetDemo} style={{
                  background: "none", border: `1px solid ${C.border}`,
                  color: C.muted, padding: "11px 16px", borderRadius: 6,
                  fontSize: 13, cursor: "pointer", fontFamily: FONT_BODY,
                }}>Reset</button>
              </div>
              {demoStep >= demos[activeDemo].steps.length && (
                <div style={{ marginTop: 16, padding: "12px 14px", background: C.orangePale, border: `1px solid ${C.orangeBorder}`, borderRadius: 6, fontSize: 13, color: C.orange, fontWeight: 500 }}>
                  ✓ Complete — 0 manual steps taken.
                </div>
              )}
            </div>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {demos[activeDemo].steps.map((s, i) => {
                const done   = demoStep > i;
                const active = demoStep === i && running;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "11px 13px", borderRadius: 8,
                    border: `1px solid ${done ? C.orange : active ? C.orangeLight : C.border}`,
                    background: done ? C.orangePale : active ? C.orangePale : C.cream,
                    transition: "all 0.3s",
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                      background: done ? C.orange : active ? C.orangePale : C.creamDark,
                      border: `1px solid ${done ? C.orange : active ? C.orangeBorder : C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: done ? 13 : 15, color: done ? C.onAccent : C.ink,
                      fontWeight: done ? 700 : 400, transition: "all 0.3s",
                    }}>{done ? "✓" : s.icon}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: done ? C.orange : active ? C.orangeLight : C.ink, marginBottom: 2 }}>{s.label}</p>
                      <p style={{ fontSize: 12, color: done ? C.orange : C.muted, lineHeight: 1.6, opacity: done ? 0.8 : 1 }}>{s.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* AUDIT FORM */}
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "5rem 2rem", background: C.creamDark }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Label>Free workflow audit</Label>
          <Heading style={{ marginBottom: 14 }}>Tell us what you do manually. We'll tell you what it's costing you.</Heading>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, marginBottom: 32 }}>
            Submit your most time-consuming manual workflow. Within 48 hours we'll send you an audit showing what's automatable and how many hours you'd save — free, no obligation.
          </p>

          {submitted ? (
            <div style={{ background: C.white, border: `1px solid ${C.orange}`, borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: C.ink, marginBottom: 10 }}>Audit request received.</h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85 }}>
                We'll send your free audit to <strong>{auditData.email}</strong> within 48 hours.
              </p>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, marginTop: 20 }}>
                While you wait, tell us more about your workflow and we&apos;ll include a scoped proposal with your audit.
              </p>
              <button onClick={() => setPage("Intake")} style={{
                marginTop: 20,
                padding: "12px 24px",
                border: `1px solid ${C.orange}`,
                background: "none",
                color: C.orange,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: FONT_BODY,
                cursor: "pointer",
                borderRadius: 6,
              }}>
                Start the intake form →
              </button>
            </div>
          ) : (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: isMobile ? "1.5rem" : "2.25rem" }}>
              {/* Step indicator */}
              <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
                {[0, 1].map(i => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: auditStep >= i ? C.orange : C.creamDark,
                      border: `1px solid ${auditStep >= i ? C.orange : C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: auditStep >= i ? C.onAccent : C.muted,
                      fontWeight: 600, transition: "all 0.3s",
                    }}>{i + 1}</div>
                    <span style={{ fontSize: 12, color: auditStep >= i ? C.orange : C.muted }}>
                      {i === 0 ? "Your details" : "Your workflow"}
                    </span>
                    {i === 0 && <span style={{ color: C.border, marginLeft: 4 }}>→</span>}
                  </div>
                ))}
              </div>

              {auditStep === 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                    {[["Full name", "name", "text", "Jane Smith"], ["Email address", "email", "email", "jane@firm.com"]].map(([label, field, type, ph]) => (
                      <div key={field}>
                        <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                        <input type={type} value={auditData[field]} onChange={e => handleAudit(field, e.target.value)} placeholder={ph} style={inputStyle} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>Your sector</label>
                    <select value={auditData.sector} onChange={e => handleAudit("sector", e.target.value)} style={inputStyle}>
                      <option value="">Select your sector</option>
                      <option>Professional Services</option>
                      <option>Education & Training</option>
                      <option>Healthcare & Wellness</option>
                      <option>E-commerce & Retail</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <Btn onClick={() => auditData.name && auditData.email && auditData.sector && setAuditStep(1)}
                    disabled={!auditData.name || !auditData.email || !auditData.sector} size="lg" full>Continue →</Btn>
                </div>
              )}

              {auditStep === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>Describe the workflow you'd most like to automate</label>
                    <textarea value={auditData.workflow} onChange={e => handleAudit("workflow", e.target.value)}
                      placeholder="e.g. Every Monday I manually copy client data from our intake form into our CRM, send a welcome email, and add them to a spreadsheet tracker..."
                      rows={5} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>How many hours per week does this take?</label>
                    <select value={auditData.hours} onChange={e => handleAudit("hours", e.target.value)} style={inputStyle}>
                      <option value="">Select an estimate</option>
                      <option>Less than 2 hours</option>
                      <option>2–5 hours</option>
                      <option>5–10 hours</option>
                      <option>More than 10 hours</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setAuditStep(0)} style={{
                      background: "none", border: `1px solid ${C.border}`,
                      color: C.muted, padding: "13px 18px", borderRadius: 6,
                      fontSize: 13, cursor: "pointer", fontFamily: FONT_BODY,
                    }}>← Back</button>
                    <button onClick={() => auditData.workflow && auditData.hours && setSubmitted(true)}
                      disabled={!auditData.workflow || !auditData.hours}
                      style={{
                        flex: 1, background: auditData.workflow && auditData.hours ? C.orange : C.creamDark,
                        color: auditData.workflow && auditData.hours ? C.onAccent : C.muted,
                        border: "none", padding: "13px", borderRadius: 6,
                        fontSize: 14, fontWeight: 600, fontFamily: FONT_BODY,
                        cursor: auditData.workflow && auditData.hours ? "pointer" : "not-allowed",
                      }}>Submit for free audit</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ──��� CONTACT ──────────────────────────────────────────────────────────────────
function ContactPage() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: "", email: "", org: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const canSubmit = form.name && form.email;

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 6,
    background: C.white, border: `1px solid ${C.border}`,
    color: C.ink, fontSize: 14, fontFamily: FONT_BODY, outline: "none",
  };

  return (
    <div style={{ background: C.white }}>
      <section style={{ padding: isMobile ? "3rem 1.25rem 2rem" : "4.5rem 2rem 3rem", background: C.cream, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Contact</Label>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "2rem" : "clamp(2rem, 4vw, 3.2rem)", color: C.ink, marginBottom: 14 }}>Let's talk about your workflow.</h1>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, maxWidth: 480 }}>
            No hard sell. Tell us what you're working with and we'll tell you honestly whether automation can help.
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? "2rem 1.25rem 3.5rem" : "3.5rem 2rem 5rem" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? "2.5rem" : "4rem", alignItems: "start" }}>

          {/* Left info — show below form on mobile */}
          {!isMobile && (
            <div>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", color: C.ink, marginBottom: 26 }}>What to expect</h2>
              {[
                { icon: "📬", title: "Response within 48 hours",    desc: "Every enquiry gets a personal response — not an autoresponder." },
                { icon: "📞", title: "30-minute discovery call",    desc: "We start with a conversation, not a proposal. No obligation." },
                { icon: "📝", title: "Clear scoped proposal",       desc: "If there's a fit, you'll receive a fixed-price scope — no hourly surprises." },
                { icon: "🚀", title: "Build starts within 2 weeks", desc: "Our intake process is lean. Most projects begin quickly after agreement." },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", gap: 14, marginBottom: 22, paddingBottom: 22, borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: 14, color: C.ink, marginBottom: 4 }}>{item.title}</p>
                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
              <div style={{ padding: "1.25rem", background: C.creamDark, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                <Label>Direct contact</Label>
                {[["Email", "info@meetavantgarde.com"], ["Phone", "(240) 206-5733"], ["Location", "Lisbon, PT · Dallas, TX"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: C.mutedLight, minWidth: 60, textTransform: "uppercase", letterSpacing: "0.08em", paddingTop: 1 }}>{k}</span>
                    <span style={{ fontSize: 13, color: C.inkMid }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          {sent ? (
            <div style={{ background: C.orangePale, border: `1px solid ${C.orangeBorder}`, borderRadius: 12, padding: "3rem", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", color: C.ink, marginBottom: 10 }}>Message received.</h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85 }}>
                Thank you, <strong>{form.name}</strong>. We'll be in touch at <strong>{form.email}</strong> within 48 hours.
              </p>
            </div>
          ) : (
            <div style={{ background: C.cream, border: `1px solid ${C.border}`, borderRadius: 12, padding: isMobile ? "1.5rem" : "2.25rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                  {[["Full name", "name", "text", "Jane Smith"], ["Email address", "email", "email", "jane@firm.com"]].map(([label, field, type, ph]) => (
                    <div key={field}>
                      <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                      <input type={type} value={form[field]} onChange={e => handle(field, e.target.value)} placeholder={ph} style={inputStyle} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>Organisation</label>
                  <input value={form.org} onChange={e => handle("org", e.target.value)} placeholder="Your company or school" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>I'm interested in</label>
                  <select value={form.service} onChange={e => handle("service", e.target.value)} style={inputStyle}>
                    <option value="">Select a service</option>
                    <option>AI Governance & Compliance</option>
                    <option>Workflow Automation</option>
                    <option>Client Onboarding Automation</option>
                    <option>Invoice & Billing Automation</option>
                    <option>Learner Enrollment System</option>
                    <option>Certificate Issuance Automation</option>
                    <option>Power Platform Development</option>
                    <option>Cloud & IT Advisory</option>
                    <option>Not sure yet — I need advice</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>Tell us about your situation</label>
                  <textarea value={form.message} onChange={e => handle("message", e.target.value)}
                    placeholder="What does your team currently do manually? What would you like to change?"
                    rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }} />
                </div>
                <button onClick={() => canSubmit && setSent(true)} disabled={!canSubmit} style={{
                  background: canSubmit ? C.orange : C.creamDark,
                  color: canSubmit ? C.onAccent : C.muted,
                  border: "none", padding: "14px", borderRadius: 6,
                  fontSize: 14, fontWeight: 600, fontFamily: FONT_BODY,
                  cursor: canSubmit ? "pointer" : "not-allowed", width: "100%",
                }}>Send message</button>
              </div>
            </div>
          )}

          {/* Show contact info below form on mobile */}
          {isMobile && (
            <div style={{ padding: "1.25rem", background: C.creamDark, border: `1px solid ${C.border}`, borderRadius: 8 }}>
              <Label>Direct contact</Label>
              {[["Email", "info@meetavantgarde.com"], ["Phone", "(844) 311-3117"], ["Location", "Lisbon, PT · Dallas, TX"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: C.mutedLight, minWidth: 60, textTransform: "uppercase", letterSpacing: "0.08em", paddingTop: 1 }}>{k}</span>
                  <span style={{ fontSize: 13, color: C.inkMid }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── CASE STUDY CARD ───────────────────────────────────────────────────────────
function CaseStudyCard({ cs, openCase, isMobile }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onClick={() => openCase(cs.slug)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: `1px solid ${hover ? C.orange : C.border}`,
        borderRadius: 12, overflow: "hidden", background: C.cream,
        display: "flex", flexDirection: "column", cursor: "pointer",
        transition: "border-color 0.2s, transform 0.2s",
        transform: hover && !isMobile ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: C.creamDark }}>
        <img src={cs.image} alt={`${cs.client} case study`} style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transition: "transform 0.4s", transform: hover && !isMobile ? "scale(1.04)" : "scale(1)",
        }} />
        <span style={{
          position: "absolute", top: 12, left: 12,
          background: C.white, color: C.orange,
          fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase", padding: "4px 10px", borderRadius: 2,
          border: `1px solid ${C.orangeBorder}`,
        }}>{cs.industry}</span>
      </div>
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>{cs.client}</p>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: C.ink, lineHeight: 1.3, marginBottom: 10 }}>{cs.title}</h3>
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 16, flexGrow: 1 }}>{cs.summary}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: C.orange }}>{cs.cardMetric}</span>
          <span style={{ fontSize: 12, color: hover ? C.orange : C.inkMid, fontWeight: 500, transition: "color 0.2s" }}>Read case study →</span>
        </div>
      </div>
    </article>
  );
}

// ─── CASE STUDIES PAGE ──────────────────────────────────────────────────────────
function CaseStudiesPage({ setPage, openCase }) {
  const [industry, setIndustry] = useState("All");
  const isMobile = useIsMobile();
  const filtered = industry === "All" ? CASE_STUDIES : CASE_STUDIES.filter(c => c.industry === industry);

  return (
    <div style={{ background: C.white }}>
      <section style={{ padding: isMobile ? "3rem 1.25rem 2rem" : "4.5rem 2rem 3rem", background: C.cream, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Industry Examples</Label>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "2rem" : "clamp(2rem, 4vw, 3.2rem)", color: C.ink, marginBottom: 14 }}>What AI automation makes possible.</h1>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, maxWidth: 560, marginBottom: 18 }}>
            How organisations across industries are using AI and workflow automation to replace manual work with reliable systems. These are industry examples — drawn from publicly reported case studies and representative scenarios — shown to illustrate what&apos;s achievable. Filter by industry below.
          </p>
          <p style={{ fontSize: 12.5, color: C.mutedLight, lineHeight: 1.7, maxWidth: 560, marginBottom: 28, fontStyle: "italic" }}>
            Examples are presented for illustration only and do not represent Avantgarde client engagements. Company names and outcomes belong to the cited sources.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {INDUSTRIES.map(s => (
              <button key={s} onClick={() => setIndustry(s)} style={{
                padding: "8px 18px", fontSize: 12, cursor: "pointer",
                fontFamily: FONT_BODY, letterSpacing: "0.06em", textTransform: "uppercase",
                borderRadius: 20,
                border: `1.5px solid ${industry === s ? C.orange : C.borderMid}`,
                background: industry === s ? C.orangePale : "none",
                color: industry === s ? C.orange : C.muted,
                transition: "all 0.2s",
              }}>{s}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? "2rem 1.25rem 3.5rem" : "3rem 2rem 5rem" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: 22 }}>
          {filtered.map(cs => (
            <CaseStudyCard key={cs.slug} cs={cs} openCase={openCase} isMobile={isMobile} />
          ))}
          {/* Placeholder Card */}
          <div style={{
            padding: 24,
            border: `1px dashed ${C.border}`,
            borderRadius: 8,
            background: "#FFF8F0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: 300,
          }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Your workflow. Your results.</h3>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
              We&apos;re building our client case library. Start with a free audit and let&apos;s document what automation does for your organisation.
            </p>
            <button onClick={() => setPage("Demo")} style={{
              padding: "10px 16px",
              border: "none",
              background: "none",
              color: C.orange,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: FONT_BODY,
              cursor: "pointer",
              padding: 0,
            }}>Get a free audit →</button>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ padding: isMobile ? "3.5rem 1.25rem" : "5rem 2rem", background: C.inkBg, textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <Heading size="2.4rem" color={C.onAccent} style={{ marginBottom: 16 }}>Could your firm see results like these?</Heading>
          <p style={{ fontSize: 15, color: "#B8BCC4", lineHeight: 1.85, marginBottom: 28 }}>
            Send us one workflow and we&apos;ll tell you what&apos;s automatable, how many hours it saves, and what it would take to build — within 48 hours, free.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("Demo")} size="lg" full={isMobile}>Get a free audit</Btn>
            <Btn onClick={() => setPage("Contact")} variant="ghost" size="lg" full={isMobile}>Book a call</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CASE STUDY DETAIL (TEMPLATE) ───────────────────────────────────────────────
function CaseStudyDetailPage({ setPage, openCase, caseSlug }) {
  const isMobile = useIsMobile();
  const cs = getCaseStudy(caseSlug);
  const related = getRelated(caseSlug);

  if (!cs) {
    return (
      <div style={{ background: C.white, padding: isMobile ? "4rem 1.25rem" : "6rem 2rem", textAlign: "center" }}>
        <Heading style={{ marginBottom: 16 }}>Case study not found</Heading>
        <p style={{ fontSize: 15, color: C.muted, marginBottom: 28 }}>This case study may have moved or been renamed.</p>
        <Btn onClick={() => setPage("CaseStudies")}>← Back to all case studies</Btn>
      </div>
    );
  }

  const Block = ({ label, title, children }) => (
    <div style={{ marginBottom: isMobile ? 36 : 52 }}>
      <Label>{label}</Label>
      <Heading size="1.9rem" style={{ marginBottom: 16 }}>{title}</Heading>
      {children}
    </div>
  );

  return (
    <div style={{ background: C.white }}>
      {/* Hero */}
      <section style={{ padding: isMobile ? "2.5rem 1.25rem 2rem" : "3.5rem 2rem 2.5rem", background: C.cream, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <button onClick={() => setPage("CaseStudies")} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: FONT_BODY, fontSize: 12, color: C.muted, letterSpacing: "0.06em",
            textTransform: "uppercase", marginBottom: 20,
          }}>← All case studies</button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <Badge>{cs.industry}</Badge>
            <span style={{ fontSize: 12, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>{cs.client}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "3px 9px", borderRadius: 2, color: C.muted, background: C.creamDark, border: `1px solid ${C.border}`,
            }}>{cs.source ? "Industry example" : "Illustrative example"}</span>
          </div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "1.9rem" : "clamp(2rem, 4vw, 3rem)", color: C.ink, lineHeight: 1.18, marginBottom: 16 }}>{cs.title}</h1>
          <p style={{ fontSize: 16, color: C.inkMid, lineHeight: 1.8, maxWidth: 640 }}>{cs.hero.tagline}</p>
        </div>
      </section>

      {/* Hero image */}
      <section style={{ padding: isMobile ? "0" : "0", background: C.cream }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <img src={cs.image} alt={`${cs.client} — ${cs.title}`} style={{
            width: "100%", aspectRatio: isMobile ? "16 / 10" : "21 / 8",
            objectFit: "cover", display: "block",
          }} />
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "4.5rem 2rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Block label="The Problem" title="What was holding them back">
            <p style={{ fontSize: 16, color: C.inkMid, lineHeight: 1.9 }}>{cs.problem}</p>
          </Block>

          <Block label="The Solution" title="How it was solved">
            <p style={{ fontSize: 16, color: C.inkMid, lineHeight: 1.9 }}>{cs.solution}</p>
          </Block>

          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
            {cs.source ? (
              <>
                Industry example. Company name and reported outcomes belong to the source:{" "}
                <a href={cs.source.url} target="_blank" rel="noopener noreferrer" style={{ color: C.orange, textDecoration: "none" }}>
                  {cs.source.label}
                </a>
                . Presented for illustration; not an Avantgarde client engagement.
              </>
            ) : (
              "Illustrative example — a representative scenario based on common automation outcomes. It does not depict a specific company or an Avantgarde client engagement."
            )}
          </p>
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "4rem 2rem", background: C.creamDark, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 40 }}>
            <Label>The Results</Label>
            <Heading size="2.1rem">Measurable outcomes</Heading>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 14 : 20 }}>
            {cs.results.map(r => (
              <div key={r.label} style={{
                background: C.cream, border: `1px solid ${C.border}`, borderRadius: 12,
                borderTop: `3px solid ${C.orange}`, padding: isMobile ? "1.25rem 1rem" : "1.75rem 1.5rem", textAlign: "center",
              }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "1.6rem" : "2.1rem", color: C.orange, marginBottom: 8 }}>{r.metric}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo video */}
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "4.5rem 2rem" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Label>Demo Video</Label>
            <Heading size="2.1rem">See the automation in action</Heading>
          </div>
          {cs.demoVideo ? (
            <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <iframe
                src={cs.demoVideo}
                title={`${cs.client} automation demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          ) : (
            <button
              onClick={() => setPage("Demo")}
              aria-label="Watch automation demos"
              style={{
                position: "relative", display: "block", width: "100%", padding: 0,
                aspectRatio: "16 / 9", borderRadius: 12, overflow: "hidden",
                border: `1px solid ${C.border}`, cursor: "pointer", background: C.creamDark,
              }}
            >
              <img src={cs.poster} alt={`${cs.client} automation demo preview`} style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.82)",
              }} />
              <span style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: 68, height: 68, borderRadius: "50%", background: C.orange,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={C.onAccent} aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span style={{
                position: "absolute", bottom: 16, left: 16,
                background: "rgba(17,17,17,0.7)", color: "#FFFFFF",
                fontSize: 12, padding: "6px 12px", borderRadius: 4, letterSpacing: "0.04em",
              }}>Watch live automation demos →</span>
            </button>
          )}
        </div>
      </section>

      {/* Workflow diagram */}
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "4.5rem 2rem", background: C.cream, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 44 }}>
            <Label>Workflow Diagram</Label>
            <Heading size="2.1rem">How the automation flows</Heading>
          </div>
          <div style={{
            display: "flex", flexDirection: isMobile ? "column" : "row",
            alignItems: "stretch", justifyContent: "center", gap: 0,
          }}>
            {cs.workflow.map((step, i) => (
              <div key={step.label} style={{
                display: "flex", flexDirection: isMobile ? "row" : "column",
                alignItems: "center", flex: 1,
              }}>
                <div style={{
                  background: C.white, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.orange}`,
                  borderRadius: 12, padding: "1.25rem", textAlign: isMobile ? "left" : "center",
                  width: "100%", height: "100%", display: "flex", flexDirection: "column",
                  gap: 8, alignItems: isMobile ? "flex-start" : "center",
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%", background: C.orangePale,
                    border: `1px solid ${C.orangeBorder}`, color: C.orange,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: FONT_DISPLAY, fontSize: 15, flexShrink: 0,
                  }}>{i + 1}</div>
                  <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: C.ink, lineHeight: 1.3 }}>{step.label}</h4>
                  <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>{step.desc}</p>
                </div>
                {i < cs.workflow.length - 1 && (
                  <div aria-hidden="true" style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: C.orange, padding: isMobile ? "8px 0" : "0 6px",
                    fontSize: 20, flexShrink: 0,
                  }}>{isMobile ? "↓" : "→"}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related case studies */}
      {related.length > 0 && (
        <section style={{ padding: isMobile ? "3rem 1.25rem" : "4.5rem 2rem", borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ marginBottom: isMobile ? 24 : 36 }}>
              <Label>Related</Label>
              <Heading size="2.1rem">More case studies</Heading>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: 22 }}>
              {related.map(rc => (
                <CaseStudyCard key={rc.slug} cs={rc} openCase={openCase} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: isMobile ? "3.5rem 1.25rem" : "5rem 2rem", background: C.inkBg, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Heading size="2.4rem" color={C.onAccent} style={{ marginBottom: 16 }}>Want results like these?</Heading>
          <p style={{ fontSize: 15, color: "#B8BCC4", lineHeight: 1.85, marginBottom: 28 }}>
            Start with a free workflow audit. We&apos;ll show you exactly what&apos;s automatable and the hours it returns to your team.
          </p>
          <Btn onClick={() => setPage("Demo")} size="lg" full={isMobile}>Get a free audit</Btn>
        </div>
      </section>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [caseSlug, setCaseSlug] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const pages = {
    Home: HomePage, About: AboutPage, Services: ServicesPage, Demo: DemoPage, Intake: IntakePage, Contact: ContactPage,
    CaseStudies: CaseStudiesPage, CaseStudyDetail: CaseStudyDetailPage,
  };
  const PageComponent = pages[page] || HomePage;

  const openCase = (slug) => { setCaseSlug(slug); setPage("CaseStudyDetail"); };

  useEffect(() => {
    if (page === "CaseStudyDetail") {
      const cs = getCaseStudy(caseSlug);
      applySEO("CaseStudies", cs ? {
        title: `${cs.title} — ${cs.client} | Avantgarde Consulting Group`,
        description: cs.summary,
        og_title: `${cs.client}: ${cs.title}`,
        og_description: cs.summary,
        canonical: `https://meetavantgarde.com/case-studies/${cs.slug}`,
      } : undefined);
    } else {
      applySEO(page);
    }
    window.scrollTo(0, 0);
  }, [page, caseSlug]);

  return (
    <div style={{ fontFamily: FONT_BODY, background: C.cream, color: C.ink, minHeight: "100vh", transition: "background 0.3s ease, color 0.3s ease" }}>
      <Nav page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      <main><PageComponent setPage={setPage} openCase={openCase} caseSlug={caseSlug} /></main>
      <Footer setPage={setPage} />
    </div>
  );
}
