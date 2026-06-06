"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code, Cpu, ShieldCheck, Rocket, HeartHandshake } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const timelineStages = [
  {
    icon: Search,
    name: "Discovery & Mapping",
    duration: "Week 1-2",
    description: "We don't write a single line of code until we understand your business inside and out. We shadow your team, map your current workflows, and identify exact bottlenecks where time and money are leaking."
  },
  {
    icon: PenTool,
    name: "Architecture & Design",
    duration: "Week 3",
    description: "We design the blueprint for your new operating system. This includes database architecture, UI wireframes, and defining exactly where AI agents will be deployed to automate tasks."
  },
  {
    icon: Code,
    name: "Core Development",
    duration: "Week 4-8",
    description: "Our engineering team builds the foundational software. We use modern, scalable tech (Next.js, Node, PostgreSQL) to ensure the system is lightning-fast and can handle your growth."
  },
  {
    icon: Cpu,
    name: "AI Integration",
    duration: "Week 9-10",
    description: "We layer in the intelligence. This is where we connect LLMs, build custom WhatsApp agents, and train the system to automate data entry, customer support, and document generation."
  },
  {
    icon: ShieldCheck,
    name: "Stress Testing",
    duration: "Week 11",
    description: "We rigorously test every edge case. We simulate high traffic, attempt security breaches, and ensure the AI agents don't hallucinate or provide incorrect data."
  },
  {
    icon: Rocket,
    name: "Deployment & Training",
    duration: "Week 12",
    description: "We launch the system and migrate your data. But we don't just hand over the keys; we actively train your staff on how to use their new tools to maximize efficiency."
  },
  {
    icon: HeartHandshake,
    name: "Continuous Optimization",
    duration: "Ongoing",
    description: "Software isn't static. As your business evolves, we continuously monitor performance, tweak AI prompts, and build new features to keep you ahead of the curve."
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section-padding bg-background relative" ref={containerRef}>
      {/* Background glow */}
      <div className="glow-orb glow-orb-primary w-[800px] h-[800px] top-0 left-1/2 -translate-x-1/2 opacity-10" />

      <div className="section-container relative z-10">
        <SectionHeading
          badge="How We Work"
          title="The Build"
          highlight="Process"
          description="A systematic, predictable approach to transforming your operations from chaotic to automated."
        />

        <div className="max-w-4xl mx-auto relative pt-12">
          
          {/* Animated Line */}
          <div className="absolute left-[39px] md:left-1/2 top-12 bottom-0 w-1 bg-surface-border rounded-full overflow-hidden transform md:-translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-accent to-primary transform origin-top"
              style={{ scaleY: pathLength }}
            />
          </div>

          <div className="space-y-16 relative">
            {timelineStages.map((stage, index) => {
              const isEven = index % 2 === 0;
              const Icon = stage.icon;

              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Desktop Empty Spacer */}
                  <div className="hidden md:block w-1/2" />

                  {/* Icon Node */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-surface-elevated border border-surface-border flex items-center justify-center transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:bg-primary/10">
                      <Icon className="w-8 h-8 text-text-primary group-hover:text-primary-light transition-colors" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-28 md:pl-0 ${isEven ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'}`}>
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="glass-card p-6 md:p-8 hover:border-primary/40"
                    >
                      <span className="inline-block px-3 py-1 bg-surface-elevated border border-surface-border text-primary-light rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        {stage.duration}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-3">
                        {stage.name}
                      </h3>
                      <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                        {stage.description}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
