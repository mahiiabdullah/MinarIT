# Developer Onboarding — Minar Agency

Welcome to the Minar Agency codebase. This document is your first stop. Read it end-to-end before touching any code.

---

## 1. Project Overview

Minar Agency is a marketing and client-facing website for an AI-powered business automation agency. The site is designed to attract business owners, demonstrate Minar's capabilities through interactive tools (ROI calculator, AI chat assistant), and convert visitors into leads.

The technical stack is Next.js 14 with the App Router, TypeScript in strict mode, Tailwind CSS for styling, and Framer Motion for animations. The AI features use Anthropic's Claude API. The site is designed to be fast (Core Web Vitals green), accessible (WCAG AA), and SEO-optimized out of the box.

---

## 2. Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | `>=20.x` | Use `nvm` to manage versions |
| npm | `>=10.x` | Comes with Node |
| Git | `>=2.40` | Use the version from your OS package manager |
| VS Code | Latest | Recommended editor |

### Recommended VS Code Extensions
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **TypeScript Importer** (`pmneo.tsimporter`)

---

## 3. First-Time Setup

```bash
# 1. Clone the repository
git clone https://github.com/minar-agency/minar-website.git
cd minar-website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY (ask the team lead)

# 4. Start the development server
npm run dev

# 5. Open the site
# http://localhost:3000
```

---

## 4. Environment Variables

Copy `.env.example` to `.env.local`. Every variable is documented in the example file with its purpose and where to get it.

**Required variables to get started:**
- `ANTHROPIC_API_KEY` — Ask the team lead. Without this, the AI chat and calculator will not work.

**Optional variables:**
- `NEXT_PUBLIC_APP_URL` — Defaults to localhost, only needed in production
- Email service variables (Resend/Mailchimp) — Only needed if testing contact forms

**Rules:**
- Never commit `.env.local` to git (it is in `.gitignore`)
- Never use `NEXT_PUBLIC_` prefix for secrets — these are exposed to the browser
- Never hardcode values in source code — always use `process.env.VARIABLE_NAME`

---

## 5. Project Structure Tour

Start by reading these folders in order:

```
src/
├── app/                    ← Start here — all routes live here
│   ├── page.tsx            ← Homepage
│   ├── layout.tsx          ← Root layout (Navbar, ChatWidget)
│   ├── blog/               ← Blog listing + /[slug] detail pages
│   ├── pricing/            ← Pricing page
│   ├── contact/            ← Contact page with form
│   ├── case-studies/       ← Listing + /[slug] detail pages
│   ├── industries/         ← Industry landing pages
│   ├── about/              ← About page
│   └── api/                ← API routes (chat, calculator, contact)
│
├── components/
│   ├── ui/                 ← Reusable primitives (GlassCard, Button, etc.)
│   ├── sections/           ← Large page sections used once per page
│   ├── layout/             ← Navbar, Footer, MobileMenu
│   ├── ai/                 ← AI-specific: ChatWidget, ChatMessage
│   └── forms/              ← Form components: NewsletterForm, etc.
│
├── lib/
│   ├── ai/claude.ts        ← Claude API client (server-side only)
│   ├── validations/        ← Zod schemas for all forms
│   └── utils/              ← Pure utility functions
│
├── constants/
│   ├── site.ts             ← Site name, nav links, social links
│   ├── animations.ts       ← Shared Framer Motion variants
│   ├── ai-prompts.ts       ← All Claude system prompts
│   └── index.ts            ← Barrel export (backward compat)
│
└── types/
    ├── api.ts              ← API request/response types
    ├── domain.ts           ← Business domain types
    ├── ui.ts               ← UI component types
    └── forms.ts            ← Form value types
```

---

## 6. How to Create a New Page

Example: Adding a `/careers` page.

```bash
# 1. Create the directory and page file
mkdir src/app/careers
touch src/app/careers/page.tsx
touch src/app/careers/loading.tsx
touch src/app/careers/error.tsx
```

```typescript
// src/app/careers/page.tsx
import type { Metadata } from 'next';

import Footer from '@/components/layout/Footer';

// Always export metadata
export const metadata: Metadata = {
  title: 'Careers — Join the Minar Team',
  description: 'We are looking for passionate engineers and designers to build the future of business automation.',
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <section className="section-container py-20">
        <h1 className="text-5xl font-display font-bold text-white">
          Join Our Team
        </h1>
      </section>
      <Footer />
    </main>
  );
}
```

---

## 7. How to Create a New Component

Example: Adding a `TestimonialCard` UI component.

```bash
mkdir src/components/ui/TestimonialCard
touch src/components/ui/TestimonialCard/index.tsx
touch src/components/ui/TestimonialCard/types.ts
```

```typescript
// src/components/ui/TestimonialCard/types.ts
export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  className?: string;
}
```

```typescript
// src/components/ui/TestimonialCard/index.tsx
'use client'; // only if needed — RSC preferred

import { motion } from 'framer-motion';

import { FADE_UP } from '@/constants/animations';
import { cn } from '@/lib/utils/cn';

import GlassCard from '@/components/ui/GlassCard';

import type { TestimonialCardProps } from './types';

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div variants={FADE_UP} className={cn('h-full', className)}>
      <GlassCard className="h-full p-8">
        <blockquote className="text-text-secondary italic mb-6">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <cite className="not-italic">
          <div className="font-bold text-white">{author}</div>
          <div className="text-sm text-text-muted">{role}, {company}</div>
        </cite>
      </GlassCard>
    </motion.div>
  );
}
```

---

## 8. How to Add a New API Route

Example: Adding a `/api/submit-contact` route.

```bash
mkdir src/app/api/submit-contact
touch src/app/api/submit-contact/route.ts
```

```typescript
// src/app/api/submit-contact/route.ts
import { type NextRequest, NextResponse } from 'next/server';

import { contactSchema } from '@/lib/validations/forms';
import type { ApiResponse } from '@/types/api';

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<{ message: string }>>> {
  try {
    const body: unknown = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid form data' },
        { status: 400 }
      );
    }

    // TODO(yourname): 2025-01-15 [MINAR-XX] — Wire up Resend email service
    console.info('Contact form submitted:', result.data.email);

    return NextResponse.json({
      success: true,
      data: { message: 'Thank you! We will be in touch within 24 hours.' },
    });
  } catch (error) {
    console.error('[API /submit-contact]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
```

---

## 9. How the AI Integration Works

The AI flow for the chat widget:

```
User types message
       │
       ▼
ChatWidget (client) → POST /api/chat
                              │
                              ▼
                    chatRequestSchema.safeParse()  ← Validates with Zod
                              │
                              ▼
                    createStreamingCompletion()  ← Calls Claude API
                              │
                              ▼
                    ReadableStream → Response   ← Streams back to client
                              │
                              ▼
ChatWidget reads stream → updates messages state word-by-word
```

**Key files:**
- `src/lib/ai/claude.ts` — Claude client, never import in client components
- `src/constants/ai-prompts.ts` — All system prompts
- `src/app/api/chat/route.ts` — The streaming API route
- `src/components/ai/ChatWidget.tsx` — The UI

---

## 10. Common Gotchas

1. **"use client" vs Server Components** — By default, all components in Next.js App Router are Server Components (no `useState`, no event handlers). Add `"use client"` at the top only when you need interactivity. Prefer RSC — they are faster.

2. **Hydration errors** — If a component renders differently on server vs client (e.g., using `Math.random()` or `Date.now()` in render), Next.js will warn or error. Always derive deterministic values for SSR-rendered content.

3. **Tailwind class conflicts** — Use `cn()` from `@/lib/utils/cn` for all class merging. Never concatenate strings: `className={\`base ${custom}\`}` can cause conflicts. Use `cn('base', custom)` instead.

4. **API routes and environment variables** — `process.env.ANTHROPIC_API_KEY` is only available in server-side code. Never use it in client components — it will be `undefined` at runtime in the browser.

5. **Importing from `constants/index.ts`** — The `constants/index.ts` file re-exports everything from sub-files. Prefer importing directly from the specific file (`@/constants/site`) for better tree-shaking and clearer dependencies.

---

## 11. Who to Ask for What

| Area | Person | Contact |
|------|--------|---------|
| Architecture decisions | Tech Lead | #engineering |
| Design system / Tailwind | Lead Designer | #design |
| Claude AI integration | AI Lead | #ai-features |
| Deployment / CI | DevOps | #devops |
| Urgent production issues | On-call | #incidents |

---

## 12. Further Reading

- [CODE_STANDARDS.md](./CODE_STANDARDS.md) — Naming, component structure, TypeScript rules
- [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) — Branching, commits, PRs
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Technical deep-dive on key decisions
