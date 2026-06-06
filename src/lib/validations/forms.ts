/**
 * @file src/lib/validations/forms.ts
 * @description Zod v4 validation schemas for all forms in the application.
 * Compatible with Zod v4+ where errorMap has been replaced by message.
 */

import { z } from 'zod';

// ─── Common Field Validators ───────────────────────────────────────────────────

const emailField = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

const nameField = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be under 100 characters');

const messageField = z
  .string()
  .min(20, 'Message must be at least 20 characters')
  .max(2000, 'Message must be under 2000 characters');

// ─── Contact Form ─────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  company: z
    .string()
    .min(1, 'Company name is required')
    .max(100, 'Company name must be under 100 characters'),
  phone: z
    .string()
    .optional()
    .refine(
      val => !val || /^\+?[\d\s\-()]{7,15}$/.test(val),
      'Please enter a valid phone number'
    ),
  industry: z.enum(
    ['restaurants', 'healthcare', 'ngo', 'ecommerce', 'education', 'other'],
    { message: 'Please select an industry' }
  ),
  projectType: z.enum(
    ['single-automation', 'custom-web-app', 'ai-agent', 'full-os', 'consulting'],
    { message: 'Please select a project type' }
  ),
  budget: z.enum(['500-1000', '1000-5000', '5000-15000', '15000+', 'unsure'], {
    message: 'Please select a budget range',
  }),
  message: messageField,
});

// ─── Newsletter Form ──────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: emailField,
});

// ─── AI Calculator Form ───────────────────────────────────────────────────────

export const calculatorSchema = z.object({
  industry: z.enum(
    ['restaurants', 'healthcare', 'ngo', 'ecommerce', 'education', 'other'],
    { message: 'Please select your industry' }
  ),
  teamSize: z
    .number()
    .int('Team size must be a whole number')
    .min(1, 'Team size must be at least 1')
    .max(10000, 'Please contact us for teams over 10,000'),
  manualHoursPerWeek: z
    .number()
    .min(1, 'Must be at least 1 hour per week')
    .max(168, 'Cannot exceed 168 hours per week'),
  avgHourlyRate: z
    .number()
    .min(1, 'Hourly rate must be at least $1')
    .max(10000, 'Please enter a realistic hourly rate'),
  currentPainPoints: z
    .array(z.string())
    .min(1, 'Please select at least one pain point'),
});

// ─── AI Consultant Chat ────────────────────────────────────────────────────────

export const consultantMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message must be under 1000 characters'),
});

// ─── Chat API Request ─────────────────────────────────────────────────────────

export const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(4000),
      })
    )
    .min(1, 'Messages array cannot be empty')
    .max(50, 'Conversation too long — please start a new chat'),
});

// ─── API Route: Contact Submission ────────────────────────────────────────────
// Relaxed vs the UI form — the API accepts any string for industry/budget/service
// since the contact form has different option sets than the Zod enum.

export const contactSubmissionSchema = z.object({
  name: nameField,
  email: emailField,
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  industry: z.string().max(100).optional(),
  service: z.union([z.string(), z.array(z.string())]).optional(),
  budget: z.string().max(50).optional(),
  message: z.string().min(1, 'Message is required').max(2000),
});

// ─── API Route: Calculator Request ────────────────────────────────────────────

export const calculatorRequestSchema = z.object({
  industry: z.string().min(1, 'Industry is required'),
  employees: z.coerce.number().min(1, 'At least 1 employee required'),
  monthly_customers: z.coerce.number().min(0),
  current_tools: z.union([z.string(), z.array(z.string())]),
  bottleneck: z.string().min(1, 'Bottleneck description is required'),
  hourly_cost: z.coerce.number().min(0.01, 'Hourly cost must be positive'),
  currency: z.string().max(5).optional().default('$'),
});

// ─── API Route: Consultant Request ────────────────────────────────────────────

export const consultantRequestSchema = z.object({
  message: z.string().min(1, 'Message is required').max(2000),
  conversation_history: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
      })
    )
    .optional()
    .default([]),
  detected_industry: z.string().optional(),
});

// ─── API Route: Industry Insight Request ──────────────────────────────────────

export const industryInsightSchema = z.object({
  industry: z.string().min(1, 'Industry is required').max(100),
});
