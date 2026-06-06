/**
 * @file src/constants/site.ts
 * @description Global site metadata, navigation links, and contact info.
 * This is the single source of truth for all site-level configuration.
 */

// ─── Site Identity ────────────────────────────────────────────────────────────

export const SITE_NAME = 'Minar' as const;
export const SITE_URL = 'https://minar.agency' as const;
export const SITE_DESCRIPTION =
  'We build custom AI software, intelligent automation systems, and complete business operating systems that transform how organizations operate.' as const;

// ─── Contact Info ─────────────────────────────────────────────────────────────

export const CONTACT_EMAIL = 'hello@minar.agency' as const;
export const CONTACT_WHATSAPP = '+1 (555) 000-0000' as const;

// ─── Social Links ─────────────────────────────────────────────────────────────

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/minaragency',
  linkedin: 'https://linkedin.com/company/minaragency',
  github: 'https://github.com/minaragency',
  instagram: 'https://instagram.com/minaragency',
} as const;

// ─── Legacy compatibility alias ───────────────────────────────────────────────
// TODO(team): 2024-01 Migrate all imports to use named exports above.
export const SITE_CONFIG = {
  name: SITE_NAME,
  tagline: 'AI-Powered Business Automation Agency',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  phone: CONTACT_WHATSAPP,
  socials: SOCIAL_LINKS,
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────

export const TOP_BAR_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Pricing', href: '/pricing' },
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { 
    label: 'Services', 
    href: '/services',
    children: [
      { label: 'Custom Systems', href: '/services#custom-systems', description: 'Full business management systems', icon: 'layers' },
      { label: 'AI Automation', href: '/services#ai-automation', description: 'Automate repetitive workflows', icon: 'bot' },
      { label: 'WhatsApp Agents', href: '/services#whatsapp-agents', description: '24/7 customer service agents', icon: 'message-circle' },
      { label: 'Analytics', href: '/services#analytics', description: 'Data-driven business insights', icon: 'bar-chart' },
      { label: 'Mobile Apps', href: '/services#mobile-apps', description: 'Native apps for iOS & Android', icon: 'smartphone' },
    ]
  },
  { 
    label: 'Industries', 
    href: '/industries',
    children: [
      { label: 'Restaurant', href: '/industries#restaurants', description: 'POS & inventory systems', icon: 'utensils' },
      { label: 'Hospital', href: '/industries#hospitals', description: 'Clinic & patient management', icon: 'activity' },
      { label: 'NGO', href: '/industries#ngos', description: 'Donation & volunteer systems', icon: 'heart' },
      { label: 'E-Commerce', href: '/industries#ecommerce', description: 'Online storefronts & logistics', icon: 'shopping-cart' },
      { label: 'School', href: '/industries#schools', description: 'Student & course management', icon: 'book' },
      { label: 'Manufacturing', href: '/industries#manufacturing', description: 'Supply chain automation', icon: 'factory' },
    ]
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// ─── Footer Links ─────────────────────────────────────────────────────────────

export const FOOTER_LINKS = {
  services: [
    { label: 'Custom Software', href: '/services#custom-software' },
    { label: 'AI Automation', href: '/services#ai-automation' },
    { label: 'Business OS', href: '/services#business-os' },
    { label: 'AI Consulting', href: '/services#ai-consulting' },
  ],
  industries: [
    { label: 'Restaurants', href: '/industries#restaurants' },
    { label: 'Healthcare', href: '/industries#hospitals' },
    { label: 'NGOs', href: '/industries#ngos' },
    { label: 'E-Commerce', href: '/industries#ecommerce' },
    { label: 'Education', href: '/industries#schools' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
} as const;

// ─── Chat Widget Strings ───────────────────────────────────────────────────

export const CHAT_INITIAL_MESSAGE =
  "Hi! I'm Aria, Minar Agency's AI assistant. What can I help you with today?" as const;

export const CHAT_SUGGESTIONS = [
  'How much does custom software cost?',
  'What is an AI Agent?',
  'Can you automate my WhatsApp?',
] as const;

// ─── Contact Form Options ──────────────────────────────────────────────────

export const CONTACT_FORM_INDUSTRIES = [
  'Restaurant & Food Service',
  'Hospitals & Clinics',
  'NGOs & Non-Profits',
  'E-Commerce & Retail',
  'Schools & Education',
  'Manufacturing',
  'Other',
] as const;

export const CONTACT_FORM_SERVICES = [
  'Custom System',
  'AI Automation',
  'Mobile App',
  'Analytics',
  'WhatsApp Bot',
  'Not Sure Yet',
] as const;

export const CONTACT_FORM_BUDGETS = [
  'Under $1k',
  '$1k - $3k',
  '$3k - $10k',
  '$10k+',
  'Not decided',
] as const;
