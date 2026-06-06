<div align="center">
  <img src="public/logo.svg" alt="Minar Agency Logo" width="120" height="120" />
  <h1>Minar Agency — AI-Powered Business Automation</h1>
  <p><strong>Next-generation business operating systems, intelligent automation, and custom AI software.</strong></p>

  <p>
    <a href="#features"><img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 14" /></a>
    <a href="#features"><img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="#features"><img src="https://img.shields.io/badge/TailwindCSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="#features"><img src="https://img.shields.io/badge/Framer_Motion-Animated-FF0055?style=for-the-badge&logo=framer" alt="Framer Motion" /></a>
  </p>
</div>

---

## 🚀 Overview

Minar Agency is a fully responsive, AI-integrated agency website built for the modern web. We transform how South Asian businesses operate by replacing repetitive tasks with custom AI systems, WhatsApp agents, and robust mobile applications. 

This repository houses the frontend and serverless API architecture for the Minar Agency platform, demonstrating industry-standard React/Next.js engineering.

---

## 🎨 The Interface

The user interface is designed to wow users at first glance, featuring a premium **Glassmorphism** aesthetic over a deep space background (`#0A0F1E`). 

Key interface highlights include:
- **Dynamic Navigation:** A dual-tier navigation system (Top Bar + Main Nav) with staggered Framer Motion dropdowns.
- **Aria — AI Chat Widget:** A floating, context-aware AI assistant utilizing Anthropic's Claude API that provides real-time consulting.
- **Interactive Calculators:** Dynamic ROI and automation calculators featuring smooth transitions and instant feedback.
- **Micro-Animations:** Hover states, scroll-linked animations, and animated gradients that make the website feel alive.

---

## 🏗️ Architecture Diagram

```mermaid
graph TD
    %% Core Architecture
    subgraph Client [Client-Side UI]
        A[Next.js App Router] --> B[React Server Components]
        B --> C[Client Components with Framer Motion]
        C --> D[Zod Form Validation]
    end

    subgraph Server [Serverless API Routes]
        E[/api/chat]
        F[/api/consultant]
        G[/api/calculator]
        H[/api/industry-insight]
        I[/api/contact]
    end

    subgraph AI [Anthropic Claude AI]
        J[Claude Singleton Helper]
        K[Centralized AI Prompts]
    end

    %% Flow
    Client -- "Fetch / Stream" --> Server
    Server -- "Zod Validation" --> Server
    E --> J
    F --> J
    G --> J
    H --> J
    J -- "Injects" --> K
    J -- "Streaming Completion" --> Client
    
    style Client fill:#0A0F1E,stroke:#8B5CF6,stroke-width:2px,color:#fff
    style Server fill:#0A0F1E,stroke:#06B6D4,stroke-width:2px,color:#fff
    style AI fill:#2d3748,stroke:#FF0055,stroke-width:2px,color:#fff
```

---

## ⏳ The Present vs. The Future

### **The Present (V1 Implementation)**
Currently, the platform operates as a high-conversion, highly-interactive marketing and lead-generation engine. 
- **Strict Architecture:** Enforced absolute imports, modular `src/` directory, and strictly typed props/responses.
- **Serverless AI:** Directly integrates with Anthropic Claude via Next.js Edge/Node API routes.
- **Centralized Constants:** All text, navigation, prompts, and animations are managed via a single source of truth (`src/constants`).
- **Zero "any" Types:** 100% strict TypeScript adherence across all files.

### **The Future (V2 Roadmap)**
The platform is designed to scale from an agency website into a full client portal.
- **Client Dashboard Integration:** Allowing clients to log in and monitor their deployed AI agents, WhatsApp bots, and ROI metrics in real-time.
- **Database Architecture:** Connecting to a Postgres/Supabase backend to persistently store AI consultant conversation histories, case studies, and form submissions.
- **Multi-Agent Orchestration:** Upgrading Aria from a basic chat widget to a multi-agent system capable of booking meetings, sending emails, and drafting proposals autonomously.
- **Dynamic Content Management (CMS):** Moving blog posts and case studies from localized data structures to a headless CMS (like Sanity or Payload).

---

## 🛠️ Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/mahiiabdullah/MinarIT.git
cd MinarIT
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory based on `.env.example`:
```env
ANTHROPIC_API_KEY=your_claude_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```text
MinarIT/
├── docs/                 # Architectural and Onboarding Documentation
├── public/               # Static assets (images, icons)
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   ├── components/       # Reusable UI, Forms, Sections, and AI components
│   ├── constants/        # Centralized site configurations and AI Prompts
│   ├── hooks/            # Custom React hooks (scroll, intersection, etc.)
│   ├── lib/              # Utility functions, AI Singletons, and Mock Data
│   └── types/            # Global TypeScript definitions
├── .eslintrc.json        # Strict linting rules
├── tailwind.config.ts    # Design system configuration
└── tsconfig.json         # Strict TS configuration
```

---

<div align="center">
  <p>Built with ❤️ by the Minar Agency Team.</p>
</div>
