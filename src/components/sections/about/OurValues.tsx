"use client";

import { motion } from "framer-motion";
import { Lightbulb, Wrench, ShieldCheck, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const values = [
  {
    icon: Lightbulb,
    title: "We Solve Business Problems, Not Tech Problems",
    description: "We don't build software just to use cool technology. Every line of code we write is explicitly tied to saving you time, reducing costs, or increasing revenue.",
  },
  {
    icon: Wrench,
    title: "We Build, Then We Automate",
    description: "Automation only works on top of a solid foundation. We build robust operating systems first, then layer intelligent AI agents to automate the workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency in Every Line of Code",
    description: "No black boxes. No vendor lock-in traps. We build clear, documented systems and provide you with complete visibility into how your digital infrastructure operates.",
  },
  {
    icon: TrendingUp,
    title: "Your Growth is Our Metric",
    description: "We measure our success strictly by your operational improvements. If our system doesn't make your business measurably faster and more profitable, we haven't done our job.",
  },
];

export default function OurValues() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb glow-orb-accent w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="section-container relative z-10">
        <SectionHeading
          badge="Core Principles"
          title="What Drives"
          highlight="Our Work"
          description="The non-negotiable standards that guide how we engineer solutions for our clients."
        />

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div key={i} variants={fadeInUp} className="h-full">
                <GlassCard className="h-full p-8 md:p-10 group" hover={true}>
                  <div className="w-14 h-14 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-text-primary group-hover:text-primary-light transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
