"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const comparisonRows = [
  {
    feature: "Understanding of business operations",
    generic: "Focuses only on the code and UI design",
    minar: "Maps out your entire operational workflow first",
  },
  {
    feature: "AI integration capability",
    generic: "Uses basic API wrappers and chatbots",
    minar: "Builds autonomous, multi-agent workflows",
  },
  {
    feature: "Post-launch support",
    generic: "Hands over the code and leaves",
    minar: "Provides continuous monitoring & optimization",
  },
  {
    feature: "Industry specialization",
    generic: "Builds generic apps for everyone",
    minar: "Pre-built architectures for specific industries",
  },
  {
    feature: "ROI focus",
    generic: "Measures success by lines of code shipped",
    minar: "Measures success by hours and dollars saved",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-background relative">
      <div className="section-container">
        <SectionHeading
          badge="The Minar Difference"
          title="Why Choose"
          highlight="Us"
          description="We don't operate like a standard dev shop. We operate like an extension of your executive team."
        />

        <div className="max-w-5xl mx-auto mt-16 relative">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 mb-8 text-center md:text-left">
            <div className="col-span-12 md:col-span-4" /> {/* Empty corner */}
            <div className="col-span-6 md:col-span-4 px-4">
              <h3 className="text-xl font-bold text-text-muted">Generic Agency</h3>
            </div>
            <div className="col-span-6 md:col-span-4 px-4">
              <h3 className="text-2xl font-bold font-display text-primary-light glow-text flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Minar
              </h3>
            </div>
          </div>

          {/* Table Rows */}
          <div className="space-y-4">
            {comparisonRows.map((row, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 items-stretch">
                
                {/* Feature Label (Mobile: hidden, Desktop: shown) */}
                <div className="hidden md:flex col-span-4 items-center px-4">
                  <span className="text-text-primary font-medium">{row.feature}</span>
                </div>

                {/* Generic Agency Column (Slides from Left) */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="col-span-6 md:col-span-4 p-5 md:p-6 rounded-2xl bg-surface/30 border border-surface-border flex flex-col justify-center opacity-70"
                >
                  <div className="md:hidden text-xs text-text-muted mb-2 font-semibold">{row.feature}</div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500/50 shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-text-muted">{row.generic}</span>
                  </div>
                </motion.div>

                {/* Minar Column (Slides from Right) */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="col-span-6 md:col-span-4 p-5 md:p-6 rounded-2xl bg-[#1A1A2E]/80 border border-primary/40 flex flex-col justify-center shadow-[0_0_20px_rgba(139,92,246,0.1)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="md:hidden text-xs text-primary-light mb-2 font-semibold">{row.feature}</div>
                  <div className="flex items-start gap-3 relative z-10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    <span className="text-sm md:text-base text-text-primary font-medium">{row.minar}</span>
                  </div>
                </motion.div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
