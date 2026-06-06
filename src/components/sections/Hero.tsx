// ============================================
// Hero Section — Full viewport with animated content & dashboard mockup
// ============================================

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_CONTENT } from "@/constants";
import { useCountUp, useInView } from "@/hooks";
import { cn } from "@/lib/utils";

// ── Animation variants ──────────────────────────────────────────

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

const wordVariant = {
  initial: { opacity: 0, y: 30, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 25 },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  }),
};

// ── Stat counter sub-component ──────────────────────────────────

function StatCounter({
  end,
  suffix,
  label,
  enabled,
}: {
  end: number;
  suffix: string;
  label: string;
  enabled: boolean;
}) {
  const { formatted } = useCountUp({
    end,
    suffix,
    duration: 2200,
    enabled,
  });

  return (
    <div className="text-center px-4 sm:px-6">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold gradient-text">
        {formatted}
      </div>
      <div className="text-xs sm:text-sm text-text-muted mt-1 whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

// ── Dashboard Mockup (desktop) ──────────────────────────────────

const NOTIFICATIONS = [
  { icon: "📦", text: "New order received", time: "Just now", color: "text-green-400" },
  { icon: "📄", text: "Invoice #1247 generated", time: "2 min ago", color: "text-accent-400" },
  { icon: "📊", text: "Monthly report ready", time: "5 min ago", color: "text-primary-400" },
  { icon: "✅", text: "Task auto-completed", time: "Just now", color: "text-emerald-400" },
  { icon: "🤖", text: "AI analysis complete", time: "1 min ago", color: "text-violet-400" },
];

function DashboardMockup() {
  const [activeNotif, setActiveNotif] = useState(0);
  const [visibleNotifs, setVisibleNotifs] = useState<number[]>([]);

  // Cycle notifications
  useEffect(() => {
    const showNotif = () => {
      setVisibleNotifs((prev) => {
        const next = [...prev, activeNotif];
        // Keep max 2 visible
        if (next.length > 2) next.shift();
        return next;
      });
      setActiveNotif((prev) => (prev + 1) % NOTIFICATIONS.length);
    };

    // Initial delay, then cycle
    const initialTimer = setTimeout(showNotif, 1500);
    const interval = setInterval(showNotif, 3000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [activeNotif]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
    >
      {/* Main dashboard card */}
      <div className="dashboard-card rounded-2xl p-6 relative overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="text-[10px] text-text-muted font-mono bg-white/5 px-3 py-1 rounded-full">
            minar-dashboard.app
          </div>
        </div>

        {/* Metric cards row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Revenue", value: "$48.2K", change: "+12.5%", up: true },
            { label: "Orders", value: "1,847", change: "+8.3%", up: true },
            { label: "Efficiency", value: "94.7%", change: "+3.1%", up: true },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.15, duration: 0.5 }}
            >
              <div className="text-[10px] text-text-muted mb-1">
                {metric.label}
              </div>
              <div className="text-sm font-bold text-text-primary">
                {metric.value}
              </div>
              <div
                className={cn(
                  "text-[10px] font-medium mt-0.5",
                  metric.up ? "text-emerald-400" : "text-red-400"
                )}
              >
                {metric.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SVG Chart */}
        <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04] mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-text-muted">Weekly Performance</span>
            <span className="text-[10px] text-emerald-400 font-medium">
              Live
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1.5 animate-pulse" />
            </span>
          </div>
          <svg
            viewBox="0 0 280 80"
            className="w-full h-auto"
            fill="none"
          >
            {/* Grid lines */}
            {[0, 20, 40, 60, 80].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="280"
                y2={y}
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
              />
            ))}

            {/* Gradient fill under chart */}
            <defs>
              <linearGradient
                id="chart-gradient"
                x1="0"
                y1="0"
                x2="280"
                y2="0"
              >
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient
                id="chart-fill"
                x1="140"
                y1="0"
                x2="140"
                y2="80"
              >
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Fill area */}
            <motion.path
              d="M 0 65 L 40 50 L 80 55 L 120 30 L 160 40 L 200 15 L 240 25 L 280 10 L 280 80 L 0 80 Z"
              fill="url(#chart-fill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            />

            {/* Line */}
            <motion.path
              d="M 0 65 L 40 50 L 80 55 L 120 30 L 160 40 L 200 15 L 240 25 L 280 10"
              stroke="url(#chart-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
            />

            {/* Dot at the end */}
            <motion.circle
              cx="280"
              cy="10"
              r="4"
              fill="#06B6D4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.6, duration: 0.3 }}
            />
            <motion.circle
              cx="280"
              cy="10"
              r="8"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="1.5"
              opacity="0.3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 2.7, duration: 0.4 }}
            />
          </svg>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between text-[10px] text-text-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </div>
          <div>Last sync: 2s ago</div>
        </div>
      </div>

      {/* ── Floating notification toasts ── */}
      <div className="absolute -left-4 top-12 w-56 space-y-2 z-10">
        <AnimatePresence mode="popLayout">
          {visibleNotifs.slice(-2).map((notifIdx, i) => {
            const notif = NOTIFICATIONS[notifIdx];
            return (
              <motion.div
                key={`${notifIdx}-${i}`}
                className="notif-toast rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-xl"
                initial={{ opacity: 0, x: -40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="text-base flex-shrink-0">{notif.icon}</span>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-text-primary truncate">
                    {notif.text}
                  </div>
                  <div className={cn("text-[9px] mt-0.5", notif.color)}>
                    {notif.time}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Decorative glow behind card */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl blur-2xl -z-10" />
    </motion.div>
  );
}

// ── Scroll Indicator ────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 scroll-indicator flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.8 }}
    >
      <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-medium">
        Scroll
      </span>
      <svg
        width="20"
        height="28"
        viewBox="0 0 20 28"
        fill="none"
        className="text-text-muted"
      >
        {/* Mouse outline */}
        <rect
          x="1"
          y="1"
          width="18"
          height="26"
          rx="9"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
        {/* Scroll wheel dot */}
        <motion.circle
          cx="10"
          cy="8"
          r="2"
          fill="currentColor"
          opacity="0.6"
          animate={{ cy: [8, 14, 8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

// ── Main Hero Component ─────────────────────────────────────────

export default function Hero() {
  const { ref: statsRef, isInView: statsInView } = useInView({
    threshold: 0.3,
  });

  const words1 = HERO_CONTENT.headingLine1.split(" ");
  const words2 = HERO_CONTENT.headingLine2.split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient mesh blobs (reduced size on mobile) */}
        <div className="hero-blob hero-blob-1 scale-50 sm:scale-100 origin-top-left" />
        <div className="hero-blob hero-blob-2 scale-50 sm:scale-100 origin-top-right" />
        <div className="hero-blob hero-blob-3 scale-50 sm:scale-100 origin-bottom-left" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 hero-grid" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="section-container relative z-10 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left Column: Text content ── */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary-300 badge-glow">
                {HERO_CONTENT.badge}
              </span>
            </motion.div>

            {/* Animated headline — word by word */}
            <motion.h1
              className="mt-6 sm:mt-8 text-3xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-display font-bold leading-[1.1] tracking-tight"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Line 1 — white */}
              <span className="flex flex-wrap gap-x-[0.3em]">
                {words1.map((word, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    variants={wordVariant}
                    className="text-text-primary inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>

              {/* Line 2 — violet gradient */}
              <span className="flex flex-wrap gap-x-[0.3em] mt-1">
                {words2.map((word, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    variants={wordVariant}
                    className="gradient-text inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed w-full sm:max-w-lg px-4 sm:px-0"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              custom={0.9}
            >
              {HERO_CONTENT.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              custom={1.1}
            >
              <a
                href="/contact"
                className="btn-gradient btn-shimmer px-8 py-3 text-base rounded-xl font-semibold flex items-center justify-center shadow-glow w-full sm:w-auto min-h-[52px] touch-target"
              >
                {HERO_CONTENT.cta_primary}
              </a>
              <a
                href="#demo"
                className="btn-ghost px-8 py-3 text-base rounded-xl font-semibold flex items-center justify-center group w-full sm:w-auto min-h-[52px] touch-target"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    className="text-primary-400 group-hover:scale-110 transition-transform"
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M7 6L12 9L7 12V6Z" fill="currentColor" />
                  </svg>
                  {HERO_CONTENT.cta_secondary}
                </span>
              </a>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              ref={statsRef}
              className="mt-10 sm:mt-12 pt-8 sm:border-t border-white/[0.06]"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              custom={1.4}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] gap-6 sm:gap-0">
                {HERO_CONTENT.stats.map((stat, i) => (
                  <div key={stat.label} className={cn("w-full sm:w-auto", i !== 0 && "pt-6 sm:pt-0")}>
                    <StatCounter
                      end={stat.end}
                      suffix={stat.suffix}
                      label={stat.label}
                      enabled={statsInView}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Dashboard mockup (desktop only) ── */}
          <div className="hidden lg:block">
            <DashboardMockup />
          </div>

          {/* ── Mobile Metrics Strip ── */}
          <div className="lg:hidden mt-8 w-full">
             <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-text-muted font-medium bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
               <span>40+ Businesses</span>
               <span className="w-1 h-1 bg-white/20 rounded-full" />
               <span>500+ Hours Saved</span>
               <span className="w-1 h-1 bg-white/20 rounded-full" />
               <span className="text-primary-400">3x ROI</span>
             </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
