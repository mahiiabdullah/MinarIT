"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlassCard from "@/components/ui/GlassCard";
import { 
  RestaurantDashboard, 
  HospitalDashboard, 
  NGODashboard, 
  EcommerceDashboard, 
  SchoolDashboard, 
  ManufacturingDashboard 
} from "./IndustryMockups";

const industriesData = [
  {
    id: "restaurant",
    name: "Restaurant & Food Service",
    accent: "bg-amber-500/10",
    glow: "glow-orb-amber",
    painPoint: "Your head chef is managing inventory in a notebook. Your manager is on 3 different WhatsApp groups. Orders are getting lost. Sound familiar?",
    systemsBuilt: [
      "Menu & Order Management System",
      "Kitchen Display System",
      "Inventory with waste tracking",
      "Staff scheduling",
      "WhatsApp ordering bot",
      "Daily P&L automation"
    ],
    metrics: [
      { value: "30%", label: "reduction in food waste" },
      { value: "2hrs", label: "saved per day" },
      { value: "0", label: "missed orders" }
    ],
    caseStudy: "A Dhaka restaurant chain reduced inventory loss by 28% in 3 months after deploying Minar's system.",
    Dashboard: RestaurantDashboard,
  },
  {
    id: "healthcare",
    name: "Hospitals & Clinics",
    accent: "bg-emerald-500/10",
    glow: "glow-orb-emerald",
    painPoint: "Appointment books, billing files, patient records spread across three different systems — or worse, on paper.",
    systemsBuilt: [
      "Patient registration & records",
      "Appointment scheduling",
      "Doctor schedule management",
      "Billing & insurance tracking",
      "Lab result management",
      "WhatsApp appointment bot"
    ],
    metrics: [
      { value: "40%", label: "fewer no-shows" },
      { value: "60%", label: "faster billing" },
      { value: "0", label: "double-bookings" }
    ],
    caseStudy: "A specialty clinic increased patient throughput by 15% without adding new staff.",
    Dashboard: HospitalDashboard,
  },
  {
    id: "ngo",
    name: "NGOs & Non-Profits",
    accent: "bg-blue-500/10",
    glow: "glow-orb-blue",
    painPoint: "Donor spreadsheets. Volunteer tracking in email. Project reporting done manually every quarter. Your mission deserves better tools.",
    systemsBuilt: [
      "Donor management CRM",
      "Volunteer coordination platform",
      "Project & grant tracking",
      "Impact reporting automation",
      "Field data collection app"
    ],
    metrics: [
      { value: "50%", label: "faster reporting" },
      { value: "3x", label: "donor retention visibility" },
      { value: "100%", label: "real-time project tracking" }
    ],
    caseStudy: "An international NGO fully automated their quarterly impact reporting, saving 40 hours of manual data entry per month.",
    Dashboard: NGODashboard,
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    accent: "bg-pink-500/10",
    glow: "glow-orb-pink",
    painPoint: "Orders across 3 platforms. Inventory going out of stock without warning. Customer complaints falling through the gaps.",
    systemsBuilt: [
      "Unified order management",
      "Multi-channel inventory sync",
      "Customer support AI agent",
      "Return management workflow",
      "Sales analytics dashboard"
    ],
    metrics: [
      { value: "85%", label: "support tickets handled by AI" },
      { value: "0", label: "accidental stockouts" },
      { value: "+20%", label: "faster fulfillment" }
    ],
    caseStudy: "A fashion retailer integrated their WhatsApp, Shopify, and local warehouse into a single unified dashboard.",
    Dashboard: EcommerceDashboard,
  },
  {
    id: "education",
    name: "Schools & Education",
    accent: "bg-yellow-500/10",
    glow: "glow-orb-yellow",
    painPoint: "Teachers are overwhelmed with grading and attendance, while admins chase parents for fees. A disconnected campus hurts student outcomes.",
    systemsBuilt: [
      "Student information system",
      "Attendance automation",
      "Fee management & reminders",
      "Academic performance tracking",
      "Parent communication portal"
    ],
    metrics: [
      { value: "95%", label: "on-time fee collection" },
      { value: "10hrs", label: "saved per teacher/mo" },
      { value: "100%", label: "parent visibility" }
    ],
    caseStudy: "A private high school completely eliminated paper attendance and manual report card generation.",
    Dashboard: SchoolDashboard,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    accent: "bg-slate-500/10",
    glow: "glow-orb-slate",
    painPoint: "Equipment failures catch you by surprise, and supply chain delays halt production. Operating blindly is costing you hundreds of thousands.",
    systemsBuilt: [
      "Production line monitoring",
      "Supply chain management",
      "Quality control logging",
      "Maintenance scheduling",
      "Workforce management"
    ],
    metrics: [
      { value: "99%", label: "machine uptime" },
      { value: "-60%", label: "defect rate" },
      { value: "100%", label: "inventory visibility" }
    ],
    caseStudy: "A textile manufacturer reduced un-planned machine downtime to near-zero using predictive maintenance alerts.",
    Dashboard: ManufacturingDashboard,
  }
];

export default function IndustryDeepDives() {
  return (
    <div className="relative bg-background flex flex-col">
      {industriesData.map((ind, index) => {
        const isEven = index % 2 === 0;
        const Dashboard = ind.Dashboard;

        return (
          <section
            key={ind.id}
            id={ind.id}
            className={`section-padding border-b border-surface-border relative overflow-hidden ${ind.accent}`}
          >
            {/* Soft Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none bg-current`} />

            <div className="section-container relative z-10">
              <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                
                {/* Text Content */}
                <div className="flex-1 w-full">
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6"
                  >
                    {ind.name}
                  </motion.h2>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl bg-surface-elevated border-l-4 border-primary/50 text-text-secondary text-lg italic mb-8"
                  >
                    &quot;{ind.painPoint}&quot;
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-text-primary font-bold mb-4 font-display text-xl">What We Build:</h4>
                    <ul className="space-y-3 mb-12">
                      {ind.systemsBuilt.map((sys, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{sys}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Results Metrics */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-3 gap-6 border-t border-surface-border pt-8 mb-8"
                  >
                    {ind.metrics.map((metric, i) => (
                      <AnimatedCounter 
                        key={i} 
                        value={metric.value} 
                        label={metric.label} 
                      />
                    ))}
                  </motion.div>

                  {/* Mini Case Study */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4 }}
                  >
                    <GlassCard className="p-6 bg-primary/5 border-primary/20 mb-8" hover={false}>
                      <div className="text-sm font-bold text-primary-light uppercase tracking-wider mb-2">Real Results</div>
                      <p className="text-text-primary">&quot;{ind.caseStudy}&quot;</p>
                    </GlassCard>

                    <button className="btn-gradient">Let&apos;s Build Yours</button>
                  </motion.div>
                </div>

                {/* Dashboard Mockup */}
                <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-3xl transform -rotate-3" />
                    <div className="relative z-10 bg-[#0F1525] border border-white/10 shadow-2xl p-6 lg:p-8 rounded-2xl overflow-hidden min-h-[380px]">
                      {/* Dashboard Header decoration */}
                      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        <div className="ml-4 h-4 w-32 bg-white/5 rounded-full" />
                      </div>
                      <Dashboard />
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
