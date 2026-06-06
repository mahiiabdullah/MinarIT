"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCountUp } from "@/hooks";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";

// ── Types ─────────────────────────────────────────────────────────

type Tool = "WhatsApp" | "Excel" | "Paper" | "Email" | "Basic Software" | "Nothing";

interface CalculatorFormData {
  industry: string;
  employees: number;
  monthly_customers: string;
  current_tools: Tool[];
  bottleneck: string;
  hourly_cost: string;
  currency: string;
}

interface Bottleneck {
  title: string;
  impact: string;
  automation_solution: string;
}

interface EfficiencyReport {
  business_summary: string;
  hours_lost_monthly: number;
  money_lost_monthly: number;
  efficiency_score: number;
  top_3_bottlenecks: Bottleneck[];
  automation_potential: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  recommended_first_step: string;
  estimated_roi_6_months: string;
  urgency_message: string;
}

// ── Constants ─────────────────────────────────────────────────────

const INDUSTRIES = [
  { id: "Restaurant", icon: "🍽️" },
  { id: "Hospital/Clinic", icon: "🏥" },
  { id: "NGO", icon: "🤝" },
  { id: "E-Commerce", icon: "🛒" },
  { id: "School", icon: "🏫" },
  { id: "Manufacturing", icon: "🏭" },
  { id: "Other", icon: "🏢" },
];

const TOOLS: Tool[] = ["WhatsApp", "Excel", "Paper", "Email", "Basic Software", "Nothing"];

const LOADING_MESSAGES = [
  "Analyzing your operations...",
  "Calculating efficiency gaps...",
  "Identifying automation opportunities...",
  "Building your report...",
];

// ── Icons ─────────────────────────────────────────────────────────

const Icons = {
  check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  chevronDown: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  chevronUp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  ),
  alertTriangle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
};

// ── Components ────────────────────────────────────────────────────

// Loading Animation
function BrainLoadingAnimation() {
  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
      {/* Pulsing background glow */}
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
      
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="relative z-10 text-primary-400">
        {/* Nodes */}
        <motion.circle cx="30" cy="30" r="5" fill="currentColor"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
        <motion.circle cx="70" cy="30" r="4" fill="currentColor"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
        <motion.circle cx="20" cy="60" r="6" fill="currentColor"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.8 }} />
        <motion.circle cx="80" cy="60" r="5" fill="currentColor"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} />
        <motion.circle cx="50" cy="80" r="7" fill="currentColor"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.6 }} />
        <motion.circle cx="50" cy="50" r="8" fill="currentColor"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2.0 }} />

        {/* Connections */}
        <motion.path
          d="M 30 30 L 50 50 L 70 30 M 50 50 L 20 60 M 50 50 L 80 60 M 50 50 L 50 80"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

// Circular Progress Ring
function CircularProgress({ value, colorClass }: { value: number, colorClass: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Delay animation slightly for better effect
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Background circle */}
      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
        <circle
          cx="64" cy="64" r={radius}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="64" cy="64" r={radius}
          fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
          className={cn("transition-all duration-1000 ease-out", colorClass)}
          style={{ strokeDasharray: circumference, strokeDashoffset }}
        />
      </svg>
      {/* Centered text */}
      <div className="text-3xl font-display font-bold text-white">
        <AnimatedNumber value={value} />%
      </div>
    </div>
  );
}

// Animated number using useCountUp
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const { formatted } = useCountUp({ end: value, duration: 1500, prefix, suffix });
  return <>{formatted}</>;
}

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState<EfficiencyReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0);

  const [formData, setFormData] = useState<CalculatorFormData>({
    industry: "",
    employees: 10,
    monthly_customers: "",
    current_tools: [],
    bottleneck: "",
    hourly_cost: "25",
    currency: "$",
  });

  // Cycle loading messages
  useEffect(() => {
    if (!isSubmitting) return;
    const interval = setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const updateForm = (key: keyof CalculatorFormData, value: CalculatorFormData[keyof CalculatorFormData]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTool = (tool: Tool) => {
    setFormData((prev) => {
      const isSelected = prev.current_tools.includes(tool);
      return {
        ...prev,
        current_tools: isSelected
          ? prev.current_tools.filter((t) => t !== tool)
          : [...prev.current_tools, tool],
      };
    });
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!formData.industry || !formData.monthly_customers || formData.current_tools.length === 0 || !formData.bottleneck || !formData.hourly_cost) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate report");
      }

      setReport(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate report';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCalculator = () => {
    setReport(null);
    setStep(1);
    setError(null);
  };

  const generateShareUrl = () => {
    // Placeholder for actual share functionality
    navigator.clipboard.writeText(window.location.href);
    alert("Report link copied to clipboard!");
  };

  // Determine colors based on efficiency score and potential
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getPotentialBadge = (potential: string) => {
    const config: Record<string, { bg: string, text: string, border: string, icon: string }> = {
      "CRITICAL": { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", icon: "🚨" },
      "HIGH": { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", icon: "🔥" },
      "MEDIUM": { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20", icon: "⚡" },
      "LOW": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", icon: "🌱" },
    };
    
    const style = config[potential] || config["MEDIUM"];
    
    return (
      <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border", style.bg, style.text, style.border)}>
        <span className="text-sm">{style.icon}</span>
        <span>{potential} AUTOMATION POTENTIAL</span>
      </div>
    );
  };

  return (
    <section id="calculator" className="relative bg-background-secondary border-t border-b border-surface-border py-20 lg:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Interactive Audit"
          title="AI CEO"
          highlight="Calculator"
          description="Find out exactly how much time and money your current operations are costing you, and uncover your automation potential."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ── Left Column: Form ── */}
          <div className="lg:col-span-5 flex flex-col">
            <GlassCard className="flex-1 flex flex-col p-6 sm:p-8" hover={false}>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-text-muted mb-2 font-medium">
                  <span>Step {step} of 3</span>
                  <span>{Math.round((step / 3) * 100)}% Complete</span>
                </div>
                <div className="h-2 w-full bg-surface-hover rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: "33%" }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1">
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                    <span className="mt-0.5">{Icons.alertTriangle}</span>
                    <p>{error}</p>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-display font-bold text-white mb-2">Business Profile</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Industry</label>
                        <div className="grid grid-cols-2 gap-2">
                          {INDUSTRIES.map((ind) => (
                            <button
                              key={ind.id}
                              onClick={() => updateForm("industry", ind.id)}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all text-left",
                                formData.industry === ind.id
                                  ? "bg-primary/20 border-primary text-white"
                                  : "bg-surface text-text-secondary border-surface-border hover:border-text-muted"
                              )}
                            >
                              <span>{ind.icon}</span>
                              <span className="truncate">{ind.id}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="block text-sm font-medium text-text-secondary">Number of Employees</label>
                          <span className="text-primary-400 font-bold">{formData.employees}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="500"
                          value={formData.employees}
                          onChange={(e) => updateForm("employees", parseInt(e.target.value))}
                          className="w-full h-2 my-4 bg-surface-hover rounded-lg appearance-none cursor-pointer accent-primary"
                          style={{ WebkitAppearance: 'none' }}
                        />
                        <style dangerouslySetInnerHTML={{__html: `
                          input[type=range]::-webkit-slider-thumb {
                            height: 32px;
                            width: 32px;
                            border-radius: 50%;
                            background: #8B5CF6;
                            cursor: pointer;
                            -webkit-appearance: none;
                            margin-top: -15px;
                          }
                          input[type=range]::-webkit-slider-runnable-track {
                            height: 4px;
                          }
                        `}} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Monthly Customers / Orders</label>
                        <input
                          type="number"
                          placeholder="e.g. 1500"
                          value={formData.monthly_customers}
                          onChange={(e) => updateForm("monthly_customers", e.target.value)}
                          className="w-full bg-surface-hover border border-surface-border rounded-xl px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-display font-bold text-white mb-2">Current Operations</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-3">What tools run your business today?</label>
                        <div className="flex flex-wrap gap-2">
                          {TOOLS.map((tool) => (
                            <button
                              key={tool}
                              onClick={() => toggleTool(tool)}
                              className={cn(
                                "px-4 py-2 rounded-full border text-sm transition-all flex items-center gap-2",
                                formData.current_tools.includes(tool)
                                  ? "bg-accent/20 border-accent text-white"
                                  : "bg-surface border-surface-border text-text-secondary hover:border-text-muted"
                              )}
                            >
                              {formData.current_tools.includes(tool) && <span className="text-accent">{Icons.check}</span>}
                              {tool}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">What is your biggest operational bottleneck?</label>
                        <textarea
                          placeholder="e.g., 'Copy-pasting data between Excel and our CRM takes 4 hours a day...'"
                          rows={4}
                          value={formData.bottleneck}
                          onChange={(e) => updateForm("bottleneck", e.target.value)}
                          className="w-full bg-surface-hover border border-surface-border rounded-xl px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-display font-bold text-white mb-2">Financials</h3>
                      <p className="text-sm text-text-muted mb-4">We use this to calculate your exact financial loss due to inefficiency.</p>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">Average Employee Hourly Cost</label>
                        <div className="flex gap-2">
                          <select 
                            value={formData.currency}
                            onChange={(e) => updateForm("currency", e.target.value)}
                            className="bg-surface-hover border border-surface-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                          >
                            <option value="$">USD ($)</option>
                            <option value="€">EUR (€)</option>
                            <option value="£">GBP (£)</option>
                            <option value="A$">AUD (A$)</option>
                          </select>
                          <input
                            type="number"
                            placeholder="25"
                            value={formData.hourly_cost}
                            onChange={(e) => updateForm("hourly_cost", e.target.value)}
                            className="flex-1 bg-surface-hover border border-surface-border rounded-xl px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex gap-3 pt-6 border-t border-surface-border">
                {step > 1 && (
                  <Button variant="ghost" className="flex-1" onClick={handleBack} disabled={isSubmitting}>
                    Back
                  </Button>
                )}
                
                {step < 3 ? (
                  <Button variant="gradient" className="flex-1" onClick={handleNext}>
                    Next Step
                  </Button>
                ) : (
                  <Button variant="gradient" className="flex-1" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Generating..." : "Generate Report"}
                  </Button>
                )}
              </div>
            </GlassCard>
          </div>

          {/* ── Right Column: Results / Loading / Empty ── */}
          <div className={cn(
            "lg:col-span-7 flex flex-col h-full",
            report 
              ? "fixed inset-x-0 bottom-0 z-50 h-[85vh] lg:relative lg:inset-auto lg:h-full lg:min-h-[500px]" 
              : "min-h-[400px] lg:min-h-[500px]"
          )}>
            <GlassCard 
              className={cn(
                "flex-1 flex flex-col h-full bg-background/95 backdrop-blur-3xl lg:bg-background/50 border-surface-border p-6 sm:p-8",
                report ? "overflow-y-auto lg:overflow-visible rounded-t-3xl lg:rounded-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] lg:shadow-none" : ""
              )} 
              hover={false}
            >
              {report && (
                <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 lg:hidden" />
              )}
              
              {/* Empty State */}
              {!isSubmitting && !report && (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                  <div className="w-20 h-20 mb-6 rounded-full bg-surface-hover flex items-center justify-center text-3xl">
                    📊
                  </div>
                  <h3 className="text-xl font-display font-medium text-white mb-2">Awaiting Inputs</h3>
                  <p className="text-sm text-text-muted max-w-sm">
                    Complete the form on the left to generate your custom AI efficiency report.
                  </p>
                </div>
              )}

              {/* Loading State */}
              {isSubmitting && (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <BrainLoadingAnimation />
                  <div className="mt-12 h-8 relative w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingMsgIdx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-primary-300 font-medium absolute w-full"
                      >
                        {LOADING_MESSAGES[loadingMsgIdx]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <p className="text-xs text-text-muted mt-4">Powered by Claude AI</p>
                </div>
              )}

              {/* Result State */}
              {!isSubmitting && report && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-surface-border">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-white">Efficiency Audit Report</h2>
                      <p className="text-sm text-text-muted mt-1">Generated specifically for your business</p>
                    </div>
                    {getPotentialBadge(report.automation_potential)}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {/* Card 1: Big Numbers */}
                    <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5 flex flex-col justify-center">
                      <div className="mb-4">
                        <div className="text-xs text-red-300/70 font-medium uppercase tracking-wider mb-1">Time Lost / Month</div>
                        <div className="text-3xl font-display font-bold text-red-400">
                          <AnimatedNumber value={report.hours_lost_monthly} /> <span className="text-lg text-red-400/70">hrs</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-red-300/70 font-medium uppercase tracking-wider mb-1">Money Lost / Month</div>
                        <div className="text-3xl font-display font-bold text-red-400">
                          {formData.currency}<AnimatedNumber value={report.money_lost_monthly} />
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Efficiency Score */}
                    <div className="bg-surface-hover rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                      <CircularProgress value={report.efficiency_score} colorClass={getScoreColor(report.efficiency_score)} />
                      <div className="mt-3 text-xs text-text-muted uppercase tracking-wider font-medium">Current Efficiency Score</div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 italic border-l-2 border-primary pl-4">
                    "{report.business_summary}"
                  </p>

                  {/* Card 3: Top Bottlenecks Accordion */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">Top 3 Bottlenecks to Automate</h4>
                    <div className="space-y-2">
                      {report.top_3_bottlenecks.map((bottleneck, idx) => (
                        <div key={idx} className="bg-background rounded-xl border border-surface-border overflow-hidden">
                          <button
                            onClick={() => setExpandedAccordion(expandedAccordion === idx ? null : idx)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-surface-hover transition-colors"
                          >
                            <span className="text-sm font-medium text-white">{idx + 1}. {bottleneck.title}</span>
                            <span className={cn("text-text-muted transition-transform", expandedAccordion === idx && "rotate-180")}>
                              {Icons.chevronDown}
                            </span>
                          </button>
                          
                          <AnimatePresence>
                            {expandedAccordion === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-1 text-sm border-t border-surface-border mt-1">
                                  <div className="mb-2">
                                    <span className="text-red-400 font-medium">Impact: </span>
                                    <span className="text-text-secondary">{bottleneck.impact}</span>
                                  </div>
                                  <div>
                                    <span className="text-emerald-400 font-medium">AI Solution: </span>
                                    <span className="text-text-secondary">{bottleneck.automation_solution}</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 5: Footer CTA */}
                  <div className="mt-auto pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-primary-300 font-medium text-sm mb-1">{report.urgency_message}</p>
                      <p className="text-xs text-text-muted">ROI in 6 months: <strong className="text-white">{report.estimated_roi_6_months}</strong></p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button onClick={generateShareUrl} className="p-3 bg-surface-hover rounded-xl text-text-muted hover:text-white transition-colors" title="Share Report">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                      </button>
                      <Button variant="gradient" className="flex-1 sm:flex-none py-3 text-sm px-5" href="/contact">
                        Book Free Audit
                      </Button>
                    </div>
                  </div>
                  
                  {/* Reset button */}
                  <div className="mt-4 text-center">
                     <button onClick={resetCalculator} className="text-xs text-text-muted hover:text-white underline">
                       Recalculate with different inputs
                     </button>
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
