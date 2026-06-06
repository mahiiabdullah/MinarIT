"use client";

import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

export default function PricingCTA() {
  return (
    <section className="section-padding bg-background relative pt-0">
      <div className="section-container max-w-4xl text-center">
        <GlassCard className="p-8 md:p-12 border-primary/30 relative overflow-hidden group">
          
          {/* Animated gradient border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Internal Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Not sure which package is right for you?
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
              Tell us about your business and we&apos;ll recommend the exact scope. We only sell what you actually need to solve your bottleneck.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-gradient w-full sm:w-auto shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Get a Custom Quote
              </Link>
              <Link href="/case-studies" className="btn-ghost w-full sm:w-auto">
                See Case Studies
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
