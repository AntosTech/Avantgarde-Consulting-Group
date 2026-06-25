import { useState } from "react";

// ─── DESIGN TOKENS — Brand-matched to logo ────────────────────────────────────
// Logo: black bg, white serif wordmark, orange (#E8870A) lightbulb + tagline
const C = {
  black:      "#0A0A0A",
  blackSoft:  "#111111",
  blackCard:  "#161616",
  blackBorder:"#222222",
  white:      "#FFFFFF",
  offWhite:   "#F0EDE8",
  orange:     "#E8870A",
  orangeLight:"#F5A535",
  orangeDim:  "#3D2400",
  orangeGlow: "rgba(232,135,10,0.08)",
  muted:      "#8A8A8A",
  mutedLight: "#B0B0B0",
  border:     "#1E1E1E",
  borderMid:  "#2C2C2C",
  borderSoft: "#383838",
};

const FONT_DISPLAY = "'DM Serif Display', Georgia, serif";
const FONT_BODY    = "'Inter', system-ui, sans-serif";

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function Badge({ children }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 500,
      letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "4px 14px", borderRadius: 2,
      color: C.orange, background: C.orangeDim,
      border: `1px solid rgba(232,135,10,0.25)`,
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

function Heading({ children, size = "2.4rem", color = C.offWhite, style: s = {} }) {
  return (
    <h2 style={{
      fontFamily: FONT_DISPLAY,
      fontSize: `clamp(1.6rem, 3vw, ${size})`,
      color, lineHeight: 1.18, ...s,
    }}>{children}</h2>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", disabled = false }) {
  const pad = size === "sm" ? "8px 18px" : size === "lg" ? "15px 36px" : "11px 26px";
  const styles = {
    primary: { background: C.orange, color: C.black, border: "none" },
    ghost:   { background: "none",   color: C.orange, border: `1px solid ${C.orange}` },
    dark:    { background: "none",   color: C.offWhite, border: `1px solid ${C.borderSoft}` },
    white:   { background: C.offWhite, color: C.black, border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...styles[variant], padding: pad, borderRadius: 3,
      fontSize: size === "sm" ? 12 : 14, fontWeight: 500,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: FONT_BODY, letterSpacing: "0.04em",
      opacity: disabled ? 0.45 : 1, transition: "opacity 0.2s",
    }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.opacity = "0.82")}
      onMouseLeave={e => !disabled && (e.currentTarget.style.opacity = "1")}
    >{children}</button>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.border, margin: "0" }} />;
}

function Dot() {
  return <div style={{ width: 5, height: 5, background: C.orange, flexShrink: 0, marginTop: 7 }} />;
}

// ─── LOGO COMPONENT ───────────────────────────────────────────────────────────
function Logo({ size = "nav" }) {
  const isNav = size === "nav";
  return (
    <img
      src="/logo.png"
      alt="Avantgarde Consulting Group"
      style={{
        height: isNav ? 38 : 52,
        width: "auto",
        // logo has black bg — show it directly on dark nav
        display: "block",
      }}
    />
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const links = ["About", "Services", "Demo", "Contact"];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: C.black,
      borderBottom: `1px solid ${C.border}`,
      padding: "0 2rem",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 66,
    }}>
      <button onClick={() => setPage("Home")} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", padding: 0,
      }}>
        <Logo size="nav" />
      </button>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map(l => (
          <button key={l} onClick={() => setPage(l)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: FONT_BODY, fontSize: 13,
            color: page === l ? C.orange : C.muted,
            fontWeight: page === l ? 500 : 400,
            letterSpacing: "0.06em", textTransform: "uppercase",
            borderBottom: `1px solid ${page === l ? C.orange : "transparent"}`,
            paddingBottom: 2, transition: "color 0.2s",
          }}>{l}</button>
        ))}
        <Btn onClick={() => setPage("Contact")} size="sm">Book a Call</Btn>
      </div>
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.black, borderTop: `1px solid ${C.border}`, padding: "4rem 2rem 2rem" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem", marginBottom: "3rem" }}>
          <div>
            <Logo size="footer" />
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, maxWidth: 280, marginTop: 20, marginBottom: 20 }}>
              AI governance, intelligent automation, and cloud advisory for organisations ready to operate smarter — without the enterprise overhead.
            </p>
            <p style={{ fontSize: 12, color: C.orange, letterSpacing: "0.16em", textTransform: "uppercase" }}>Artfully Innovative</p>
          </div>
          {[
            { label: "Pages",    items: ["Home", "About", "Services", "Demo", "Contact"] },
            { label: "Services", items: ["AI Governance", "Workflow Automation", "Power Platform", "Cloud Advisory"] },
            { label: "Sectors",  items: ["Professional Services", "Education & Training", "Healthcare", "E-commerce"] },
          ].map(col => (
            <div key={col.label}>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.orange, marginBottom: 16 }}>{col.label}</p>
              {col.items.map(item => (
                <p key={item} onClick={() => col.label === "Pages" && setPage(item)} style={{
                  fontSize: 13, color: C.muted, marginBottom: 10, lineHeight: 1.5,
                  cursor: col.label === "Pages" ? "pointer" : "default",
                }}
                  onMouseEnter={e => col.label === "Pages" && (e.target.style.color = C.offWhite)}
                  onMouseLeave={e => col.label === "Pages" && (e.target.style.color = C.muted)}
                >{item}</p>
              ))}
            </div>
          ))}
        </div>
        <Divider />
        <div style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 12, color: "#3A3A3A" }}>© 2026 Avantgarde Consulting Group LLC · CAGE: 8YUV5 · DUNS: 117944537</p>
          <p style={{ fontSize: 12, color: "#3A3A3A" }}>info@meetavantgarde.com · (844) 311-3117</p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const problems = [
    { icon: "⚡", label: "Manual data entry eating hours",           fix: "Automated" },
    { icon: "📋", label: "Compliance docs built from scratch",       fix: "Systematized" },
    { icon: "📧", label: "Follow-ups falling through the cracks",   fix: "Triggered" },
    { icon: "📊", label: "Reports assembled by hand every month",   fix: "Generated" },
  ];

  const sectors = [
    {
      icon: "⚖️", name: "Professional Services",
      desc: "Law firms, consultancies, and financial advisors spending billable hours on admin that machines should handle.",
      wins: ["Client onboarding automation", "Auto-drafted invoices & billing", "Contract signature tracking", "Lead qualification workflows"],
    },
    {
      icon: "🎓", name: "Education & Training",
      desc: "Training organisations drowning in enrollment, scheduling, and certificate admin instead of delivering learning.",
      wins: ["Enrollment → cohort assignment", "Personalised welcome sequences", "Auto-issued completion certificates", "At-risk learner early alerts"],
    },
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
      <section style={{ background: C.black, padding: "6rem 2rem 5rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <Badge>AI Governance · Automation · Cloud Advisory</Badge>
            <h1 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              lineHeight: 1.12, color: C.offWhite,
              margin: "24px 0 22px",
            }}>
              Your business runs on humans doing things{" "}
              <span style={{ color: C.orange, fontStyle: "italic" }}>machines should do.</span>
            </h1>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.9, marginBottom: 36, maxWidth: 500 }}>
              We design and deploy AI-powered automation for professional service firms and educational organisations — so your team focuses on the work only humans can do.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn onClick={() => setPage("Demo")} size="lg">See it in action</Btn>
              <Btn onClick={() => setPage("Services")} variant="ghost" size="lg">Explore services</Btn>
            </div>
          </div>

          {/* Problem → Solution */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {problems.map((p, i) => (
              <div key={i} style={{
                background: C.blackCard, border: `1px solid ${C.border}`,
                padding: "14px 18px", display: "flex",
                alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 17 }}>{p.icon}</span>
                  <span style={{ fontSize: 13, color: C.mutedLight }}>{p.label}</span>
                </div>
                <Badge>{p.fix} ✓</Badge>
              </div>
            ))}
            <div style={{
              background: C.orangeDim, border: `1px solid rgba(232,135,10,0.3)`,
              padding: "16px 20px", display: "flex",
              alignItems: "center", justifyContent: "space-between", marginTop: 4,
            }}>
              <span style={{ fontSize: 13, color: C.orange, fontWeight: 500, letterSpacing: "0.04em" }}>Average time saved per week</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: C.orange }}>12+ hrs</span>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS STRIP */}
      <section style={{ background: C.blackSoft, borderBottom: `1px solid ${C.border}`, padding: "1rem 2rem" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444" }}>Credentials</span>
          {["15+ Yrs Enterprise IT", "AWS Certified", "Azure 70-533", "CompTIA Security+", "ITIL 4", "PL-900 Power Platform", "M.Ed · M.S. IT"].map(c => (
            <span key={c} style={{ fontSize: 12, color: C.muted }}>· {c}</span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: C.blackSoft, padding: "0", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {stats.map((s, i) => (
            <div key={s.num} style={{
              padding: "2.5rem 1.5rem", textAlign: "center",
              borderRight: i < 3 ? `1px solid ${C.border}` : "none",
            }}>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "2.6rem", color: C.orange, marginBottom: 6 }}>{s.num}</p>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section style={{ padding: "5.5rem 2rem", background: C.black, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Who we work with</Label>
          <Heading size="2.8rem" style={{ marginBottom: 12 }}>We specialise, not generalise.</Heading>
          <p style={{ fontSize: 15, color: C.muted, marginBottom: 48, maxWidth: 520, lineHeight: 1.85 }}>
            Two sectors. Deep fluency in both. We're not a general-purpose agency — we're specialists who understand your workflows before you explain them.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.border }}>
            {sectors.map(s => (
              <div key={s.name} style={{ background: C.blackCard, padding: "2.5rem" }}>
                <div style={{ fontSize: 36, marginBottom: 18 }}>{s.icon}</div>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: C.offWhite, marginBottom: 12 }}>{s.name}</h3>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.9, marginBottom: 24 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {s.wins.map(w => (
                    <div key={w} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Dot />
                      <span style={{ fontSize: 13, color: C.mutedLight }}>{w}</span>
                    </div>
                  ))}
                </div>
                <Btn onClick={() => setPage("Services")} variant="ghost" size="sm">See how →</Btn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "5.5rem 2rem", background: C.blackSoft, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>How it works</Label>
          <Heading style={{ marginBottom: 48 }}>From first call to running system.</Heading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: C.border }}>
            {[
              { step: "Discover", desc: "We map your current workflows, identify manual bottlenecks, and quantify the time cost." },
              { step: "Design",   desc: "We architect the automation logic — what triggers what, where data flows, what humans still own." },
              { step: "Build",    desc: "We build and test in a staging environment before anything touches your live operations." },
              { step: "Support",  desc: "Retainer options to maintain, iterate, and expand as your needs evolve." },
            ].map((s, i) => (
              <div key={i} style={{ background: C.blackCard, padding: "2rem 1.75rem" }}>
                <div style={{
                  fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: C.orange, marginBottom: 16,
                }}>0{i + 1}</div>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: C.offWhite, marginBottom: 10 }}>{s.step}</p>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: "5.5rem 2rem", background: C.black, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Heading size="2.8rem" style={{ marginBottom: 20 }}>
            Not sure where automation fits in your business?
          </Heading>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9, marginBottom: 38 }}>
            Start with a free workflow audit. Tell us what your team does manually every week — we'll tell you what's automatable and what it's costing you.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("Demo")} size="lg">Get a free audit</Btn>
            <Btn onClick={() => setPage("Demo")} variant="dark" size="lg">Watch a demo</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  const certs = [
    { cert: "AWS Cloud Practitioner",   body: "Amazon Web Services" },
    { cert: "Azure 70-533",             body: "Microsoft" },
    { cert: "CompTIA Security+",        body: "CompTIA" },
    { cert: "MCSE",                     body: "Microsoft Certified Solutions Expert" },
    { cert: "ITIL 4 Foundation",        body: "Axelos" },
    { cert: "PL-900 Power Platform",    body: "Microsoft · Power Platform Fundamentals" },
  ];
  const values = [
    { title: "Precision over volume",       desc: "We work with a focused client roster so every engagement gets full attention — not a junior associate." },
    { title: "Honest about fit",            desc: "If automation isn't the right answer for your problem, we'll tell you that in the first call. No upsell for its own sake." },
    { title: "Compliance is non-optional",  desc: "In professional services and education, data handling matters. We build with GDPR and security best practices baked in from day one." },
    { title: "We transfer knowledge",       desc: "Every build comes with documentation. You should understand what we built and why — not be dependent on us to change a single field." },
  ];

  return (
    <div style={{ background: C.black }}>
      {/* HERO */}
      <section style={{ padding: "5.5rem 2rem 4.5rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <Label>About</Label>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: C.offWhite, lineHeight: 1.18, marginBottom: 24 }}>
              Built by someone who's worked inside the complexity.
            </h1>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9, marginBottom: 16 }}>
              Avantgarde Consulting Group is led by <strong style={{ color: C.offWhite, fontWeight: 500 }}>Akisha D. Anthony</strong> — an enterprise IT strategist with over 15 years of experience spanning cloud infrastructure, digital transformation, and AI governance.
            </p>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9, marginBottom: 16 }}>
              Before founding Avantgarde, Akisha spent years working inside some of the most compliance-heavy, operationally complex environments in enterprise IT — which means she understands both the technical architecture and the organisational reality of making change actually stick.
            </p>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9 }}>
              Holding dual master's degrees in Instructional Design and Information Technology, she bridges the gap between human-centred design and enterprise infrastructure in a way few consultants can.
            </p>
          </div>

          {/* Founder card */}
          <div style={{ background: C.blackCard, border: `1px solid ${C.border}`, padding: "2.25rem" }}>
            <div style={{
              width: 70, height: 70, borderRadius: "50%",
              background: C.orangeDim, border: `1px solid rgba(232,135,10,0.4)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: FONT_DISPLAY, fontSize: 28, color: C.orange, marginBottom: 20,
            }}>A</div>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: C.offWhite, marginBottom: 4 }}>Akisha D. Anthony</p>
            <p style={{ fontSize: 13, color: C.orange, marginBottom: 24, fontWeight: 500, letterSpacing: "0.04em" }}>Founder & Principal Consultant</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {[
                ["Degree",   "M.Ed. Instructional Design — George Mason University"],
                ["Degree",   "M.S. Information Technology — UMUC"],
                ["Progress", "PMP Certification in progress"],
                ["Based",    "Stuttgart, Germany · Arlington, VA, USA"],
                ["Focus",    "AI Governance · Automation · Cloud Advisory"],
              ].map(([label, val], i) => (
                <div key={i} style={{ display: "flex", gap: 16, fontSize: 13, borderTop: `1px solid ${C.border}`, paddingTop: 13 }}>
                  <span style={{ color: "#555", minWidth: 72, flexShrink: 0 }}>{label}</span>
                  <span style={{ color: C.mutedLight, lineHeight: 1.55 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={{ padding: "4.5rem 2rem", background: C.blackSoft, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Certifications & credentials</Label>
          <Heading style={{ marginBottom: 36 }}>The credentials behind the work.</Heading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.border }}>
            {certs.map(c => (
              <div key={c.cert} style={{ background: C.blackCard, padding: "1.5rem" }}>
                <div style={{ width: 6, height: 6, background: C.orange, marginBottom: 14 }} />
                <p style={{ fontWeight: 500, fontSize: 14, color: C.offWhite, marginBottom: 6 }}>{c.cert}</p>
                <p style={{ fontSize: 12, color: C.muted }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "4.5rem 2rem", background: C.black, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>How we work</Label>
          <Heading style={{ marginBottom: 36 }}>The principles behind every engagement.</Heading>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.border }}>
            {values.map(v => (
              <div key={v.title} style={{ background: C.blackCard, padding: "2rem" }}>
                <p style={{ fontWeight: 500, fontSize: 15, color: C.offWhite, marginBottom: 10 }}>{v.title}</p>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY PROFILE */}
      <section style={{ padding: "2.5rem 2rem", background: C.blackSoft, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <Label>Company profile</Label>
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[["CAGE", "8YUV5"], ["DUNS", "117944537"], ["SIC", "7373"], ["NAICS", "541511 · 541512 · 541513 · 541519"]].map(([k, v]) => (
                <div key={k}>
                  <p style={{ fontSize: 10, color: "#444", marginBottom: 5, letterSpacing: "0.1em", textTransform: "uppercase" }}>{k}</p>
                  <p style={{ fontSize: 13, color: C.mutedLight }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <Btn onClick={() => setPage("Contact")}>Work with us →</Btn>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  const [sector, setSector] = useState("All");
  const sectors = ["All", "Professional Services", "Education & Training"];

  const services = [
    {
      title: "AI Governance & Compliance", icon: "🛡️", tag: "Strategy", sector: "All", featured: true,
      desc: "Build AI risk frameworks that satisfy regulators, auditors, and clients — before they come asking.",
      deliverables: ["AI risk assessment report", "NIST AI RMF implementation roadmap", "EU AI Act readiness review", "AI policy documentation & controls"],
      price: "From €2,500",
    },
    {
      title: "Workflow Automation", icon: "⚡", tag: "Build", sector: "All",
      desc: "End-to-end automation design and delivery using n8n and Power Automate — from intake to output, no manual steps in between.",
      deliverables: ["Current state workflow mapping", "Automation architecture design", "Full build + testing", "Handover with complete documentation"],
      price: "From €1,200",
    },
    {
      title: "Client Onboarding Automation", icon: "🤝", tag: "Professional Services", sector: "Professional Services",
      desc: "Replace the 12-email back-and-forth of onboarding a new client with a single intake flow that handles everything automatically.",
      deliverables: ["Intake portal build", "Document checklist automation", "Personalised welcome sequence", "CRM auto-population"],
      price: "From €1,500",
    },
    {
      title: "Invoice & Billing Automation", icon: "📄", tag: "Professional Services", sector: "Professional Services",
      desc: "From time-tracking to sent invoice — automatically. Eliminate the month-end bottleneck that delays your cash flow.",
      deliverables: ["Time tracker integration", "Auto-drafted invoices", "Approval workflow", "Scheduled client delivery"],
      price: "From €1,200",
    },
    {
      title: "Learner Enrollment System", icon: "🎓", tag: "Education & Training", sector: "Education & Training",
      desc: "An enrollment-to-completion pipeline that places learners, sends the right content at the right time, and alerts you when someone falls behind.",
      deliverables: ["Enrollment form + cohort assignment", "Welcome & orientation sequence", "Progress milestone triggers", "At-risk learner alerts"],
      price: "From €1,800",
    },
    {
      title: "Certificate Issuance Automation", icon: "🏅", tag: "Education & Training", sector: "Education & Training",
      desc: "Completion triggers a branded certificate generated and delivered in seconds — no delays, no manual design, no human error.",
      deliverables: ["Completion trigger setup", "Branded certificate template", "Auto-delivery workflow", "Completion registry log"],
      price: "From €900",
    },
    {
      title: "Power Platform Development", icon: "🔧", tag: "Build", sector: "All",
      desc: "Custom Power Apps, Power Automate flows, and SharePoint integrations for Microsoft-ecosystem organisations.",
      deliverables: ["Requirements workshop", "Custom Power App build", "Power Automate flows", "SharePoint integration"],
      price: "From €2,000",
    },
    {
      title: "Cloud & IT Advisory", icon: "☁️", tag: "Strategy", sector: "All",
      desc: "Strategic guidance for organisations moving to or optimising Azure, AWS, and Microsoft 365 — without the Big 4 retainer.",
      deliverables: ["Cloud readiness assessment", "Migration strategy", "Architecture review", "Governance framework"],
      price: "From €1,500",
    },
  ];

  const filtered = sector === "All" ? services : services.filter(s => s.sector === sector || s.sector === "All");

  return (
    <div style={{ background: C.black }}>
      <section style={{ padding: "4.5rem 2rem 3rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Services</Label>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: C.offWhite, marginBottom: 14 }}>What we build and deliver.</h1>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, maxWidth: 520, marginBottom: 34 }}>
            Every engagement is scoped to your actual problem — not a package that needs trimming. Filter by your sector below.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {sectors.map(s => (
              <button key={s} onClick={() => setSector(s)} style={{
                padding: "8px 20px", fontSize: 12, cursor: "pointer",
                fontFamily: FONT_BODY, letterSpacing: "0.06em", textTransform: "uppercase",
                border: `1px solid ${sector === s ? C.orange : C.borderMid}`,
                background: sector === s ? C.orangeDim : "none",
                color: sector === s ? C.orange : C.muted,
                transition: "all 0.2s",
              }}>{s}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "3rem 2rem 5rem" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 1, background: C.border }}>
          {filtered.map(s => (
            <div key={s.title} style={{
              background: s.featured ? C.blackCard : C.black,
              padding: "2rem", display: "flex", flexDirection: "column", position: "relative",
              borderTop: s.featured ? `2px solid ${C.orange}` : "none",
            }}>
              {s.featured && (
                <div style={{
                  position: "absolute", top: -1, right: 20,
                  background: C.orange, color: C.black,
                  fontSize: 10, fontWeight: 600, padding: "3px 12px",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>Most requested</div>
              )}
              <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: C.offWhite, lineHeight: 1.3 }}>{s.title}</h3>
                <Badge>{s.tag}</Badge>
              </div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, marginBottom: 18, flexGrow: 1 }}>{s.desc}</p>
              <div style={{ marginBottom: 18 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.orange, marginBottom: 10 }}>What's included</p>
                {s.deliverables.map(d => (
                  <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <Dot />
                    <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>{d}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: C.offWhite }}>{s.price}</span>
                <Btn onClick={() => setPage("Contact")} size="sm">Enquire →</Btn>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RETAINER CTA */}
      <section style={{ padding: "4rem 2rem", background: C.blackSoft, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div style={{ maxWidth: 520 }}>
            <Label>Ongoing support</Label>
            <Heading style={{ marginBottom: 12 }}>Need a long-term automation partner?</Heading>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85 }}>
              All services are available on monthly retainer — for organisations that want continuous automation improvement, not one-off builds.
            </p>
          </div>
          <Btn onClick={() => setPage("Contact")} size="lg">Discuss a retainer</Btn>
        </div>
      </section>
    </div>
  );
}

// ─── DEMO ─────────────────────────────────────────────────────────────────────
function DemoPage() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [demoStep, setDemoStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [auditData, setAuditData] = useState({ name: "", email: "", sector: "", workflow: "", hours: "" });
  const [submitted, setSubmitted] = useState(false);

  const demos = [
    {
      title: "Client onboarding", sector: "Professional Services",
      desc: "A new client submits an intake form. Watch every downstream action trigger automatically — no human intervention needed.",
      steps: [
        { label: "Client submits intake form",    icon: "📋", detail: "Name, email, service type, and company size captured" },
        { label: "CRM record created",            icon: "💾", detail: "Contact added to pipeline with correct stage and tags" },
        { label: "Welcome email sent",            icon: "📧", detail: "Personalised with client name and onboarding next steps" },
        { label: "Document checklist dispatched", icon: "📁", detail: "Tailored list generated based on selected service type" },
        { label: "Discovery call booked",         icon: "📅", detail: "Calendar invite created and sent to client and consultant" },
        { label: "Internal notification sent",    icon: "🔔", detail: "Slack or Teams message to assigned consultant with context" },
      ],
    },
    {
      title: "Learner enrollment", sector: "Education & Training",
      desc: "A learner registers for a programme. From that moment, every step to getting them into class happens automatically.",
      steps: [
        { label: "Learner submits registration",  icon: "✍️", detail: "Name, email, and programme selection captured" },
        { label: "Cohort assigned automatically", icon: "👥", detail: "Placed in correct group based on start date and capacity" },
        { label: "Welcome sequence begins",       icon: "📬", detail: "Day 0, Day 3, Day 7 personalised emails sent automatically" },
        { label: "LMS access provisioned",        icon: "🔑", detail: "Login credentials generated and delivered instantly" },
        { label: "Progress tracking activated",   icon: "📊", detail: "Dashboard begins monitoring milestone completion in real time" },
        { label: "At-risk flag triggered",        icon: "⚠️", detail: "Advisor alerted automatically if no login within 5 days" },
      ],
    },
    {
      title: "Invoice generation", sector: "Professional Services",
      desc: "Month-end arrives. Time tracked becomes invoice sent — drafted, approved, and delivered without anyone building it by hand.",
      steps: [
        { label: "Month-end trigger fires",       icon: "🗓️", detail: "Scheduled automation activates on the 1st of each month" },
        { label: "Time entries pulled",           icon: "⏱️", detail: "All billable hours collected and grouped by client and project" },
        { label: "Invoice auto-drafted",          icon: "📄", detail: "Line items, hours, and totals calculated and formatted" },
        { label: "Sent for one-click approval",   icon: "👁️", detail: "Consultant reviews and approves — no rebuilding from scratch" },
        { label: "Invoice delivered to client",   icon: "📤", detail: "Emailed with PDF attached and payment link included" },
        { label: "Follow-up triggered if unpaid", icon: "🔁", detail: "Polite reminder sequence starts automatically after 7 days" },
      ],
    },
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
    width: "100%", padding: "11px 14px",
    background: C.blackCard, border: `1px solid ${C.borderMid}`,
    color: C.offWhite, fontSize: 14, fontFamily: FONT_BODY, outline: "none",
  };

  return (
    <div style={{ background: C.black }}>
      <section style={{ padding: "4.5rem 2rem 3rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Demo</Label>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: C.offWhite, marginBottom: 14 }}>See automation in action.</h1>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, maxWidth: 520 }}>
            Pick a workflow, press run, and watch each step trigger automatically — exactly what we build for your business.
          </p>
        </div>
      </section>

      {/* LIVE DEMO */}
      <section style={{ padding: "3.5rem 2rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 1, marginBottom: 30, background: C.border, flexWrap: "wrap" }}>
            {demos.map((d, i) => (
              <button key={i} onClick={() => switchDemo(i)} style={{
                padding: "12px 24px", fontSize: 13, cursor: "pointer",
                fontFamily: FONT_BODY, letterSpacing: "0.04em", flex: 1,
                border: "none",
                background: activeDemo === i ? C.orangeDim : C.blackCard,
                color: activeDemo === i ? C.orange : C.muted,
                borderBottom: activeDemo === i ? `2px solid ${C.orange}` : "2px solid transparent",
                transition: "all 0.2s",
              }}>{d.title}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 1, background: C.border }}>
            {/* Info panel */}
            <div style={{ background: C.blackCard, padding: "2rem" }}>
              <Badge>{demos[activeDemo].sector}</Badge>
              <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: C.offWhite, margin: "16px 0 10px" }}>{demos[activeDemo].title}</h2>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, marginBottom: 28 }}>{demos[activeDemo].desc}</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={runDemo} disabled={running} style={{
                  background: running ? C.borderMid : C.orange,
                  color: running ? C.muted : C.black,
                  border: "none", padding: "11px 22px",
                  fontSize: 13, fontWeight: 600,
                  cursor: running ? "not-allowed" : "pointer",
                  fontFamily: FONT_BODY, letterSpacing: "0.04em",
                }}>{running ? "Running…" : "▶  Run automation"}</button>
                <button onClick={resetDemo} style={{
                  background: "none", border: `1px solid ${C.borderMid}`,
                  color: C.muted, padding: "11px 18px",
                  fontSize: 13, cursor: "pointer", fontFamily: FONT_BODY,
                }}>Reset</button>
              </div>
              {demoStep >= demos[activeDemo].steps.length && (
                <div style={{
                  marginTop: 20, padding: "13px 16px",
                  background: C.orangeDim, border: `1px solid rgba(232,135,10,0.3)`,
                  fontSize: 13, color: C.orange, fontWeight: 500,
                }}>✓ Complete — 0 manual steps taken.</div>
              )}
            </div>

            {/* Steps */}
            <div style={{ background: C.black, padding: "1.5rem", display: "flex", flexDirection: "column", gap: 6 }}>
              {demos[activeDemo].steps.map((s, i) => {
                const done   = demoStep > i;
                const active = demoStep === i && running;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "12px 14px",
                    border: `1px solid ${done ? "rgba(232,135,10,0.4)" : active ? "rgba(232,135,10,0.2)" : C.border}`,
                    background: done ? C.orangeDim : active ? "rgba(232,135,10,0.04)" : C.blackCard,
                    transition: "all 0.3s",
                  }}>
                    <div style={{
                      width: 32, height: 32, flexShrink: 0,
                      background: done ? C.orange : active ? "rgba(232,135,10,0.2)" : C.blackBorder,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: done ? 13 : 16, color: done ? C.black : C.offWhite,
                      transition: "all 0.3s", fontWeight: done ? 700 : 400,
                    }}>{done ? "✓" : s.icon}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: done ? C.orange : active ? C.orangeLight : C.offWhite, marginBottom: 3 }}>{s.label}</p>
                      <p style={{ fontSize: 12, color: done ? "rgba(232,135,10,0.7)" : C.muted, lineHeight: 1.6 }}>{s.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FREE AUDIT FORM */}
      <section style={{ padding: "5rem 2rem", background: C.blackSoft }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Label>Free workflow audit</Label>
          <Heading style={{ marginBottom: 14 }}>Tell us what you do manually. We'll tell you what it's costing you.</Heading>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, marginBottom: 36 }}>
            Submit your most time-consuming manual workflow. Within 48 hours we'll send you a short audit showing which parts are automatable and an estimate of hours saved per month — completely free, no obligation.
          </p>

          {submitted ? (
            <div style={{ background: C.blackCard, border: `1px solid ${C.orange}`, padding: "3rem", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 18 }}>✅</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", color: C.offWhite, marginBottom: 12 }}>Audit request received.</h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85 }}>
                We'll review your workflow and send your free audit to <strong style={{ color: C.offWhite }}>{auditData.email}</strong> within 48 hours.
              </p>
            </div>
          ) : (
            <div style={{ background: C.blackCard, border: `1px solid ${C.border}`, padding: "2.25rem" }}>
              {/* Step indicator */}
              <div style={{ display: "flex", gap: 12, marginBottom: 28, alignItems: "center" }}>
                {[0, 1].map(i => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 28, height: 28,
                      background: auditStep >= i ? C.orange : C.blackBorder,
                      border: `1px solid ${auditStep >= i ? C.orange : C.borderMid}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: auditStep >= i ? C.black : C.muted,
                      fontWeight: 600, transition: "all 0.3s",
                    }}>{i + 1}</div>
                    <span style={{ fontSize: 12, color: auditStep >= i ? C.orange : C.muted, letterSpacing: "0.04em" }}>
                      {i === 0 ? "Your details" : "Your workflow"}
                    </span>
                    {i === 0 && <span style={{ color: C.border, marginLeft: 4 }}>→</span>}
                  </div>
                ))}
              </div>

              {auditStep === 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[["Full name", "name", "text", "Jane Smith"], ["Email address", "email", "email", "jane@firm.com"]].map(([label, field, type, ph]) => (
                      <div key={field}>
                        <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                        <input type={type} value={auditData[field]} onChange={e => handleAudit(field, e.target.value)} placeholder={ph} style={inputStyle} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>Your sector</label>
                    <select value={auditData.sector} onChange={e => handleAudit("sector", e.target.value)} style={{ ...inputStyle }}>
                      <option value="">Select your sector</option>
                      <option>Professional Services</option>
                      <option>Education & Training</option>
                      <option>Healthcare & Wellness</option>
                      <option>E-commerce & Retail</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <Btn onClick={() => auditData.name && auditData.email && auditData.sector && setAuditStep(1)}
                    disabled={!auditData.name || !auditData.email || !auditData.sector} size="lg">
                    Continue →
                  </Btn>
                </div>
              )}

              {auditStep === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Describe the workflow you'd most like to automate
                    </label>
                    <textarea value={auditData.workflow} onChange={e => handleAudit("workflow", e.target.value)}
                      placeholder="e.g. Every Monday I manually copy client data from our intake form into our CRM, send a welcome email, and add them to a spreadsheet tracker..."
                      rows={5} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 7, letterSpacing: "0.06em", textTransform: "uppercase" }}>How many hours per week does this take?</label>
                    <select value={auditData.hours} onChange={e => handleAudit("hours", e.target.value)} style={{ ...inputStyle }}>
                      <option value="">Select an estimate</option>
                      <option>Less than 2 hours</option>
                      <option>2–5 hours</option>
                      <option>5–10 hours</option>
                      <option>More than 10 hours</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setAuditStep(0)} style={{
                      background: "none", border: `1px solid ${C.borderMid}`,
                      color: C.muted, padding: "13px 20px",
                      fontSize: 13, cursor: "pointer", fontFamily: FONT_BODY,
                    }}>← Back</button>
                    <button onClick={() => auditData.workflow && auditData.hours && setSubmitted(true)}
                      disabled={!auditData.workflow || !auditData.hours}
                      style={{
                        flex: 1, background: auditData.workflow && auditData.hours ? C.orange : C.blackBorder,
                        color: auditData.workflow && auditData.hours ? C.black : C.muted,
                        border: "none", padding: "13px", fontSize: 14, fontWeight: 600,
                        fontFamily: FONT_BODY, cursor: auditData.workflow && auditData.hours ? "pointer" : "not-allowed",
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

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", org: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const canSubmit = form.name && form.email;

  const inputStyle = {
    width: "100%", padding: "11px 14px",
    background: C.blackCard, border: `1px solid ${C.borderMid}`,
    color: C.offWhite, fontSize: 14, fontFamily: FONT_BODY, outline: "none",
    borderRadius: 0,
  };

  return (
    <div style={{ background: C.black }}>
      <section style={{ padding: "4.5rem 2rem 3rem", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Label>Contact</Label>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: C.offWhite, marginBottom: 14 }}>Let's talk about your workflow.</h1>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.85, maxWidth: 480 }}>
            No hard sell. Tell us what you're working with and we'll tell you honestly whether automation can help — and what it would look like.
          </p>
        </div>
      </section>

      <section style={{ padding: "3.5rem 2rem 5rem" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}>
          {/* Left */}
          <div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", color: C.offWhite, marginBottom: 28 }}>What to expect</h2>
            {[
              { icon: "📬", title: "Response within 48 hours",   desc: "Every enquiry gets a personal response — not an autoresponder." },
              { icon: "📞", title: "30-minute discovery call",   desc: "We start with a conversation, not a proposal. No obligation." },
              { icon: "📝", title: "Clear scoped proposal",      desc: "If there's a fit, you'll receive a fixed-price scope — no hourly surprises." },
              { icon: "🚀", title: "Build starts within 2 weeks",desc: "Our intake process is lean. Most projects begin quickly after agreement." },
            ].map(item => (
              <div key={item.title} style={{ display: "flex", gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 500, fontSize: 14, color: C.offWhite, marginBottom: 5 }}>{item.title}</p>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              </div>
            ))}
            <div style={{ padding: "1.5rem", background: C.blackCard, border: `1px solid ${C.border}` }}>
              <Label>Direct contact</Label>
              {[["Email", "info@meetavantgarde.com"], ["Phone", "(844) 311-3117"], ["Location", "Stuttgart, DE · Arlington, VA, USA"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: "#555", minWidth: 64, textTransform: "uppercase", letterSpacing: "0.08em", paddingTop: 1 }}>{k}</span>
                  <span style={{ fontSize: 13, color: C.mutedLight }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div style={{ background: C.blackCard, border: `1px solid ${C.orange}`, padding: "3.5rem", textAlign: "center" }}>
              <div style={{ fontSize: 52, marginBottom: 20 }}>✅</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.7rem", color: C.offWhite, marginBottom: 12 }}>Message received.</h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85 }}>
                Thank you, <strong style={{ color: C.offWhite }}>{form.name}</strong>. We'll be in touch at <strong style={{ color: C.offWhite }}>{form.email}</strong> within 48 hours.
              </p>
            </div>
          ) : (
            <div style={{ background: C.blackCard, border: `1px solid ${C.border}`, padding: "2.25rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
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
                  <select value={form.service} onChange={e => handle("service", e.target.value)} style={{ ...inputStyle }}>
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
                  background: canSubmit ? C.orange : C.blackBorder,
                  color: canSubmit ? C.black : C.muted,
                  border: "none", padding: "14px", fontSize: 14, fontWeight: 600,
                  fontFamily: FONT_BODY, cursor: canSubmit ? "pointer" : "not-allowed",
                  letterSpacing: "0.04em", transition: "opacity 0.2s",
                }}>Send message</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const pages = { Home: HomePage, About: AboutPage, Services: ServicesPage, Demo: DemoPage, Contact: ContactPage };
  const PageComponent = pages[page] || HomePage;

  return (
    <div style={{ fontFamily: FONT_BODY, background: C.black, minHeight: "100vh" }}>
      <Nav page={page} setPage={setPage} />
      <main><PageComponent setPage={setPage} /></main>
      <Footer setPage={setPage} />
    </div>
  );
}
