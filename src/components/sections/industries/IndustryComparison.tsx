"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const industries = ["Restaurant", "Healthcare", "NGOs", "E-Commerce", "Education", "Manufacturing"];

const features = [
  { name: "Order & Inventory Management", checks: [true, false, false, true, false, true] },
  { name: "Patient/Client Records (CRM)", checks: [false, true, true, false, true, false] },
  { name: "WhatsApp AI Agents", checks: [true, true, true, true, true, false] },
  { name: "Automated Billing & Fees", checks: [false, true, false, false, true, false] },
  { name: "Predictive Analytics", checks: [true, true, true, true, true, true] },
  { name: "Staff Scheduling", checks: [true, true, true, false, false, true] },
  { name: "Custom Mobile App", checks: [true, false, true, true, true, false] },
  { name: "Document Generation", checks: [false, true, true, false, true, true] },
];

export default function IndustryComparison() {
  return (
    <section className="section-padding bg-background relative border-b border-surface-border">
      <div className="section-container relative z-10">
        <SectionHeading
          badge="Feature Matrix"
          title="Compare the"
          highlight="Systems"
          description="A breakdown of the core infrastructure we deploy across different sectors."
        />

        <div className="mt-16 max-w-6xl mx-auto overflow-x-auto pb-8 no-scrollbar">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-7 mb-4 px-6">
              <div className="col-span-1"></div>
              {industries.map((ind, i) => (
                <div key={i} className="text-center font-display font-bold text-text-primary text-sm">
                  {ind}
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="bg-surface-elevated/50 border border-surface-border rounded-2xl overflow-hidden backdrop-blur-md">
              {features.map((feature, rowIndex) => (
                <motion.div 
                  key={rowIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: rowIndex * 0.05 }}
                  className={`grid grid-cols-7 p-6 items-center transition-colors hover:bg-white/5 ${
                    rowIndex !== features.length - 1 ? "border-b border-surface-border/50" : ""
                  }`}
                >
                  <div className="col-span-1 font-medium text-text-secondary text-sm">
                    {feature.name}
                  </div>
                  
                  {feature.checks.map((hasFeature, colIndex) => (
                    <div key={colIndex} className="flex justify-center">
                      {hasFeature ? (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                          <Check className="w-4 h-4 text-primary-light" />
                        </div>
                      ) : (
                        <div className="w-4 h-0.5 bg-surface-border rounded-full" />
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
