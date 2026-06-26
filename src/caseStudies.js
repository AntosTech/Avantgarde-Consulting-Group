// ─── CASE STUDIES CONTENT (local CMS) ──────────────────────────────────────────
// Edit this file to add, remove, or update case studies. Each entry powers both
// the Case Studies grid and the individual Case Study template page.

export const INDUSTRIES = ["All", "Professional Services", "Financial Services", "Education", "Government", "Industrial"];

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
      "In this scenario, the end-to-end intake journey is rebuilt as a single automated workflow. A branded intake form feeds a secure document portal with automatic reminders, validates and routes data into practice-management and cloud-storage systems, and provisions engagement folders from a template — with a built-in audit trail for compliance.",
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
    slug: "document-processing-pipeline",
    title: "Cutting document processing time by 75% with an AI pipeline",
    client: "Professional Services Firm",
    industry: "Professional Services",
    image: "/cases/document-ai.png",
    summary:
      "A mid-sized professional services firm automated its entire document intake and extraction workflow with an AI pipeline — slashing cycle time and freeing senior staff for higher-value work.",
    cardMetric: "75% faster processing",
    hero: {
      tagline: "How an AI extraction pipeline turned manual data entry into exception handling.",
    },
    problem:
      "A mid-sized professional services firm handled a high volume of documents that had to be read, classified, and re-keyed into downstream systems by hand. The manual process was slow, extraction errors ran around 8%, and senior staff spent hours each week on low-value data entry instead of client work. As volume grew, the bottleneck only got worse.",
    solution:
      "The firm deployed an AI document intake and extraction pipeline that ingests documents, classifies them, extracts the relevant fields, and routes the structured data into downstream systems automatically. Low-confidence extractions are flagged for human review, so senior staff shifted from re-keying every document to simply handling exceptions — the small share of cases the pipeline isn't sure about.",
    results: [
      { metric: "75%", label: "Reduction in processing cycle time" },
      { metric: "30+ hrs", label: "Saved per week" },
      { metric: "8% → <2%", label: "Extraction error rate" },
      { metric: "Exceptions", label: "Senior staff focus, not data entry" },
    ],
    demoVideo: null,
    poster: "/cases/document-ai.png",
    workflow: [
      { label: "Documents ingested", desc: "Incoming documents enter the pipeline automatically." },
      { label: "Classified & extracted", desc: "AI identifies document type and pulls the relevant fields." },
      { label: "Validation & routing", desc: "Structured data is validated and routed to downstream systems." },
      { label: "Exception handling", desc: "Low-confidence cases are flagged for senior staff review." },
    ],
    source: {
      label: "aiadvocate.org — Document Processing Automation",
      url: "https://aiadvocate.org/case-studies/document-processing-automation",
    },
    related: ["regional-accounting-firm", "boutique-law-practice"],
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
      "In this scenario, an intake workflow captures enquiries through a single form, automatically runs conflict checks against the firm's matter database, generates a pre-filled engagement letter for attorney review, and logs every decision. Approvals happen with one click, and the entire trail is timestamped.",
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
      "In this scenario, the checkout, learning platform, and finance tools are connected into one automated enrollment flow. Successful payments instantly provision learner accounts, trigger a personalised welcome journey, and reconcile revenue automatically — with exceptions flagged for human review rather than requiring manual processing of every record.",
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
      "In this scenario, attendance capture and cohort scheduling are automated, and a reporting workflow compiles compliant funding and accreditation reports on demand. Staff review and approve a generated report rather than building one from scratch, with data validated against funding rules before submission.",
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
      "Working within strict security and accessibility requirements, this scenario uses a Section 508-compliant intake form that validates applications up front, automatically screens eligibility against published rules, and routes each case to the right department with deadline tracking. Every action is logged to an immutable audit trail, and status updates are sent to applicants automatically — without exposing any system to the public internet.",
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
  {
    slug: "credit-union-fraud-detection",
    title: "Detecting check fraud in real time with agentic AI",
    client: "Suncoast Credit Union",
    industry: "Financial Services",
    image: "/cases/fraud-detection.png",
    summary:
      "Suncoast Credit Union deployed agentic automation to analyse checks and flag fraud as it happens — turning slow, manual reviews into scalable real-time risk analysis.",
    cardMetric: "Real-time fraud detection",
    hero: {
      tagline: "How agentic AI turned check fraud review into real-time, scalable risk analysis.",
    },
    problem:
      "Check fraud moves fast, but manual review couldn't keep up. Reviewing checks for signs of fraud by hand was slow and didn't scale with volume, leaving a window in which fraudulent checks could clear before anyone caught them — driving avoidable losses and putting members at risk.",
    solution:
      "Suncoast Credit Union deployed agentic automation that analyses each check and surrounding transaction signals the moment it arrives, scoring it for anomalies and flagging suspicious activity in real time. The system scales with volume and surfaces high-risk cases to fraud teams instantly, so intervention happens before losses are realised rather than after.",
    results: [
      { metric: "Real-time", label: "Fraud detection as checks arrive" },
      { metric: "Loss prevention", label: "Caught before funds clear" },
      { metric: "Scalable", label: "Keeps pace with rising volume" },
      { metric: "Anomaly scoring", label: "Continuous, automated risk analysis" },
    ],
    demoVideo: null,
    poster: "/cases/fraud-detection.png",
    workflow: [
      { label: "Check ingested", desc: "Each check and its transaction signals enter the pipeline in real time." },
      { label: "AI analysis", desc: "Agentic automation reads the document and scores it for anomalies." },
      { label: "Risk flagged", desc: "Suspicious activity is surfaced to fraud teams instantly." },
      { label: "Intervention", desc: "High-risk cases are stopped before funds clear, preventing losses." },
    ],
    source: {
      label: "UiPath — Suncoast Credit Union",
      url: "https://www.uipath.com/resources/automation-case-studies/suncoast-credit-union",
    },
    related: ["document-processing-pipeline", "regional-accounting-firm"],
  },
  {
    slug: "cross-department-document-automation",
    title: "AI document processing across HR, finance, sales & procurement",
    client: "Multi-Industry Document Workflows",
    industry: "Professional Services",
    image: "/cases/multi-department.png",
    summary:
      "Documented AI document-processing wins across HR, finance, sales, and procurement — cutting labour cost and errors while making document workflows scalable and audit-ready.",
    cardMetric: "Lower cost, fewer errors",
    hero: {
      tagline: "How AI document processing scales across every department that handles paperwork.",
    },
    problem:
      "Across HR, finance, sales, and procurement, teams handled high volumes of documents manually — onboarding forms, invoices, contracts, and purchase orders all read and re-keyed by hand. The work was labour-intensive and error-prone, slowed every department down, and made consistent compliance hard to guarantee as volume grew.",
    solution:
      "AI document processing was deployed across each department to ingest, classify, and extract data from documents automatically, then route the structured output into the right systems. The same pipeline approach adapts to each team's document types — so HR, finance, sales, and procurement all gain accurate, scalable, audit-ready workflows without adding staff.",
    results: [
      { metric: "Lower cost", label: "Reduced manual labour spend" },
      { metric: "Fewer errors", label: "More accurate data capture" },
      { metric: "Higher efficiency", label: "Faster document throughput" },
      { metric: "Compliance", label: "Audit-ready, scalable workflows" },
    ],
    demoVideo: null,
    poster: "/cases/multi-department.png",
    workflow: [
      { label: "Documents captured", desc: "HR, finance, sales, and procurement docs enter one pipeline." },
      { label: "Classified & extracted", desc: "AI identifies each document type and pulls the relevant fields." },
      { label: "Routed to systems", desc: "Structured data flows into the right downstream system per team." },
      { label: "Compliance & scale", desc: "Every step is logged, keeping workflows audit-ready as volume grows." },
    ],
    source: {
      label: "Zenphi — AI Document Processing Case Studies",
      url: "https://zenphi.com/case-studies/",
    },
    related: ["document-processing-pipeline", "credit-union-fraud-detection"],
  },
  {
    slug: "document-automation-roi",
    title: "200–300% ROI from AI document automation across industries",
    client: "Cross-Industry Analysis",
    industry: "Professional Services",
    image: "/cases/document-roi.png",
    summary:
      "An analysis of 10 real-world AI document automation deployments found consistent, measurable ROI — strongest in invoices, claims, onboarding, and compliance workflows.",
    cardMetric: "200–300% first-year ROI",
    hero: {
      tagline: "What 10 real-world deployments reveal about the ROI of AI document automation.",
    },
    problem:
      "Organisations know manual document handling is expensive, but the return on automating it is often unclear before they invest. Without hard numbers across comparable deployments, it's hard to justify the spend or predict where AI document automation actually pays off the fastest.",
    solution:
      "An analysis of 10 real-world AI document automation deployments quantified the return. Across companies, automation delivered 200–300% ROI in the first year, cut processing time by 60–70%, and reached up to 99% extraction accuracy — with the strongest results in high-volume, structured workflows like invoices, claims, onboarding, and compliance documents.",
    results: [
      { metric: "200–300%", label: "First-year ROI" },
      { metric: "60–70%", label: "Reduction in processing time" },
      { metric: "Up to 99%", label: "Extraction accuracy" },
      { metric: "Invoices & claims", label: "Best-performing workflows" },
    ],
    demoVideo: null,
    poster: "/cases/document-roi.png",
    workflow: [
      { label: "Identify high-volume docs", desc: "Target invoices, claims, onboarding, and compliance paperwork." },
      { label: "Automate extraction", desc: "AI captures data at up to 99% accuracy." },
      { label: "Cut processing time", desc: "Cycle time drops 60–70% versus manual handling." },
      { label: "Measure ROI", desc: "Deployments return 200–300% in the first year." },
    ],
    source: {
      label: "Parseur — Document Automation ROI",
      url: "https://parseur.com/blog/document-automation-roi",
    },
    related: ["document-processing-pipeline", "cross-department-document-automation"],
  },
  {
    slug: "buchanan-litigation-workflows",
    title: "Improving litigation workflows with AI and human-in-the-loop",
    client: "Buchanan Law Firm",
    industry: "Professional Services",
    image: "/cases/litigation.png",
    summary:
      "Buchanan Law Firm automated litigation workflows with AI plus human-in-the-loop orchestration — cutting manual effort, raising consistency, and improving the attorney experience.",
    cardMetric: "Less manual effort",
    hero: {
      tagline: "How AI with human-in-the-loop orchestration streamlined litigation work for attorneys.",
    },
    problem:
      "Litigation work involves repetitive, document-heavy steps — reviewing, classifying, and routing case files — that consumed attorney and staff time. Doing this manually was slow and inconsistent from matter to matter, pulling skilled attorneys away from substantive legal work and into administrative effort.",
    solution:
      "Buchanan Law Firm automated its litigation workflows using AI combined with human-in-the-loop orchestration. The AI handles summarization, classification, and routing of case files, while attorneys stay in control by reviewing and approving at key decision points. The result is less manual effort, more consistent handling across matters, and a better day-to-day experience for attorneys.",
    results: [
      { metric: "Less effort", label: "Reduced manual case-file work" },
      { metric: "Consistency", label: "Uniform handling across matters" },
      { metric: "Attorney UX", label: "Improved day-to-day experience" },
      { metric: "Human-in-loop", label: "Attorneys approve key decisions" },
    ],
    demoVideo: null,
    poster: "/cases/litigation.png",
    workflow: [
      { label: "Case files ingested", desc: "Litigation documents enter the automated workflow." },
      { label: "AI summarizes & classifies", desc: "Files are summarized and classified by document type." },
      { label: "Attorney review", desc: "Human-in-the-loop approval at key decision points." },
      { label: "Routed onward", desc: "Approved files are routed consistently to the next step." },
    ],
    source: {
      label: "UiPath — Buchanan Law Firm",
      url: "https://www.uipath.com/resources/automation-case-studies/buchanan-ingersoll-rooney",
    },
    related: ["boutique-law-practice", "document-processing-pipeline"],
  },
  {
    slug: "continental-engineering-validation",
    title: "Automating engineering validation with AI orchestration",
    client: "Continental Resources",
    industry: "Industrial",
    image: "/cases/engineering.png",
    summary:
      "Continental Resources replaced fragmented email-based workflows with AI-powered orchestration — speeding up engineering decisions and cutting manual coordination.",
    hero: {
      tagline: "How AI orchestration replaced email chains in technical validation workflows.",
    },
    cardMetric: "Faster engineering decisions",
    problem:
      "Engineering validation ran on fragmented, email-based workflows. Requests, reviews, and approvals were scattered across inboxes, making it hard to track status, coordinate across teams, and move decisions forward. The manual coordination slowed engineering throughput and left room for things to fall through the cracks.",
    solution:
      "Continental Resources replaced those email chains with AI-powered orchestration that routes validation requests to the right people, tracks each step, and keeps work moving without manual chasing. Engineering decisions happen faster, the validation process is streamlined end to end, and teams spend far less time coordinating by hand.",
    results: [
      { metric: "Faster", label: "Engineering decisions" },
      { metric: "Streamlined", label: "End-to-end validation process" },
      { metric: "Less coordination", label: "Reduced manual chasing" },
      { metric: "No email chains", label: "Centralised, tracked workflow" },
    ],
    demoVideo: null,
    poster: "/cases/engineering.png",
    workflow: [
      { label: "Request submitted", desc: "Validation requests enter one orchestrated workflow, not email." },
      { label: "AI routing", desc: "Each request is routed to the right reviewers automatically." },
      { label: "Tracked review", desc: "Every step is tracked, so nothing stalls or gets lost." },
      { label: "Decision recorded", desc: "Approvals are captured and the process moves forward faster." },
    ],
    source: {
      label: "UiPath — Continental Resources",
      url: "https://www.uipath.com/resources/automation-case-studies/continental-resources",
    },
    related: ["cross-department-document-automation", "federal-permitting-agency"],
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
