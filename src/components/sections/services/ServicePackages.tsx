"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const packages = [
  {
    name: "Starter",
    price: "$500 - $1,500",
    description: "Perfect for businesses looking to automate a single bottleneck or add a simple AI module.",
    features: [
      "Single workflow automation",
      "Basic WhatsApp AI Agent",
      "Standard dashboard setup",
      "Email & Chat support",
      "1-2 week delivery"
    ],
    highlight: false,
    cta: "Start Small"
  },
  {
    name: "Growth",
    price: "$2,000 - $6,000",
    description: "Our most popular tier. A comprehensive digital transformation for growing businesses.",
    features: [
      "End-to-end custom management system",
      "Multi-agent AI workflows",
      "Advanced predictive analytics",
      "Native mobile app integration",
      "Dedicated account manager",
      "4-8 week delivery"
    ],
    highlight: true,
    badge: "Most Popular",
    cta: "Transform Your Business"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations requiring multi-location architecture and heavy AI reliance.",
    features: [
      "Multi-location deployment",
      "Custom machine learning models",
      "On-premise deployment options",
      "Bank-grade security compliance",
      "24/7 dedicated phone support",
      "Continuous optimization"
    ],
    highlight: false,
    cta: "Contact Sales"
  }
];

export default function ServicePackages() {
  return (
    <section className="section-padding bg-background-secondary relative">
      <div className="section-container relative z-10">
        <SectionHeading
          badge="Transparent Pricing"
          title="Investment"
          highlight="Packages"
          description="We price based on value delivered, not hours worked. Choose the scale of transformation you need."
        />

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 items-center"
        >
          {packages.map((pkg, i) => (
            <motion.div key={i} variants={fadeInUp} className="h-full">
              <div 
                className={`h-full relative rounded-2xl border flex flex-col p-8 transition-all duration-300 ${
                  pkg.highlight 
                  ? 'bg-[#111827] border-primary shadow-[0_0_30px_rgba(139,92,246,0.15)] md:-mt-8 md:-mb-8 z-10' 
                  : 'bg-surface border-surface-border glass-card'
                }`}
              >
                {/* Glow effect for highlighted package */}
                {pkg.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-2xl pointer-events-none" />
                )}

                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    {pkg.badge}
                  </div>
                )}

                <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
                  {pkg.name}
                </h3>
                <div className="text-3xl font-bold font-display text-primary-light mb-4">
                  {pkg.price}
                </div>
                <p className="text-text-secondary text-sm mb-8 pb-8 border-b border-surface-border/50">
                  {pkg.description}
                </p>

                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text-primary">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    pkg.highlight 
                    ? 'btn-gradient shadow-lg' 
                    : 'bg-surface-elevated text-text-primary border border-surface-border hover:border-primary/50 hover:bg-surface'
                  }`}
                >
                  {pkg.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
