# Product Requirements Document
## Sanct Company Website

**Document version:** 1.0  
**Last updated:** June 22, 2026  
**Author:** Sanct Product Team  
**Status:** Draft

---

## Table of Contents

1. [Overview](#1-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [Target Audience](#3-target-audience)
4. [Site Structure & Pages](#4-site-structure--pages)
5. [Feature Requirements](#5-feature-requirements)
6. [Design Requirements](#6-design-requirements)
7. [Content Requirements](#7-content-requirements)
8. [Technical Requirements](#8-technical-requirements)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Out of Scope](#10-out-of-scope)
11. [Open Questions](#11-open-questions)

---

## 1. Overview

### 1.1 Product Summary

Sanct is a software company based in the Philippines that builds intuitive software products designed to strip away unnecessary technological complexity. The company's philosophy centers on giving users mental space to focus on what truly matters — not on the tools they use.

This document defines the requirements for Sanct's public-facing company website. The website serves as the primary digital presence of the brand: establishing credibility, communicating the company's mission, showcasing its work, and converting visitors into clients.

### 1.2 Problem Statement

Prospective clients and partners have no single authoritative source to learn about Sanct — what the company does, what it has built, and how to engage with it. Without a company website, Sanct cannot establish trust at scale or generate inbound interest.

### 1.3 Proposed Solution

A modern, performance-optimized marketing website that reflects Sanct's design philosophy: minimal, bold, intentional. The site must feel as well-crafted as the software Sanct builds — every element earning its place on the page.

---

## 2. Goals & Success Metrics

### 2.1 Business Goals

| Goal | Description |
|------|-------------|
| Establish brand presence | Create a credible and memorable first impression for anyone who encounters Sanct online |
| Generate inbound leads | Convert visitors into prospective clients via a clear contact pathway |
| Showcase work | Build credibility through case studies and product highlights |

### 2.2 Success Metrics

| Metric | Target (90 days post-launch) |
|--------|------------------------------|
| Monthly unique visitors | ≥ 500 |
| Average session duration | ≥ 2 minutes |
| Contact form submissions | ≥ 10 per month |
| Bounce rate | ≤ 55% |
| Core Web Vitals (LCP) | < 2.5s |
| Mobile traffic share | ≥ 50% |

---

## 3. Target Audience

### 3.1 Primary Audience — Prospective Clients

**Who they are:** Business owners, startup founders, and operations leads in the Philippines and Southeast Asia looking to commission custom software or adopt new tools.

**What they need:** Confidence that Sanct can solve real problems. They want to see past work, understand the company's approach, and find a clear way to start a conversation.

**Pain points:** Skepticism about local software quality; uncertainty about whether an agency can understand their domain.

---

### 3.2 Secondary Audience — Partners & Investors

**Who they are:** Technology partners, resellers, and early-stage investors evaluating Sanct's legitimacy and trajectory.

**What they need:** A clear articulation of the company's mission, team, and traction.

---

## 4. Site Structure & Pages

```
sanct.com/
├── / (Home)
├── /work (Portfolio / Case Studies)
│   └── /work/[project-slug] (Individual Case Study)
├── /about (About Sanct)
├── /services (What We Offer)
└── /contact (Contact)
```

---

## 5. Feature Requirements

### 5.1 Home Page (`/`)

**Purpose:** Make a strong first impression. Communicate who Sanct is, what it does, and what makes it different — in under 10 seconds.

**Required sections:**

| Section | Description | Priority |
|---------|-------------|----------|
| Hero | Full-viewport statement headline with company tagline and a single primary CTA ("See Our Work" or "Let's Talk") | P0 |
| Value proposition | 2–3 sentences expanding on the mission: stripping away complexity, creating mental space | P0 |
| Selected work preview | 2–3 featured project cards linking to `/work` | P0 |
| Services snapshot | Brief summary of service categories with a link to `/services` | P1 |
| Social proof | Client logos or a single featured testimonial | P1 |
| CTA banner | Final section with a bold call-to-action directing to `/contact` | P0 |

---

### 5.2 Work / Portfolio (`/work`)

**Purpose:** Demonstrate the quality and range of Sanct's output. Build credibility through real projects.

**Required elements:**

- Filterable grid of project cards (filter by: All, Web App, Mobile, Branding, Internal Tools)
- Each card displays: project name, client industry, one-line description, and a cover image
- Cards link to individual case study pages

**Case Study Page (`/work/[slug]`):**

| Element | Description |
|---------|-------------|
| Project title & client | Name and industry of the client |
| Challenge | The problem Sanct was brought in to solve |
| Approach | How Sanct thought about and executed the solution |
| Outcome | Results, metrics, or qualitative impact |
| Technology used | Tags listing the stack |
| Visuals | Screenshots, mockups, or demo video |
| Next project link | Navigation to the next case study |

---

### 5.3 About (`/about`)

**Purpose:** Humanize the brand. Establish trust by sharing who is behind Sanct.

**Required sections:**

| Section | Description | Priority |
|---------|-------------|----------|
| Mission statement | A single, memorable articulation of why Sanct exists | P0 |
| Company story | Brief origin narrative — founded in the Philippines, why software simplicity matters | P0 |
| Team section | Photos, names, and titles of core team members | P1 |
| Values | 3–5 guiding principles that shape how Sanct works | P1 |
| Philippines context | Acknowledge local roots and regional ambition | P2 |

---

### 5.4 Services (`/services`)

**Purpose:** Help prospects understand what Sanct offers and whether it's a fit.

**Required sections:**

| Service | Description |
|---------|-------------|
| Custom Software Development | End-to-end web and mobile application development |
| Product Design & UX | Interface design focused on simplicity and usability |
| Technical Consulting | Advisory for teams navigating technical complexity |
| Internal Tools | Building software that makes teams run smoother |

Each service entry must include: a name, a short description (2–3 sentences), and an indicator of ideal client type.

The page should close with a CTA to `/contact`.

---

### 5.5 Contact (`/contact`)

**Purpose:** Give visitors a frictionless path to start a conversation.

**Required elements:**

- Contact form with fields: Name, Email, Company (optional), Message, "What are you looking for?" (dropdown: New project / General inquiry / Partnership)
- Form validation (client-side and server-side)
- Success state after submission
- Alternative contact channels displayed as plain text / clickable links:
  - **Phone:** [0968 467 0926](tel:+639684670926) (`tel:+639684670926`)
  - **Facebook:** [Sanct on Facebook](https://www.facebook.com/profile.php?id=61589366583515)
- Email address (to be confirmed — see Open Questions)

**Behavior:**
- Form submission sends an email notification to a designated Sanct inbox
- No auto-reply required in v1

---

### 5.6 Global Elements

| Element | Requirements |
|---------|--------------|
| Navigation | Logo left, page links right, "Let's Talk" CTA button. Collapses to hamburger on mobile |
| Footer | Logo, nav links, social links (Facebook), phone number, copyright, location: Lower Langcangan, Oroquieta City, Philippines, 7207 |
| 404 Page | On-brand error page with a link back to home |
| Favicon | Sanct logo mark (the shield icon) |
| Open Graph | OG image, title, and description set per page for social sharing |

---

## 6. Design Requirements

### 6.1 Visual Identity

All design decisions must align with the Sanct Design System (see `sanct-design-spec.json`).

| Token | Value |
|-------|-------|
| Primary color | `#2C1FA8` (Sanct Indigo) |
| Accent | `#A09CF5` (Lilac) |
| Dark section bg | `#111015` |
| Light section bg | `#F5F4FF` |
| Display typeface | Inter Black (900) |
| Body typeface | Space Grotesk (400, 700) |

### 6.2 Layout Principles

- Maximum content width: 1280px, centered
- Section vertical padding: `clamp(64px, 8vw, 96px)`
- Grid: 12-column at desktop, 4-column at mobile
- Alternating section backgrounds to create visual rhythm (Indigo → Off-white → Dark → Indigo)

### 6.3 Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| Mobile | < 640px |
| Tablet | 640px – 1024px |
| Desktop | > 1024px |

### 6.4 Interaction Standards

- All interactive elements have visible hover and focus states
- Transitions use the `micro` motion token (150ms ease-out)
- Scroll-reveal animations use the `reveal` token (600ms, cubic-bezier(0.16, 1, 0.3, 1))
- Animations implemented with **Framer Motion** (see [§8.1.1](#811-animation-framer-motion))
- `prefers-reduced-motion` respected: all animations disabled when set

---

## 7. Content Requirements

### 7.1 Tone of Voice

| Attribute | Description |
|-----------|-------------|
| Confident | Sanct knows what it's doing. No hedging. |
| Simple | Write the way a smart person talks — no jargon. |
| Human | Warm but not casual. Professional but not cold. |
| Direct | Get to the point. Every word must earn its place. |

### 7.2 Copy Responsibilities

Content for all pages (hero headlines, service descriptions, team bios, case study narratives) must be supplied by the Sanct team before development of that section begins. Placeholder copy is acceptable in early builds but must not appear in the production launch.

### 7.3 Assets Required Before Launch

- [ ] Sanct logo (SVG, light and dark versions)
- [ ] Team photos (minimum: headshots at 400×400px)
- [ ] Project cover images (minimum: 1200×800px per project)
- [ ] Case study content (challenge / approach / outcome per project)
- [ ] Client logos (if displaying social proof)

### 7.4 Company Contact & Social

Canonical contact details for use site-wide (footer, contact page, structured data):

| Channel | Value |
|---------|-------|
| Phone | **0968 467 0926** — link as `tel:+639684670926` |
| Facebook | [https://www.facebook.com/profile.php?id=61589366583515](https://www.facebook.com/profile.php?id=61589366583515) — display as "Facebook" or Facebook icon; open in new tab with `rel="noopener noreferrer"` |
| Location | Lower Langcangan, Oroquieta City, Philippines, 7207 |

Facebook is the primary social profile in v1. Additional profiles (e.g. LinkedIn) may be added later without changing the footer layout.

---

## 8. Technical Requirements

### 8.1 Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | **Next.js** (App Router, React, TypeScript) | SSG/SSR flexibility, strong ecosystem, excellent SEO for a marketing site |
| Styling | **Tailwind CSS** | Utility-first, maps cleanly to design tokens in `design.json` |
| Animation | **Framer Motion** | Declarative React animations; supports scroll-reveal, page transitions, and `prefers-reduced-motion` |
| CMS | Sanity or Notion API | Allows non-technical team to update case studies and services |
| Hosting | **Vercel** | Zero-config Next.js deployment, global CDN |
| Forms | Formspree or Resend | Simple setup, no backend required in v1 |
| Analytics | Plausible or Google Analytics 4 | Track sessions, conversions, bounce rate |

#### 8.1.1 Animation (Framer Motion)

All motion on the site must implement the tokens defined in `design.json`:

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `micro` | 150ms | ease-out | Button hovers, link states, small UI feedback |
| `transition` | 300ms | ease-in-out | Section transitions, nav open/close |
| `reveal` | 600ms | cubic-bezier(0.16, 1, 0.3, 1) | Scroll-triggered fade/slide-ins on section entry |

**Implementation notes:**

- Use Framer Motion's `whileInView` with `viewport={{ once: true }}` for scroll-reveal sections (hero excluded — animate on mount).
- Wrap the app in a shared `MotionConfig` so reduced-motion users get instant transitions via `useReducedMotion()`.
- Prefer `transform` and `opacity` only — no layout-shifting animations (protects CLS score).
- Page-level route transitions are optional in v1; section reveals are required on Home and Work pages.
### 8.2 SEO Requirements

- Semantic HTML structure (`<h1>` through `<h3>`, `<main>`, `<nav>`, `<footer>`)
- Unique `<title>` and `<meta description>` per page
- Open Graph and Twitter Card meta tags on all pages
- Canonical URLs set
- XML sitemap generated and submitted to Google Search Console
- `robots.txt` configured

### 8.3 Performance Requirements

| Metric | Requirement |
|--------|-------------|
| Largest Contentful Paint (LCP) | < 2.5 seconds |
| Cumulative Layout Shift (CLS) | < 0.1 |
| First Input Delay (FID) | < 100ms |
| Image format | WebP with fallback |
| Fonts | Self-hosted or preloaded to eliminate render-blocking |

### 8.4 Accessibility Requirements

- WCAG 2.1 Level AA compliance
- All images have descriptive `alt` text
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Keyboard-navigable throughout
- Focus indicators visible on all interactive elements
- Screen-reader-compatible navigation

---

## 9. Non-Functional Requirements

| Requirement | Detail |
|-------------|--------|
| Browser support | Chrome, Firefox, Safari, Edge — latest two versions |
| Mobile-first | Designed and tested on mobile before desktop |
| Uptime | 99.9% (covered by Vercel SLA) |
| HTTPS | Enforced, SSL certificate managed by host |
| GDPR / Privacy | Cookie notice if analytics enabled; privacy policy page linked in footer |
| Domain | `sanct.com` or `sanct.ph` — to be confirmed by team |

---

## 10. Out of Scope

The following are explicitly excluded from v1 of this website:

- Client portal or login-gated content
- Blog or editorial content section
- E-commerce or payment integration
- Live chat widget
- Multilingual support (English only in v1)
- Custom CMS admin UI (third-party CMS used instead)
- Native mobile app
- Careers / jobs section (deferred to a future version)

---

## 11. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | What is the final domain? (`sanct.com` vs `sanct.ph` vs other) | Sanct team | Open |
| 2 | Which projects will be featured in v1 of the portfolio? | Sanct team | Open |
| 3 | Will team photos be available at launch, or should the About page launch without them? | Sanct team | Open |
| 4 | Is there an existing ATS for job applications, or will a mailto link suffice in v1? | Sanct team | Open |
| 5 | What email address should contact form submissions be routed to? | Sanct team | Open |
| 6 | Should the site support both English and Filipino in a future version? | Sanct team | Open |
| 7 | Are there any NDAs preventing specific client names from appearing in case studies? | Sanct team | Open |

---

*This document is a living specification. It will be updated as decisions are made and requirements evolve. All changes should be version-controlled and communicated to the full project team.*