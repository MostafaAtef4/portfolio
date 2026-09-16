/**
 * Content model for the portfolio.
 *
 * Everything the site displays is typed here and supplied by `src/content.ts`.
 * Components never hard-code copy, so updating the site means editing content.ts only.
 */

export interface Link {
  label: string;
  href: string;
  /** Short accessible name for icon-only renderings. */
  ariaLabel?: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Hero {
  eyebrow: string;
  name: string;
  headline: string;
  paragraph: string;
  primaryAction: { label: string; href: string };
  location: string;
}

export interface AboutTheme {
  title: string;
  body: string;
}

export interface About {
  number: string;
  heading: string;
  intro: string;
  themes: AboutTheme[];
}

/** A distinct stream of work inside a single role. Never rendered as its own employer. */
export interface Workstream {
  name: string;
  summary: string;
  points: string[];
}

export interface Role {
  title: string;
  employer: string;
  period: string;
  /** Roles either list bullets directly or group them into workstreams. */
  points?: string[];
  workstreams?: Workstream[];
  workstreamsNote?: string;
}

export interface ProjectDetailGroup {
  label: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  contribution: string;
  technologies: string[];
  /** Extra verified detail groups shown in the dialog (architecture, patterns, notes). */
  details?: ProjectDetailGroup[];
  /** Clarifications that keep the record accurate, shown in the dialog. */
  notes?: string[];
  featured: boolean;
  /** Key used by the conceptual diagram renderer. Decorative, hidden from screen readers. */
  visual?: 'erp' | 'pos' | 'clinic';
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface Certificate {
  name: string;
  issuer: string;
}

export interface Contact {
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface Seo {
  title: string;
  description: string;
  siteName: string;
  /** Left empty until a real domain exists; canonical/OG URLs are omitted while blank. */
  canonicalUrl: string;
}

export interface PortfolioContent {
  meta: {
    name: string;
    role: string;
    monogram: string;
  };
  seo: Seo;
  nav: NavItem[];
  /**
   * Path to the CV, relative to the site root. Set to `null` when the file is not
   * in `static/`; every CV download control is then omitted rather than shipped broken.
   */
  cv: { file: string; downloadName: string } | null;
  hero: Hero;
  about: About;
  experience: {
    number: string;
    heading: string;
    intro: string;
    roles: Role[];
  };
  projects: {
    number: string;
    heading: string;
    intro: string;
    items: Project[];
  };
  skills: {
    number: string;
    heading: string;
    intro: string;
    groups: SkillGroup[];
  };
  education: {
    number: string;
    heading: string;
    education: Education;
    certificates: Certificate[];
    languages: string[];
  };
  contact: {
    number: string;
    heading: string;
    intro: string;
    details: Contact;
  };
}
