"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  { name: "Custom domain & hosting setup", starter: true, growth: true, enterprise: true },
  { name: "Source code ownership", starter: false, growth: true, enterprise: true },
  { name: "Mobile responsive design", starter: true, growth: true, enterprise: true },
  { name: "AI Chatbot / Support Agent", starter: false, growth: true, enterprise: "Advanced ML" },
  { name: "WhatsApp integration", starter: false, growth: true, enterprise: true },
  { name: "Multi-user with roles", starter: "Up to 3", growth: "Unlimited", enterprise: "Unlimited + SSO" },
  { name: "Analytics dashboard", starter: "Basic", growth: "Custom", enterprise: "Predictive" },
  { name: "API integrations (3rd party)", starter: false, growth: "Up to 2", enterprise: "Unlimited" },
  { name: "Custom Mobile app (iOS/Android)", starter: false, growth: false, enterprise: true },
  { name: "Multi-location support", starter: false, growth: false, enterprise: true },
  { name: "Training included", starter: "Docs only", growth: "1 Session", enterprise: "Full Onboarding" },
  { name: "Post-launch support duration", starter: "30 days", growth: "90 days", enterprise: "1 Year" },
  { name: "Monthly retainer available", starter: true, growth: true, enterprise: true },
  { name: "NDA available", starter: true, growth: true, enterprise: true },
  { name: "SLA guarantee", starter: false, growth: false, enterprise: "99.9% Uptime" }
];

export default function FeatureComparison() {
  return (
    <section className="section-padding bg-background-secondary relative border-y border-surface-border">
      <div className="section-container relative z-10 max-w-5xl">
        <SectionHeading
          badge="Compare Plans"
          title="What's Included in"
          highlight="Every System"
          description="A transparent breakdown of the exact infrastructure and services provided across our different tiers."
        />

        <div className="mt-16 overflow-x-auto pb-8 no-scrollbar">
          <div className="min-w-[800px]">
            
            {/* Header Row */}
            <div className="grid grid-cols-4 mb-4 px-6 border-b border-surface-border pb-4">
              <div className="col-span-1 font-bold text-text-primary text-sm uppercase tracking-wider">Features</div>
              <div className="text-center font-display font-bold text-text-primary text-lg">Starter</div>
              <div className="text-center font-display font-bold text-primary-light text-lg">Growth</div>
              <div className="text-center font-display font-bold text-text-primary text-lg">Enterprise</div>
            </div>

            {/* Table Body */}
            <div className="bg-surface border border-surface-border rounded-2xl overflow-hidden backdrop-blur-md">
              {features.map((feature, rowIndex) => (
                <motion.div 
                  key={rowIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: rowIndex * 0.03 }}
                  className={`grid grid-cols-4 p-5 items-center transition-colors hover:bg-white/5 ${
                    rowIndex !== features.length - 1 ? "border-b border-surface-border/50" : ""
                  }`}
                >
                  <div className="col-span-1 font-medium text-text-secondary text-sm">
                    {feature.name}
                  </div>
                  
                  {[feature.starter, feature.growth, feature.enterprise].map((value, colIndex) => (
                    <div key={colIndex} className="flex justify-center">
                      {typeof value === "boolean" ? (
                        value ? (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colIndex === 1 ? "bg-primary/20 text-primary-light border border-primary/30" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="w-4 h-0.5 bg-surface-border rounded-full" />
                        )
                      ) : (
                        <span className={`text-sm font-medium ${colIndex === 1 ? "text-primary-light" : "text-text-primary"}`}>
                          {value}
                        </span>
                      )}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
