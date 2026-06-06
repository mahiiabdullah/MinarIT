/**
 * @file src/types/forms.ts
 * @description TypeScript types for all form data in the application.
 * These are inferred from Zod schemas in src/lib/validations/forms.ts
 * and should never be manually duplicated.
 */

import type { z } from 'zod';

import type {
  calculatorSchema,
  contactSchema,
  newsletterSchema,
  consultantMessageSchema,
} from '@/lib/validations/forms';

// ─── Inferred Form Value Types ────────────────────────────────────────────────
// Types are derived from Zod schemas — single source of truth.

/** Values for the ROI Calculator multi-step form */
export type CalculatorFormValues = z.infer<typeof calculatorSchema>;

/** Values for the Contact / Inquiry form */
export type ContactFormValues = z.infer<typeof contactSchema>;

/** Values for the Newsletter subscription form */
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

/** Values for the AI Consultant chat input */
export type ConsultantMessageValues = z.infer<typeof consultantMessageSchema>;

// ─── Calculator Step Types ────────────────────────────────────────────────────

/** Step labels and keys for the multi-step calculator */
export interface CalculatorStep {
  id: number;
  title: string;
  description: string;
  fields: Array<keyof CalculatorFormValues>;
}

// ─── Contact Form Select Options ──────────────────────────────────────────────

export interface SelectOption {
  label: string;
  value: string;
}

export const INDUSTRY_OPTIONS: SelectOption[] = [
  { label: 'Restaurant / F&B', value: 'restaurants' },
  { label: 'Healthcare / Clinic', value: 'healthcare' },
  { label: 'NGO / Non-Profit', value: 'ngo' },
  { label: 'E-Commerce / Retail', value: 'ecommerce' },
  { label: 'Education / Schools', value: 'education' },
  { label: 'Other', value: 'other' },
];

export const BUDGET_OPTIONS: SelectOption[] = [
  { label: '$500 – $1,000', value: '500-1000' },
  { label: '$1,000 – $5,000', value: '1000-5000' },
  { label: '$5,000 – $15,000', value: '5000-15000' },
  { label: '$15,000+', value: '15000+' },
  { label: 'Not sure yet', value: 'unsure' },
];

export const PROJECT_TYPE_OPTIONS: SelectOption[] = [
  { label: 'Single Automation', value: 'single-automation' },
  { label: 'Custom Web App', value: 'custom-web-app' },
  { label: 'AI Chatbot / Agent', value: 'ai-agent' },
  { label: 'Full Business OS', value: 'full-os' },
  { label: 'AI Consulting', value: 'consulting' },
];
