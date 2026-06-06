"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";

// ============================================
// Workflow Steps Data
// ============================================

const WORKFLOW_STEPS = [
  {
    title: "Request Received",
    desc: "Customer sends a WhatsApp message or submits a form.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  },
  {
    title: "AI Comprehension",
    desc: "The AI agent instantly reads and understands the context and intent.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    ),
  },
  {
    title: "Action Triggered",
    desc: "System creates the appointment, order, or ticket automatically.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
  },
  {
    title: "Invoice Generated",
    desc: "A personalized invoice or confirmation is instantly sent back.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
  {
    title: "Notification Sent",
    desc: "Managers receive a clean dashboard alert—zero manual data entry.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
  },
  {
    title: "Real-time Reporting",
    desc: "Metrics and reports update automatically across your entire system.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
  },
];

// ============================================
// Main Component
// ============================================

export default function WorkflowAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [allDone, setAllDone] = useState(false);

  // Time in seconds for each card to animate in
  const stepDelay = 0.4;
  const totalDuration = WORKFLOW_STEPS.length * stepDelay;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAllDone(true);
      }, totalDuration * 1000 + 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isInView, totalDuration]);

  return (
    <section id="workflow" className="section-padding bg-background-secondary border-t border-surface-border relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none transform -translate-y-1/2" />

      <div className="section-container relative z-10" ref={containerRef}>
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <SectionHeading
            badge="The Perfect Workflow"
            title="How Intelligent"
            highlight="Systems Work"
            description="Watch how a typical customer interaction flows through a fully automated business operating system without human intervention."
          />
        </div>

        {/* Desktop Layout (Horizontal/ZigZag) & Mobile Layout (Vertical) */}
        <div className="relative max-w-5xl mx-auto">
          {/* Cards Grid/List */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-32 relative z-10">
            {WORKFLOW_STEPS.map((step, idx) => {
              // Calculate custom grid positions for zigzag on desktop
              let colStart = 1;
              let rowStart = 1;
              
              if (idx === 0) { colStart = 1; rowStart = 1; }
              if (idx === 1) { colStart = 2; rowStart = 1; }
              if (idx === 2) { colStart = 3; rowStart = 1; }
              if (idx === 3) { colStart = 3; rowStart = 2; }
              if (idx === 4) { colStart = 2; rowStart = 2; }
              if (idx === 5) { colStart = 1; rowStart = 2; }

              return (
                <motion.div
                  key={idx}
                  className={cn(
                    "relative w-full flex",
                    // Apply grid positioning only on large screens
                    `lg:col-start-${colStart} lg:row-start-${rowStart}`
                  )}
                  style={{
                    gridColumnStart: typeof window !== 'undefined' && window.innerWidth >= 1024 ? colStart : 'auto',
                    gridRowStart: typeof window !== 'undefined' && window.innerWidth >= 1024 ? rowStart : 'auto',
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: idx * stepDelay,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  {/* Mobile Connecting Line */}
                  {idx !== WORKFLOW_STEPS.length - 1 && (
                    <div className="lg:hidden absolute left-[31px] top-16 bottom-[-2rem] w-0.5 z-0">
                      <div className="absolute inset-0 border-l-2 border-dashed border-primary/30" />
                      <motion.div 
                        className="absolute top-0 left-0 bottom-0 border-l-2 border-dashed border-accent origin-top"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: stepDelay, delay: idx * stepDelay + 0.2, ease: "linear" }}
                      />
                    </div>
                  )}

                  {/* Desktop Connecting Lines */}
                  <div className="hidden lg:block">
                    {/* Card 1 -> Card 2 */}
                    {idx === 0 && (
                      <div className="absolute top-1/2 -right-12 w-12 h-1 -translate-y-1/2 z-0">
                        <div className="absolute inset-0 border-b-2 border-dashed border-primary/30" />
                        <motion.div 
                          className="absolute inset-0 border-b-2 border-dashed border-accent origin-left"
                          initial={{ scaleX: 0 }}
                          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                          transition={{ duration: stepDelay, delay: idx * stepDelay + 0.2, ease: "linear" }}
                        />
                      </div>
                    )}
                    {/* Card 2 -> Card 3 */}
                    {idx === 1 && (
                      <div className="absolute top-1/2 -right-12 w-12 h-1 -translate-y-1/2 z-0">
                        <div className="absolute inset-0 border-b-2 border-dashed border-primary/30" />
                        <motion.div 
                          className="absolute inset-0 border-b-2 border-dashed border-accent origin-left"
                          initial={{ scaleX: 0 }}
                          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                          transition={{ duration: stepDelay, delay: idx * stepDelay + 0.2, ease: "linear" }}
                        />
                      </div>
                    )}
                    {/* Card 3 -> Card 4 (Downwards) */}
                    {idx === 2 && (
                      <div className="absolute -bottom-32 right-1/2 w-1 h-32 translate-x-1/2 z-0">
                        <div className="absolute inset-0 border-l-2 border-dashed border-primary/30" />
                        <motion.div 
                          className="absolute inset-0 border-l-2 border-dashed border-accent origin-top"
                          initial={{ scaleY: 0 }}
                          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                          transition={{ duration: stepDelay, delay: idx * stepDelay + 0.2, ease: "linear" }}
                        />
                      </div>
                    )}
                    {/* Card 4 -> Card 5 (Leftwards) */}
                    {idx === 3 && (
                      <div className="absolute top-1/2 -left-12 w-12 h-1 -translate-y-1/2 z-0">
                        <div className="absolute inset-0 border-b-2 border-dashed border-primary/30" />
                        <motion.div 
                          className="absolute inset-0 border-b-2 border-dashed border-accent origin-right"
                          initial={{ scaleX: 0 }}
                          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                          transition={{ duration: stepDelay, delay: idx * stepDelay + 0.2, ease: "linear" }}
                        />
                      </div>
                    )}
                    {/* Card 5 -> Card 6 (Leftwards) */}
                    {idx === 4 && (
                      <div className="absolute top-1/2 -left-12 w-12 h-1 -translate-y-1/2 z-0">
                        <div className="absolute inset-0 border-b-2 border-dashed border-primary/30" />
                        <motion.div 
                          className="absolute inset-0 border-b-2 border-dashed border-accent origin-right"
                          initial={{ scaleX: 0 }}
                          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                          transition={{ duration: stepDelay, delay: idx * stepDelay + 0.2, ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <motion.div 
                    className={cn(
                      "relative z-10 w-full bg-surface border border-surface-border p-6 rounded-2xl shadow-xl transition-all duration-500",
                      allDone ? "shadow-[0_0_20px_rgba(139,92,246,0.15)] border-primary/30" : ""
                    )}
                    animate={allDone ? { y: -5 } : { y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon Box */}
                      <div className={cn(
                        "relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500",
                        allDone ? "bg-gradient-to-br from-primary to-accent text-white" : "bg-primary/10 text-primary-400"
                      )}>
                        {/* Glow effect when active */}
                        <motion.div 
                          className="absolute inset-0 rounded-xl bg-primary/40 blur-md -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: allDone ? 0 : [0, 1, 0] }}
                          transition={{ 
                            duration: 1, 
                            delay: idx * stepDelay,
                            times: [0, 0.5, 1] 
                          }}
                        />
                        {step.icon}
                        
                        {/* Step Number Badge */}
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-background border border-surface-border flex items-center justify-center text-[10px] font-bold text-text-primary">
                          {idx + 1}
                        </div>
                      </div>

                      {/* Text */}
                      <div>
                        <h4 className="text-base font-bold text-white mb-1.5">{step.title}</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
