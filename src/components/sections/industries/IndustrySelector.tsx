"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const industryOptions = [
  "Restaurant & Hospitality",
  "Healthcare & Clinics",
  "NGO & Non-Profit",
  "E-Commerce & Retail",
  "Education & Schools",
  "Manufacturing & Logistics",
  "Real Estate & Property",
  "Professional Services (Law, Consulting)",
  "Other"
];

export default function IndustrySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async (industry: string) => {
    setSelected(industry);
    setIsOpen(false);
    setIsLoading(true);
    setInsight("");

    try {
      const res = await fetch("/api/industry-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry })
      });
      
      const data = await res.json();
      if (data.insight) {
        setInsight(data.insight);
      }
    } catch (error) {
      console.error("Failed to fetch insight", error);
      setInsight("Every industry has unique bottlenecks. Let's discuss yours and build a custom system to automate them.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-padding bg-background-secondary relative overflow-visible">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10 max-w-3xl">
        <div className="text-center mb-12">
          <SectionHeading
            badge="Personalized Insight"
            title="Which Industry"
            highlight="Are You?"
            description="Select your sector to see how our AI and custom software systems can specifically transform your operations."
          />
        </div>

        <GlassCard className="p-6 md:p-10 border-primary/20 flex flex-col items-center">
          
          {/* Dropdown Selector */}
          <div className="relative w-full max-w-md mb-8">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-surface border border-surface-border hover:border-primary/50 text-left px-6 py-4 rounded-xl flex items-center justify-between transition-colors shadow-lg"
            >
              <span className={selected ? "text-text-primary font-medium" : "text-text-muted"}>
                {selected || "Select your industry..."}
              </span>
              <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-surface-elevated border border-surface-border rounded-xl shadow-2xl z-50 overflow-hidden max-h-[250px] overflow-y-auto no-scrollbar"
                >
                  {industryOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt)}
                      className="w-full text-left px-6 py-3 hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors text-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result Area */}
          <div className="w-full min-h-[150px] flex flex-col items-center justify-center text-center">
            {isLoading ? (
              <div className="flex flex-col items-center gap-4 text-primary-light animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium">Generating AI insight...</span>
              </div>
            ) : insight ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary-light">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-xl md:text-2xl text-white font-display font-medium leading-relaxed text-balance mb-8">
                  &quot;{insight}&quot;
                </p>
                <button className="btn-gradient px-8 py-4 text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow">
                  Book Industry-Specific Audit
                </button>
              </motion.div>
            ) : (
              <div className="text-text-muted text-sm italic">
                Awaiting selection...
              </div>
            )}
          </div>

        </GlassCard>
      </div>
    </section>
  );
}
