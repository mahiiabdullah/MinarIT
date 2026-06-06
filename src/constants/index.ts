/**
 * @file src/constants/index.ts
 * @description Backward-compatible barrel export. Keeps existing imports working
 * while the codebase migrates to granular imports from sub-files.
 *
 * PREFERRED: import { NAV_LINKS } from '@/constants/site'
 * LEGACY (still works): import { NAV_LINKS } from '@/constants'
 *
 * TODO(team): 2024-01 Migrate all legacy imports to granular paths.
 */

// Re-export everything from the split constant files
export * from './site';
export * from './animations';
export * from './ai-prompts';

// ─── Content still in this file (to be split in a future PR) ─────────────────

// ---------- Hero Section ----------
export const HERO_CONTENT = {
  badge: '⚡ AI-Powered Business Systems',
  headingLine1: 'Still Running Your Business',
  headingLine2: 'on WhatsApp and Excel?',
  description:
    'We replace manual operations with custom software and AI. Restaurants, Clinics, NGOs, and E-commerce — fully automated.',
  cta_primary: 'Calculate Your Losses',
  cta_secondary: 'See Live Demo',
  stats: [
    { value: '500+', label: 'Hours Saved Monthly', end: 500, suffix: '+' },
    { value: '40+', label: 'Businesses Automated', end: 40, suffix: '+' },
    { value: '3x', label: 'Average ROI in 6 Months', end: 3, suffix: 'x' },
  ],
} as const;

// ---------- Services ----------
export const SERVICES = [
  {
    id: 'custom-software',
    icon: 'code',
    title: 'Custom Software Development',
    shortTitle: 'Custom Software',
    description:
      'Bespoke web and mobile applications tailored to your exact business workflows, built with modern tech stacks for scalability and performance.',
    features: [
      'Full-stack web applications',
      'Mobile apps (iOS & Android)',
      'API development & integrations',
      'Database architecture',
      'Cloud infrastructure setup',
    ],
    color: 'primary' as const,
  },
  {
    id: 'ai-automation',
    icon: 'bot',
    title: 'AI-Powered Automation',
    shortTitle: 'AI Automation',
    description:
      'Intelligent automation systems that eliminate repetitive tasks, reduce human error, and free your team to focus on high-value work.',
    features: [
      'Workflow automation',
      'AI chatbots & virtual assistants',
      'Document processing (OCR + AI)',
      'Predictive analytics',
      'Smart scheduling & routing',
    ],
    color: 'accent' as const,
  },
  {
    id: 'business-os',
    icon: 'layers',
    title: 'Business Operating Systems',
    shortTitle: 'Business OS',
    description:
      'Complete digital ecosystems that unify your operations — from inventory and CRM to HR and finance — into one intelligent platform.',
    features: [
      'All-in-one management dashboards',
      'Real-time analytics & reporting',
      'Multi-department integration',
      'Role-based access control',
      'Automated compliance & auditing',
    ],
    color: 'primary' as const,
  },
  {
    id: 'ai-consulting',
    icon: 'brain',
    title: 'AI Strategy & Consulting',
    shortTitle: 'AI Consulting',
    description:
      'Expert guidance on where and how to implement AI in your organization for maximum ROI, with clear roadmaps and measurable outcomes.',
    features: [
      'AI readiness assessment',
      'Technology stack selection',
      'Implementation roadmap',
      'Team training & upskilling',
      'Ongoing optimization',
    ],
    color: 'accent' as const,
  },
] as const;

// ---------- Industries ----------
export const INDUSTRIES = [
  {
    id: 'restaurants',
    icon: 'utensils',
    title: 'Restaurants & F&B',
    description:
      'AI-driven POS systems, automated inventory management, smart kitchen displays, and customer engagement platforms.',
    solutions: [
      'Smart POS with AI analytics',
      'Automated inventory & ordering',
      'Kitchen display systems',
      'Customer loyalty platforms',
      'Delivery route optimization',
    ],
    stats: { metric: '35%', label: 'less food waste' },
  },
  {
    id: 'hospitals',
    icon: 'heart-pulse',
    title: 'Hospitals & Healthcare',
    description:
      'Patient management systems, AI-assisted diagnostics support, appointment scheduling, and electronic health records.',
    solutions: [
      'Patient management (EHR/EMR)',
      'AI-assisted diagnostics support',
      'Appointment scheduling',
      'Telemedicine platforms',
      'Billing & insurance automation',
    ],
    stats: { metric: '50%', label: 'faster admin tasks' },
  },
  {
    id: 'ngos',
    icon: 'hand-heart',
    title: 'NGOs & Non-Profits',
    description:
      'Donor management, grant tracking, volunteer coordination, and impact measurement dashboards powered by AI.',
    solutions: [
      'Donor management & CRM',
      'Grant tracking & reporting',
      'Volunteer coordination',
      'Impact measurement dashboards',
      'Fundraising automation',
    ],
    stats: { metric: '60%', label: 'more efficient ops' },
  },
  {
    id: 'ecommerce',
    icon: 'shopping-cart',
    title: 'E-Commerce & Retail',
    description:
      'AI-powered product recommendations, inventory forecasting, automated customer service, and dynamic pricing engines.',
    solutions: [
      'AI product recommendations',
      'Inventory demand forecasting',
      'Chatbot customer support',
      'Dynamic pricing engine',
      'Multi-channel management',
    ],
    stats: { metric: '28%', label: 'higher conversions' },
  },
  {
    id: 'schools',
    icon: 'graduation-cap',
    title: 'Schools & Education',
    description:
      'Learning management systems, AI-powered student analytics, automated grading, and parent communication portals.',
    solutions: [
      'Learning management (LMS)',
      'Student performance analytics',
      'Automated grading & feedback',
      'Parent communication portal',
      'Attendance & fee management',
    ],
    stats: { metric: '45%', label: 'time saved for teachers' },
  },
] as const;

// ---------- Process Steps ----------
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Discovery',
    description:
      'We dive deep into your business operations, pain points, and goals to understand exactly what you need.',
    icon: 'search',
  },
  {
    step: 2,
    title: 'Strategy',
    description:
      'Our AI experts design a custom roadmap with clear milestones, timelines, and expected outcomes.',
    icon: 'map',
  },
  {
    step: 3,
    title: 'Build',
    description:
      'We develop, test, and iterate on your solution using agile methodology with weekly progress demos.',
    icon: 'hammer',
  },
  {
    step: 4,
    title: 'Deploy & Scale',
    description:
      'Your solution goes live with full training, documentation, and ongoing support. We optimize continuously.',
    icon: 'rocket',
  },
] as const;

// ---------- Testimonials ----------
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'FreshBite Restaurants',
    industry: 'Restaurant Chain',
    content:
      'Minar transformed our entire operation. The AI-powered inventory system alone saved us 35% on food waste. Our kitchen runs like clockwork now.',
    avatar: '/testimonials/sarah.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dr. James Okafor',
    role: 'Director of Operations',
    company: 'MedCare Hospital Group',
    industry: 'Healthcare',
    content:
      'The patient management system they built has cut our admin overhead by half. Doctors spend more time with patients and less time on paperwork.',
    avatar: '/testimonials/james.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    role: 'Executive Director',
    company: 'GlobalAid Foundation',
    industry: 'Non-Profit',
    content:
      "Their donor management platform completely changed how we track impact. We've increased fundraising efficiency by 60% and our donors love the transparency.",
    avatar: '/testimonials/maria.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Alex Kim',
    role: 'CTO',
    company: 'ShopWave Commerce',
    industry: 'E-Commerce',
    content:
      'The AI recommendation engine they integrated boosted our conversions by 28%. The ROI was evident within the first month.',
    avatar: '/testimonials/alex.jpg',
    rating: 5,
  },
] as const;

// ---------- FAQ ----------
export const FAQ_ITEMS = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary based on complexity. A basic automation workflow takes 2-4 weeks, while a full business operating system typically takes 3-6 months. We provide detailed timelines during the discovery phase.',
  },
  {
    question: 'Do I need to have technical knowledge?',
    answer:
      'Not at all. We handle all the technical complexity. You bring the business expertise, and we translate that into powerful software. We also provide thorough training and documentation.',
  },
  {
    question: 'What industries do you specialize in?',
    answer:
      'We have deep expertise in restaurants, healthcare, NGOs, e-commerce, and education. However, our AI automation solutions are adaptable to virtually any industry.',
  },
  {
    question: 'How do you price your services?',
    answer:
      'We offer both project-based and retainer pricing. After a free discovery call, we provide a detailed proposal with transparent pricing — no hidden fees, ever.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer:
      'Absolutely. Every project includes a post-launch support period, and we offer monthly retainer plans for continuous optimization, updates, and monitoring.',
  },
  {
    question: 'How is my data handled?',
    answer:
      'Data security is paramount. We follow industry best practices including encryption at rest and in transit, regular security audits, GDPR compliance, and SOC 2 standards.',
  },
] as const;

// ---------- Tech Stack ----------
export const TECH_STACK = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Python', category: 'AI/ML' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'OpenAI', category: 'AI/ML' },
  { name: 'Claude AI', category: 'AI/ML' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'Stripe', category: 'Payments' },
] as const;

// ---------- CTA ----------
export const CTA_CONTENT = {
  heading: 'Ready to Automate Your Business?',
  description:
    "Book a free 30-minute discovery call. We'll analyze your workflows and show you exactly where AI can save you time, money, and headaches.",
  buttonText: 'Schedule Free Consultation',
  secondaryText: 'Or email us at hello@minar.agency',
} as const;

// ---------- Pricing ----------
export const PRICING_TIERS = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses starting their AI journey',
    price: '2,500',
    period: 'project',
    features: [
      'Single workflow automation',
      'Basic AI chatbot integration',
      'Dashboard with analytics',
      'Email support',
      '30-day post-launch support',
    ],
    highlighted: false,
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    description: 'For scaling businesses that need comprehensive automation',
    price: '8,000',
    period: 'project',
    features: [
      'Multi-workflow automation',
      'Advanced AI integrations',
      'Custom business dashboard',
      'API development & integrations',
      'Priority support',
      '90-day post-launch support',
      'Monthly strategy sessions',
    ],
    highlighted: true,
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'Full-scale business operating system with dedicated team',
    price: 'Custom',
    period: 'project',
    features: [
      'Complete business OS',
      'Dedicated AI engineer',
      'Unlimited integrations',
      '24/7 priority support',
      'Ongoing optimization',
      'Quarterly business reviews',
      'SLA guarantee',
      'Source code ownership',
    ],
    highlighted: false,
    cta: 'Contact Sales',
  },
] as const;

// ---------- AI Chat Config ----------
export const AI_CHAT_CONFIG = {
  welcomeMessage:
    "Hi! 👋 I'm Minar's AI assistant. I can help you understand our services, get pricing estimates, or schedule a call with our team. How can I help?",
  placeholderText: 'Ask me about our AI solutions...',
  suggestedQuestions: [
    'What services do you offer?',
    'How much does AI automation cost?',
    'Can you help my restaurant?',
    'I want to schedule a consultation',
  ],
} as const;
