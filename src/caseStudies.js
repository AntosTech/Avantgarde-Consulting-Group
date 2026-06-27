// ─── CASE STUDIES CONTENT (local CMS) ──────────────────────────────────────────
// Edit this file to add, remove, or update case studies. Each entry powers both
// the Case Studies grid and the individual Case Study template page.

export const INDUSTRIES = ["All", "Professional Services", "Financial Services", "Education", "Government", "Industrial"];

export const CASE_STUDIES = [
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
    related: [],
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
    related: ["credit-union-fraud-detection"],
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
    related: ["cross-department-document-automation"],
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
    related: [],
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
    related: ["cross-department-document-automation"],
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
