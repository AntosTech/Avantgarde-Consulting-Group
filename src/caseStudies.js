// ─── CASE STUDIES CONTENT (local CMS) ──────────────────────────────────────────
// Edit this file to add, remove, or update case studies. Each entry powers both
// the Case Studies grid and the individual Case Study template page.

export const INDUSTRIES = ["All", "Professional Services", "Education", "Government"];

export const CASE_STUDIES = [
  {
    slug: "regional-accounting-firm",
    title: "Cutting client onboarding from 6 days to 4 hours",
    client: "Regional Accounting Firm",
    industry: "Professional Services",
    image: "/cases/accounting.png",
    summary:
      "A 40-person accounting practice automated client intake, document collection, and engagement setup — freeing senior staff from repetitive admin.",
    cardMetric: "92% faster onboarding",
    hero: {
      tagline: "How a regional accounting firm reclaimed 14 hours a week per manager.",
    },
    problem:
      "New client onboarding was entirely manual. Every engagement required staff to email document checklists, chase missing files, re-key data into three separate systems, and manually create engagement folders. Partners estimated each onboarding consumed six business days of elapsed time and roughly four hours of billable staff effort — time that scaled painfully during tax season.",
    solution:
      "We mapped the end-to-end intake journey and rebuilt it as a single automated workflow. A branded intake form feeds a secure document portal with automatic reminders, validates and routes data into their practice management and cloud storage systems, and provisions engagement folders from a template — with a built-in audit trail for compliance.",
    results: [
      { metric: "92%", label: "Reduction in onboarding time" },
      { metric: "14 hrs", label: "Saved per manager, weekly" },
      { metric: "100%", label: "Document completeness at kickoff" },
      { metric: "3 → 1", label: "Systems staff touch manually" },
    ],
    demoVideo: null, // optional embed URL; falls back to poster
    poster: "/cases/accounting.png",
    workflow: [
      { label: "Client submits intake form", desc: "Branded form captures entity details, services, and contacts." },
      { label: "Secure document request", desc: "Portal auto-requests required files with smart reminders." },
      { label: "Validation & routing", desc: "Data is validated and pushed to practice + storage systems." },
      { label: "Engagement provisioned", desc: "Folders, tasks, and an audit trail are created from a template." },
    ],
    related: ["boutique-law-practice", "vocational-training-institute"],
  },
  {
    slug: "boutique-law-practice",
    title: "Automating matter intake and conflict checks",
    client: "Boutique Law Practice",
    industry: "Professional Services",
    image: "/cases/legal.png",
    summary:
      "A litigation boutique replaced fragile email-and-spreadsheet intake with an automated pipeline for matter creation, conflict checks, and engagement letters.",
    cardMetric: "48h → same-day intake",
    hero: {
      tagline: "From scattered email threads to a clean, auditable intake pipeline.",
    },
    problem:
      "Matter intake depended on a single paralegal manually triaging enquiries, running conflict checks by searching old spreadsheets, and copy-pasting engagement letters. Turnaround averaged 48 hours, conflict checks were inconsistent, and the firm had no reliable record of who reviewed what — a real compliance exposure.",
    solution:
      "We built an intake workflow that captures enquiries through a single form, automatically runs conflict checks against the firm's matter database, generates a pre-filled engagement letter for attorney review, and logs every decision. Approvals happen with one click, and the entire trail is timestamped.",
    results: [
      { metric: "Same day", label: "Average intake turnaround" },
      { metric: "100%", label: "Conflict checks logged" },
      { metric: "9 hrs", label: "Saved weekly on intake admin" },
      { metric: "0", label: "Missed engagement letters" },
    ],
    demoVideo: null,
    poster: "/cases/legal.png",
    workflow: [
      { label: "Enquiry captured", desc: "A single intake form replaces scattered email threads." },
      { label: "Automated conflict check", desc: "Parties are matched against the existing matter database." },
      { label: "Engagement letter drafted", desc: "A pre-filled letter is generated for attorney review." },
      { label: "One-click approval", desc: "Decisions are logged with a timestamped audit trail." },
    ],
    related: ["regional-accounting-firm", "online-course-academy"],
  },
  {
    slug: "online-course-academy",
    title: "Scaling learner enrollment without adding headcount",
    client: "Online Course Academy",
    industry: "Education",
    image: "/cases/academy.png",
    summary:
      "A fast-growing online academy automated enrollment, payment reconciliation, and learner provisioning to handle 5x volume with the same small team.",
    cardMetric: "5x volume, same team",
    hero: {
      tagline: "Handling five times the enrollments without adding a single hire.",
    },
    problem:
      "Enrollment growth outpaced the team. Staff manually confirmed payments, created LMS accounts, sent welcome sequences, and reconciled revenue across platforms. Errors crept in, learners waited hours for access, and the founder spent evenings fixing mismatched records instead of building curriculum.",
    solution:
      "We connected their checkout, learning platform, and finance tools into one automated enrollment flow. Successful payments instantly provision learner accounts, trigger a personalised welcome journey, and reconcile revenue automatically — with exceptions flagged for human review rather than requiring manual processing of every record.",
    results: [
      { metric: "5x", label: "Enrollment volume handled" },
      { metric: "< 2 min", label: "Time to course access" },
      { metric: "18 hrs", label: "Saved weekly across the team" },
      { metric: "99.6%", label: "Payment reconciliation accuracy" },
    ],
    demoVideo: null,
    poster: "/cases/academy.png",
    workflow: [
      { label: "Learner checks out", desc: "Payment is captured through the existing checkout." },
      { label: "Account provisioned", desc: "An LMS account is created and access granted in under two minutes." },
      { label: "Welcome journey", desc: "A personalised onboarding sequence is triggered automatically." },
      { label: "Revenue reconciled", desc: "Finance records sync automatically; exceptions are flagged." },
    ],
    related: ["vocational-training-institute", "regional-accounting-firm"],
  },
  {
    slug: "vocational-training-institute",
    title: "Streamlining cohort management and compliance reporting",
    client: "Vocational Training Institute",
    industry: "Education",
    image: "/cases/training.png",
    summary:
      "An accredited training provider automated cohort scheduling, attendance tracking, and funding compliance reports that previously took days each month.",
    cardMetric: "3 days → 20 min reporting",
    hero: {
      tagline: "Turning a multi-day monthly compliance scramble into a 20-minute review.",
    },
    problem:
      "Monthly funding and accreditation reports were assembled by hand from attendance sheets, the LMS, and spreadsheets. The process took three full days, was prone to transcription errors, and put the institute's funding at risk whenever a deadline slipped. Cohort scheduling was equally manual and error-prone.",
    solution:
      "We automated attendance capture and cohort scheduling, then built a reporting workflow that compiles compliant funding and accreditation reports on demand. Staff now review and approve a generated report rather than building one from scratch, with data validated against funding rules before submission.",
    results: [
      { metric: "20 min", label: "Monthly reporting (was 3 days)" },
      { metric: "100%", label: "On-time compliance submissions" },
      { metric: "11 hrs", label: "Saved weekly on admin" },
      { metric: "0", label: "Funding deadlines missed since launch" },
    ],
    demoVideo: null,
    poster: "/cases/training.png",
    workflow: [
      { label: "Attendance captured", desc: "Sessions log attendance automatically into one source of truth." },
      { label: "Cohorts scheduled", desc: "Scheduling and reminders run from a reusable template." },
      { label: "Report generated", desc: "Compliant funding reports are compiled on demand." },
      { label: "Review & submit", desc: "Staff approve a validated report instead of building one." },
    ],
    related: ["online-course-academy", "boutique-law-practice"],
  },
  {
    slug: "federal-permitting-agency",
    title: "Cutting permit application processing from 30 days to 5",
    client: "US Government Agency",
    industry: "Government",
    image: "/cases/government.png",
    summary:
      "A federal permitting office automated intake, eligibility screening, and inter-department routing — clearing a chronic backlog while keeping a full compliance audit trail.",
    cardMetric: "83% faster processing",
    hero: {
      tagline: "How a federal permitting office cleared its backlog without adding headcount.",
    },
    problem:
      "A federal permitting agency processed thousands of applications a year almost entirely on paper and email. Caseworkers manually checked eligibility, re-entered applicant data across legacy systems, and routed files between departments by hand. Average processing took 30 days, the backlog kept growing, and FOIA-ready record-keeping was inconsistent — creating both public-service and accountability pressure.",
    solution:
      "Working within the agency's security and accessibility requirements, we built a Section 508-compliant intake form that validates applications up front, automatically screens eligibility against published rules, and routes each case to the right department with deadline tracking. Every action is logged to an immutable audit trail, and status updates are sent to applicants automatically — without exposing any system to the public internet.",
    results: [
      { metric: "83%", label: "Reduction in processing time" },
      { metric: "30 → 5 days", label: "Average application turnaround" },
      { metric: "100%", label: "Actions captured for audit & FOIA" },
      { metric: "0", label: "Backlog cases past SLA since launch" },
    ],
    demoVideo: null,
    poster: "/cases/government.png",
    workflow: [
      { label: "Application submitted", desc: "A 508-compliant form validates submissions before they enter the queue." },
      { label: "Eligibility screened", desc: "Applications are checked automatically against published rules." },
      { label: "Routed to department", desc: "Each case is assigned to the right team with deadline tracking." },
      { label: "Decision & audit log", desc: "Outcomes are recorded to an immutable, FOIA-ready audit trail." },
    ],
    related: ["regional-accounting-firm", "boutique-law-practice"],
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug) || null;
}

export function getRelated(slug) {
  const cs = getCaseStudy(slug);
  if (!cs) return [];
  return (cs.related || [])
    .map((s) => getCaseStudy(s))
    .filter(Boolean);
}
