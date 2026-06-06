"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

// ============================================
// SVGs & Visual Elements
// ============================================

const BeforeGraphics = () => (
  <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none p-4 lg:p-12 overflow-hidden">
    {/* Chaos floating elements */}
    <motion.div 
      animate={{ y: [-10, 10, -10] }} 
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 left-1/4 bg-[#2A1D1A] border border-red-900/30 p-4 rounded-xl shadow-xl transform -rotate-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span className="text-xs font-mono text-red-200">v12_FINAL_draft.xlsx</span>
      </div>
      <div className="flex flex-col gap-1 w-32">
        <div className="h-1.5 w-full bg-red-900/40 rounded" />
        <div className="h-1.5 w-4/5 bg-red-900/40 rounded" />
        <div className="h-1.5 w-5/6 bg-red-900/40 rounded" />
      </div>
    </motion.div>

    <motion.div 
      animate={{ y: [10, -15, 10] }} 
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-1/3 left-[15%] bg-yellow-600/20 border border-yellow-600/30 p-3 rounded-lg shadow-lg transform rotate-3 flex items-center gap-2 backdrop-blur-md"
    >
      <div className="w-6 h-6 rounded-full bg-yellow-500/30 flex items-center justify-center text-[10px]">⏰</div>
      <div className="text-[10px] text-yellow-200 font-medium">9:45 PM: Still matching invoices</div>
    </motion.div>

    <motion.div 
      animate={{ y: [-5, 15, -5] }} 
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-[#1A2622] border border-green-800/30 p-3 rounded-2xl shadow-xl rounded-bl-none max-w-[150px]"
    >
      <div className="text-[10px] text-green-200 font-medium">Customer: "Where is my order???"</div>
    </motion.div>

    <motion.div 
      animate={{ scale: [1, 1.05, 1] }} 
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/4 left-1/2 -translate-x-1/3"
    >
      <div className="text-4xl">😫</div>
    </motion.div>

    {/* Labels */}
    <div className="absolute top-8 left-8 flex flex-col gap-2">
      <div className="px-3 py-1 bg-red-900/40 border border-red-500/20 rounded-full text-xs text-red-300 font-semibold backdrop-blur-sm shadow-xl">Manual Tracking</div>
      <div className="px-3 py-1 bg-orange-900/40 border border-orange-500/20 rounded-full text-xs text-orange-300 font-semibold backdrop-blur-sm shadow-xl">Data Silos</div>
      <div className="px-3 py-1 bg-yellow-900/40 border border-yellow-500/20 rounded-full text-xs text-yellow-300 font-semibold backdrop-blur-sm shadow-xl">Errors Daily</div>
    </div>
  </div>
);

const AfterGraphics = () => (
  <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none p-4 lg:p-12 overflow-hidden">
    {/* Clean Dashboard elements */}
    <motion.div 
      animate={{ y: [-5, 5, -5] }} 
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 right-1/4 bg-[#0A1428] border border-primary/30 p-5 rounded-2xl shadow-2xl shadow-primary/20 transform rotate-2 w-64 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-primary-200 font-semibold">Live System Status</div>
        <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">100% HEALTHY</div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-[8px]">✓</div>
          <div className="text-[10px] text-text-secondary">Orders Synced</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-[8px]">✓</div>
          <div className="text-[10px] text-text-secondary">Invoices Generated</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-[8px]">✓</div>
          <div className="text-[10px] text-text-secondary">Inventory Updated</div>
        </div>
      </div>
    </motion.div>

    <motion.div 
      animate={{ y: [5, -10, 5] }} 
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="absolute bottom-1/3 right-[15%] bg-[#0B1A24] border border-accent/30 p-3 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md"
    >
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
      </div>
      <div>
        <div className="text-[10px] text-accent-100 font-semibold mb-0.5">Automated SMS</div>
        <div className="text-[9px] text-accent-300/70">"Your order is on the way!"</div>
      </div>
    </motion.div>

    <motion.div 
      animate={{ scale: [1, 1.05, 1] }} 
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-1/4 right-1/2 translate-x-1/3"
    >
      <div className="text-4xl drop-shadow-2xl">😎</div>
    </motion.div>

    <motion.div 
      animate={{ y: [-10, 10, -10] }} 
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      className="absolute top-1/3 right-1/2 translate-x-1/2 bg-[#1A1A2E] border border-primary/20 p-3 rounded-2xl shadow-xl w-32 backdrop-blur-md"
    >
       <div className="text-[9px] text-text-muted mb-1">Weekly Time Saved</div>
       <div className="text-xl font-bold text-emerald-400">42 hrs</div>
    </motion.div>

    {/* Labels */}
    <div className="absolute top-8 right-8 flex flex-col gap-2 items-end">
      <div className="px-3 py-1 bg-emerald-900/40 border border-emerald-500/20 rounded-full text-xs text-emerald-300 font-semibold backdrop-blur-sm shadow-xl">Real-Time Data</div>
      <div className="px-3 py-1 bg-primary-900/40 border border-primary-500/20 rounded-full text-xs text-primary-300 font-semibold backdrop-blur-sm shadow-xl">Full Control</div>
      <div className="px-3 py-1 bg-accent-900/40 border border-accent-500/20 rounded-full text-xs text-accent-300 font-semibold backdrop-blur-sm shadow-xl">Zero Errors</div>
    </div>
  </div>
);

// ============================================
// Main Slider Component
// ============================================

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [_sliderWidth, setSliderWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Motion value for the slider position (0 to 100)
  const position = useMotionValue(50);
  
  // Update width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setSliderWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Transform position (0-100) to clip-path percentages
  const clipPathLeft = useTransform(position, (v) => `inset(0 ${100 - v}% 0 0)`);
  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    position.set(Math.max(0, Math.min(100, percent)));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    // Snap logic
    const current = position.get();
    let target = current;
    
    if (current < 20) target = 20;
    else if (current > 80) target = 80;
    
    if (target !== current) {
      animate(position, target, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  };

  return (
    <section id="transformation" className="section-padding bg-background relative overflow-hidden">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeading
            badge="The Transformation"
            title="Night and Day"
            highlight="Difference"
            description="Drag the slider to see how intelligent automation transforms a chaotic, manual business into a streamlined, high-profit machine."
          />
        </div>

        {/* ── Slider Container ── */}
        <div 
          ref={containerRef}
          className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-surface-border shadow-2xl bg-surface select-none touch-none cursor-ew-resize"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* BACKGROUND: Right Side ("After") */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] to-[#121E36]">
            {/* Cool grid pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#8B5CF6 1px, transparent 1px), linear-gradient(90deg, #8B5CF6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <AfterGraphics />
            <div className="absolute bottom-6 right-6 font-display font-bold text-2xl text-white/50 pointer-events-none">AFTER AI</div>
          </div>

          {/* FOREGROUND: Left Side ("Before") */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#1E1515] to-[#2B1C1A] origin-left z-10 pointer-events-none"
            style={{ clipPath: clipPathLeft }}
          >
            {/* Warm grid pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#F87171 1px, transparent 1px), linear-gradient(90deg, #F87171 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <BeforeGraphics />
            <div className="absolute bottom-6 left-6 font-display font-bold text-2xl text-white/50 pointer-events-none">BEFORE</div>
          </motion.div>

          {/* DRAG HANDLE & DIVIDER LINE */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-white z-20 flex items-center justify-center group pointer-events-none"
            style={{ 
              left: useTransform(position, (v) => `${v}%`),
              translateX: "-50%"
            }}
          >
            {/* Glowing line effect */}
            <div className="absolute inset-0 w-full h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8),0_0_30px_rgba(139,92,246,0.6)]" />
            
            {/* Handle Button */}
            <div className="absolute w-12 h-12 bg-background border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.8)] transition-transform" style={{ transform: isDragging ? "scale(1.1)" : "scale(1)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 absolute">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Metrics ── */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { before: "43 Hours", after: "2 Hours", label: "Admin work per week" },
            { before: "$2,400", after: "$200", label: "Monthly operational cost" },
            { before: "82%", after: "99.9%", label: "Process accuracy" },
          ].map((metric, i) => (
            <GlassCard key={i} className="p-6 text-center" hover={false}>
              <div className="flex items-center justify-center gap-3 font-display font-bold text-2xl mb-2">
                <span className="text-red-400/80 line-through decoration-red-500/50">{metric.before}</span>
                <span className="text-text-muted text-lg">→</span>
                <span className="text-emerald-400">{metric.after}</span>
              </div>
              <div className="text-sm text-text-secondary">{metric.label}</div>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
}
