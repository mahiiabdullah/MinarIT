/**
 * @file src/types/domain.ts
 * @description Core business domain types for Minar Agency.
 * These mirror the data structures defined in constants/ and lib/
 * but serve as the canonical TypeScript contract.
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

/** All industries the agency serves */
export enum Industry {
  Restaurants = 'restaurants',
  Healthcare = 'hospitals',
  NGO = 'ngos',
  Ecommerce = 'ecommerce',
  Education = 'schools',
}

/** Service tier options */
export type PricingMode = 'one-time' | 'retainer';

/** Color accent variants mapped to the design system */
export type ColorAccent = 'primary' | 'accent';

// ─── Service ──────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  icon: string;
  title: string;
  shortTitle: string;
  description: string;
  features: readonly string[];
  color: ColorAccent;
}

// ─── Industry ─────────────────────────────────────────────────────────────────

export interface IndustryStat {
  metric: string;
  label: string;
}

export interface IndustryEntry {
  id: string;
  icon: string;
  title: string;
  description: string;
  solutions: readonly string[];
  stats: IndustryStat;
}

// ─── Case Study ───────────────────────────────────────────────────────────────

export interface CaseStudyResult {
  metric: string;
  value: string;
  description: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client_type: string;
  industry: string;
  location: string;
  duration: string;
  headline: string;
  subheadline: string;
  problem: string;
  solution: string;
  systems_built: string[];
  ai_features: string[];
  results: CaseStudyResult[];
  testimonial: CaseStudyTestimonial;
  tags: string[];
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export interface BlogPostSection {
  heading: string;
  body: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  featured: boolean;
  tags: string[];
  content: {
    sections: BlogPostSection[];
  };
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  industry: string;
  content: string;
  avatar: string;
  rating: number;
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

export interface PricingTierFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period?: string;
  badge?: string;
  features: readonly string[];
  highlighted: boolean;
  cta: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// ─── Process Step ─────────────────────────────────────────────────────────────

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}
