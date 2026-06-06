"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const industries = [
  { name: "Restaurant & Food Service", baseLossPerEmployee: 300 },
  { name: "Hospitals & Clinics", baseLossPerEmployee: 500 },
  { name: "NGOs & Non-Profits", baseLossPerEmployee: 200 },
  { name: "E-Commerce & Retail", baseLossPerEmployee: 400 },
  { name: "Schools & Education", baseLossPerEmployee: 250 },
  { name: "Manufacturing", baseLossPerEmployee: 800 },
  { name: "Other", baseLossPerEmployee: 350 }
];

export default function MiniCalculator() {
  const [employees, setEmployees] = useState(10);
  const [industryIndex, setIndustryIndex] = useState(0);

  const selectedIndustry = industries[industryIndex];
  
  // Calculate estimated monthly loss
  // Assume generic inefficiency cost per employee per month based on industry
  const monthlyLoss = employees * selectedIndustry.baseLossPerEmployee;
  
  // Assuming Growth package is average $2,500
  const growthPackageCost = 2500;
  
  // Calculate payback period in months
  const paybackMonths = Math.max(1, Math.round((growthPackageCost / monthlyLoss) * 10) / 10);

  return (
    <section className="section-padding bg-background relative">
      <div className="section-container max-w-4xl">
        <GlassCard className="p-8 md:p-12 border-primary/20 bg-surface-elevated/40 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />

          {/* Left: Inputs */}
          <div className="flex-1 w-full space-y-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-primary-light" />
                <h3 className="text-2xl font-display font-bold text-white">Quick ROI Calculator</h3>
              </div>
              <p className="text-sm text-text-secondary">See how much manual operations are costing you right now.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Your Industry</label>
              <select 
                value={industryIndex}
                onChange={(e) => setIndustryIndex(Number(e.target.value))}
                className="form-input appearance-none"
              >
                {industries.map((ind, i) => (
                  <option key={i} value={i} className="bg-[#0A0F1E] text-white">{ind.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-text-secondary">Number of Employees</label>
                <span className="text-xl font-bold text-primary-light">{employees}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={employees} 
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full h-2 bg-surface-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-muted">
                <span>1</span>
                <span>100+</span>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="flex-1 w-full bg-[#0A0F1E]/80 border border-surface-border p-6 rounded-2xl relative z-10 shadow-2xl">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-text-muted mb-1">Est. monthly loss from manual operations:</p>
                <div className="text-4xl font-display font-bold text-red-400">
                  ${monthlyLoss.toLocaleString()}
                </div>
              </div>
              
              <div className="w-full h-px bg-surface-border" />

              <div>
                <p className="text-sm text-text-muted mb-1">Minar Growth Package pays for itself in:</p>
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-display font-bold text-emerald-400">
                    {paybackMonths}
                  </div>
                  <span className="text-emerald-400 font-medium">months</span>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-xs text-text-secondary leading-relaxed">
                  Based on industry averages of employee time spent on data entry, manual reconciliation, and communication delays.
                </p>
              </div>
            </div>
          </div>

        </GlassCard>
      </div>
    </section>
  );
}
