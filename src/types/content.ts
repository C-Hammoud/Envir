/** Mirrors `public/content.json` — aligned with docs: Vision/Mission, MEP & Fire intro, About, Projects. */

export type NavLink = { label: string; href: string };

export type Meta = {
  siteName: string;
  title: string;
  description?: string;
  logoText?: string;
  nav?: NavLink[];
};

export type Cta = { label: string; href: string };

export type HeroSection = {
  id: string;
  type: 'hero';
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Short stats shown under hero (engineering strip) */
  metrics?: { label: string; value: string }[];
  backgroundImage?: string;
};

export type VisionMissionSection = {
  id: string;
  type: 'visionMission';
  title: string;
  visionTitle: string;
  visionBody: string;
  missionTitle: string;
  missionBody: string;
};

export type IntroductorySection = {
  id: string;
  type: 'introductory';
  title: string;
  lead: string;
  paragraphs: string[];
  highlights?: string[];
};

export type ServiceItem = {
  title: string;
  description: string;
  icon?: string;
};

export type ServicesSection = {
  id: string;
  type: 'services';
  title: string;
  subtitle?: string;
  items: ServiceItem[];
};

export type AboutSection = {
  id: string;
  type: 'about';
  title: string;
  body: string[];
  bullets?: string[];
  image?: string;
  caption?: string;
};

/** Optional long-form content; paths are under `public/` (e.g. `/assets/projects/photo.jpg`). */
export type ProjectDetails = {
  /** Full description shown in the details dialog */
  description?: string;
  /** Gallery image URLs (paths under public, e.g. `/assets/projects/gallery-1.jpg`) */
  images?: string[];
};

export type ProjectItem = {
  /** Stable id for keys/admin (recommended) */
  id?: string;
  name: string;
  sector?: string;
  location?: string;
  scope?: string;
  year?: string;
  /** Card cover image — path from site root, e.g. `/assets/projects/cover.jpg` */
  image?: string;
  /** If set, card shows “Details” and dialog lists metadata + description + gallery */
  details?: ProjectDetails;
};

export type ProjectsSection = {
  id: string;
  type: 'projects';
  title: string;
  subtitle?: string;
  items: ProjectItem[];
};

export type ContactSection = {
  id: string;
  type: 'contact';
  title: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  /** Display-only; form posts nowhere on static hosting */
  formLabels?: { name: string; email: string; message: string; submit: string };
};

export type FooterSection = {
  id: string;
  type: 'footer';
  tagline?: string;
  columns?: { heading: string; links: { label: string; href: string }[] }[];
  copyright: string;
};

export type Section =
  | HeroSection
  | VisionMissionSection
  | IntroductorySection
  | ServicesSection
  | AboutSection
  | ProjectsSection
  | ContactSection
  | FooterSection;

export type SiteContent = {
  meta: Meta;
  sections: Section[];
};

export const SECTION_TYPES = [
  'hero',
  'visionMission',
  'introductory',
  'services',
  'about',
  'projects',
  'contact',
  'footer',
] as const;

export type SectionType = (typeof SECTION_TYPES)[number];
