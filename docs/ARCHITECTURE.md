# Architecture — Minar Agency

Technical deep-dive for engineers who need to understand the why behind the key decisions.

---

## Why Next.js App Router

We chose Next.js 14 App Router over Pages Router and alternatives (Remix, Astro, SvelteKit) for these reasons:

1. **Server Components by default** — The marketing pages (blog, case studies, about) are static content. RSC means zero JavaScript shipped to the browser for them, resulting in excellent Lighthouse scores.
2. **Nested layouts** — The `(marketing)` route group allows a shared marketing layout (Navbar + Footer) without affecting future dashboard routes.
3. **Built-in streaming** — The AI chat features need streaming text responses. Next.js makes it trivial to stream from an API route using `ReadableStream` and consume it with `fetch()` in the browser.
4. **API routes** — We colocate API routes with the app, avoiding a separate backend service for the current stage of the product.
5. **`generateStaticParams`** — Blog and case study detail pages are pre-rendered at build time, giving us static-site performance with dynamic data structure.

---

## Component Hierarchy

```
app/layout.tsx (Root)
└── <html>
    ├── <Navbar />           ← Fixed header, always present
    │   └── <MobileMenu />   ← Full-screen overlay (mobile only)
    ├── {children}           ← Page-specific content
    │   ├── page.tsx
    │   └── <Footer />       ← Each page includes Footer directly
    └── <ChatWidget />       ← Floating global AI assistant
```

### Why is Footer in each page, not in layout.tsx?

Some future pages (e.g., `/dashboard`) should not show the marketing footer. Putting Footer in individual pages gives us flexibility without adding complex conditional logic to the root layout.

---

## AI Integration Architecture

### Request Flow (Chat Widget)

```
┌─────────────────────────────────────────────────────────────────┐
│  BROWSER (Client)                                               │
│                                                                 │
│  ChatWidget.tsx                                                 │
│  ┌─────────────────┐                                            │
│  │ useState:        │  User sends message                       │
│  │  messages[]      │──────────────────▶ POST /api/chat         │
│  │  isTyping        │                      │                    │
│  └─────────────────┘                       │                    │
│                                            │                    │
│  ◀── fetch() reads stream ─────────────────┘                    │
│  Updates messages state                                         │
│  word-by-word via setMessages()                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼────────────────────────────────┐
                    │  SERVER (API Route)                       │
                    │                                          │
                    │  src/app/api/chat/route.ts               │
                    │  1. chatRequestSchema.safeParse(body)    │
                    │  2. createStreamingCompletion(messages)  │
                    │  3. ReadableStream → Response headers    │
                    └──────────────────┬───────────────────────┘
                                       │
                    ┌──────────────────▼───────────────────────┐
                    │  ANTHROPIC API (External)                 │
                    │                                          │
                    │  Model: claude-sonnet-4-20250514         │
                    │  System: PROMPT_CHAT_ASSISTANT           │
                    │  Max tokens: 1024                        │
                    │  Mode: streaming                         │
                    └──────────────────────────────────────────┘
```

### Error Handling Strategy

```
Anthropic API Error
       │
       ▼
handleAIError(error)   ← Maps SDK errors to user messages
       │
       ├─▶ 401 → "Authentication failed. Contact support."
       ├─▶ 429 → "Service busy. Try again in a moment."
       ├─▶ 500 → "AI service error. Please try again."
       └─▶ Any → Log to console.error + "Something went wrong."
```

**Never** expose raw Anthropic errors to the client. The `handleAIError` function in `src/lib/ai/claude.ts` is the single place that translates errors.

---

## State Management Decisions

| State | Solution | Reason |
|-------|---------|--------|
| Chat messages | `useState` in ChatWidget | Local to one component, no sharing needed |
| Pricing toggle | `useState` in PricingTiers | Local to one section |
| Blog filters | `useState` in BlogListing | Local to one section |
| Cross-page state | *(none yet)* | Would use Zustand if needed |
| Form state | React Hook Form + Zod | Industry standard, validation built-in |

We deliberately avoided adding Zustand/Redux at this stage. The site is primarily a marketing site; most state is local to a single component or section. We will add Zustand when the `/dashboard` route group is built.

---

## Performance Strategy

### Build-time Optimization
- Blog and case study pages: `generateStaticParams` → pre-rendered HTML
- Homepage: Server Component → no JavaScript shipped
- Critical CSS: Tailwind purges unused classes at build time

### Runtime Optimization
- Heavy sections (Calculator, ChatWidget): dynamically imported
- Framer Motion: `LazyMotion` with `domAnimation` feature bundle
- Images: `next/image` with automatic WebP/AVIF conversion
- Fonts: Google Fonts loaded via `next/font` for zero layout shift

### Caching Strategy
```
Static pages (blog, case studies): ISR with 1-hour revalidation
API routes with stable data: Cache-Control: s-maxage=3600
AI API routes: no-store (responses are dynamic and unique)
```

---

## Data Flow for ROI Calculator

End-to-end flow for the AI-powered calculator feature:

```
┌──────────────────────────────────────────────────────────────┐
│  STEP 1: USER FILLS MULTI-STEP FORM                          │
│                                                              │
│  Calculator.tsx (Client Component)                           │
│  React Hook Form + Zod (calculatorSchema)                    │
│  Local validation on each step                               │
└────────────────────────┬─────────────────────────────────────┘
                         │ On final step submit
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  STEP 2: POST /api/calculator                                │
│                                                              │
│  src/app/api/calculator/route.ts                            │
│  ├── calculatorSchema.safeParse(body)  ← Server validation  │
│  ├── calculateAnnualLoss(data)         ← Business logic     │
│  └── Returns CalculatorResult          ← Typed response     │
└────────────────────────┬─────────────────────────────────────┘
                         │ ApiResponse<CalculatorResult>
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  STEP 3: DISPLAY RESULTS                                     │
│                                                              │
│  Calculator.tsx                                              │
│  ├── AnimatedCounter for each metric                        │
│  └── "Book a Call" CTA (pre-filled with their data)         │
└──────────────────────────────────────────────────────────────┘
```

---

## Security Considerations

1. **Input validation**: Every API route validates with Zod before any processing
2. **Error messages**: `handleAIError()` ensures stack traces never reach the client
3. **Environment variables**: API keys only in server-side code, never `NEXT_PUBLIC_`
4. **Security headers**: CSP, X-Frame-Options, HSTS all set in `next.config.mjs`
5. **Rate limiting**: To be added via Upstash Redis before production traffic

---

## Future Architecture Plans

| Phase | Plan |
|-------|------|
| Phase 2 | `/dashboard` route group with client authentication (NextAuth.js) |
| Phase 2 | PostgreSQL + Prisma for client data |
| Phase 2 | Zustand for dashboard state management |
| Phase 3 | Resend for transactional email |
| Phase 3 | Redis for AI response caching |
| Phase 4 | Separate microservice for heavy AI tasks (Python FastAPI) |
