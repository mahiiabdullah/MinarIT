# Code Standards — Minar Agency

> **This document is law.** Every PR that violates these standards will be rejected at review. When in doubt, ask before writing.

---

## Section A — Naming Conventions

### Files
| Type | Convention | Example |
|------|-----------|---------|
| React components | `PascalCase` | `ChatWidget.tsx` |
| Utility functions | `camelCase` | `format.ts`, `cn.ts` |
| Constants files | `camelCase` | `site.ts`, `animations.ts` |
| Type files | `camelCase` | `api.ts`, `domain.ts` |
| API routes | `kebab-case` (folder) | `ai-consultant/route.ts` |
| Test files | Match source + `.test` | `format.test.ts` |
| Styles | `camelCase` or `kebab-case` | `globals.css` |

### Variables
```typescript
// ✅ Correct — descriptive, unambiguous
const userEmailAddress = 'user@example.com';
const calculatorResult = await calculateROI(formData);
const isMenuOpen = useState(false);

// ❌ Wrong — meaningless names
const x = 'user@example.com';
const data = await calculateROI(formData);
const temp = useState(false);
```

### Functions
All functions must start with a **verb**:
```typescript
// ✅ Correct
function handleSubmit(event: React.FormEvent): void {}
function fetchCaseStudies(): Promise<CaseStudy[]> {}
function parseApiResponse(raw: unknown): ApiResponse<User> {}
function formatCurrency(amount: number): string {}

// ❌ Wrong
function submit() {}
function caseStudies() {}
function response() {}
```

### Types & Interfaces
```typescript
// Props interfaces — ComponentNameProps
interface ChatWidgetProps { ... }
interface BlogArticleProps { ... }

// API response types — descriptive noun
interface CalculatorResult { ... }
interface ApiSuccessResponse<T> { ... }

// Form values — FormNameValues
type ContactFormValues = z.infer<typeof contactSchema>;
type CalculatorFormValues = z.infer<typeof calculatorSchema>;

// Enums — PascalCase values
enum Industry {
  Restaurants = 'restaurants',
  Healthcare = 'healthcare',
}
```

### Constants
```typescript
// ✅ SCREAMING_SNAKE_CASE for true immutable constants
const MAX_RETRY_ATTEMPTS = 3;
const AI_MODELS = { SONNET: 'claude-sonnet-4-20250514' } as const;

// ✅ camelCase for config objects
const springConfig = { stiffness: 100, damping: 20 };

// ❌ Never PascalCase for constants (that's for classes/types)
const MaxRetryAttempts = 3; // WRONG
```

### CSS Classes
- **Tailwind only** — no custom class names in component files
- Custom utilities in `globals.css` only, with a comment explaining why
- Never use `style={{}}` for static values — always use Tailwind classes

```tsx
// ✅ Correct
<div className="flex items-center gap-4 rounded-xl bg-surface p-6">

// ❌ Wrong — custom class with no explanation
<div className="my-special-card">

// ✅ Acceptable — custom utility in globals.css with comment
// globals.css:
// /* btn-gradient: Reusable gradient button — cannot be expressed as a single Tailwind class */
// .btn-gradient { @apply bg-gradient-to-r from-primary to-accent text-white font-bold; }
```

### API Routes
```
✅ /api/generate-proposal        — describes the action
✅ /api/calculate-roi            — verb-first
✅ /api/ai-consultant            — noun is okay for resources

❌ /api/proposal                 — noun only, ambiguous
❌ /api/calculator               — too generic
❌ /api/getConsultantResponse    — camelCase, no hyphens
```

---

## Section B — Component Structure Rules

Every component file must follow this **exact order**:

```typescript
// 1. Imports (external → internal → relative, alphabetical within groups)
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { FADE_UP } from '@/constants/animations';
import { cn } from '@/lib/utils/cn';
import type { BlogPost } from '@/types/domain';

import GlassCard from '../ui/GlassCard';

// 2. Types and interfaces (for this file only)
interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

// 3. Constants local to this file
const EXCERPT_MAX_LENGTH = 120;

// 4. Helper functions (pure, no side effects)
function formatExcerpt(text: string): string {
  return text.length > EXCERPT_MAX_LENGTH
    ? `${text.slice(0, EXCERPT_MAX_LENGTH)}...`
    : text;
}

// 5. The component function
export default function BlogCard({ post, className }: BlogCardProps) {
  // 5a. Hooks first
  const [isHovered, setIsHovered] = useState(false);

  // 5b. Derived state / memos
  const excerpt = formatExcerpt(post.excerpt);

  // 5c. Event handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // 5d. JSX
  return (
    <motion.article
      variants={FADE_UP}
      className={cn('group relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GlassCard>
        <h3 className="text-xl font-bold text-white">{post.title}</h3>
        <p className="text-text-secondary">{excerpt}</p>
        <Link href={`/blog/${post.slug}`}>Read More</Link>
      </GlassCard>
    </motion.article>
  );
}

// 6. Sub-components (only if small and only used in this file)
function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary-light">
      {tag}
    </span>
  );
}

// 7. Default export (already above — only one export per file unless utilities)
```

---

## Section C — TypeScript Rules

- `strict: true` — **always**. No exceptions.
- **No `any`** — use `unknown` + type narrowing if the type is truly unknown
- All function parameters and return types must be **explicit**
- **Never use type assertion** (`as SomeType`) without a comment explaining why

```typescript
// ✅ Correct — explicit return type
function calculateROI(hours: number, rate: number): number {
  return hours * rate * 52;
}

// ❌ Wrong — implicit any, no return type
function calculateROI(hours, rate) {
  return hours * rate * 52;
}

// ✅ Correct — unknown + type guard
function processApiResponse(raw: unknown): string {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('Invalid response format');
  }
  // Now TypeScript knows raw is an object
  return JSON.stringify(raw);
}

// ❌ Wrong — silences errors instead of handling them
function processApiResponse(raw: any): string {
  return raw.data.toString();
}

// ✅ When type assertion is unavoidable, explain why
// We use `as` here because the Stripe SDK returns a generic object
// but the webhook event type is guaranteed by signature verification above.
const event = stripe.webhooks.constructEvent(body, sig, secret) as Stripe.Event;
```

Prefer **interfaces** for object shapes:
```typescript
// ✅ Interface for objects (extensible, shows in error messages)
interface UserProfile {
  id: string;
  email: string;
  name: string;
}

// ✅ Type for unions, primitives, function signatures
type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type SubmitHandler = (values: ContactFormValues) => Promise<void>;
```

---

## Section D — Import Rules

**Absolute imports only** — no `../../` allowed anywhere.

```typescript
// ✅ Correct
import { cn } from '@/lib/utils/cn';
import type { BlogPost } from '@/types/domain';
import { FADE_UP } from '@/constants/animations';
import GlassCard from '@/components/ui/GlassCard';

// ❌ Wrong
import { cn } from '../../../lib/utils';
import { BlogPost } from '../../types';
```

**Import order** (enforced by ESLint):
```typescript
// 1. React
import { useState, useEffect, useRef } from 'react';

// 2. Next.js
import Image from 'next/image';
import Link from 'next/link';

// 3. External packages (alphabetical)
import { motion } from 'framer-motion';
import { z } from 'zod';

// 4. Internal @/ paths (alphabetical)
import { FADE_UP, STAGGER_CONTAINER } from '@/constants/animations';
import { cn } from '@/lib/utils/cn';
import type { BlogPost } from '@/types/domain';
import GlassCard from '@/components/ui/GlassCard';

// 5. Relative ./paths (alphabetical)
import TagBadge from './TagBadge';

// 6. Type-only imports last
import type { Variants } from 'framer-motion';
```

---

## Section E — State Management Rules

| State Type | Solution |
|-----------|---------|
| Local UI state (toggle, input) | `useState` |
| Derived state | `useMemo` / `useCallback` |
| Cross-component (same page) | Lift state to parent |
| Cross-page / global | Zustand store in `src/stores/` |
| Server state (fetched data) | React Server Components |
| Form state | React Hook Form + Zod |

**Rules:**
- ❌ No prop drilling beyond **2 levels** — use a store
- ❌ No `useEffect` for data transformation — use `useMemo`
- ❌ No `useEffect` to sync two pieces of state — derive it instead

```typescript
// ✅ Correct — derive state, don't sync it
const filteredPosts = useMemo(
  () => posts.filter(post => post.category === activeCategory),
  [posts, activeCategory]
);

// ❌ Wrong — anti-pattern: using effect to keep two states in sync
useEffect(() => {
  setFilteredPosts(posts.filter(post => post.category === activeCategory));
}, [posts, activeCategory]);
```

---

## Section F — API Route Rules

Every API route must return a consistent response shape. Use this pattern:

```typescript
// src/app/api/calculate-roi/route.ts
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { calculatorSchema } from '@/lib/validations/forms';
import type { ApiResponse, CalculatorResult } from '@/types';

// Always type the return explicitly
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<CalculatorResult>>> {
  try {
    // Step 1: Parse and validate input with Zod
    const body: unknown = await req.json();
    const result = calculatorSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', code: 'VALIDATION_ERROR' },
        { status: 400 }
      );
    }

    const { teamSize, manualHoursPerWeek, avgHourlyRate } = result.data;

    // Step 2: Business logic
    const annualHoursLost = manualHoursPerWeek * 52;
    const annualCostLost = annualHoursLost * avgHourlyRate * teamSize;

    const calculatorResult: CalculatorResult = {
      weeklyHoursLost: manualHoursPerWeek * teamSize,
      monthlyHoursLost: (manualHoursPerWeek * teamSize * 52) / 12,
      annualHoursLost,
      annualCostLost,
      recommendedTier: annualCostLost > 50000 ? 'enterprise' : 'growth',
      estimatedROI: 280,
      paybackPeriodMonths: 4,
    };

    // Step 3: Return consistent success shape
    return NextResponse.json({ success: true, data: calculatorResult });

  } catch (error) {
    // Step 4: Log server-side, return safe message to client
    console.error('[API /calculate-roi]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
```

**HTTP status codes:**
| Status | When to use |
|--------|------------|
| 200 | Success |
| 400 | Validation failed / bad input |
| 401 | Not authenticated |
| 403 | Not authorized |
| 404 | Resource not found |
| 429 | Rate limited |
| 500 | Unexpected server error |

---

## Section G — Comments and Documentation

### When TO comment
```typescript
// WHY: We check for the session before calling Claude to avoid
// burning API tokens on unauthenticated requests.
if (!session) {
  return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
}

/**
 * Calculate the estimated ROI for automation investment.
 * Uses conservative multipliers based on McKinsey 2024 data.
 *
 * @param hoursPerWeek - Manual hours lost per employee per week
 * @param teamSize - Number of employees affected
 * @param hourlyRate - Average fully-loaded employee cost per hour
 * @returns Annualized cost of lost productivity in USD
 */
export function calculateAnnualLoss(
  hoursPerWeek: number,
  teamSize: number,
  hourlyRate: number
): number {
  return hoursPerWeek * teamSize * hourlyRate * 52;
}

// TODO(arif): 2025-01-15 [MINAR-42] — Replace console.log with Resend when API key is set up
console.log('Newsletter subscriber:', email);
```

### When NOT to comment
```typescript
// ❌ Useless — the code already says this
// Set the loading state to true
setIsLoading(true);

// ❌ Useless — TypeScript already says this
// posts is an array of BlogPost objects
const posts: BlogPost[] = [];
```

---

## Section H — Error Handling Rules

```typescript
// ✅ Always handle errors explicitly
try {
  const data = await fetchUserData(userId);
  return data;
} catch (error) {
  // Always log with context
  console.error('[fetchUserData] Failed for userId:', userId, error);
  // Return safe message — never expose raw errors
  throw new Error('Failed to load user data. Please try again.');
}

// ❌ Never swallow errors silently
try {
  await doSomething();
} catch (e) {}  // FORBIDDEN

// ✅ Every component needs three states
function BlogList() {
  if (isLoading) return <BlogListSkeleton />;
  if (error) return <ErrorMessage message="Failed to load posts" />;
  if (posts.length === 0) return <EmptyState message="No posts yet" />;
  return <>{posts.map(post => <BlogCard key={post.slug} post={post} />)}</>;
}
```

---

## Section I — Performance Rules

```typescript
// ✅ Always use next/image with explicit dimensions
import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero" width={1200} height={630} priority />

// ✅ Dynamic import heavy components
const Calculator = dynamic(() => import('@/components/features/Calculator'), {
  loading: () => <CalculatorSkeleton />,
  ssr: false, // Only if the component uses browser APIs
});

// ✅ Stable list keys — always use a unique ID from data
{posts.map(post => <BlogCard key={post.slug} post={post} />)}

// ❌ Index as key — causes React re-render bugs
{posts.map((post, i) => <BlogCard key={i} post={post} />)}

// ✅ Single named icon imports
import { ArrowRight } from 'lucide-react';

// ❌ Never import entire libraries
import * as Icons from 'lucide-react';

// ✅ Memoize expensive computations
const sortedPosts = useMemo(
  () => [...posts].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()),
  [posts]
);
```
