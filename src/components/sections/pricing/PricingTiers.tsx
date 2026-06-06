"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type BillingMode = "one-time" | "monthly";

const pricingData = {
  "one-time": [
    {
      name: "Starter",
      price: "$500 – $1k",
      description: "Best for: Small businesses wanting one automation.",
      features: [
        "Single module (e.g., inventory OR ordering)",
        "1 AI automation flow",
        "Mobile-responsive web interface",
        "30 days post-launch support",
        "Basic analytics dashboard"
      ],
      timeline: "2-3 weeks",
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Growth",
      price: "$1k – $4k",
      description: "Best for: Businesses ready for a full operating system.",
      features: [
        "Full business management system",
        "WhatsApp AI agent",
        "Staff and inventory management",
        "Custom reporting dashboard",
        "90 days post-launch support",
        "Training session for your team"
      ],
      timeline: "4-8 weeks",
      cta: "Book a Call",
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Best for: Multi-location, complex operations, AI-heavy needs.",
      features: [
        "Multi-branch/location support",
        "Advanced AI integrations",
        "Custom mobile app (iOS + Android)",
        "Dedicated project manager",
        "1-year support contract",
        "SLA guarantees"
      ],
      timeline: "8-16 weeks",
      cta: "Let's Talk",
      highlighted: false,
    }
  ],
  "monthly": [
    {
      name: "Basic",
      price: "$150",
      period: "/mo",
      description: "Essential maintenance to keep your system running perfectly.",
      features: [
        "Cloud Hosting included",
        "Security patching",
        "Bug fixes",
        "Minor system updates",
        "Email support (48hr SLA)"
      ],
      timeline: "Ongoing",
      cta: "Subscribe",
      highlighted: false,
    },
    {
      name: "Standard",
      price: "$500",
      period: "/mo",
      description: "Active development and continuous optimization.",
      features: [
        "Everything in Basic",
        "New feature additions",
        "AI prompt tuning",
        "Priority support (12hr SLA)",
        "Monthly strategy call"
      ],
      timeline: "Ongoing",
      cta: "Subscribe",
      highlighted: true,
      badge: "Recommended",
    },
    {
      name: "Premium",
      price: "$1,200",
      period: "/mo",
      description: "A dedicated remote tech team for your enterprise.",
      features: [
        "Everything in Standard",
        "Custom ML/AI model updates",
        "Dedicated developer hours",
        "24/7 phone support (1hr SLA)",
        "Quarterly business review"
      ],
      timeline: "Ongoing",
      cta: "Let's Talk",
      highlighted: false,
    }
  ]
};

export default function PricingTiers() {
  const [mode, setMode] = useState<BillingMode>("one-time");

  return (
    <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-16 overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-6 inline-block">
            <span className="badge badge-primary px-4 py-2 text-sm">
              Investment
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            Transparent Pricing for <br className="hidden md:block" />
            <span className="gradient-text">Real Business Systems</span>
          </h1>
          
          <p className="text-lg text-text-secondary mb-12">
            No hidden costs. No surprise invoices. Just clear scope and honest numbers.
          </p>

          {/* TOGGLE SWITCH */}
          <div className="inline-flex items-center p-1.5 bg-surface-elevated border border-surface-border rounded-full relative">
            <button
              onClick={() => setMode("one-time")}
              className={cn(
                "relative px-6 py-2.5 text-sm font-bold rounded-full transition-colors z-10 w-40",
                mode === "one-time" ? "text-white" : "text-text-muted hover:text-text-primary"
              )}
            >
              One-Time Project
            </button>
            <button
              onClick={() => setMode("monthly")}
              className={cn(
                "relative px-6 py-2.5 text-sm font-bold rounded-full transition-colors z-10 w-40",
                mode === "monthly" ? "text-white" : "text-text-muted hover:text-text-primary"
              )}
            >
              Monthly Retainer
            </button>
            
            {/* Animated Pill */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-40 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg"
              initial={false}
              animate={{
                left: mode === "one-time" ? "6px" : "calc(100% - 160px - 6px)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {pricingData[mode].map((tier, index) => (
              <motion.div
                key={`${mode}-${tier.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "relative h-full",
                  tier.highlighted ? "lg:-mt-4 lg:mb-[-1rem] z-10" : "mt-0"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                    <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <GlassCard 
                  className={cn(
                    "p-8 h-full flex flex-col transition-all duration-300",
                    tier.highlighted 
                      ? "border-primary/50 bg-surface-elevated shadow-[0_0_40px_rgba(139,92,246,0.15)]" 
                      : "border-surface-border bg-surface hover:border-surface-border/80"
                  )}
                  hover={false}
                >
                  <div className="mb-8">
                    <h3 className="text-xl font-display font-bold text-white mb-2">{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-display font-bold text-white">{tier.price}</span>
                      {(tier as { period?: string }).period && <span className="text-text-muted">{(tier as { period?: string }).period}</span>}
                    </div>
                    <p className="text-sm text-text-secondary h-10">
                      {tier.description}
                    </p>
                  </div>

                  <div className="flex-grow space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-surface-border mb-6">
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
                      <Info className="w-4 h-4" />
                      <span>Estimated Timeline</span>
                    </div>
                    <div className="font-bold text-text-primary">{tier.timeline}</div>
                  </div>

                  <button className={cn(
                    "w-full py-3 rounded-xl font-bold transition-all",
                    tier.highlighted
                      ? "btn-gradient shadow-lg"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  )}>
                    {tier.cta}
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
