# Avantgarde Consulting Group

A modern, responsive single-page application for Avantgarde Consulting Group built with Vite, React, and Tailwind CSS. The site showcases workflow automation solutions through case studies, provides a comprehensive intake form for prospective clients, and integrates directly with Power Automate for workflow submissions.

## Features

- **Light/Dark Mode** — Theme toggle with localStorage persistence and smooth transitions
- **Case Studies** — 11 industry examples (professional services, finance, education, government) with filterable grid and detailed case study pages
- **9-Step Intake Form** — Comprehensive workflow intake form capturing business profile, integration systems, timeline, team structure, and more, with Power Automate integration
- **Form Submissions** — Contact and demo audit forms via Web3Forms; intake form via Power Automate HTTP POST
- **Responsive Design** — Mobile-first design with seamless desktop experience
- **SEO Optimized** — Dynamic meta tags and Open Graph metadata for each page
- **Accessibility** — Semantic HTML, ARIA roles, and keyboard navigation

## Tech Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **State Management**: React hooks (useState, useCallback, useEffect)
- **Routing**: Client-side state-based routing
- **Form Submissions**: 
  - Web3Forms for Contact and Demo audit forms
  - Power Automate HTTP POST for Intake form
- **Deployment**: Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AntosTech/Avantgarde-Consulting-Group.git
   cd Avantgarde-Consulting-Group
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:5173`

## Building for Production

```bash
pnpm build
```

The optimized build will be output to the `dist/` directory.

## Form Integrations

### Contact Form
- Submits via Web3Forms to `sales@meetavantgarde.com`
- Fields: Name, email, organization, service interest, message

### Demo Audit Form
- Submits via Web3Forms to `sales@meetavantgarde.com`
- Fields: Name, email, sector, workflow description, estimated hours

### Intake Form
- Submits via Power Automate HTTP POST endpoint
- Captures all 9-step form data and routes to workflow automation
- Includes loading states and success confirmation
- Separate component: `src/IntakePage.jsx`

## Project Structure

```
src/
├── App.jsx                 # Main app component with routing and pages
├── IntakePage.jsx          # 9-step intake form with Power Automate integration
├── index.html             # HTML entry point with theme CSS variables
├── main.jsx               # React app initialization
├── globals.css            # Global styles and Tailwind directives
├── caseStudies.js         # Case studies data and utilities
├── seo.js                 # SEO metadata for each page
└── App.css                # App-specific styles
```

## Pages

- **Home** — Hero section and value proposition
- **About** — Company background and expertise
- **Services** — Service offerings overview
- **Case Studies** — Filterable grid of automation case studies with detail pages
- **Demo** — Free workflow audit form (Web3Forms)
- **Intake** — 9-step comprehensive workflow intake form (Power Automate)
- **Contact** — Get in touch form (Web3Forms)

## Theming

The app uses CSS variables defined in `index.html` for light/dark mode theming. Toggle is available in the navigation bar. Theme preference is persisted to localStorage.

**CSS Variables** (defined in `index.html`):
- `--c-white`, `--c-cream`, `--c-ink`, `--c-border` — Semantic color tokens
- Updated dynamically on theme toggle

**Design Tokens** (in `App.jsx`):
- Color palette: `C.white`, `C.cream`, `C.orange`, `C.muted`, etc.
- Fonts: `FONT_DISPLAY` (DM Serif Display), `FONT_BODY` (Inter)
- Responsive breakpoint: 768px for mobile

## Environment Variables

No environment variables required for local development. Form submission endpoints are configured in the form handlers:
- Web3Forms uses a public access key
- Power Automate endpoint is configured in `IntakePage.jsx`

## Deployment

The site is automatically deployed to Vercel on pushes to the main branch. Preview deployments are generated for feature branches.

- **Production**: Deployed from `main` branch (if exists) or `v0/beavantgarde-29a76ffb`
- **Preview**: Deployed from `v0/beavantgarde-29a76ffb` preview branch automatically

## Development Notes

- Responsive hook (`useIsMobile`) detects breakpoint changes and updates component layout
- Contact and Demo forms use Web3Forms for email routing — no backend API required
- Intake form submits directly to Power Automate workflow via HTTP POST
- SEO metadata is managed centrally in `seo.js` and applied dynamically per page
- Case studies data is stored in `caseStudies.js` as a static array with filtering utilities
- Theme state is persisted to localStorage for continuity across sessions

## Branches

- `v0/beavantgarde-29a76ffb` — Preview branch with latest features and integrations
- `main` — Production branch (if configured)

## License

Proprietary — Avantgarde Consulting Group LLC
