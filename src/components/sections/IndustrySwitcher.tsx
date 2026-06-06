"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

// ============================================
// SVG Icons
// ============================================

const Icons = {
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  restaurant: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>
  ),
  hospital: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
  ),
  ngo: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  ecommerce: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  ),
  school: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  ),
  manufacturing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <path d="M12 14v-4"></path>
      <path d="M8 14v-6"></path>
      <path d="M16 14v-8"></path>
      <path d="M4 14V4h16v10"></path>
    </svg>
  ),
};

// ============================================
// Dashboard Mockup Components
// ============================================

const RestaurantDashboard = () => (
  <div className="space-y-4">
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-3 font-semibold">Live Orders</h4>
      <div className="space-y-2">
        {[
          { id: "#1042", items: "3x Burger, 2x Fries", status: "Cooking", color: "text-yellow-400", bg: "bg-yellow-400/10" },
          { id: "#1043", items: "1x Salad, 1x Soup", status: "Ready", color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { id: "#1044", items: "2x Steak, Wine", status: "Pending", color: "text-text-muted", bg: "bg-white/5" },
        ].map(order => (
          <div key={order.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-background/50 border border-white/5">
            <div className="flex gap-3">
              <span className="font-mono text-primary-400">{order.id}</span>
              <span className="text-text-secondary truncate w-24">{order.items}</span>
            </div>
            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", order.color, order.bg)}>{order.status}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-3 font-semibold">Inventory Alerts</h4>
        <div className="space-y-3">
          {[
            { item: "Tomatoes", level: 15, color: "bg-red-400" },
            { item: "Beef Patties", level: 45, color: "bg-yellow-400" },
            { item: "Buns", level: 80, color: "bg-emerald-400" },
          ].map(inv => (
            <div key={inv.item}>
              <div className="flex justify-between text-[10px] text-text-secondary mb-1">
                <span>{inv.item}</span><span>{inv.level}%</span>
              </div>
              <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                <motion.div className={cn("h-full", inv.color)} initial={{ width: 0 }} animate={{ width: `${inv.level}%` }} transition={{ duration: 1, delay: 0.2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-2 font-semibold">Revenue (Today)</h4>
        <div className="text-xl font-display font-bold text-white mb-2">$4,289</div>
        <div className="mt-auto h-12 relative w-full">
          <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <motion.path d="M0 35 Q 20 20, 40 25 T 80 15 T 100 5" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.4 }} />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const HospitalDashboard = () => (
  <div className="grid grid-cols-12 gap-4">
    <div className="col-span-7 space-y-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-3 font-semibold">Patient Queue</h4>
        <div className="space-y-2">
          {[
            { time: "09:00", name: "Sarah J.", doctor: "Dr. Smith", status: "In Consultation" },
            { time: "09:30", name: "Michael T.", doctor: "Dr. Adams", status: "Waiting" },
            { time: "09:45", name: "Emma W.", doctor: "Dr. Smith", status: "Triage" },
          ].map((pt, i) => (
            <div key={i} className="flex items-center gap-3 text-xs p-2 rounded-lg bg-background/50 border border-white/5">
              <span className="font-mono text-text-muted">{pt.time}</span>
              <div className="flex-1">
                <div className="text-text-primary font-medium">{pt.name}</div>
                <div className="text-[10px] text-text-secondary">{pt.doctor}</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="col-span-5 space-y-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-3 font-semibold">Bed Availability</h4>
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 16 }).map((_, i) => {
            const isOcc = i < 11;
            const isMaint = i === 12;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "aspect-square rounded-sm border border-white/10",
                  isOcc ? "bg-red-400/20 border-red-400/30" : isMaint ? "bg-yellow-400/20 border-yellow-400/30" : "bg-emerald-400/20 border-emerald-400/30"
                )}
              />
            )
          })}
        </div>
        <div className="flex justify-between mt-3 text-[9px] text-text-muted">
          <span>11 Occ</span><span>1 Maint</span><span>4 Free</span>
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
        <h4 className="text-[10px] text-text-muted mb-1 font-semibold">Insurance Claims</h4>
        <div className="text-lg font-bold text-white mb-1">94.2%</div>
        <div className="text-[9px] text-emerald-400">+2.4% success rate</div>
      </div>
    </div>
  </div>
);

const NGODashboard = () => (
  <div className="space-y-4">
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-3 font-semibold">Active Campaigns</h4>
      <div className="space-y-4">
        {[
          { name: "Clean Water Initiative", raised: 45000, goal: 50000, color: "bg-accent" },
          { name: "Education Fund 2026", raised: 12000, goal: 30000, color: "bg-primary" },
        ].map((camp, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-text-primary font-medium">{camp.name}</span>
              <span className="text-text-muted font-mono">${camp.raised.toLocaleString()} / ${camp.goal.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
              <motion.div className={cn("h-full", camp.color)} initial={{ width: 0 }} animate={{ width: `${(camp.raised / camp.goal) * 100}%` }} transition={{ duration: 1.2, delay: i * 0.2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-3 font-semibold">Volunteer Feed</h4>
        <div className="space-y-2.5">
          {[
            { action: "Registered for shift", name: "David M.", time: "10m" },
            { action: "Completed delivery", name: "Ana P.", time: "1h" },
            { action: "New sign up", name: "Tom R.", time: "2h" },
          ].map((feed, i) => (
            <div key={i} className="flex gap-2 items-start text-[10px]">
              <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary-400" />
              <div>
                <div className="text-text-primary"><span className="font-medium">{feed.name}</span> {feed.action}</div>
                <div className="text-text-muted mt-0.5">{feed.time} ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col items-center justify-center">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-2 font-semibold self-start">Grant Usage</h4>
        <div className="relative w-24 h-24 mt-2">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <motion.path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#06B6D4" strokeWidth="4" strokeDasharray="100, 100" initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 25 }} transition={{ duration: 1.5, delay: 0.5 }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">75%</div>
        </div>
      </div>
    </div>
  </div>
);

const EcommerceDashboard = () => (
  <div className="grid grid-cols-12 gap-4 h-full">
    <div className="col-span-5 bg-white/5 rounded-xl p-4 border border-white/10 h-full flex flex-col justify-center">
      <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-4 font-semibold text-center">Sales Funnel</h4>
      <div className="flex flex-col items-center gap-1.5 w-full px-2">
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-6 bg-primary/20 border border-primary/40 rounded flex items-center justify-center text-[9px] text-primary-100">Visits: 12.4k</motion.div>
        <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ delay: 0.1 }} className="h-6 bg-primary/40 border border-primary/60 rounded flex items-center justify-center text-[9px] text-white">Cart: 3.2k</motion.div>
        <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ delay: 0.2 }} className="h-6 bg-primary border border-primary rounded flex items-center justify-center text-[9px] text-white font-bold">Sales: 842</motion.div>
      </div>
    </div>
    <div className="col-span-7 space-y-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-3 font-semibold">Fulfillment Pipeline</h4>
        <div className="flex items-center justify-between relative mt-2 mb-2">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-background -translate-y-1/2 z-0" />
          <motion.div className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2 z-0" initial={{ width: 0 }} animate={{ width: "66%" }} transition={{ duration: 1, delay: 0.3 }} />
          
          {[
            { label: "New", active: true },
            { label: "Packed", active: true },
            { label: "Shipped", active: true },
            { label: "Delivered", active: false },
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-1">
              <div className={cn("w-3 h-3 rounded-full border-2", step.active ? "bg-accent border-accent shadow-[0_0_8px_rgba(6,182,212,0.6)]" : "bg-background border-surface-border")} />
              <span className="text-[8px] text-text-muted">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <div className="text-[10px] text-text-muted mb-1">Return Rate</div>
          <div className="text-lg font-bold text-emerald-400">1.2%</div>
          <div className="text-[8px] text-text-secondary">↓ 0.4% from last mo.</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <div className="text-[10px] text-text-muted mb-1">Avg. Order Value</div>
          <div className="text-lg font-bold text-white">$84.50</div>
          <div className="text-[8px] text-text-secondary">↑ $12.00 from last mo.</div>
        </div>
      </div>
    </div>
  </div>
);

const SchoolDashboard = () => (
  <div className="space-y-4">
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex justify-between items-end mb-3">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted font-semibold">Attendance Heatmap (Grade 10)</h4>
        <span className="text-xs text-emerald-400 font-medium">96% Avg</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 28 }).map((_, i) => {
          // Fake heatmap pattern
          const val = Math.random();
          let color = "bg-emerald-400";
          if (val > 0.8) color = "bg-emerald-300";
          if (val > 0.95) color = "bg-yellow-400";
          if (val > 0.98) color = "bg-red-400";
          
          return (
            <motion.div key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              className={cn("h-4 rounded-[2px] opacity-80 hover:opacity-100", color)}
            />
          )
        })}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-3 font-semibold">Performance Metrics</h4>
        <div className="space-y-2">
          {[
            { subj: "Math", score: 88, color: "bg-primary" },
            { subj: "Science", score: 92, color: "bg-accent" },
            { subj: "English", score: 85, color: "bg-primary-light" },
          ].map(perf => (
            <div key={perf.subj} className="flex items-center gap-2">
              <span className="text-[10px] text-text-secondary w-12">{perf.subj}</span>
              <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                <motion.div className={cn("h-full", perf.color)} initial={{ width: 0 }} animate={{ width: `${perf.score}%` }} transition={{ duration: 1 }} />
              </div>
              <span className="text-[9px] text-text-muted">{perf.score}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col items-center justify-center">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-1 font-semibold text-center">Fee Collection</h4>
        <div className="text-2xl font-display font-bold text-white mt-1">82%</div>
        <div className="text-[9px] text-text-secondary mt-1 text-center">Term 2 Dues Collected</div>
        <div className="w-full mt-3 h-1 bg-background rounded-full">
          <motion.div className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-400" initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ delay: 0.5 }} />
        </div>
      </div>
    </div>
  </div>
);

const ManufacturingDashboard = () => (
  <div className="space-y-4">
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-4 font-semibold flex justify-between">
        <span>Production Line B</span>
        <span className="text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Running</span>
      </h4>
      <div className="relative pt-2 pb-6">
        <div className="absolute top-3 left-2 right-2 h-0.5 bg-background z-0" />
        <motion.div className="absolute top-3 left-2 h-0.5 bg-primary z-0" initial={{ width: 0 }} animate={{ width: "50%" }} transition={{ duration: 1.5, repeat: Infinity }} />
        
        <div className="flex justify-between relative z-10">
          {[
            { label: "Raw Mat", status: "done" },
            { label: "Assembly", status: "done" },
            { label: "Testing", status: "active" },
            { label: "Packaging", status: "pending" },
          ].map((stage, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={cn(
                "w-3 h-3 rounded-full mb-2 outline outline-4 outline-background",
                stage.status === "done" ? "bg-primary" : stage.status === "active" ? "bg-accent shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" : "bg-surface-border"
              )} />
              <span className="text-[9px] text-text-secondary absolute top-6 whitespace-nowrap">{stage.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
        <div className="text-[10px] text-text-muted mb-1">Defect Rate (Hourly)</div>
        <div className="flex items-end gap-2">
          <div className="text-xl font-bold text-white">0.04%</div>
          <div className="text-[9px] text-emerald-400 mb-1">Optimal</div>
        </div>
        <div className="flex items-end h-8 gap-0.5 mt-2">
          {[3,4,2,5,3,4,2,1,2,3].map((h, i) => (
            <motion.div key={i} className="flex-1 bg-white/20 rounded-t-sm" initial={{ height: 0 }} animate={{ height: `${h * 15}%` }} transition={{ delay: i * 0.05 }} />
          ))}
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col justify-between">
        <div className="text-[10px] text-text-muted mb-1">OEE Score</div>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <motion.circle cx="18" cy="18" r="16" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeDasharray="100" initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 15 }} transition={{ duration: 1 }} />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-white">85%</div>
            <div className="text-[8px] text-text-secondary">World Class target: 85%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


// ============================================
// Industry Data
// ============================================

const INDUSTRIES = [
  {
    id: "restaurant",
    label: "Restaurant",
    icon: Icons.restaurant,
    headline: "Is Your Restaurant Losing Money in the Kitchen?",
    painPoint: "Between missing inventory, staff scheduling chaos, and disconnected delivery apps, your margins are shrinking. Stop guessing and start operating with precision.",
    features: [
      "Automated inventory forecasting & ordering",
      "AI-driven staff scheduling based on foot traffic",
      "Unified POS and multi-app delivery management",
    ],
    ctaText: "See Restaurant Case Study",
    metrics: [
      { value: "30%", label: "Less Food Waste" },
      { value: "15hrs", label: "Saved Weekly on Admin" },
      { value: "98%", label: "Order Accuracy" },
    ],
    Dashboard: RestaurantDashboard,
  },
  {
    id: "hospital",
    label: "Hospital",
    icon: Icons.hospital,
    headline: "Stop Patient Bottlenecks Before They Happen.",
    painPoint: "Nurses spend 30% of their shift doing paperwork while patients wait. Legacy systems create data silos that delay care and frustrate staff.",
    features: [
      "Predictive bed management & discharge planning",
      "AI-assisted triage and queuing algorithms",
      "Automated insurance claim pre-verification",
    ],
    ctaText: "See Healthcare Case Study",
    metrics: [
      { value: "40%", label: "Faster Discharges" },
      { value: "0", label: "Lost Paperwork" },
      { value: "+22%", label: "Bed Utilization" },
    ],
    Dashboard: HospitalDashboard,
  },
  {
    id: "ngo",
    label: "NGO",
    icon: Icons.ngo,
    headline: "Turn Donors Into Lifelong Advocates.",
    painPoint: "Managing spreadsheets of donors, grants, and volunteers is slowing your mission down. Your team is burning out on data entry instead of fieldwork.",
    features: [
      "Automated donor lifecycle and personalized outreach",
      "Real-time grant compliance & fund tracking",
      "Smart volunteer matching based on skills & location",
    ],
    ctaText: "See NGO Case Study",
    metrics: [
      { value: "2.5x", label: "Donor Retention" },
      { value: "100%", label: "Audit Readiness" },
      { value: "-40%", label: "Admin Overhead" },
    ],
    Dashboard: NGODashboard,
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: Icons.ecommerce,
    headline: "Stop Cart Abandonment and Return Nightmares.",
    painPoint: "You're spending thousands on ads, but clunky fulfillment, stockouts, and poor customer service are eating your profits alive.",
    features: [
      "Predictive inventory to eliminate stockouts",
      "AI customer support agent resolving 70% of tickets",
      "Dynamic pricing and automated cart recovery",
    ],
    ctaText: "See E-Commerce Case Study",
    metrics: [
      { value: "-70%", label: "Support Tickets" },
      { value: "+18%", label: "Conversion Rate" },
      { value: "0", label: "Stockouts" },
    ],
    Dashboard: EcommerceDashboard,
  },
  {
    id: "school",
    label: "School",
    icon: Icons.school,
    headline: "Modernize Your Campus Operations.",
    painPoint: "Teachers are overwhelmed with grading and attendance, while admins chase parents for fees. A disconnected campus hurts student outcomes.",
    features: [
      "Automated fee collection and parent reminders",
      "AI grading assistance for standardized tests",
      "Predictive attendance and dropout risk alerts",
    ],
    ctaText: "See Education Case Study",
    metrics: [
      { value: "95%", label: "On-time Fee Collection" },
      { value: "12hrs", label: "Saved per Teacher/Mo" },
      { value: "+15%", label: "Parent Engagement" },
    ],
    Dashboard: SchoolDashboard,
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: Icons.manufacturing,
    headline: "Zero Downtime. Maximum Yield.",
    painPoint: "Equipment failures catch you by surprise, and supply chain delays halt production. Operating blindly is costing you hundreds of thousands.",
    features: [
      "IoT-powered predictive maintenance alerts",
      "Automated supply chain risk monitoring",
      "Computer vision quality control at the edge",
    ],
    ctaText: "See Manufacturing Case Study",
    metrics: [
      { value: "99.9%", label: "Machine Uptime" },
      { value: "-60%", label: "Defect Rate" },
      { value: "10x", label: "ROI on Sensors" },
    ],
    Dashboard: ManufacturingDashboard,
  },
];


// ============================================
// Main Component
// ============================================

export default function IndustrySwitcher() {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);

  const activeData = INDUSTRIES.find((i) => i.id === activeTab) || INDUSTRIES[0];
  const Dashboard = activeData.Dashboard;

  return (
    <section id="industries" className="section-padding bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeading
            badge="Built For Your Sector"
            title="Systems Tailored to Your"
            highlight="Industry"
            description="We don't do cookie-cutter software. We build specialized operating systems designed to solve the exact bottlenecks of your specific business model."
          />
        </div>

        {/* ── Tab Bar ── */}
        <div className="flex justify-start lg:justify-center overflow-x-auto no-scrollbar mb-12 pb-4 snap-x border-b border-surface-border relative">
          <div className="flex items-center gap-2 px-4 lg:px-0 min-w-max mx-auto">
            {INDUSTRIES.map((industry) => {
              const isActive = activeTab === industry.id;
              return (
                <button
                  key={industry.id}
                  onClick={() => setActiveTab(industry.id)}
                  className={cn(
                    "relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all snap-center",
                    isActive
                      ? "text-white"
                      : "text-text-muted hover:text-text-primary hover:bg-white/5"
                  )}
                >
                  {/* Active Background Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="industry-tab-active"
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className={cn("transition-colors", isActive ? "text-accent-400" : "text-text-muted")}>
                      {industry.icon}
                    </span>
                    {industry.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Content Area ── */}
        <div className="bg-surface-hover/30 border border-surface-border rounded-3xl p-6 lg:p-12 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Column: Text */}
              <div>
                <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4 leading-tight">
                  {activeData.headline}
                </h3>
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  {activeData.painPoint}
                </p>
                <ul className="space-y-4 mb-10">
                  {activeData.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="flex items-start gap-3 text-white"
                    >
                      <span className="mt-1 flex-shrink-0">{Icons.check}</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button variant="ghost" className="group">
                  {activeData.ctaText}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Button>
              </div>

              {/* Right Column: Dashboard Mockup */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-3xl transform -rotate-3" />
                <GlassCard className="relative z-10 bg-[#0F1525] border-white/10 shadow-2xl p-6 lg:p-8 overflow-hidden min-h-[380px]" hover={false}>
                  {/* Dashboard Header decoration */}
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <div className="ml-4 h-4 w-32 bg-white/5 rounded-full" />
                  </div>
                  
                  {/* The dynamic dashboard component */}
                  <Dashboard />
                </GlassCard>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom Metrics Bar ── */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-metrics"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-surface-border bg-surface-hover/30 border border-surface-border rounded-2xl backdrop-blur-sm"
            >
              {activeData.metrics.map((metric, idx) => (
                <div key={idx} className="p-6 text-center sm:text-left sm:px-8 flex flex-col justify-center">
                  <div className="text-3xl font-display font-bold gradient-text mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-text-secondary font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
