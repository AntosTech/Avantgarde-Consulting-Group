// SEO metadata per page
export const SEO = {
  Home: {
    title: "Avantgarde Consulting Group LLC — AI Governance & Automation",
    description: "We design and deploy AI-powered automation for professional service firms and educational organisations. Free workflow audit within 48 hours.",
    og_title: "Avantgarde Consulting Group — Artfully Innovative",
    og_description: "AI governance, intelligent automation, and cloud advisory. Serving Professional Services and Education sectors globally.",
    canonical: "https://meetavantgarde.com/",
  },
  About: {
    title: "About Us — Avantgarde Consulting Group LLC",
    description: "Led by Akisha D. Anthony — 15+ years enterprise IT, dual master's degrees, and certifications in AWS, Azure, Security+, ITIL 4, and Power Platform.",
    og_title: "About Avantgarde Consulting Group",
    og_description: "Enterprise IT expertise meets intelligent automation. Meet the founder behind Avantgarde Consulting Group LLC.",
    canonical: "https://meetavantgarde.com/about",
  },
  Services: {
    title: "Services — AI Governance, Workflow Automation & Cloud Advisory",
    description: "From AI risk frameworks and NIST compliance to n8n automation builds and Power Platform development. Fixed pricing, clear deliverables.",
    og_title: "Avantgarde Consulting Services",
    og_description: "AI Governance, Workflow Automation, Power Platform Development, and Cloud Advisory — tailored for Professional Services and Education.",
    canonical: "https://meetavantgarde.com/services",
  },
  Demo: {
    title: "Live Demo & Free Workflow Audit — Avantgarde Consulting Group",
    description: "Watch live automation demos and submit your workflow for a free audit. We'll tell you what's automatable and how many hours it saves — within 48 hours.",
    og_title: "See Automation in Action — Free Workflow Audit",
    og_description: "Interactive automation demos for client onboarding, learner enrollment, and invoice generation. Plus a free workflow audit with 48-hour turnaround.",
    canonical: "https://meetavantgarde.com/demo",
  },
  Contact: {
    title: "Contact Us — Avantgarde Consulting Group LLC",
    description: "Book a free 30-minute discovery call with Avantgarde Consulting Group. Response within 48 hours. No hard sell — just an honest conversation.",
    og_title: "Talk to Avantgarde Consulting Group",
    og_description: "Start with a conversation. We respond within 48 hours and offer a free 30-minute discovery call with no obligation.",
    canonical: "https://meetavantgarde.com/contact",
  },
};

export function applySEO(page) {
  const meta = SEO[page] || SEO.Home;

  // Title
  document.title = meta.title;

  // Helper to set or create a meta tag
  const setMeta = (selector, attr, value) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      const [attrName, attrVal] = attr.split("=");
      el.setAttribute(attrName, attrVal.replace(/"/g, ""));
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  };

  setMeta('meta[name="description"]',           'name=description',           meta.description);
  setMeta('meta[property="og:title"]',          'property=og:title',          meta.og_title);
  setMeta('meta[property="og:description"]',    'property=og:description',    meta.og_description);
  setMeta('meta[property="og:url"]',            'property=og:url',            meta.canonical);
  setMeta('meta[property="og:type"]',           'property=og:type',           "website");
  setMeta('meta[property="og:site_name"]',      'property=og:site_name',      "Avantgarde Consulting Group");
  setMeta('meta[property="og:image"]',          'property=og:image',          "https://meetavantgarde.com/logo.png");
  setMeta('meta[name="twitter:card"]',          'name=twitter:card',          "summary_large_image");
  setMeta('meta[name="twitter:title"]',         'name=twitter:title',         meta.og_title);
  setMeta('meta[name="twitter:description"]',   'name=twitter:description',   meta.og_description);
  setMeta('meta[name="robots"]',                'name=robots',                "index, follow");

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", meta.canonical);

  // JSON-LD structured data (LocalBusiness / ProfessionalService)
  let jsonld = document.getElementById("jsonld-org");
  if (!jsonld) {
    jsonld = document.createElement("script");
    jsonld.id = "jsonld-org";
    jsonld.type = "application/ld+json";
    document.head.appendChild(jsonld);
  }
  jsonld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Avantgarde Consulting Group LLC",
    "url": "https://meetavantgarde.com",
    "logo": "https://meetavantgarde.com/logo.png",
    "description": "AI governance, intelligent automation, and cloud advisory for professional services and education organisations.",
    "slogan": "Artfully Innovative",
    "email": "info@meetavantgarde.com",
    "telephone": "+18443113117",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2615 Columbia Pike Ste 210",
      "addressLocality": "Arlington",
      "addressRegion": "VA",
      "postalCode": "22204",
      "addressCountry": "US"
    },
    "founder": {
      "@type": "Person",
      "name": "Akisha D. Anthony",
      "jobTitle": "Founder & Principal Consultant"
    },
    "areaServed": ["US", "DE", "GB", "EU"],
    "knowsAbout": [
      "AI Governance", "NIST AI RMF", "EU AI Act",
      "Workflow Automation", "n8n", "Power Platform",
      "Microsoft Azure", "AWS", "Cloud Advisory",
      "Professional Services", "Education Technology"
    ],
    "sameAs": []
  });
}
