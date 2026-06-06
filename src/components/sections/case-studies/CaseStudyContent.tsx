"use client";

import Link from "next/link";

import { CheckCircle2, ChevronRight, Code2, AlertTriangle, Lightbulb } from "lucide-react";
import { CaseStudy, caseStudies } from "@/lib/case-studies-data";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function CaseStudyContent({ study }: { study: CaseStudy }) {
  // Get 2 related case studies deterministically to prevent hydration errors
  const relatedStudies = caseStudies
    .filter((cs) => cs.slug !== study.slug)
    .sort((a, b) => {
      // Prioritize same industry
      if (a.industry === study.industry && b.industry !== study.industry) return -1;
      if (a.industry !== study.industry && b.industry === study.industry) return 1;
      return 0;
    })
    .slice(0, 2);

  return (
    <div className="section-container relative z-10 py-12 lg:py-20">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Main Content (Left) */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* PROBLEM SECTION */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white">The Challenge</h2>
            </div>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {study.problem}
            </p>
            
            {/* Visual Pain Points */}
            <div className="grid sm:grid-cols-3 gap-4">
              <GlassCard className="p-4 border-red-500/20 bg-red-500/5" hover={false}>
                <div className="w-2 h-2 rounded-full bg-red-500 mb-3" />
                <p className="text-sm text-text-secondary font-medium">Manual processes causing high error rates</p>
              </GlassCard>
              <GlassCard className="p-4 border-orange-500/20 bg-orange-500/5" hover={false}>
                <div className="w-2 h-2 rounded-full bg-orange-500 mb-3" />
                <p className="text-sm text-text-secondary font-medium">Data silos preventing unified reporting</p>
              </GlassCard>
              <GlassCard className="p-4 border-amber-500/20 bg-amber-500/5" hover={false}>
                <div className="w-2 h-2 rounded-full bg-amber-500 mb-3" />
                <p className="text-sm text-text-secondary font-medium">Wasted employee hours on reconciliation</p>
              </GlassCard>
            </div>
          </section>

          {/* SOLUTION SECTION */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white">What We Built</h2>
            </div>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {study.solution}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Systems Built */}
              <div>
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Core Infrastructure</h4>
                <div className="flex flex-wrap gap-2">
                  {study.systems_built.map((sys, i) => (
                    <div key={i} className="px-3 py-1.5 bg-surface-elevated border border-surface-border rounded-lg text-sm text-text-secondary flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {sys}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Features */}
              <div>
                <h4 className="text-sm font-bold text-primary-light uppercase tracking-wider mb-4">AI Integration</h4>
                <div className="flex flex-wrap gap-2">
                  {study.ai_features.map((feature, i) => (
                    <div key={i} className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary-light flex items-center gap-2 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RESULTS SECTION */}
          <section className="bg-surface-elevated/30 border border-surface-border rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
            <h2 className="text-3xl font-display font-bold text-white mb-8 relative z-10">The Outcome</h2>
            
            <div className="grid sm:grid-cols-3 gap-6 relative z-10">
              {study.results.map((result, i) => {
                const colors = ["text-emerald-400", "text-accent-light", "text-primary-light"];
                return (
                  <div key={i} className="border-l-2 border-surface-border pl-4">
                    <AnimatedCounter 
                      value={result.metric} 
                      label={result.description}
                      colorClass={colors[i % colors.length]}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* TESTIMONIAL */}
          <section>
            <GlassCard className="p-8 border-primary/30 relative" hover={false}>
              <div className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif leading-none">&quot;</div>
              <p className="text-xl md:text-2xl text-white font-medium italic leading-relaxed mb-8 relative z-10">
                {study.testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg border border-white/20">
                  {study.testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{study.testimonial.name}</div>
                  <div className="text-text-muted text-sm">{study.testimonial.role}</div>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* TECHNICAL DETAILS */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center">
                <Code2 className="w-5 h-5 text-text-secondary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">Technologies Used</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-surface border border-surface-border rounded-full text-xs text-text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </section>

        </div>

        {/* Sticky Sidebar (Right) */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
          
          {/* CTA Box */}
          <GlassCard className="p-6 border-accent/20 bg-accent/5 flex flex-col items-center text-center">
            <h3 className="text-xl font-display font-bold text-white mb-2">Ready to get similar results?</h3>
            <p className="text-sm text-text-secondary mb-6">
              Let&apos;s discuss how custom software can solve your specific operational bottlenecks.
            </p>
            <Link href="/contact" className="btn-gradient w-full py-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Book Free Audit
            </Link>
          </GlassCard>

          {/* Related Case Studies */}
          <div>
            <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">More Case Studies</h4>
            <div className="space-y-4">
              {relatedStudies.map((rel) => (
                <Link key={rel.slug} href={`/case-studies/${rel.slug}`} className="block group">
                  <GlassCard className="p-4 border-surface-border group-hover:border-primary/50 transition-colors">
                    <div className="text-xs text-primary-light mb-1">{rel.industry}</div>
                    <div className="font-bold text-white text-sm group-hover:text-primary-light transition-colors line-clamp-1">{rel.title}</div>
                    <div className="flex items-center text-xs text-text-muted mt-2">
                      Read story <ChevronRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
