import { useState, useCallback, useEffect } from "react";

// Design tokens
const C = {
  white: "var(--c-white)", cream: "var(--c-cream)", ink: "var(--c-ink)",
  inkMid: "var(--c-ink-mid)", muted: "var(--c-muted)", mutedLight: "var(--c-muted-light)",
  border: "var(--c-border)", orange: "#E8870A", orangeLight: "#F5A535",
  orangePale: "var(--c-orange-pale)", onAccent: "#FFFFFF",
};
const FONT_DISPLAY = "'DM Serif Display', Georgia, serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

// Responsive hook
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

// Label component
function Label({ children }) {
  return (
    <p style={{
      fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
      color: C.orange, marginBottom: 12, fontWeight: 500,
    }}>{children}</p>
  );
}

export default function IntakePage() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const save = useCallback((key, val) => setData(p => ({ ...p, [key]: val })), []);

  const STEPS = [
    {
      title: "Business Profile",
      sub: "Tell us about your organization and decision makers.",
      fields: [
        { key: "company", label: "Company name *", type: "text" },
        { key: "email", label: "Email *", type: "email" },
        { key: "industry", label: "Industry *", type: "select", options: ["Professional Services", "Finance", "Education", "Government", "Healthcare", "Manufacturing", "Retail", "Other"] },
        { key: "employees", label: "Number of employees", type: "select", options: ["1–10", "11–50", "51–250", "250+"] },
        { key: "isDecisionMaker", label: "Are you the decision-maker?", type: "radio", options: [["yes", "Yes"], ["no", "No — different person"]] },
      ]
    },
    {
      title: "Workflow Details",
      sub: "Describe the workflow you want automated.",
      fields: [
        { key: "workflow", label: "What is the workflow? *", type: "textarea", placeholder: "E.g., client onboarding, compliance reporting, invoice processing..." },
        { key: "frequency", label: "How often does it run?", type: "select", options: ["Daily", "Weekly", "Monthly", "Quarterly", "As-needed"] },
      ]
    },
    {
      title: "Integration Systems",
      sub: "What tools does your workflow touch?",
      fields: [
        { key: "systems", label: "Current systems *", type: "textarea", placeholder: "E.g., Salesforce, HubSpot, Stripe, Google Sheets, QuickBooks..." },
        { key: "integrationComplexity", label: "Integration complexity?", type: "select", options: ["Low — mostly API-based tools", "Medium — mix of APIs and manual exports", "High — legacy systems or complex data flows"] },
      ]
    },
    {
      title: "Timeline & Budget",
      sub: "When do you need this, and what's your budget?",
      fields: [
        { key: "timeline", label: "Timeline *", type: "select", options: ["ASAP", "1–2 months", "3–6 months", "6+ months", "No rush"] },
        { key: "budget", label: "Budget range", type: "select", options: ["$5k–$15k", "$15k–$50k", "$50k–$150k", "$150k+"] },
        { key: "budgetNotes", label: "Any budget constraints?", type: "textarea", placeholder: "Budget approved, need ROI justification, phased investment preferred..." },
      ]
    },
    {
      title: "Team Structure",
      sub: "Who else is involved in this project?",
      fields: [
        { key: "team", label: "Who else should we talk to?", type: "textarea", placeholder: "Names, titles, email addresses..." },
        { key: "engagementStyle", label: "Preferred engagement style?", type: "select", options: ["Hands-off — we trust your team", "Regular check-ins — weekly updates", "Collaborative — we want to be involved"] },
      ]
    },
    {
      title: "Success Metrics",
      sub: "How will we measure success?",
      fields: [
        { key: "success", label: "What does success look like? *", type: "textarea", placeholder: "Hours saved per week, accuracy improvements, cost reductions, faster processing..." },
        { key: "pain", label: "What's your biggest pain point right now?", type: "textarea", placeholder: "Manual errors, time spent, system limitations..." },
      ]
    },
    {
      title: "Constraints & Compliance",
      sub: "Any restrictions we should know about?",
      fields: [
        { key: "constraints", label: "Security, compliance, or other constraints?", type: "textarea", placeholder: "HIPAA, SOC 2, data residency, air-gapped systems..." },
        { key: "previousAttempts", label: "Have you tried to automate this before?", type: "textarea", placeholder: "Previous consultants, internal constraints, preferred communication style, hard deadlines..." },
      ]
    },
    {
      title: "Additional Notes",
      sub: "Anything else we should know?",
      fields: [
        { key: "notes", label: "Additional context", type: "textarea", placeholder: "Growth plans, planned integrations, stakeholder concerns..." },
      ]
    },
    {
      title: "Review & Submit",
      sub: "Review your submission and submit.",
      fields: []
    },
  ];

  const currentStep = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const inputStyle = {
    width: "100%", padding: "10px 12px", border: `1px solid ${C.border}`,
    borderRadius: 6, fontSize: 14, fontFamily: FONT_BODY,
    background: C.white, color: C.ink,
  };

  const submitIntake = async () => {
    setLoading(true);
    try {
      await fetch("https://6d5db8f5929ae676a41ce8d883af5f.07.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/6dc7636ebb5a446eb65de94892ac168e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=A0GsLWD-RYF7u4dqU12u-7zQmYgp91Xwkuox0p_DTNU", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      setSubmitted(true);
      setData({});
    } catch (e) {
      console.error("Flow error:", e);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{ background: C.white, minHeight: "100vh", padding: isMobile ? "3rem 1.5rem" : "6rem 2rem" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 36 : 48, color: C.ink, marginBottom: 16 }}>Thank you.</h1>
          <p style={{ fontSize: 16, color: C.inkMid, lineHeight: 1.6, marginBottom: 32 }}>
            We've received your workflow intake. Our team will review your submission and reach out within 48 hours to schedule a discovery call.
          </p>
          <button onClick={() => window.location.href = "/"} style={{
            padding: "12px 28px", background: C.orange, color: C.white, border: "none",
            borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT_BODY
          }}>Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: C.white, minHeight: "100vh", padding: isMobile ? "2rem 1.5rem" : "4rem 2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? 32 : 42, color: C.ink, marginBottom: 8 }}>
          Workflow Intake
        </h1>
        <p style={{ fontSize: 16, color: C.inkMid, marginBottom: 40 }}>
          Tell us about your workflow. {STEPS.length - 1} sections, 5–8 minutes. We'll review your submission and reach out within 48 hours to schedule a discovery call.
        </p>

        {/* Progress bar */}
        <div style={{ height: 4, background: C.border, borderRadius: 2, marginBottom: 40, overflow: "hidden" }}>
          <div style={{ height: "100%", background: C.orange, width: `${((step + 1) / STEPS.length) * 100}%`, transition: "width 0.3s" }} />
        </div>

        {/* Step indicator */}
        <p style={{ fontSize: 12, color: C.muted, marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Step {step + 1} of {STEPS.length}
        </p>

        {/* Step content */}
        <div style={{ marginBottom: 40 }}>
          <Label>{currentStep.title}</Label>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: C.ink, marginBottom: 8 }}>{currentStep.title}</h2>
          <p style={{ fontSize: 14, color: C.inkMid, marginBottom: 32 }}>{currentStep.sub}</p>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {currentStep.fields.map(field => (
              <div key={field.key}>
                <label style={{ display: "block", marginBottom: 8, fontSize: 14, fontWeight: 500, color: C.ink, fontFamily: FONT_BODY }}>
                  {field.label}
                </label>
                {field.type === "text" || field.type === "email" ? (
                  <input
                    type={field.type}
                    value={data[field.key] || ""}
                    onChange={e => save(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    style={inputStyle}
                  />
                ) : field.type === "textarea" ? (
                  <textarea
                    value={data[field.key] || ""}
                    onChange={e => save(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    style={{ ...inputStyle, minHeight: 100, fontFamily: FONT_BODY, resize: "vertical" }}
                  />
                ) : field.type === "select" ? (
                  <select
                    value={data[field.key] || ""}
                    onChange={e => save(field.key, e.target.value)}
                    style={inputStyle}
                  >
                    <option value="">Select...</option>
                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : field.type === "radio" ? (
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {field.options.map(([val, label]) => (
                      <label key={val} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: FONT_BODY }}>
                        <input
                          type="radio"
                          name={field.key}
                          value={val}
                          checked={data[field.key] === val}
                          onChange={e => save(field.key, e.target.value)}
                        />
                        <span style={{ fontSize: 14, color: C.ink }}>{label}</span>
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} style={{
              padding: "11px 28px", fontSize: 14, fontWeight: 500, cursor: "pointer",
              border: `1px solid ${C.border}`, background: C.white, color: C.ink,
              borderRadius: 6, fontFamily: FONT_BODY,
            }}>Previous</button>
          ) : <div />}

          {isLast ? (
            <button onClick={submitIntake} disabled={loading} style={{
              padding: "11px 28px", fontSize: 14, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer",
              border: "none", background: loading ? C.creamDark : C.orange, color: loading ? C.muted : C.white,
              borderRadius: 6, fontFamily: FONT_BODY, opacity: loading ? 0.6 : 1,
            }}>{loading ? "Submitting..." : "Submit intake form"}</button>
          ) : (
            <button onClick={() => setStep(step + 1)} style={{
              padding: "11px 28px", fontSize: 14, fontWeight: 500, cursor: "pointer",
              border: "none", background: C.orange, color: C.white,
              borderRadius: 6, fontFamily: FONT_BODY,
            }}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}
