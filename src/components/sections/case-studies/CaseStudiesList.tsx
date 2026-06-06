"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const ALL_INDUSTRIES = "All Industries";
const industries = [
  ALL_INDUSTRIES,
  ...Array.from(new Set(caseStudies.map((cs) => cs.industry))),
];

export default function CaseStudiesList() {
  const [activeFilter, setActiveFilter] = useState(ALL_INDUSTRIES);

  const filteredStudies = caseStudies.filter(
    (cs) => activeFilter === ALL_INDUSTRIES || cs.industry === activeFilter
  );

  // Sort featured first
  const sortedStudies = [...filteredStudies].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section className="section-padding bg-background relative pt-0">
      <div className="section-container">
        
        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveFilter(industry)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeFilter === industry
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  : "bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-primary/50"
              )}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Case Study Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {sortedStudies.map((study) => (
              <motion.div
                key={study.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "h-full",
                  study.featured && activeFilter === ALL_INDUSTRIES ? "md:col-span-2 lg:col-span-2" : ""
                )}
              >
                <Link href={`/case-studies/${study.slug}`} className="block h-full group">
                  <GlassCard className="h-full p-6 lg:p-8 flex flex-col border-surface-border group-hover:border-primary/50 transition-all duration-300 relative overflow-hidden" hover={false}>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-colors duration-500 pointer-events-none" />

                    {/* Top Section */}
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className="badge badge-primary">{study.industry}</div>
                      {study.featured && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold uppercase tracking-wider bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/20">
                          <Star className="w-3 h-3 fill-amber-400" />
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Middle Section */}
                    <div className="mb-6 relative z-10 flex-grow">
                      <p className="text-primary-light font-medium text-sm mb-2">{study.client_type}</p>
                      <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary-light transition-colors leading-tight">
                        {study.title}
                      </h3>
                      <p className="text-text-secondary text-sm line-clamp-2">
                        {study.headline}
                      </p>
                    </div>

                    {/* Metrics Preview */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-surface-border relative z-10 mb-6">
                      {study.results.map((result, idx) => (
                        <div key={idx}>
                          <div className="text-xl font-display font-bold text-white">{result.metric}</div>
                          <div className="text-[10px] text-text-muted uppercase tracking-wider mt-1 line-clamp-2">{result.description}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-auto relative z-10 flex items-center text-primary-light font-medium group-hover:text-white transition-colors">
                      <span className="text-sm">Read Case Study</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>

                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredStudies.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            No case studies found for this industry yet.
          </div>
        )}

      </div>
    </section>
  );
}
