"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Brain, 
  Layout, 
  Server, 
  Cloud 
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// Tech stack data
const techCategories = [
  {
    id: "ai",
    name: "AI",
    icon: Brain,
    color: "from-purple-500/20 to-purple-500/0 text-purple-400 border-purple-500/30",
    bgColor: "bg-purple-500/10",
    items: [
      { name: "Claude", desc: "Advanced reasoning & coding", useCase: "We use this for complex document analysis and logic" },
      { name: "Gemini", desc: "Multimodal processing", useCase: "We use this for image and text combined processing" },
      { name: "OpenAI", desc: "Industry-leading models", useCase: "We use this for conversational AI and content generation" },
      { name: "Local LLMs", desc: "Privacy-first processing", useCase: "We use this for highly sensitive enterprise data" },
    ]
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Layout,
    color: "from-blue-500/20 to-blue-500/0 text-blue-400 border-blue-500/30",
    bgColor: "bg-blue-500/10",
    items: [
      { name: "Next.js", desc: "React framework", useCase: "We use this for fast, SEO-friendly web applications" },
      { name: "React", desc: "UI library", useCase: "We use this for interactive, component-driven interfaces" },
      { name: "Flutter", desc: "Cross-platform mobile", useCase: "We use this for native iOS and Android apps from one codebase" },
      { name: "Tailwind", desc: "Utility-first CSS", useCase: "We use this for rapid, responsive styling" },
    ]
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    color: "from-emerald-500/20 to-emerald-500/0 text-emerald-400 border-emerald-500/30",
    bgColor: "bg-emerald-500/10",
    items: [
      { name: "Node.js", desc: "JavaScript runtime", useCase: "We use this for scalable, event-driven backends" },
      { name: "Python", desc: "Versatile backend", useCase: "We use this for AI integration and data processing scripts" },
      { name: "FastAPI", desc: "High-performance API", useCase: "We use this for rapid backend AI services" },
      { name: "PostgreSQL", desc: "Relational database", useCase: "We use this for robust, structured data storage" },
    ]
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: Cloud,
    color: "from-orange-500/20 to-orange-500/0 text-orange-400 border-orange-500/30",
    bgColor: "bg-orange-500/10",
    items: [
      { name: "AWS", desc: "Cloud infrastructure", useCase: "We use this for scalable, enterprise-grade hosting" },
      { name: "Docker", desc: "Containerization", useCase: "We use this for consistent deployment environments" },
      { name: "Kubernetes", desc: "Container orchestration", useCase: "We use this for managing large-scale deployments" },
      { name: "Vercel", desc: "Frontend deployment", useCase: "We use this for zero-config Next.js hosting" },
    ]
  }
];

export default function TechStack() {
  const [expandedCats, setExpandedCats] = useState<string[]>(techCategories.map(c => c.id)); // Expand all by default on desktop

  const toggleCategory = (id: string) => {
    setExpandedCats(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id) 
        : [...prev, id]
    );
  };

  return (
    <section className="section-container section-padding" id="tech-stack">
      <SectionHeading
        badge="Our Toolbox"
        title="Built With World-Class Technology"
        subtitle="We leverage the latest and most reliable technologies to build systems that scale with your business."
        centered
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {techCategories.map((category) => {
          const isExpanded = expandedCats.includes(category.id);
          const Icon = category.icon;

          return (
            <div key={category.id} className="flex flex-col">
              {/* Header Card */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`relative z-10 flex w-full items-center justify-between rounded-xl border bg-gradient-to-b p-5 text-left transition-all duration-300 hover:brightness-110 ${category.color} bg-background/80 backdrop-blur-md`}
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${category.bgColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-white text-lg">{category.name}</h3>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
                />
              </button>

              {/* Expandable Items */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-visible"
                  >
                    <div className="relative pt-4 pl-6 pr-2 pb-2">
                      {/* Connecting Line */}
                      <div className={`absolute bottom-6 left-6 top-0 w-px bg-gradient-to-b ${category.color.split(" ")[0]} to-transparent opacity-50`} />
                      
                      <div className="flex flex-col gap-3">
                        {category.items.map((item, idx) => (
                          <motion.div
                            key={item.name}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1, duration: 0.3 }}
                            className="group relative ml-4 rounded-lg border border-white/5 bg-white/5 p-3 hover:bg-white/10 transition-colors duration-200"
                          >
                            {/* Connector horizontal dot/line */}
                            <div className={`absolute -left-[21px] top-1/2 h-[2px] w-4 -translate-y-1/2 bg-gradient-to-r ${category.color.split(" ")[0]} opacity-50`} />
                            <div className={`absolute -left-[24px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border ${category.bgColor} ${category.color.split(" ")[2]} bg-background`} />

                            <div className="flex items-start gap-3">
                              {/* Logo Placeholder */}
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-black/40 text-xs font-bold text-white/50 border border-white/10">
                                {item.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-medium text-white/90 text-sm">{item.name}</h4>
                                <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                              </div>
                            </div>

                            {/* Tooltip on hover */}
                            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-max max-w-[200px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-50">
                              <div className="rounded bg-black/90 px-3 py-1.5 text-xs text-white border border-white/10 shadow-xl whitespace-normal text-center">
                                {item.useCase}
                              </div>
                              {/* Tooltip arrow */}
                              <div className="absolute left-1/2 top-full -mt-1 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
