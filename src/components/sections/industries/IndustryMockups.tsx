"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================
// Dashboard Mockup Components (adapted for deep dives)
// ============================================

export const RestaurantDashboard = () => (
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
                <motion.div className={cn("h-full", inv.color)} initial={{ width: 0 }} whileInView={{ width: `${inv.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} />
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
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.4 }} />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export const HospitalDashboard = () => (
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
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
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

export const NGODashboard = () => (
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
              <motion.div className={cn("h-full", camp.color)} initial={{ width: 0 }} whileInView={{ width: `${(camp.raised / camp.goal) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.2 }} />
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
            <motion.path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#06B6D4" strokeWidth="4" strokeDasharray="100, 100" initial={{ strokeDashoffset: 100 }} whileInView={{ strokeDashoffset: 25 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">75%</div>
        </div>
      </div>
    </div>
  </div>
);

export const EcommerceDashboard = () => (
  <div className="grid grid-cols-12 gap-4 h-full">
    <div className="col-span-5 bg-white/5 rounded-xl p-4 border border-white/10 h-full flex flex-col justify-center">
      <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-4 font-semibold text-center">Sales Funnel</h4>
      <div className="flex flex-col items-center gap-1.5 w-full px-2">
        <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} className="h-6 bg-primary/20 border border-primary/40 rounded flex items-center justify-center text-[9px] text-primary-100 w-full whitespace-nowrap overflow-hidden">Visits: 12.4k</motion.div>
        <motion.div initial={{ width: 0 }} whileInView={{ width: "70%" }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="h-6 bg-primary/40 border border-primary/60 rounded flex items-center justify-center text-[9px] text-white whitespace-nowrap overflow-hidden">Cart: 3.2k</motion.div>
        <motion.div initial={{ width: 0 }} whileInView={{ width: "40%" }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="h-6 bg-primary border border-primary rounded flex items-center justify-center text-[9px] text-white font-bold whitespace-nowrap overflow-hidden">Sales: 842</motion.div>
      </div>
    </div>
    <div className="col-span-7 space-y-4">
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-3 font-semibold">Fulfillment Pipeline</h4>
        <div className="flex items-center justify-between relative mt-2 mb-2">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-background -translate-y-1/2 z-0" />
          <motion.div className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2 z-0" initial={{ width: 0 }} whileInView={{ width: "66%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
          
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
          <div className="text-[10px] text-text-muted mb-1">Avg. Order</div>
          <div className="text-lg font-bold text-white">$84.50</div>
          <div className="text-[8px] text-text-secondary">↑ $12.00 from last mo.</div>
        </div>
      </div>
    </div>
  </div>
);

export const SchoolDashboard = () => (
  <div className="space-y-4">
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex justify-between items-end mb-3">
        <h4 className="text-[11px] uppercase tracking-wider text-text-muted font-semibold">Attendance Heatmap</h4>
        <span className="text-xs text-emerald-400 font-medium">96% Avg</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 28 }).map((_, i) => {
          const val = Math.random();
          let color = "bg-emerald-400";
          if (val > 0.8) color = "bg-emerald-300";
          if (val > 0.95) color = "bg-yellow-400";
          if (val > 0.98) color = "bg-red-400";
          return (
            <motion.div key={i}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }}
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
                <motion.div className={cn("h-full", perf.color)} initial={{ width: 0 }} whileInView={{ width: `${perf.score}%` }} viewport={{ once: true }} transition={{ duration: 1 }} />
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
          <motion.div className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-400" initial={{ width: 0 }} whileInView={{ width: "82%" }} viewport={{ once: true }} transition={{ delay: 0.5 }} />
        </div>
      </div>
    </div>
  </div>
);

export const ManufacturingDashboard = () => (
  <div className="space-y-4">
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h4 className="text-[11px] uppercase tracking-wider text-text-muted mb-4 font-semibold flex justify-between">
        <span>Production Line B</span>
        <span className="text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Running</span>
      </h4>
      <div className="relative pt-2 pb-6">
        <div className="absolute top-3 left-2 right-2 h-0.5 bg-background z-0" />
        <motion.div className="absolute top-3 left-2 h-0.5 bg-primary z-0" initial={{ width: 0 }} whileInView={{ width: "50%" }} viewport={{ once: true }} transition={{ duration: 1.5, repeat: Infinity }} />
        
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
            <motion.div key={i} className="flex-1 bg-white/20 rounded-t-sm" initial={{ height: 0 }} whileInView={{ height: `${h * 15}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} />
          ))}
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col justify-between">
        <div className="text-[10px] text-text-muted mb-1">OEE Score</div>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <motion.circle cx="18" cy="18" r="16" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeDasharray="100" initial={{ strokeDashoffset: 100 }} whileInView={{ strokeDashoffset: 15 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-white">85%</div>
            <div className="text-[8px] text-text-secondary">Target: 85%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
